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
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const debouncedUrl = useDebounce(url, 300);
  const { platform } = validateUrl(debouncedUrl);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validar URL apenas ao enviar
    const validation = validateUrl(url);
    if (!validation.isValid) {
      setError("Por favor, insira uma URL válida.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          submissionUrl: url,
          platform: validation.platform || "Outro",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Falha ao enviar projeto.");
      }

      const data = await res.json();
      setSubmissions(data.submissions || []);
      setUrl("");
      setSuccessMessage("✓ Projeto enviado com sucesso!");
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Erro ao enviar projeto:", err);
      setError(err.message || "Erro ao enviar projeto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [url, courseSlug]);

  const handleDelete = useCallback(async (submissionId) => {
    if (!confirm("Tem certeza que deseja remover esta entrega?")) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/submissions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          submissionId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Falha ao remover entrega.");
      }

      const data = await res.json();
      setSubmissions(data.submissions || []);
      setSuccessMessage("Entrega removida com sucesso.");
      
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Erro ao remover entrega:", err);
      setError(err.message || "Erro ao remover entrega. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [courseSlug]);

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

  return (
    <div className="project-submission-container">
      <div className="project-submission-content">
        <div className="project-submission-text-section">
          <h3 className="project-submission-title">Entregar {projectTitle}</h3>
          <p className="project-submission-description">
            Compartilhe o link da sua entrega. Lembre-se de deixar o projeto público para que possamos avaliar seu trabalho! 
          </p>
        </div>

        <form onSubmit={handleSubmit} className="project-submission-form">
          <div className="project-submission-form-group">
            <div className="project-submission-input-wrapper">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Cole o link da sua entrega (ex: github.com/seu-repo)"
                className="project-submission-input"
                disabled={loading}
                aria-label="URL de entrega do projeto"
              />
              {debouncedUrl && platform && (
                <div className="project-submission-platform detected">
                  <span className="platform-icon">✓</span>
                  <span className="platform-name">Link do {platform}</span>
                </div>
              )}
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
            disabled={loading || !url.trim()}
            className="project-submission-btn"
            aria-label="Enviar entrega do projeto"
          >
            {loading ? (
              <>
                <span className="project-submission-spinner" aria-hidden="true" />
                Enviando...
              </>
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
                >
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
                    >
                      {submission.url}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(submission.id)}
                    disabled={loading}
                    className="project-submission-delete-btn"
                    title="Remover esta entrega"
                    aria-label={`Remover entrega de ${submission.platform}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
