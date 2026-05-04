"use client";

import { DEFAULT_COMMENT_PLACEHOLDER, FEEDBACK_QUESTIONS } from "@/lib/feedbackConfig";
import { useEffect, useRef, useState } from "react";
import "./FeedbackModal.css";

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

    // Validar comentários específicos para piores respostas
    for (const question of FEEDBACK_QUESTIONS) {
      if (question.showTextareaIfWorst && isWorstAnswer(question.id, answers[question.id])) {
        const comment = (questionComments[question.id] || "").trim();
        if (!comment) {
          setError(`Por favor, explique por que escolheu essa opção para: "${question.text}"`);
          return;
        }
      }
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
    <div className="feedback-modal-overlay" onClick={handleBackdropClick}>
      <div className="feedback-modal" ref={modalRef}>
        <button
          className="feedback-modal-close"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="feedback-form">
          <h2 className="feedback-form-title">Avalie sua experiência</h2>
          <p className="feedback-form-subtitle">
            Sua opinião nos ajuda a melhorar continuamente
          </p>

          {/* NPS Section */}
          <div className="feedback-section">
            <label className="feedback-section-label">
              Você recomendaria este curso a um amigo?
            </label>
            <p className="feedback-section-sublabel">
              De 0 (não recomendaria) a 10 (recomendaria muito)
            </p>

            <div className="nps-container">
              <div className="nps-slider-wrapper">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={npsScore}
                  onChange={(e) => setNpsScore(parseInt(e.target.value))}
                  className="nps-slider"
                  aria-label="NPS score"
                />
              </div>

              <div className="nps-labels">
                <span className="nps-label-start">Não recomendaria</span>
                <span className="nps-score">{npsScore}</span>
                <span className="nps-label-end">Recomendaria muito</span>
              </div>
            </div>
          </div>

          {/* Questions Section */}
          {FEEDBACK_QUESTIONS.map((question) => (
            <div key={question.id} className="feedback-section">
              <label className="feedback-section-label">{question.text}</label>

              {question.type === "multiple-choice" && (
                <div className="feedback-options">
                  {question.options.map((option) => (
                    <label key={option.value} className="feedback-option">
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
                      <span className="feedback-option-label">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {/* Conditional textarea for worst answers */}
              {question.showTextareaIfWorst && isWorstAnswer(question.id, answers[question.id]) && (
                <div className="feedback-question-comment">
                  <label htmlFor={`comment-${question.id}`} className="feedback-question-comment-label">
                    Por que você escolheu essa opção?
                  </label>
                  <textarea
                    id={`comment-${question.id}`}
                    className="feedback-question-textarea"
                    placeholder="Nos ajude a entender melhor sua experiência..."
                    value={questionComments[question.id] || ""}
                    onChange={(e) => handleQuestionCommentChange(question.id, e.target.value)}
                    maxLength={500}
                    rows={3}
                  />
                  <span className="feedback-char-count">
                    {(questionComments[question.id] || "").length}/500
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Comment Section */}
          <div className="feedback-section">
            <label htmlFor="feedback-comment" className="feedback-section-label">
              Observações adicionais (opcional)
            </label>
            <textarea
              id="feedback-comment"
              className="feedback-textarea"
              placeholder={DEFAULT_COMMENT_PLACEHOLDER}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              rows={4}
            />
            <span className="feedback-char-count">
              {comment.length}/1000
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="feedback-message feedback-message-error" role="alert">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="feedback-message feedback-message-success" role="status">
              {successMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="feedback-actions">
            <button
              type="button"
              onClick={onClose}
              className="feedback-button feedback-button-secondary"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="feedback-button feedback-button-primary"
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
