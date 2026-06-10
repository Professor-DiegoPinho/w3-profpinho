"use client";

import { DEFAULT_COMMENT_PLACEHOLDER, FEEDBACK_QUESTIONS } from "@/lib/feedbackConfig";
import { useEffect, useRef, useState } from "react";
import styles from "./FeedbackModal.module.css";

/**
 * Modal para coletar feedback do curso
 * Inclui: NPS slider + perguntas múltipla escolha + comentário
 */
export default function FeedbackModal({ courseSlug, onClose, onSubmitted }) {
  const [npsScore, setNpsScore] = useState(5);
  const [answers, setAnswers] = useState({});
  const [questionComments, setQuestionComments] = useState({});
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const modalRef = useRef(null);

  // Fechar modal ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Fechar modal ao clicar fora
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const isWorstAnswer = (questionId, value) => {
    const question = FEEDBACK_QUESTIONS.find((q) => q.id === questionId);
    if (!question || !question.worstOptions) return false;
    return question.worstOptions.includes(value);
  };

  const handleQuestionCommentChange = (questionId, text) => {
    setQuestionComments((prev) => ({
      ...prev,
      [questionId]: text,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validar que todas as perguntas foram respondidas
    const allAnswered = FEEDBACK_QUESTIONS.every((q) => answers[q.id]);
    if (!allAnswered) {
      setError("Por favor, responda todas as perguntas");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseSlug,
          npsScore,
          answers,
          questionComments,
          comment: comment.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao salvar feedback");
      }

      setSuccessMessage("Obrigado pelo seu feedback!");
      setTimeout(() => {
        onSubmitted();
      }, 1500);
    } catch (err) {
      console.error("Erro ao enviar feedback:", err);
      setError(err.message || "Erro ao salvar feedback. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.feedbackModalOverlay} onClick={handleBackdropClick}>
      <div className={styles.feedbackModal} ref={modalRef}>
        <button
          className={styles.feedbackModalClose}
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className={styles.feedbackForm}>
          <h2 className={styles.feedbackFormTitle}>Avalie sua experiência</h2>
          <p className={styles.feedbackFormSubtitle}>
            Sua opinião nos ajuda a melhorar continuamente
          </p>

          {/* NPS Section */}
          <div className={styles.feedbackSection}>
            <label className={styles.feedbackSectionLabel}>
              Você recomendaria este curso a um amigo?
            </label>
            <p className={styles.feedbackSectionSublabel}>
              De 0 (não recomendaria) a 10 (recomendaria muito)
            </p>

            <div className={styles.npsContainer}>
              <div className={styles.npsSliderWrapper}>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={npsScore}
                  onChange={(e) => setNpsScore(parseInt(e.target.value))}
                  className={styles.npsSlider}
                  aria-label="NPS score"
                />
              </div>

              <div className={styles.npsLabels}>
                <span className={styles.npsLabelStart}>Não recomendaria</span>
                <span className={styles.npsScore}>{npsScore}</span>
                <span className={styles.npsLabelEnd}>Recomendaria muito</span>
              </div>
            </div>
          </div>

          {/* Questions Section */}
          {FEEDBACK_QUESTIONS.map((question) => (
            <div key={question.id} className={styles.feedbackSection}>
              <label className={styles.feedbackSectionLabel}>{question.text}</label>

              {question.type === "multiple-choice" && (
                <div className={styles.feedbackOptions}>
                  {question.options.map((option) => (
                    <label key={option.value} className={styles.feedbackOption}>
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={answers[question.id] === option.value}
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                        required
                      />
                      <span className={styles.feedbackOptionLabel}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {/* Conditional textarea for worst answers */}
              {question.showTextareaIfWorst && isWorstAnswer(question.id, answers[question.id]) && (
                <div className={styles.feedbackQuestionComment}>
                  <label htmlFor={`comment-${question.id}`} className={styles.feedbackQuestionCommentLabel}>
                    Por que você escolheu essa opção?
                  </label>
                  <textarea
                    id={`comment-${question.id}`}
                    className={styles.feedbackQuestionTextarea}
                    placeholder="Nos ajude a entender melhor sua experiência..."
                    value={questionComments[question.id] || ""}
                    onChange={(e) => handleQuestionCommentChange(question.id, e.target.value)}
                    maxLength={500}
                    rows={3}
                  />
                  <span className={styles.feedbackCharCount}>
                    {(questionComments[question.id] || "").length}/500
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Comment Section */}
          <div className={styles.feedbackSection}>
            <label htmlFor="feedback-comment" className={styles.feedbackSectionLabel}>
              Observações adicionais (opcional)
            </label>
            <textarea
              id="feedback-comment"
              className={styles.feedbackTextarea}
              placeholder={DEFAULT_COMMENT_PLACEHOLDER}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              rows={4}
            />
            <span className={styles.feedbackCharCount}>
              {comment.length}/1000
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`${styles.feedbackMessage} ${styles.feedbackMessageError}`} role="alert">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className={`${styles.feedbackMessage} ${styles.feedbackMessageSuccess}`} role="status">
              {successMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className={styles.feedbackActions}>
            <button
              type="button"
              onClick={onClose}
              className={`${styles.feedbackButton} ${styles.feedbackButtonSecondary}`}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`${styles.feedbackButton} ${styles.feedbackButtonPrimary}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
