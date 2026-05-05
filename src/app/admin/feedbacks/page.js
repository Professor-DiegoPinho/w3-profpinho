import { adminDb } from "@/lib/firebaseAdmin";
import Link from "next/link";
import "./feedbacks-list.css";

async function getFeedbacksStats() {
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

async function getCourses() {
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

export default async function FeedbacksListPage() {
  const [statsData, coursesData] = await Promise.all([
    getFeedbacksStats(),
    getCourses(),
  ]);

  // Mapear stats por courseSlug
  const stats = {};
  statsData.data?.forEach((stat) => {
    stats[stat.courseSlug] = stat;
  });

  // Filtrar apenas cursos que têm feedbacks
  const coursesWithFeedback = coursesData.filter((course) =>
    stats[course.category]
  );

  // Calcular estatísticas gerais
  const totalFeedbacks = Object.values(stats).reduce(
    (sum, stat) => sum + (stat.totalFeedbacks || 0),
    0
  );

  const allNpsScores = [];
  Object.values(stats).forEach((stat) => {
    for (let i = 0; i < stat.totalFeedbacks; i++) {
      allNpsScores.push(parseFloat(stat.avgNps) || 0);
    }
  });
  const overallNps =
    allNpsScores.length > 0
      ? (allNpsScores.reduce((a, b) => a + b, 0) / allNpsScores.length).toFixed(1)
      : "N/A";

  return (
    <div className="admin-feedbacks-list-container">
      <div className="admin-feedbacks-list-header">
        <h1 className="admin-feedbacks-list-title">Feedbacks dos Cursos</h1>
      </div>

      {/* Estatísticas Gerais */}
      <div className="admin-feedbacks-list-stats">
        <div className="admin-feedbacks-list-stat-card">
          <div className="admin-feedbacks-list-stat-label">Total de Feedbacks</div>
          <div className="admin-feedbacks-list-stat-value">{totalFeedbacks}</div>
        </div>
        <div className="admin-feedbacks-list-stat-card">
          <div className="admin-feedbacks-list-stat-label">NPS Geral</div>
          <div className="admin-feedbacks-list-stat-value">{overallNps}</div>
        </div>
        <div className="admin-feedbacks-list-stat-card">
          <div className="admin-feedbacks-list-stat-label">Cursos com Feedback</div>
          <div className="admin-feedbacks-list-stat-value">{coursesWithFeedback.length}</div>
        </div>
      </div>

      {/* Lista de Cursos */}
      {coursesWithFeedback.length === 0 ? (
        <div className="admin-feedbacks-list-empty">
          Nenhum curso com feedbacks ainda
        </div>
      ) : (
        <div className="admin-feedbacks-list-grid">
          {coursesWithFeedback.map((course) => {
            const courseStats = stats[course.category] || {
              totalFeedbacks: 0,
              avgNps: 0,
              totalByCategory: { detrator: 0, neutro: 0, promoter: 0 },
            };

            const npsColor =
              courseStats.avgNps >= 9
                ? "promoter"
                : courseStats.avgNps >= 7
                ? "passive"
                : "detractor";

            return (
              <Link
                key={course.category}
                href={`/admin/feedbacks/${course.category}`}
                className="admin-feedbacks-list-card"
              >
                <div className="admin-feedbacks-list-card-header">
                  <h3 className="admin-feedbacks-list-card-title">{course.title}</h3>
                  <div className={`admin-feedbacks-list-nps-badge ${npsColor}`}>
                    {courseStats.avgNps}
                  </div>
                </div>

                <div className="admin-feedbacks-list-card-stats">
                  <div className="admin-feedbacks-list-card-stat">
                    <span className="admin-feedbacks-list-card-stat-label">
                      Total
                    </span>
                    <span className="admin-feedbacks-list-card-stat-value">
                      {courseStats.totalFeedbacks}
                    </span>
                  </div>

                  <div className="admin-feedbacks-list-card-stat">
                    <span className="admin-feedbacks-list-card-stat-label">
                      Promotores
                    </span>
                    <span className="admin-feedbacks-list-card-stat-value promoter">
                      {courseStats.totalByCategory.promoter}
                    </span>
                  </div>

                  <div className="admin-feedbacks-list-card-stat">
                    <span className="admin-feedbacks-list-card-stat-label">
                      Neutros
                    </span>
                    <span className="admin-feedbacks-list-card-stat-value passive">
                      {courseStats.totalByCategory.neutro}
                    </span>
                  </div>

                  <div className="admin-feedbacks-list-card-stat">
                    <span className="admin-feedbacks-list-card-stat-label">
                      Detratores
                    </span>
                    <span className="admin-feedbacks-list-card-stat-value detractor">
                      {courseStats.totalByCategory.detrator}
                    </span>
                  </div>
                </div>

                <div className="admin-feedbacks-list-card-arrow">→</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

