import { courses } from "@/data/courses";
import { requireAdmin } from "@/lib/adminAuth";
import { createCertificate, getCertificateByOrCourse, updateCertificatePdfUrl, uploadCertificatePDF } from "@/lib/certificates";
import { adminDb } from "@/lib/firebaseAdmin";
import { generateCertificatePDF } from "@/lib/pdf-generator";
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

    // Verificar se já existe certificado para este curso
    const existingCert = await getCertificateByOrCourse(userId, courseSlug);
    if (existingCert) {
      return NextResponse.json(
        {
          success: false,
          error: "Certificado para este curso já existe",
          certificateId: existingCert.certificateId,
        },
        { status: 409 }
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

    console.log(`✓ Certificado criado: ${certificate.certificateId}`);

    // Gerar PDF
    const pdfBuffer = await generateCertificatePDF({
      studentName,
      courseName: course.title,
      workloadHours: course.workloadHours,
      certificateId: certificate.certificateId,
      generatedAt: certificate.generatedAt?.toDate?.() || certificate.generatedAt,
    });

    console.log(`✓ PDF gerado com sucesso, tamanho: ${pdfBuffer.length} bytes`);

    // Fazer upload do PDF para Firebase Storage
    const pdfUrl = await uploadCertificatePDF(pdfBuffer, certificate.certificateId);
    console.log(`✓ Upload do PDF concluído: ${pdfUrl}`);

    // Atualizar certificado com a URL do PDF
    await updateCertificatePdfUrl(userId, certificate.certificateId, pdfUrl);
    console.log(`✓ Certificado atualizado com URL do PDF`);

    console.log(`✓ Certificado gerado para ${studentName} - ${course.title}`);

    return NextResponse.json(
      {
        success: true,
        certificate: {
          certificateId: certificate.certificateId,
          studentName,
          courseName: course.title,
          workloadHours: course.workloadHours,
          pdfUrl,
          generatedAt: certificate.generatedAt,
        },
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
