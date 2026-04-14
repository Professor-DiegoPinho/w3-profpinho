import { courses } from "@/data/courses";
import { requireAdmin } from "@/lib/adminAuth";
import { createCertificate } from "@/lib/certificates";
import { adminDb } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { authorized, response: authResponse } = await requireAdmin();

    if (!authorized) {
      return authResponse;
    }

    const body = await request.json();
    const { userId, courseSlug, generationMethod = "automatic" } = body;

    if (!userId || !courseSlug) {
      return NextResponse.json(
        { error: "userId e courseSlug são obrigatórios" },
        { status: 400 }
      );
    }

    // Obter dados do usuário
    const userDoc = await adminDb.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const studentName = userData.name || "Aluno";

    // Obter dados do curso
    const course = courses.find((c) => c.slug === courseSlug);
    if (!course) {
      return NextResponse.json(
        { error: "Curso não encontrado" },
        { status: 404 }
      );
    }

    // Criar certificado
    const certificate = await createCertificate(userId, {
      studentName,
      courseSlug,
      courseName: course.title,
      workloadHours: course.workloadHours,
      submissionId: body.submissionId || null,
    });

    return NextResponse.json(
      {
        success: true,
        certificate,
        message: `Certificado gerado com sucesso para ${studentName}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao gerar certificado pelo admin:", error);
    return NextResponse.json(
      { error: "Erro ao gerar certificado", details: error.message },
      { status: 500 }
    );
  }
}
