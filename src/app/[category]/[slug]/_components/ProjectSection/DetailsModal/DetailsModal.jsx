import React from "react";
import { formatDate, formatDateOnly } from "@/lib/dateFormatter";
import { getStatusIcon, getStatusText } from "@/lib/statusHelpers";
import styles from "./DetailsModal.module.css";
import * as Icons from '@/assets/icons'

export function DetailsModal({
  isOpen,
  submission,
  onClose,
}) {
  if (!isOpen || !submission) return null;

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return styles.statusApproved;
      case "rejected":
        return styles.statusRejected;
      case "pending":
        return styles.statusPending;
      default:
        return "";
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            Detalhes da Entrega
          </h3>
          <button
            type="button"
            onClick={onClose}
            className={styles.close}
            aria-label="Fechar modal de detalhes"
          >
            <Icons.Close size={26} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Status</h4>
            <div className={`${styles.status} ${getStatusClass(submission.status)}`}>
              <span className={styles.statusIcon}>
                {getStatusIcon(submission.status, "project-submission-status-icon-img")}
              </span>
              <span className={styles.statusText}>
                {getStatusText(submission.status)}
              </span>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Dados da Entrega</h4>
            <div className={styles.info}>
              <p className={styles.infoLabel}>Plataforma:</p>
              <p className={styles.infoValue}>{submission.platform}</p>
            </div>
            <div className={styles.info}>
              <p className={styles.infoLabel}>Data da entrega:</p>
              <p className={styles.infoValue}>{formatDate(submission.submittedAt)}</p>
            </div>
            <div className={styles.info}>
              <p className={styles.infoLabel}>Link do projeto:</p>
              <a
                href={submission.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {submission.url}
              </a>
            </div>
          </div>

          {submission.feedback && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Seu feedback</h4>
              <p className={styles.feedback}>
                {submission.feedback}
              </p>
            </div>
          )}

          {submission.status !== "pending" && submission.evaluationFeedback && (
            <div className={`${styles.section} ${styles.sectionEvaluation}`}>
              <h4 className={styles.sectionTitle}>Feedback do Professor</h4>
              <p className={`${styles.feedback} ${styles.feedbackEvaluation}`}>
                {submission.evaluationFeedback}
              </p>
              {submission.evaluatedAt && (
                <p className={styles.evaluatedDate}>
                  Avaliado em: {formatDateOnly(submission.evaluatedAt)}
                </p>
              )}
            </div>
          )}

          {submission.status === "pending" && (
            <div className={styles.pendingNote}>
              <p>Esta entrega está em análise e aguarda avaliação do professor.</p>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            className={styles.btn}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
