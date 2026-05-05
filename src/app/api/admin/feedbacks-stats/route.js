import { requireAdmin } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(request) {
  try {
    const { authorized, response } = await requireAdmin();
    
    if (!authorized) {
      return response;
    }

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

    return new Response(JSON.stringify({ data: stats }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas de feedbacks:", error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
