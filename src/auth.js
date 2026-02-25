import { db } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
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
        }

        await setDoc(userRef, payload, { merge: true });
      } catch (error) {
        console.error("Erro ao salvar usuário no Firestore:", error);
      }

      return true;
    },
  },
});