import { adminDb } from "@/lib/firebaseAdmin";
import "./submissoes.css";

export const dynamic = 'force-dynamic';

function serializeAttempt(attempt) {
  if (!attempt) return null;
  
  function convertTimestamp(value) {
    if (!value) return null;
    
    if (typeof value?.toDate === "function") {
      return value.toDate().toISOString();
    }
    
    const date = value instanceof Date ? value : new Date(value);
    return isNaN(date.getTime()) ? null : date.toISOString();
  }
  
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

async function getSubmissions() {
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

function formatDate(timestamp) {
  if (!timestamp) return "—";
  
  let date;
  if (typeof timestamp === "string") {
    date = new Date(timestamp);
  } else if (typeof timestamp?.toDate === "function") {
    date = timestamp.toDate();
  } else if (typeof timestamp === "number") {
    date = new Date(timestamp);
  } else {
    return "—";
  }

  if (isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatOrdinal(num) {
  return `${num}ª`;
}

export default async function SubmissoesPage() {
  const allAttempts = await getSubmissions();

  return (
    <div className="admin-submissoes-container">
      <h1 className="admin-submissoes-title">Submissões de Projetos</h1>

      <div className="admin-submissoes-table-wrapper">
        <table className="admin-submissoes-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Curso</th>
              <th>Tentativa</th>
              <th>Data de Submissão</th>
              <th>Link</th>
              <th>Avaliar</th>
            </tr>
          </thead>
          <tbody>
            {allAttempts.length > 0 ? (
              allAttempts.map((item) => {
                const modalId = `modal-${item.userId}-${item.submissionId}-${item.attemptIndex}`;
                return (
                  <tr key={modalId}>
                    <td>{item.userName}</td>
                    <td>{item.courseSlug}</td>
                    <td>{formatOrdinal(item.attemptNumber)}</td>
                    <td>{formatDate(item.attempt?.submittedAt)}</td>
                    <td>
                      <a
                        href={item.attempt?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-link-button"
                        title="Acessar link da submissão"
                      >
                        <svg
                          className="admin-link-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </td>
                    <td>
                      {item.attempt?.status && item.attempt.status !== "pending" ? (
                        <span className={`admin-status-badge admin-status-${item.attempt.status}`}>
                          {item.attempt.status === "approved" ? "✓ Aprovado" : "✕ Reprovado"}
                        </span>
                      ) : (
                        <a href={`#${modalId}`} className="admin-evaluate-button">
                          <svg
                            className="admin-evaluate-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Avaliar
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="admin-submissoes-empty-cell">
                  Nenhuma submissão encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de avaliação */}
      {allAttempts.map((item) => {
        const modalId = `modal-${item.userId}-${item.submissionId}-${item.attemptIndex}`;
        return (
          <div key={`dialog-${modalId}`} id={modalId} className="admin-modal">
            <div className="admin-modal-bg"></div>
            <div className="admin-modal-content">
              <h2 className="admin-modal-title">Avaliar Submissão</h2>
              
              <div className="admin-modal-info">
                <p><strong>Usuário:</strong> {item.userName}</p>
                <p><strong>Curso:</strong> {item.courseSlug}</p>
                <p><strong>Tentativa:</strong> {formatOrdinal(item.attemptNumber)}</p>
                <p><strong>Data:</strong> {formatDate(item.attempt?.submittedAt)}</p>
                <p>
                  <strong>Link:</strong>{" "}
                  <a
                    href={item.attempt?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-modal-link"
                  >
                    {item.attempt?.url}
                  </a>
                </p>
              </div>

              {item.attempt?.feedback && (
                <div className="admin-modal-student-feedback">
                  <h3 className="admin-modal-feedback-title">Feedback do Aluno</h3>
                  <p className="admin-modal-feedback-text">{item.attempt.feedback}</p>
                </div>
              )}

              <div className="admin-modal-actions">
                <form action="/api/admin/evaluate" method="POST" style={{ width: "100%" }}>
                  <input type="hidden" name="userId" value={item.userId} />
                  <input type="hidden" name="submissionId" value={item.submissionId} />
                  <input type="hidden" name="attemptIndex" value={item.attemptIndex} />
                  <input type="hidden" name="courseSlug" value={item.courseSlug} />
                  
                  <div className="admin-modal-feedback-group">
                    <label htmlFor={`feedback-${item.userId}-${item.submissionId}`} className="admin-modal-feedback-label">
                      Comentários sobre a avaliação (opcional)
                    </label>
                    <textarea
                      id={`feedback-${item.userId}-${item.submissionId}`}
                      name="evaluationFeedback"
                      className="admin-modal-feedback-textarea"
                      rows="4"
                      placeholder="Digite seus comentários sobre o projeto entregue..."
                    ></textarea>
                  </div>
                  
                  <div className="admin-modal-button-group">
                    <button
                      type="submit"
                      name="action"
                      value="approve"
                      className="admin-modal-btn admin-modal-btn-approve"
                    >
                      ✓ Aprovar
                    </button>
                    <button
                      type="submit"
                      name="action"
                      value="reject"
                      className="admin-modal-btn admin-modal-btn-reject"
                    >
                      ✕ Reprovar
                    </button>
                  </div>
                </form>
              </div>

              <a href="#" className="admin-modal-close">
                ✕
              </a>
            </div>
          </div>
        );
      })}

      <p className="admin-submissoes-info">
        Total: {allAttempts.length} tentativas submetidas
      </p>
    </div>
  );
}
