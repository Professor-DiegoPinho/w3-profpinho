import { requireAdmin } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { authorized, response } = await requireAdmin();

    if (!authorized) {
      return response;
    }

    // Parse form data
    const formData = await request.formData();
    const userId = formData.get("userId");
    const submissionId = formData.get("submissionId");
    const attemptIndex = parseInt(formData.get("attemptIndex"), 10);
    const courseSlug = formData.get("courseSlug");
    const action = formData.get("action");
    const evaluationFeedback = formData.get("evaluationFeedback");

    if (!userId || !submissionId || attemptIndex === null || !courseSlug || !action) {
      return NextResponse.json(
        { error: "Parâmetros inválidos" },
        { status: 400 }
      );
    }

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Ação inválida" },
        { status: 400 }
      );
    }

    // Get submissions subcollection
    const submissionRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("submissions")
      .doc(submissionId);

    // Get the submission document safely
    const submissionDoc = await submissionRef.get();

    if (!submissionDoc.exists) {
      return NextResponse.json(
        { error: "Submissão não encontrada" },
        { status: 404 }
      );
    }

    const submissionData = submissionDoc.data();
    const attempts = Array.isArray(submissionData.attempts)
      ? submissionData.attempts
      : [];

    if (attemptIndex < 0 || attemptIndex >= attempts.length) {
      return NextResponse.json(
        { error: "Índice de tentativa inválido" },
        { status: 400 }
      );
    }

    // Update only the specific attempt
    const updatedAttempts = [...attempts];
    updatedAttempts[attemptIndex] = {
      ...updatedAttempts[attemptIndex],
      status: action === "approve" ? "approved" : "rejected",
      evaluatedAt: new Date(),
    };

    // Adicionar feedback se foi preenchido
    if (evaluationFeedback && typeof evaluationFeedback === "string" && evaluationFeedback.trim().length > 0) {
      updatedAttempts[attemptIndex].evaluationFeedback = evaluationFeedback.trim();
    }

    await submissionRef.update({
      attempts: updatedAttempts,
    });

    // Redirect back to submissions page to see updated status
    return NextResponse.redirect(
      new URL("/admin/submissoes", request.url),
      { status: 303 }
    );
  } catch (error) {
    console.error("Erro ao avaliar submissão:", error);
    return NextResponse.json(
      { error: "Erro ao avaliar submissão" },
      { status: 500 }
    );
  }
}
