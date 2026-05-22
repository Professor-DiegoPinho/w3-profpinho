import { auth } from "@/auth";
import { adminDb } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  const { userId } = await params;

  // Verificar se o usuário está tentando atualizar seu próprio perfil
  if (session.user.id !== userId) {
    return NextResponse.json(
      { error: "Não autorizado para atualizar este perfil" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { name } = body;

    // Validar se o nome foi fornecido
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Nome é obrigatório e deve ser uma string" },
        { status: 400 }
      );
    }

    // Trim whitespace e validar tamanho mínimo
    const sanitizedName = name.trim();

    if (sanitizedName.length < 3) {
      return NextResponse.json(
        { error: "Nome deve ter no mínimo 3 caracteres" },
        { status: 400 }
      );
    }

    if (sanitizedName.length > 200) {
      return NextResponse.json(
        { error: "Nome deve ter no máximo 200 caracteres" },
        { status: 400 }
      );
    }

    // Atualizar nome no Firestore
    await adminDb.collection("users").doc(userId).update({
      name: sanitizedName,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      name: sanitizedName,
      // Signal que o cliente deve atualizar a sessão
      requireSessionUpdate: true,
    });
  } catch (error) {
    console.error("Erro ao atualizar nome do usuário:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar nome do usuário" },
      { status: 500 }
    );
  }
}
