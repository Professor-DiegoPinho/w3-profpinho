import { adminDb } from "@/lib/firebaseAdmin";
import { convertTimestamp } from "./format";

export async function getUsers() {
  try {
    const usersSnapshot = await adminDb.collection("users").get();
    const users = [];

    for (const doc of usersSnapshot.docs) {
      const data = doc.data();
      users.push({
        userId: doc.id,
        name: data.name || "N/A",
        email: data.email || "N/A",
        createdAt: convertTimestamp(data.createdAt),
        lastLoginAt: convertTimestamp(data.lastLoginAt),
      });
    }

    return users.sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
}
