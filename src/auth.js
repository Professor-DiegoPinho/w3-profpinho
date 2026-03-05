import { getEnrolledCourseIds } from "@/lib/enrollment";
import { db } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, account, trigger, session }) {
      if (account?.providerAccountId) {
        token.userId = account.providerAccountId;
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
      if (account?.provider !== "google") return true;
      if (!account?.providerAccountId) return true;
      if (!user?.email) return true;

      const userRef = doc(db, "users", account.providerAccountId);

      try {
        const userDoc = await getDoc(userRef);

        const payload = {
          name: user.name ?? null,
          email: user.email.toLowerCase(),
          image: user.image ?? null,
          provider: account.provider,
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