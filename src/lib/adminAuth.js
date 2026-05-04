import { adminDb } from "@/lib/firebaseAdmin";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Verifica se um usuário é admin a partir do seu userId
 * Segunda camada de verificação além do proxy
 * @param {string} userId - ID do usuário
 * @returns {boolean} - true se o usuário é admin, false caso contrário
 */
export async function isUserAdmin(userId) {
  if (!userId || typeof userId !== "string") {
    return false;
  }

  try {
    const userDoc = await adminDb.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return false;
    }

    const role = userDoc.data()?.role;
    return role === "admin";
  } catch (error) {
    console.error("Erro ao verificar permissão de admin:", error);
    return false;
  }
}

/**
 * Middleware para verificar autenticação e permissão de admin em rotas
 * @returns {object} - { authorized: boolean, response: NextResponse|null }
 */
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      ),
    };
  }

  const isAdmin = await isUserAdmin(session.user.id);

  if (!isAdmin) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Acesso negado" },
        { status: 403 }
      ),
    };
  }

  return { authorized: true, response: null };
}
