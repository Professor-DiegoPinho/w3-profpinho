import { requireAdmin } from "@/lib/adminAuth";
import { createCertificate, getCertificateByOrCourse, updateCertificatePdfUrl, uploadCertificatePDF } from "@/lib/certificates";
import { generateCertificatePDF } from "@/lib/pdf-generator";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { authorized, response } = await requireAdmin();

    if (!authorized) {
      return response;
    }

    const body = await request.json();
    const { userId, courseSlug, courseName, workloadHours, studentName, submissionId } = body;

    if (!userId || !courseSlug || !courseName || !workloadHours || !studentName) {
      return NextResponse.json(
        { error: "Parâmetros obrigatórios faltando" },
        { status: 400 }
      );
    }

    // Verificar se já existe certificado para este curso
    const existingCert = await getCertificateByOrCourse(userId, courseSlug);
    if (existingCert) {
      return NextResponse.json(
        { error: "Certificado para este curso já existe", certificateId: existingCert.id },
        { status: 400 }
      );
    }

    // Criar documento do certificado no Firestore
    const certificateData = {
      studentName,
      courseSlug,
      courseName,
      workloadHours,
      submissionId,
    };

    const certificate = await createCertificate(userId, certificateData);

    // Gerar PDF
    const pdfBuffer = await generateCertificatePDF({
      studentName,
      courseName,
      workloadHours,
      certificateId: certificate.certificateId,
      generatedAt: certificate.generatedAt?.toDate?.() || certificate.generatedAt,
    });

    // Diagnóstico do PDF
    console.log("=== DIAGNÓSTICO DO PDF ===");
    console.log("Tipo:", pdfBuffer.constructor.name);
    console.log("Tamanho:", pdfBuffer.length, "bytes");
    console.log("Primeiros bytes:", pdfBuffer.slice(0, 4).toString());
    console.log("Deve ser '%PDF' para ser válido");
    console.log("=========================");

    // Fazer upload do PDF para Firebase Storage
    const pdfUrl = await uploadCertificatePDF(pdfBuffer, certificate.certificateId);

    // Atualizar certificado com a URL do PDF
    await updateCertificatePdfUrl(userId, certificate.certificateId, pdfUrl);

    return NextResponse.json(
      {
        success: true,
        certificate: {
          certificateId: certificate.certificateId,
          studentName: certificate.studentName,
          courseName: certificate.courseName,
          workloadHours: certificate.workloadHours,
          generatedAt: certificate.generatedAt,
          pdfUrl,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao gerar certificado:", error);
    return NextResponse.json(
      { error: "Erro ao gerar certificado", details: error.message },
      { status: 500 }
    );
  }
}
