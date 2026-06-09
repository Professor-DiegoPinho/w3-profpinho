import { adminDb } from "@/lib/firebaseAdmin";
import { convertTimestamp } from "./format";

export function serializeAttempt(attempt) {
  if (!attempt) return null;
  
  return {
    id: attempt.id ?? null,
    url: attempt.url ?? null,
    platform: attempt.platform ?? null,
    feedback: attempt.feedback ?? null,
    submittedAt: convertTimestamp(attempt.submittedAt),
    status: attempt.status ?? null,
    evaluationFeedback: attempt.evaluationFeedback ?? null,
    evaluatedAt: convertTimestamp(attempt.evaluatedAt),
  };
}

export async function getSubmissions() {
  try {
    const attempts = [];
    const usersSnapshot = await adminDb.collection("users").get();

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const submissionsSnapshot = await userDoc.ref
        .collection("submissions")
        .get();

      for (const submissionDoc of submissionsSnapshot.docs) {
        const submissionData = submissionDoc.data();
        const submissionAttempts = Array.isArray(submissionData.attempts)
          ? submissionData.attempts
          : [];

        submissionAttempts.forEach((attempt, attemptIndex) => {
          attempts.push({
            userId: userDoc.id,
            submissionId: submissionDoc.id,
            attemptIndex: attemptIndex,
            userName: userData.name || "N/A",
            courseSlug: submissionData.courseSlug,
            attempt: serializeAttempt(attempt),
            attemptNumber: attemptIndex + 1,
            totalAttempts: submissionAttempts.length,
          });
        });
      }
    }

    return attempts.sort((a, b) => {
      const aTime = new Date(a.attempt?.submittedAt || 0).getTime();
      const bTime = new Date(b.attempt?.submittedAt || 0).getTime();
      return bTime - aTime;
    });
  } catch (error) {
    console.error("Erro ao buscar submissões:", error);
    return [];
  }
}
