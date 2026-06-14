import { adminDb } from "@/lib/firebaseAdmin";

export async function getTotalUsers() {
  try {
    const usersSnapshot = await adminDb.collection("users").count().get();
    return usersSnapshot.data().count;
  } catch (error) {
    console.error("Erro ao contar usuários:", error);
    return 0;
  }
}

export async function getSubmissionStats() {
  try {
    const usersSnapshot = await adminDb.collection("users").get();
    let totalSubmissions = 0;
    let pendingEvaluations = 0;
    let approved = 0;
    let rejected = 0;
    let totalAttempts = 0;
    const courseCounts = {};

    for (const userDoc of usersSnapshot.docs) {
      const submissionsSnapshot = await userDoc.ref
        .collection("submissions")
        .get();

      for (const submissionDoc of submissionsSnapshot.docs) {
        const submissionData = submissionDoc.data();
        const attempts = Array.isArray(submissionData.attempts)
          ? submissionData.attempts
          : [];

        totalSubmissions += attempts.length;
        totalAttempts += attempts.length;

        if (submissionData.courseSlug) {
          courseCounts[submissionData.courseSlug] =
            (courseCounts[submissionData.courseSlug] || 0) + attempts.length;
        }

        attempts.forEach((attempt) => {
          if (!attempt.status || attempt.status === "pending") {
            pendingEvaluations++;
          } else if (attempt.status === "approved") {
            approved++;
          } else if (attempt.status === "rejected") {
            rejected++;
          }
        });
      }
    }

    let topCourse = null;
    let topCourseCount = 0;
    for (const [course, count] of Object.entries(courseCounts)) {
      if (count > topCourseCount) {
        topCourseCount = count;
        topCourse = { name: course, count };
      }
    }

    return {
      total: totalSubmissions,
      pending: pendingEvaluations,
      approved: approved,
      rejected: rejected,
      averageAttemptsPerUser:
        usersSnapshot.size > 0
          ? (totalSubmissions / usersSnapshot.size).toFixed(1)
          : 0,
      topCourse: topCourse,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas de submissões:", error);
    return {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      averageAttemptsPerUser: 0,
      topCourse: null,
    };
  }
}

export async function getRecentActivity() {
  try {
    const recentUsers = [];
    const usersSnapshot = await adminDb
      .collection("users")
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();

    if (usersSnapshot.empty) {
      return [];
    }

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      recentUsers.push({
        name: userData.name || "Usuário",
        createdAt: userData.createdAt,
      });
    }

    return recentUsers;
  } catch (error) {
    console.error("Erro ao buscar atividade recente:", error);
    return [];
  }
}
