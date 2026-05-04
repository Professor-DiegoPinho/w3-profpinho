import { validateAndGetCertificate } from "@/lib/certificates";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const certificateId = searchParams.get("id");

    if (!certificateId) {
      return NextResponse.json(
        { error: "ID do certificado não fornecido" },
        { status: 400 }
      );
    }

    // Validar certificado
    const certificate = await validateAndGetCertificate(certificateId);

    if (!certificate) {
      return NextResponse.json(
        {
          valid: false,
          message: "Certificado não encontrado ou inválido",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(certificate, { status: 200 });
  } catch (error) {
    console.error("Erro ao validar certificado:", error);
    return NextResponse.json(
      { error: "Erro ao validar certificado" },
      { status: 500 }
    );
  }
}
