export function FormSection({
  url,
  setUrl,
  feedback,
  setFeedback,
  error,
  successMessage,
  loading,
  submitCheckLoading,
  canSubmit,
  hasPendingSubmission,
  onSubmit,
  showSubmitButton = true,
}) {
  return (
    <form onSubmit={onSubmit} className="project-submission-form">
      <div className="project-submission-form-group">
        <div className="project-submission-input-wrapper">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Cole o link do seu projeto (ex: https://github.com/seu-repo)"
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

      {showSubmitButton && (
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
      )}
    </form>
  );
}
