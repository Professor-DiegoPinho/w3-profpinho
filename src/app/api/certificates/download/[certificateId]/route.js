import { auth } from "@/auth";
import { isUserAdmin } from "@/lib/adminAuth";
import { adminDb, adminStorage } from "@/lib/firebaseAdmin";
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

    // Verificar permissão usando banco de dados para admin (mais seguro que a sessão NextAuth expirada)
    const isAdmin = session?.user?.id ? await isUserAdmin(session.user.id) : false;

    if (session?.user?.id !== certificateOwnerId && !isAdmin) {
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

    // Fazer download do PDF do Firebase Storage diretamente via SDK
    try {
      const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
      const bucket = adminStorage.bucket(bucketName);
      const file = bucket.file(`certificates/${certificateId}.pdf`);

      const [exists] = await file.exists();
      if (!exists) {
        return NextResponse.json(
          { error: "Arquivo do certificado não encontrado no Storage" },
          { status: 404 }
        );
      }

      const [pdfBuffer] = await file.download();

      // Retornar PDF com headers corretos para download
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="certificado-${certificateId}.pdf"`,
          "Cache-Control": "private, no-store",
        },
      });
    } catch (storageError) {
      console.error("Erro ao baixar PDF do Storage:", storageError);
      return NextResponse.json(
        { error: "Erro ao buscar PDF do Storage", details: storageError.message },
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
