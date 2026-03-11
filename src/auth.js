import { getEnrolledCourseIds } from "@/lib/enrollment";
import { db } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

function getProviderUserId(account) {
  if (!account?.providerAccountId) {
    return null;
  }

  if (account.provider === "google") {
    return account.providerAccountId;
  }

  return `${account.provider}:${account.providerAccountId}`;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  callbacks: {
    async jwt({ token, account, trigger, session }) {
      const providerUserId = getProviderUserId(account);

      if (providerUserId) {
        token.userId = providerUserId;
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

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.userId || token.sub || null;
        session.user.enrolledCourseIds = Array.isArray(token.enrolledCourseIds)
          ? token.enrolledCourseIds
          : [];
      }

      return session;
    },
    async signIn({ user, account }) {
      const userId = getProviderUserId(account);

      if (!userId) return true;

      const userRef = doc(db, "users", userId);

      try {
        const userDoc = await getDoc(userRef);

        const payload = {
          userId,
          name: user.name ?? null,
          email: typeof user.email === "string" ? user.email.toLowerCase() : null,
          image: user.image ?? null,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          lastLoginAt: serverTimestamp(),
        };

        if (!userDoc.exists()) {
          payload.createdAt = serverTimestamp();

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

        await setDoc(userRef, payload, { merge: true });
      } catch (error) {
        console.error("Erro ao salvar usuário no Firestore:", error);
      }

      return true;
    },
  },
});