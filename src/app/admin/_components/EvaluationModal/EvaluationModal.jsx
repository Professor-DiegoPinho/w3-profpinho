import { useState } from "react";
import { formatDate, formatOrdinal } from "../../_utils/format";
import styles from "./EvaluationModal.module.css";
import * as Icons from "@/assets/icons";

export function EvaluationModal({ attempt, onClose }) {
  const [activeTab, setActiveTab] = useState(null);

  if (!attempt) return null;

  const isEvaluated = attempt.attempt?.status && attempt.attempt.status !== "pending";
  const modalTitle = isEvaluated ? "Detalhes da Submissão" : "Avaliar Submissão";

  const hasStudentFeedback = !!attempt.attempt?.feedback;
  const hasProfessorFeedback = !!attempt.attempt?.evaluationFeedback;

  // Fechar aba se o modal for fechado ou mudar
  const handleClose = () => {
    setActiveTab(null);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalBg}></div>
      <div className={styles.modalContentWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>{modalTitle}</h2>

          <div className={styles.modalInfo}>
            <p><strong>Usuário:</strong> {attempt.userName}</p>
            <p><strong>Curso:</strong> {attempt.courseSlug}</p>
            <p><strong>Tentativa:</strong> {formatOrdinal(attempt.attemptNumber)}</p>
            <p><strong>Data de Submissão:</strong> {formatDate(attempt.attempt?.submittedAt)}</p>
            <p>
              <strong>Link:</strong>{" "}
              <a
                href={attempt.attempt?.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalLink}
              >
                {attempt.attempt?.url}
              </a>
            </p>
            {isEvaluated && (
              <>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`${styles.statusBadge} ${styles[attempt.attempt.status]}`}>
                    {attempt.attempt.status === "approved" ? "✓ Aprovado" : "✕ Reprovado"}
                  </span>
                </p>
                {attempt.attempt.evaluatedAt && (
                  <p><strong>Avaliado em:</strong> {formatDate(attempt.attempt.evaluatedAt)}</p>
                )}
              </>
            )}
          </div>

          {/* Botões para abrir abas de Feedback */}
          <div className={styles.feedbackToggleContainer}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${activeTab === "student" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(activeTab === "student" ? null : "student")}
              disabled={!hasStudentFeedback}
            >
              <Icons.Feedback className={styles.feedbackIcon} />
              Feedback do Aluno
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${activeTab === "professor" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(activeTab === "professor" ? null : "professor")}
              disabled={!hasProfessorFeedback}
            >
              <Icons.Diploma className={styles.feedbackIcon} />
              Feedback do Professor
            </button>
          </div>

          {!isEvaluated && (
            <div className={styles.modalActions}>
              <form action="/api/admin/evaluate" method="POST" style={{ width: "100%" }}>
                <input type="hidden" name="userId" value={attempt.userId} />
                <input type="hidden" name="submissionId" value={attempt.submissionId} />
                <input type="hidden" name="attemptIndex" value={attempt.attemptIndex} />
                <input type="hidden" name="courseSlug" value={attempt.courseSlug} />

                <div className={styles.feedbackGroup}>
                  <label
                    htmlFor={`feedback-${attempt.userId}-${attempt.submissionId}`}
                    className={styles.feedbackLabel}
                  >
                    Comentários sobre a avaliação (opcional)
                  </label>
                  <textarea
                    id={`feedback-${attempt.userId}-${attempt.submissionId}`}
                    name="evaluationFeedback"
                    className={styles.feedbackTextarea}
                    rows="4"
                    placeholder="Digite seus comentários sobre o projeto entregue..."
                  ></textarea>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    type="submit"
                    name="action"
                    value="approve"
                    className={`${styles.modalBtn} ${styles.btnApprove}`}
                  >
                    ✓ Aprovar
                  </button>
                  <button
                    type="submit"
                    name="action"
                    value="reject"
                    className={`${styles.modalBtn} ${styles.btnReject}`}
                  >
                    ✕ Reprovar
                  </button>
                </div>
              </form>
            </div>
          )}

          <button type="button" className={styles.modalClose} onClick={handleClose} aria-label="Fechar modal">
            <Icons.Close className={styles.closeIcon} />
          </button>
        </div>

        {/* Painel Lateral Expansível */}
        {activeTab && (
          <div className={styles.sidePanel}>
            <div className={styles.sidePanelHeader}>
              <h3 className={styles.sidePanelTitle}>
                {activeTab === "student" ? "Feedback do Aluno" : "Feedback do Professor"}
              </h3>
              <button
                type="button"
                className={styles.sidePanelClose}
                onClick={() => setActiveTab(null)}
                aria-label="Fechar painel de feedback"
              >
                <Icons.Close className={styles.closeIcon} />
              </button>
            </div>
            <div className={styles.sidePanelContent}>
              {activeTab === "student" ? (
                <p className={styles.feedbackText}>{attempt.attempt?.feedback}</p>
              ) : (
                attempt.attempt?.evaluationFeedback ? (
                  <p className={styles.feedbackText}>{attempt.attempt.evaluationFeedback}</p>
                ) : (
                  <p className={styles.commentEmpty}>Nenhum comentário de avaliação foi fornecido.</p>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
