import { getFeedbackStats } from "@/lib/feedback";
import "./CourseFeedbackStats.css";

/**
 * Componente para exibir estatísticas públicas agregadas de feedback
 * Renderizado como server component para melhor performance
 */
export default async function CourseFeedbackStats({ courseSlug }) {
  const stats = await getFeedbackStats(courseSlug);

  if (!stats || stats.totalResponses === 0) {
    return null;
  }

  // Calcular percentual de recomendação (NPS >= 8)
  const recommendCount = Object.entries(stats.distributionNps || {})
    .filter(([nps]) => parseInt(nps) >= 8)
    .reduce((sum, [, count]) => sum + count, 0);

  const recommendationPercentage =
    stats.totalResponses > 0
      ? Math.round((recommendCount / stats.totalResponses) * 100)
      : 0;

  return (
    <div className="course-feedback-stats">
      <div className="stats-title">Avaliação do curso</div>

      <div className="stats-grid">
        {/* NPS Card */}
        <div className="stats-card">
          <div className="stats-card-value nps-value">
            {typeof stats.avgNps === "number" ? stats.avgNps.toFixed(1) : "0"}
          </div>
          <div className="stats-card-label">
            Nota média
            <span className="stats-card-sublabel">/10</span>
          </div>
        </div>

        {/* Recommendation Card */}
        <div className="stats-card">
          <div className="stats-card-value recommendation-value">
            {recommendationPercentage}
            <span className="stats-card-percent">%</span>
          </div>
          <div className="stats-card-label">
            Recomendariam
            <span className="stats-card-sublabel">o curso</span>
          </div>
        </div>

        {/* Total Responses Card */}
        <div className="stats-card">
          <div className="stats-card-value responses-value">
            {stats.totalResponses}
          </div>
          <div className="stats-card-label">
            Avaliações
            <span className="stats-card-sublabel">recebidas</span>
          </div>
        </div>
      </div>

      {/* Distribution Bar Chart */}
      {stats.distributionNps && Object.keys(stats.distributionNps).length > 0 && (
        <div className="stats-distribution">
          <div className="distribution-title">Distribuição de notas</div>
          <div className="distribution-bars">
            {Array.from({ length: 11 }, (_, i) => {
              const count = stats.distributionNps[i] || 0;
              const percentage =
                stats.totalResponses > 0
                  ? Math.round((count / stats.totalResponses) * 100)
                  : 0;

              return (
                <div key={i} className="distribution-bar-item">
                  <div
                    className="distribution-bar"
                    style={{
                      height: `${Math.max(
                        percentage,
                        percentage > 0 ? 5 : 0
                      )}px`,
                      backgroundColor: getBarColor(i),
                    }}
                    title={`${i}: ${count} ${count === 1 ? "avaliação" : "avaliações"}`}
                  />
                  <div className="distribution-bar-label">{i}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Retornar cor baseada no score NPS
 */
function getBarColor(score) {
  if (score <= 3) return "#e74c3c"; // Vermelho (detratores)
  if (score <= 6) return "#f39c12"; // Laranja (neutros)
  return "#2ecc71"; // Verde (promotores)
}
