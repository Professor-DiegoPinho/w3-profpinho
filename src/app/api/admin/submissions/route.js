import { requireAdmin } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { authorized, response } = await requireAdmin();

    if (!authorized) {
      return response;
    }

    const submissions = [];
    const usersSnapshot = await adminDb.collection("users").get();

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const submissionsSnapshot = await userDoc.ref
        .collection("submissions")
        .get();

      for (const submissionDoc of submissionsSnapshot.docs) {
        const submissionData = submissionDoc.data();
        const attempts = Array.isArray(submissionData.attempts)
          ? submissionData.attempts
          : [];

        if (attempts.length > 0) {
          submissions.push({
            userId: userDoc.id,
            userName: userData.name || null,
            userEmail: userData.email || null,
            courseSlug: submissionData.courseSlug,
            totalAttempts: attempts.length,
            lastSubmittedAt: submissionData.lastSubmittedAt,
            attempts: attempts.map((attempt) => ({
              id: attempt.id,
              url: attempt.url,
              platform: attempt.platform,
              submittedAt: attempt.submittedAt,
            })),
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: submissions,
      count: submissions.length,
    });
  } catch (error) {
    console.error("Erro ao buscar submissões:", error);
    return NextResponse.json(
      { error: "Erro ao buscar submissões" },
      { status: 500 }
    );
  }
}
