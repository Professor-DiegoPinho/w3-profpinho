import { formatDate, formatDateOnly } from "../utils/dateFormatter";
import { getStatusIcon, getStatusText } from "../utils/statusHelpers";

export function DetailsModal({
  isOpen,
  submission,
  onClose,
}) {
  if (!isOpen || !submission) return null;

  return (
    <div className="project-submission-details-overlay">
      <div className="project-submission-details-modal">
        <div className="project-submission-details-header">
          <h3 className="project-submission-details-title">
            Detalhes da Entrega
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="project-submission-details-close"
            aria-label="Fechar modal de detalhes"
          >
            ✕
          </button>
        </div>

        <div className="project-submission-details-content">
          <div className="project-submission-details-section">
            <h4 className="project-submission-details-section-title">Status</h4>
            <div className={`project-submission-details-status project-submission-details-status-${submission.status}`}>
              <span className="project-submission-details-status-icon">
                {getStatusIcon(submission.status)}
              </span>
              <span className="project-submission-details-status-text">
                {getStatusText(submission.status)}
              </span>
            </div>
          </div>

          <div className="project-submission-details-section">
            <h4 className="project-submission-details-section-title">Dados da Entrega</h4>
            <div className="project-submission-details-info">
              <p className="project-submission-details-info-label">Plataforma:</p>
              <p className="project-submission-details-info-value">{submission.platform}</p>
            </div>
            <div className="project-submission-details-info">
              <p className="project-submission-details-info-label">Data da entrega:</p>
              <p className="project-submission-details-info-value">{formatDate(submission.submittedAt)}</p>
            </div>
            <div className="project-submission-details-info">
              <p className="project-submission-details-info-label">Link do projeto:</p>
              <a
                href={submission.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-submission-details-link"
              >
                {submission.url}
              </a>
            </div>
          </div>

          {submission.feedback && (
            <div className="project-submission-details-section">
              <h4 className="project-submission-details-section-title">Seu feedback</h4>
              <p className="project-submission-details-feedback">
                {submission.feedback}
              </p>
            </div>
          )}

          {submission.status !== "pending" && submission.evaluationFeedback && (
            <div className="project-submission-details-section project-submission-details-section-evaluation">
              <h4 className="project-submission-details-section-title">Feedback do Professor</h4>
              <p className="project-submission-details-feedback project-submission-details-feedback-evaluation">
                {submission.evaluationFeedback}
              </p>
              {submission.evaluatedAt && (
                <p className="project-submission-details-evaluated-date">
                  Avaliado em: {formatDateOnly(submission.evaluatedAt)}
                </p>
              )}
            </div>
          )}

          {submission.status === "pending" && (
            <div className="project-submission-details-pending-note">
              <p>⏳ Esta entrega está em análise e aguarda avaliação do professor.</p>
            </div>
          )}
        </div>

        <div className="project-submission-details-actions">
          <button
            type="button"
            onClick={onClose}
            className="project-submission-details-btn"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
