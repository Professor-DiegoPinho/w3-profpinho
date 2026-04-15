import { auth } from "@/auth";
import { adminDb } from "@/lib/firebaseAdmin";
import { generateCertificatePDF } from "@/lib/pdf-generator";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // Em Next.js 16, params pode ser uma Promise
    const resolvedParams = await Promise.resolve(params);
    const certificateId = resolvedParams?.certificateId;

    if (!certificateId) {
      return NextResponse.json(
        { error: "ID do certificado não fornecido" },
        { status: 400 }
      );
    }

    // Obter sessão do usuário
    const session = await auth();

    // Buscar em todos os usuários esse certificado (necessário para saber de quem é)
    const usersRef = adminDb.collection("users");
    const usersSnap = await usersRef.get();

    let certificate = null;
    let foundUserId = null;

    for (const userDoc of usersSnap.docs) {
      const certsRef = userDoc.ref.collection("certificates");
      const certQuery = certsRef.where("certificateId", "==", certificateId);
      const certSnap = await certQuery.get();

      if (!certSnap.empty) {
        certificate = certSnap.docs[0].data();
        foundUserId = userDoc.id;
        break;
      }
    }

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificado não encontrado" },
        { status: 404 }
      );
    }

    // Verificar permissão: o usuário só pode baixar seu próprio certificado (ou admin)
    if (session?.user?.id !== foundUserId && session?.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Sem permissão para acessar este certificado" },
        { status: 403 }
      );
    }

    // Gerar PDF
    const pdfBuffer = await generateCertificatePDF({
      studentName: certificate.studentName,
      courseName: certificate.courseName,
      workloadHours: certificate.workloadHours,
      certificateId: certificate.certificateId,
      generatedAt: certificate.generatedAt?.toDate?.() || certificate.generatedAt,
    });

    // Retornar PDF para download
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="certificado-${certificate.certificateId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Erro ao baixar certificado:", error.message);
    return NextResponse.json(
      { error: "Erro ao gerar certificado", details: error.message },
      { status: 500 }
    );
  }
}
