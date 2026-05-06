"use client";

import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";
import { useState } from "react";
import "./CourseFeedbackCard.css";

/**
 * Componente que exibe um card de feedback
 * Aparece apenas quando: 100% completo + projeto aprovado + não respondeu
 */
export default function CourseFeedbackCard({
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
      <div className="course-feedback-card">
        <div className="feedback-card-content">
          <div className="feedback-card-icon">📝</div>
          <div className="feedback-card-text">
            <h3 className="feedback-card-title">Sua opinião é importante!</h3>
            <p className="feedback-card-description">
              Ajude-nos a melhorar este curso compartilhando sua experiência de aprendizado.
            </p>
          </div>
        </div>
        <button
          className="feedback-card-button"
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
