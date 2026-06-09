import { adminDb } from "@/lib/firebaseAdmin";
import { convertTimestamp } from "./format";

export async function getFeedbacksStats() {
  try {
    const feedbacksSnapshot = await adminDb.collection("courseFeedback").get();

    // Agrupar feedbacks por curso
    const statsByCourse = {};

    feedbacksSnapshot.forEach((doc) => {
      const feedbackData = doc.data();
      const courseSlug = feedbackData.courseSlug;

      if (!courseSlug) return;

      if (!statsByCourse[courseSlug]) {
        statsByCourse[courseSlug] = {
          courseSlug,
          totalFeedbacks: 0,
          npsScores: [],
          totalByCategory: {
            detrator: 0,
            neutro: 0,
            promoter: 0,
          },
        };
      }

      statsByCourse[courseSlug].totalFeedbacks += 1;
      statsByCourse[courseSlug].npsScores.push(feedbackData.npsScore || 0);

      // Categorizar por NPS
      const nps = feedbackData.npsScore || 0;
      if (nps <= 6) {
        statsByCourse[courseSlug].totalByCategory.detrator += 1;
      } else if (nps <= 8) {
        statsByCourse[courseSlug].totalByCategory.neutro += 1;
      } else {
        statsByCourse[courseSlug].totalByCategory.promoter += 1;
      }
    });

    // Calcular NPS médio para cada curso
    const stats = Object.values(statsByCourse).map((stat) => {
      const avgNps =
        stat.npsScores.length > 0
          ? (stat.npsScores.reduce((a, b) => a + b, 0) / stat.npsScores.length).toFixed(1)
          : 0;

      return {
        courseSlug: stat.courseSlug,
        totalFeedbacks: stat.totalFeedbacks,
        avgNps,
        totalByCategory: stat.totalByCategory,
      };
    });

    return { data: stats };
  } catch (error) {
    console.error("Erro ao buscar stats:", error);
    return { data: [] };
  }
}

export async function getCourses() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/sidebar`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar cursos");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return [];
  }
}

export async function getCourseTitle(courseSlug) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/sidebar`, {
      cache: "no-store",
    });

    if (!response.ok) return courseSlug;

    const courses = await response.json();
    const course = courses.find((c) => c.category === courseSlug);
    return course?.title || courseSlug;
  } catch (error) {
    console.error("Erro ao buscar título do curso:", error);
    return courseSlug;
  }
}

export async function getCourseFeedbacks(courseSlug) {
  try {
    const feedbacks = [];
    const feedbacksSnapshot = await adminDb
      .collection("courseFeedback")
      .where("courseSlug", "==", courseSlug)
      .get();

    // Buscar dados de usuários em paralelo para otimizar
    const userCache = {};

    for (const feedbackDoc of feedbacksSnapshot.docs) {
      const feedbackData = feedbackDoc.data();
      const userId = feedbackData.userId;

      // Buscar dados do usuário (com cache)
      let userData = userCache[userId];
      if (!userData) {
        try {
          const userDoc = await adminDb.collection("users").doc(userId).get();
          userData = userDoc.exists ? userDoc.data() : {};
          userCache[userId] = userData;
        } catch (error) {
          console.error(`Erro ao buscar usuário ${userId}:`, error);
          userData = {};
          userCache[userId] = userData;
        }
      }

      feedbacks.push({
        id: feedbackDoc.id,
        userId: userId,
        userName: userData.name || "Usuário Desconhecido",
        userEmail: userData.email || null,
        courseSlug: feedbackData.courseSlug,
        npsScore: feedbackData.npsScore,
        answers: feedbackData.answers || {},
        questionComments: feedbackData.questionComments || {},
        comment: feedbackData.comment || "",
        respondedAt: convertTimestamp(feedbackData.respondedAt),
      });
    }

    // Ordenar por data mais recente
    feedbacks.sort((a, b) => {
      const aTime = new Date(a.respondedAt || 0).getTime();
      const bTime = new Date(b.respondedAt || 0).getTime();
      return bTime - aTime;
    });

    return feedbacks;
  } catch (error) {
    console.error("Erro ao buscar feedbacks:", error);
    return [];
  }
}

