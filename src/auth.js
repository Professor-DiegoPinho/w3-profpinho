import { getEnrolledCourseIds } from "@/lib/enrollment";
import { adminDb } from "@/lib/firebaseAdmin";
import { randomUUID } from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

const hasGoogleProviderConfig =
  typeof process.env.AUTH_GOOGLE_ID === "string" &&
  process.env.AUTH_GOOGLE_ID.length > 0 &&
  typeof process.env.AUTH_GOOGLE_SECRET === "string" &&
  process.env.AUTH_GOOGLE_SECRET.length > 0;

const hasGithubProviderConfig =
  typeof process.env.AUTH_GITHUB_ID === "string" &&
  process.env.AUTH_GITHUB_ID.length > 0 &&
  typeof process.env.AUTH_GITHUB_SECRET === "string" &&
  process.env.AUTH_GITHUB_SECRET.length > 0;

const providers = [];

if (hasGoogleProviderConfig) {
  providers.push(Google);
}

if (hasGithubProviderConfig) {
  providers.push(GitHub);
}

function normalizeEmail(email) {
  if (typeof email !== "string") {
    return null;
  }

  const normalized = email.trim().toLowerCase();
  return normalized.length > 0 ? normalized : null;
}

function getProviderLinkId(account) {
  if (!account?.providerAccountId || !account?.provider) {
    return null;
  }

  return `${account.provider}:${account.providerAccountId}`;
}

function toMillis(timestamp) {
  if (typeof timestamp?.toMillis === "function") {
    return timestamp.toMillis();
  }

  return Number.MAX_SAFE_INTEGER;
}

function generateUserId() {
  return `usr_${randomUUID()}`;
}

function buildProviderConnections(existingUserData, account, normalizedEmail) {
  const existingConnections =
    existingUserData?.providerConnections && typeof existingUserData.providerConnections === "object"
      ? existingUserData.providerConnections
      : {};

  const providerKey = account?.provider;

  if (!providerKey) {
    return existingConnections;
  }

  const existingProviderConnection =
    existingConnections[providerKey] && typeof existingConnections[providerKey] === "object"
      ? existingConnections[providerKey]
      : {};

  return {
    ...existingConnections,
    [providerKey]: {
      ...existingProviderConnection,
      provider: providerKey,
      providerAccountId: account?.providerAccountId ?? null,
      email: normalizedEmail,
      connectedAt: existingProviderConnection.connectedAt ?? FieldValue.serverTimestamp(),
      lastLoginAt: FieldValue.serverTimestamp(),
    },
  };
}

function buildLinkedProviderIds(existingUserData, account) {
  const existingIds = Array.isArray(existingUserData?.linkedProviderIds)
    ? existingUserData.linkedProviderIds
    : [];

  const newProviderLinkId = getProviderLinkId(account);

  if (!newProviderLinkId || existingIds.includes(newProviderLinkId)) {
    return existingIds;
  }

  return [...existingIds, newProviderLinkId];
}

function pickPrimaryUserDoc(userDocs, account) {
  if (!Array.isArray(userDocs) || userDocs.length === 0) {
    return null;
  }

  const googleLegacyId = account?.provider === "google" ? account.providerAccountId : null;
  const providerLinkId = getProviderLinkId(account);

  if (googleLegacyId) {
    const legacyGoogleDoc = userDocs.find((userDoc) => userDoc.id === googleLegacyId);
    if (legacyGoogleDoc) {
      return legacyGoogleDoc;
    }
  }

  if (providerLinkId) {
    const providerDoc = userDocs.find((userDoc) => userDoc.id === providerLinkId);
    if (providerDoc) {
      return providerDoc;
    }
  }

  return [...userDocs].sort((a, b) => toMillis(a.data()?.createdAt) - toMillis(b.data()?.createdAt))[0];
}

async function getUsersByEmail(normalizedEmail) {
  if (!normalizedEmail) {
    return [];
  }

  const usersSnapshot = await adminDb
    .collection("users")
    .where("email", "==", normalizedEmail)
    .get();

  return usersSnapshot.docs;
}

async function migrateEnrollmentsToUser(targetUserId, sourceUserIds) {
  const uniqueSourceIds = [...new Set(sourceUserIds)].filter(
    (sourceUserId) =>
      typeof sourceUserId === "string" &&
      sourceUserId.length > 0 &&
      sourceUserId !== targetUserId
  );

  for (const sourceUserId of uniqueSourceIds) {
    const sourceEnrollmentsSnapshot = await adminDb
      .collection("enrollments")
      .where("userId", "==", sourceUserId)
      .get();

    for (const enrollmentDoc of sourceEnrollmentsSnapshot.docs) {
      const enrollmentData = enrollmentDoc.data();
      const courseId = enrollmentData?.courseId;

      if (typeof courseId !== "string" || courseId.length === 0) {
        continue;
      }

      const targetEnrollmentId = `${targetUserId}_${courseId}`;

      await adminDb.collection("enrollments").doc(targetEnrollmentId).set(
        {
          ...enrollmentData,
          enrollmentId: targetEnrollmentId,
          userId: targetUserId,
          courseId,
        },
        { merge: true }
      );
    }
  }
}

async function resolveUserIdFromProviderLink(account) {
  const providerLinkId = getProviderLinkId(account);

  if (!providerLinkId) {
    return null;
  }

  // Busca na coleção users pelo array linkedProviderIds
  const usersSnapshot = await adminDb
    .collection("users")
    .where("linkedProviderIds", "array-contains", providerLinkId)
    .get();

  if (usersSnapshot.empty) {
    return null;
  }

  // Se houver mais de um (caso raro de inconsistência), pega o mais antigo
  const userDoc = usersSnapshot.docs.length === 1
    ? usersSnapshot.docs[0]
    : [...usersSnapshot.docs].sort((a, b) => toMillis(a.data()?.createdAt) - toMillis(b.data()?.createdAt))[0];

  return userDoc.id;
}

async function resolveOrCreateUser({ user, account }) {
  const normalizedEmail = normalizeEmail(user?.email);
  const providerLinkId = getProviderLinkId(account);
  let userId = await resolveUserIdFromProviderLink(account);

  const usersByEmail = await getUsersByEmail(normalizedEmail);
  const primaryUserDoc = pickPrimaryUserDoc(usersByEmail, account);

  if (!userId && primaryUserDoc) {
    userId = primaryUserDoc.id;
  }

  if (!userId) {
    userId = generateUserId();
  }

  const userRef = adminDb.collection("users").doc(userId);
  const userDoc = await userRef.get();
  const existingUserData = userDoc.exists ? userDoc.data() : null;

  const duplicateUserIds = usersByEmail
    .map((candidateDoc) => candidateDoc.id)
    .filter((candidateUserId) => candidateUserId !== userId);

  const googleLegacyId = account?.provider === "google" ? account.providerAccountId : null;
  if (googleLegacyId && googleLegacyId !== userId) {
    duplicateUserIds.push(googleLegacyId);
  }

  if (providerLinkId && providerLinkId !== userId) {
    duplicateUserIds.push(providerLinkId);
  }

  await migrateEnrollmentsToUser(userId, duplicateUserIds);

  const payload = {
    userId,
    name: user?.name ?? null,
    email: normalizedEmail,
    image: user?.image ?? null,
    // Mantemos os campos legados como "ultimo provider usado".
    provider: account?.provider ?? null,
    providerAccountId: account?.providerAccountId ?? null,
    providerConnections: buildProviderConnections(existingUserData, account, normalizedEmail),
    linkedProviderIds: buildLinkedProviderIds(existingUserData, account),
    lastLoginAt: FieldValue.serverTimestamp(),
  };

  if (!userDoc.exists) {
    payload.createdAt = FieldValue.serverTimestamp();

    try {
      const cookieStore = await cookies();
      const utmCookie = cookieStore.get("utm_data");
      if (utmCookie?.value) {
        const utmData = JSON.parse(decodeURIComponent(utmCookie.value));
        if (utmData && typeof utmData === "object") {
          payload.acquisition = { ...utmData };
        }
      }
    } catch {
      console.error("Erro ao ler cookie de aquisição para o usuário novo");
    }
  }

  await userRef.set(payload, { merge: true });

  return userId;
}

const { handlers, signIn, signOut, auth: nextAuth } = NextAuth({
  providers,
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (account?.providerAccountId) {
        const linkedUserId = await resolveUserIdFromProviderLink(account);
        if (linkedUserId) {
          token.userId = linkedUserId;
        }
      }

      if (!token.userId) {
        const normalizedEmail = normalizeEmail(user?.email ?? token?.email);
        const usersByEmail = await getUsersByEmail(normalizedEmail);
        const primaryUserDoc = pickPrimaryUserDoc(usersByEmail, account);

        if (primaryUserDoc) {
          token.userId = primaryUserDoc.id;
        }
      }

      if (!token.userId && token.sub) {
        token.userId = token.sub;
      }

      if (trigger === "update" && Array.isArray(session?.enrolledCourseIds)) {
        token.enrolledCourseIds = session.enrolledCourseIds;
      }

      if (!Array.isArray(token.enrolledCourseIds)) {
        token.enrolledCourseIds = await getEnrolledCourseIds(token.userId);
      }

      // Buscar role e nome do Firestore no momento do login (quando account estiver presente)
      // Ou sempre, para sincronizar atualizações do nome
      if (account && token.userId) {
        try {
          const userDoc = await adminDb.collection("users").doc(token.userId).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            token.role = userData?.role ?? null;
            token.name = userData?.name ?? null;
          } else {
            token.role = null;
            token.name = null;
          }
        } catch (error) {
          console.error("Erro ao buscar role e nome do usuário:", error);
          token.role = null;
          token.name = null;
        }
      }

      // Sincronizar nome quando atualização é disparada (ex: após atualizar perfil)
      if (trigger === "update" && token.userId) {
        try {
          const userDoc = await adminDb.collection("users").doc(token.userId).get();
          if (userDoc.exists) {
            token.name = userDoc.data()?.name ?? null;
          }
        } catch (error) {
          console.error("Erro ao sincronizar nome do usuário:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.userId || token.sub || null;
        session.user.enrolledCourseIds = Array.isArray(token.enrolledCourseIds)
          ? token.enrolledCourseIds
          : [];
        session.user.role = token.role ?? null;
        session.user.name = token.name ?? null;
      }

      return session;
    },
    async signIn({ user, account }) {
      if (!account?.provider || !account?.providerAccountId) {
        return true;
      }

      try {
        await resolveOrCreateUser({ user, account });
      } catch (error) {
        console.error("Erro ao salvar usuário no Firestore:", error);
      }

      return true;
    },
  },
});

export const auth = async (...args) => {
  if (process.env.NODE_ENV !== "production") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const mockUserCookie = cookieStore.get("e2e-mock-user");
      console.error("[AUTH DEBUG] NODE_ENV:", process.env.NODE_ENV, "| hasMockCookie:", !!mockUserCookie, "| args.length:", args.length);
      if (mockUserCookie?.value) {
        const mockUser = JSON.parse(mockUserCookie.value);
        console.error("[AUTH DEBUG] Returning mock session for:", mockUser.id);
        return {
          user: {
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            role: mockUser.role || "user",
            enrolledCourseIds: mockUser.enrolledCourseIds || [],
          },
        };
      }
    } catch (e) {
      console.error("[AUTH DEBUG] CAUGHT ERROR:", e.message, e.stack);
    }
  } else {
    console.error("[AUTH DEBUG] Skipping mock - NODE_ENV is:", process.env.NODE_ENV);
  }
  return nextAuth(...args);
};

export { handlers, signIn, signOut, nextAuth as authMiddleware };