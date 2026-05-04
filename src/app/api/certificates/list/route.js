import { auth } from "@/auth";
import { adminDb } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    // Buscar certificados usando adminDb (sem problemas de permissão)
    const certificatesRef = adminDb
      .collection("users")
      .doc(session.user.id)
      .collection("certificates");

    const snapshot = await certificatesRef
      .orderBy("generatedAt", "desc")
      .get();

    const certificates = [];
    snapshot.forEach((doc) => {
      const certData = doc.data();
      certificates.push({
        id: doc.id,
        certificateId: certData.certificateId,
        studentName: certData.studentName,
        courseSlug: certData.courseSlug,
        courseName: certData.courseName,
        workloadHours: certData.workloadHours,
        generatedAt: certData.generatedAt?.toDate?.() || certData.generatedAt,
        submissionId: certData.submissionId,
        validatedCount: certData.validatedCount,
      });
    });

    return NextResponse.json(certificates, { status: 200 });
  } catch (error) {
    console.error("Erro ao listar certificados:", error);
    return NextResponse.json(
      { error: "Erro ao listar certificados", details: error.message },
      { status: 500 }
    );
  }
}
