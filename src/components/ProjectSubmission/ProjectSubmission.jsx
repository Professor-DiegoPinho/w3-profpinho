"use client";

import { validateUrl } from "@/lib/urlValidation";
import { useCallback, useEffect, useState } from "react";
import "./ProjectSubmission.css";

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function ProjectSubmission({
  courseSlug,
  projectTitle = "Projeto",
  initialSubmissions = [],
}) {
  const [url, setUrl] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [canSubmit, setCanSubmit] = useState(null);
  const [submitCheckLoading, setSubmitCheckLoading] = useState(true);
  const [missingLessons, setMissingLessons] = useState([]);
  const [hasPendingSubmission, setHasPendingSubmission] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingSubmission, setPendingSubmission] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  const debouncedUrl = useDebounce(url, 300);
  const { platform } = validateUrl(debouncedUrl);

  // Verificar se há submissão pendente
  useEffect(() => {
    const pendingExists = Array.isArray(submissions) && submissions.some((sub) => sub.status === "pending");
    setHasPendingSubmission(pendingExists);
  }, [submissions]);

  useEffect(() => {
    if (!courseSlug) return;

    const checkSubmitPermission = async () => {
      setSubmitCheckLoading(true);
      try {
        const res = await fetch(`/api/submissions/can-submit?course=${courseSlug}`);
        if (!res.ok) {
          setCanSubmit(true);
          setSubmitCheckLoading(false);
          return;
        }
        const data = await res.json();
        setCanSubmit(data.canSubmit);
        setMissingLessons(data.missingLessons || []);
      } catch (err) {
        console.error("Erro ao verificar permissão de envio:", err);
        setCanSubmit(true);
      } finally {
        setSubmitCheckLoading(false);
      }
    };

    checkSubmitPermission();
  }, [courseSlug]);

  // Fechar modal com ESC ou clique fora
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (showConfirmation) {
          setShowConfirmation(false);
          setPendingSubmission(null);
        }
        if (showDetailsModal) {
          setShowDetailsModal(false);
          setSelectedSubmission(null);
        }
      }
    };

    const handleOverlayClick = (e) => {
      if (showConfirmation && e.target.className === "project-submission-confirmation-overlay") {
        setShowConfirmation(false);
        setPendingSubmission(null);
      }
      if (showDetailsModal && e.target.className === "project-submission-details-overlay") {
        setShowDetailsModal(false);
        setSelectedSubmission(null);
      }
    };

    if (showConfirmation || showDetailsModal) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("click", handleOverlayClick);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [showConfirmation, showDetailsModal]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!canSubmit) {
      setError("Você precisa completar todas as aulas antes de enviar o projeto.");
      return;
    }

    if (hasPendingSubmission) {
      setError("Você já possui uma submissão em análise. Aguarde o professor revisar antes de enviar uma nova.");
      return;
    }

    // Validar URL apenas ao enviar
    const validation = validateUrl(url);
    if (!validation.isValid) {
      setError("Por favor, insira uma URL válida.");
      return;
    }

    setError("");
    setSuccessMessage("");

    // Preparar o feedback: remover espaços em branco e converter vazios em null
    const trimmedFeedback = feedback.trim();

    // Mostrar modal de confirmação
    setPendingSubmission({
      url,
      platform: validation.platform || "Outro",
      feedback: trimmedFeedback.length > 0 ? trimmedFeedback : null,
    });
    setShowConfirmation(true);
  }, [url, feedback, courseSlug, canSubmit, hasPendingSubmission]);

  const handleConfirmSubmission = useCallback(async () => {
    if (!pendingSubmission) return;

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          submissionUrl: pendingSubmission.url,
          platform: pendingSubmission.platform,
          feedback: pendingSubmission.feedback,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Falha ao enviar projeto.");
      }

      const data = await res.json();
      setSubmissions(data.submissions || []);
      setUrl("");
      setFeedback("");
      setShowConfirmation(false);
      setPendingSubmission(null);
      setSuccessMessage("✓ Projeto enviado com sucesso!");
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Erro ao enviar projeto:", err);
      setError(err.message || "Erro ao enviar projeto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [pendingSubmission, courseSlug]);

  const handleCancelSubmission = useCallback(() => {
    setShowConfirmation(false);
    setPendingSubmission(null);
  }, []);

  const handleOpenDetails = useCallback((submission) => {
    setSelectedSubmission(submission);
    setShowDetailsModal(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setShowDetailsModal(false);
    setSelectedSubmission(null);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "approved":
        return "✓";
      case "rejected":
        return "✗";
      default:
        return "•";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Em análise";
      case "approved":
        return "Aprovado";
      case "rejected":
        return "Reprovado";
      default:
        return "Em análise";
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    
    try {
      const date = new Date(timestamp);
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return "";
    }
  };

  const formatDateOnly = (timestamp) => {
    if (!timestamp) return "";
    
    try {
      const date = new Date(timestamp);
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
    } catch {
      return "";
    }
  };

  return (
    <div className="project-submission-container">
      <div className="project-submission-content">
        <div className="project-submission-text-section">
          <h3 className="project-submission-title">Entregar {projectTitle}</h3>
          <p className="project-submission-description">
            Compartilhe o link da sua entrega. Lembre-se de deixar o projeto público para que possamos avaliar seu trabalho! 
          </p>
        </div>

        {!submitCheckLoading && !canSubmit && missingLessons.length > 0 && (
          <div className="project-submission-warning">
            <p className="project-submission-warning-title">
              ⚠️ Aulas incompletas
            </p>
            <p className="project-submission-warning-description">
              Você precisa completar as seguintes aulas antes de enviar o projeto:
            </p>
            <ul className="project-submission-missing-lessons">
              {missingLessons.map((lesson) => (
                <li key={lesson.slug} className="project-submission-missing-lesson">
                  {lesson.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasPendingSubmission && (
          <div className="project-submission-warning project-submission-pending-warning">
            <p className="project-submission-warning-title">
              ⏳ Submissão em análise
            </p>
            <p className="project-submission-warning-description">
              Você já possui uma entrega em análise. Aguarde a avaliação do professor antes de enviar uma nova.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="project-submission-form">
          <div className="project-submission-form-group">
            <div className="project-submission-input-wrapper">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Cole o link da sua entrega (ex: https://github.com/seu-repo)"
                className="project-submission-input"
                disabled={loading || submitCheckLoading || !canSubmit || hasPendingSubmission}
                aria-label="URL de entrega do projeto"
              />
            </div>

            <div className="project-submission-input-wrapper">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Adicione comentários ou feedback sobre o projeto (opcional)"
                className="project-submission-textarea"
                disabled={loading || submitCheckLoading || !canSubmit || hasPendingSubmission}
                rows="4"
                aria-label="Feedback ou comentários sobre o projeto"
              />
            </div>

            {error && (
              <p className="project-submission-error" role="alert">
                {error}
              </p>
            )}

            {successMessage && (
              <p className="project-submission-success" role="status">
                {successMessage}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !url.trim() || submitCheckLoading || !canSubmit || hasPendingSubmission}
            className="project-submission-btn"
            aria-label="Enviar entrega do projeto"
            title={
              hasPendingSubmission
                ? "Aguarde a análise da submissão anterior"
                : !canSubmit
                ? "Complete todas as aulas para enviar o projeto"
                : "Enviar entrega do projeto"
            }
          >
            {loading ? (
              <>
                <span className="project-submission-spinner" aria-hidden="true" />
                Enviando...
              </>
            ) : submitCheckLoading ? (
              <>
                <span className="project-submission-spinner" aria-hidden="true" />
                Verificando...
              </>
            ) : !canSubmit ? (
              "Aulas incompletas"
            ) : (
              "Enviar Entrega"
            )}
          </button>
        </form>

        {submissions.length > 0 && (
          <div className="project-submission-history">
            <h4 className="project-submission-history-title">
              Histórico de entregas ({submissions.length})
            </h4>
            <ul className="project-submission-list">
              {submissions.map((submission) => (
                <li
                  key={submission.id}
                  className="project-submission-item"
                  onClick={() => handleOpenDetails(submission)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleOpenDetails(submission);
                    }
                  }}
                >
                  <div className="project-submission-item-status-badge">
                    <span className="project-submission-item-status-icon">
                      {getStatusIcon(submission.status)}
                    </span>
                  </div>
                  <div className="project-submission-item-content">
                    <div className="project-submission-item-header">
                      <span className="project-submission-item-platform">
                        {submission.platform}
                      </span>
                      <span className="project-submission-item-date">
                        {formatDate(submission.submittedAt)}
                      </span>
                    </div>
                    <a
                      href={submission.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-submission-item-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {submission.url}
                    </a>
                    {submission.feedback && (
                      <p className="project-submission-item-feedback">
                        {submission.feedback}
                      </p>
                    )}
                  </div>
                  <div className="project-submission-item-status-label">
                    {getStatusText(submission.status)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modal de Confirmação de Entrega */}
        {showConfirmation && (
          <div className="project-submission-confirmation-overlay">
            <div className="project-submission-confirmation-modal">
              <h3 className="project-submission-confirmation-title">
                ⚠️ Confirmar Entrega
              </h3>
              
              <div className="project-submission-confirmation-content">
                <p className="project-submission-confirmation-text">
                  Você está prestes a enviar seu projeto. Antes de continuar, certifique-se de que:
                </p>
                
                <ul className="project-submission-confirmation-checklist">
                  <li className="project-submission-confirmation-item">
                    ✓ <strong>Link correto e acessível:</strong> verifique o endereço abaixo
                  </li>
                  <li className="project-submission-confirmation-item">
                    ✓ <strong>Projeto público:</strong> certifique-se de que está visível para avaliação
                  </li>
                  <li className="project-submission-confirmation-item">
                    ✓ <strong>Aguarde análise:</strong> você não poderá enviar nova entrega até o professor avaliar
                  </li>
                </ul>

                <div className="project-submission-confirmation-preview">
                  <p className="project-submission-confirmation-label">Link da entrega:</p>
                  <a
                    href={pendingSubmission?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-submission-confirmation-url"
                    title="Clique para visualizar seu projeto"
                  >
                    {pendingSubmission?.url}
                  </a>
                  <p className="project-submission-confirmation-platform">
                    Plataforma: <strong>{pendingSubmission?.platform}</strong>
                  </p>
                </div>
              </div>

              <div className="project-submission-confirmation-actions">
                <button
                  type="button"
                  onClick={handleCancelSubmission}
                  disabled={loading}
                  className="project-submission-confirmation-btn project-submission-confirmation-btn-cancel"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSubmission}
                  disabled={loading}
                  className="project-submission-confirmation-btn project-submission-confirmation-btn-confirm"
                >
                  {loading ? (
                    <>
                      <span className="project-submission-spinner" aria-hidden="true" />
                      Enviando...
                    </>
                  ) : (
                    "✓ Confirmar Entrega"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Detalhes da Entrega */}
        {showDetailsModal && selectedSubmission && (
          <div className="project-submission-details-overlay">
            <div className="project-submission-details-modal">
              <div className="project-submission-details-header">
                <h3 className="project-submission-details-title">
                  Detalhes da Entrega
                </h3>
                <button
                  type="button"
                  onClick={handleCloseDetails}
                  className="project-submission-details-close"
                  aria-label="Fechar modal de detalhes"
                >
                  ✕
                </button>
              </div>

              <div className="project-submission-details-content">
                <div className="project-submission-details-section">
                  <h4 className="project-submission-details-section-title">Status</h4>
                  <div className="project-submission-details-status">
                    <span className="project-submission-details-status-icon">
                      {getStatusIcon(selectedSubmission.status)}
                    </span>
                    <span className="project-submission-details-status-text">
                      {getStatusText(selectedSubmission.status)}
                    </span>
                  </div>
                </div>

                <div className="project-submission-details-section">
                  <h4 className="project-submission-details-section-title">Dados da Entrega</h4>
                  <div className="project-submission-details-info">
                    <p className="project-submission-details-info-label">Plataforma:</p>
                    <p className="project-submission-details-info-value">{selectedSubmission.platform}</p>
                  </div>
                  <div className="project-submission-details-info">
                    <p className="project-submission-details-info-label">Data da entrega:</p>
                    <p className="project-submission-details-info-value">{formatDate(selectedSubmission.submittedAt)}</p>
                  </div>
                  <div className="project-submission-details-info">
                    <p className="project-submission-details-info-label">Link do projeto:</p>
                    <a
                      href={selectedSubmission.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-submission-details-link"
                    >
                      {selectedSubmission.url}
                    </a>
                  </div>
                </div>

                {selectedSubmission.feedback && (
                  <div className="project-submission-details-section">
                    <h4 className="project-submission-details-section-title">Seu feedback</h4>
                    <p className="project-submission-details-feedback">
                      {selectedSubmission.feedback}
                    </p>
                  </div>
                )}

                {selectedSubmission.status !== "pending" && selectedSubmission.evaluationFeedback && (
                  <div className="project-submission-details-section project-submission-details-section-evaluation">
                    <h4 className="project-submission-details-section-title">Feedback do Professor</h4>
                    <p className="project-submission-details-feedback project-submission-details-feedback-evaluation">
                      {selectedSubmission.evaluationFeedback}
                    </p>
                    {selectedSubmission.evaluatedAt && (
                      <p className="project-submission-details-evaluated-date">
                        Avaliado em: {formatDateOnly(selectedSubmission.evaluatedAt)}
                      </p>
                    )}
                  </div>
                )}

                {selectedSubmission.status === "pending" && (
                  <div className="project-submission-details-pending-note">
                    <p>⏳ Esta entrega está em análise e aguarda avaliação do professor.</p>
                  </div>
                )}
              </div>

              <div className="project-submission-details-actions">
                <button
                  type="button"
                  onClick={handleCloseDetails}
                  className="project-submission-details-btn"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
