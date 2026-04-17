import { auth } from "@/auth";
import { adminDb } from "@/lib/firebaseAdmin";
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

    // 1️⃣ Usar índice na coleção raiz para encontrar o usuário (1 leitura rápida)
    const certIndexSnap = await adminDb
      .collection("certificates")
      .doc(certificateId)
      .get();

    if (!certIndexSnap.exists) {
      return NextResponse.json(
        { error: "Certificado não encontrado" },
        { status: 404 }
      );
    }

    const { userId: certificateOwnerId } = certIndexSnap.data();

    // 2️⃣ Buscar dados completos do certificado
    const certSnap = await adminDb
      .collection("users")
      .doc(certificateOwnerId)
      .collection("certificates")
      .doc(certificateId)
      .get();

    if (!certSnap.exists) {
      return NextResponse.json(
        { error: "Certificado não encontrado" },
        { status: 404 }
      );
    }

    const certificate = certSnap.data();

    // Verificar permissão: o usuário só pode baixar seu próprio certificado (ou admin)
    if (session?.user?.id !== certificateOwnerId && session?.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Sem permissão para acessar este certificado" },
        { status: 403 }
      );
    }

    // Verificar se o PDF foi gerado e salvo no Storage
    if (!certificate.pdfUrl) {
      return NextResponse.json(
        { error: "PDF do certificado ainda não foi gerado" },
        { status: 404 }
      );
    }

    // Fazer proxy do PDF do Firebase Storage para evitar CORS
    try {
      const pdfResponse = await fetch(certificate.pdfUrl);
      
      if (!pdfResponse.ok) {
        return NextResponse.json(
          { error: "Erro ao buscar PDF do Storage" },
          { status: pdfResponse.status }
        );
      }

      const pdfBuffer = await pdfResponse.arrayBuffer();

      // Retornar PDF com headers corretos para download
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="certificado-${certificateId}.pdf"`,
          "Cache-Control": "private, no-store",
        },
      });
    } catch (fetchError) {
      console.error("Erro ao fazer fetch do PDF:", fetchError);
      return NextResponse.json(
        { error: "Erro ao buscar PDF do Storage", details: fetchError.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro ao baixar certificado:", error.message);
    return NextResponse.json(
      { error: "Erro ao baixar certificado", details: error.message },
      { status: 500 }
    );
  }
}
