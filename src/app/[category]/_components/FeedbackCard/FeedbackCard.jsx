"use client";

import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";
import { useState } from "react";
import styles from "./FeedbackCard.module.css";
import { Feedback } from "@/assets/icons";

/**
 * Componente que exibe um card de feedback
 * Aparece apenas quando: 100% completo + projeto aprovado + não respondeu
 */
export default function FeedbackCard({
  courseSlug,
  completionPercentage,
  projectApproved,
  feedbackResponded,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Não renderiza se não elegível
  if (
    completionPercentage !== 100 ||
    !projectApproved ||
    feedbackResponded
  ) {
    return null;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFeedbackSubmitted = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.content}>
          <Feedback className={styles.icon} />
          <div className={styles.text}>
            <h3 className={styles.title}>Sua opinião é importante!</h3>
            <p className={styles.description}>
              Ajude-nos a melhorar este curso compartilhando sua experiência de aprendizado.
            </p>
          </div>
        </div>
        <button
          className={styles.button}
          onClick={handleOpenModal}
          aria-label="Abrir formulário de feedback"
        >
          Deixar feedback
        </button>
      </div>

      {isModalOpen && (
        <FeedbackModal
          courseSlug={courseSlug}
          onClose={handleCloseModal}
          onSubmitted={handleFeedbackSubmitted}
        />
      )}
    </>
  );
}
