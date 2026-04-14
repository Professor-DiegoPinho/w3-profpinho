import { auth } from "@/auth";
import { adminDb } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    // Em Next.js 16, params pode ser uma Promise
    const resolvedParams = await Promise.resolve(params);
    const courseSlug = resolvedParams?.courseSlug;

    if (!courseSlug) {
      return NextResponse.json(
        { error: "courseSlug é obrigatório" },
        { status: 400 }
      );
    }

    // Buscar certificado usando adminDb
    const certificatesRef = adminDb
      .collection("users")
      .doc(session.user.id)
      .collection("certificates");

    const snapshot = await certificatesRef
      .where("courseSlug", "==", courseSlug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(null, { status: 200 });
    }

    const doc = snapshot.docs[0];
    const certData = doc.data();
    
    const certificate = {
      id: doc.id,
      certificateId: certData.certificateId,
      studentName: certData.studentName,
      courseSlug: certData.courseSlug,
      courseName: certData.courseName,
      workloadHours: certData.workloadHours,
      generatedAt: certData.generatedAt?.toDate?.() || certData.generatedAt,
      submissionId: certData.submissionId,
      validatedCount: certData.validatedCount,
    };

    return NextResponse.json(certificate, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar certificado por curso:", error);
    return NextResponse.json(
      { error: "Erro ao buscar certificado", details: error.message },
      { status: 500 }
    );
  }
}
