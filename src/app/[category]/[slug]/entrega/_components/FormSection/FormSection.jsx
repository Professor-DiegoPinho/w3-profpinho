import React from "react";
import styles from "./FormSection.module.css";

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
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Cole o link do seu projeto (ex: https://github.com/seu-repo)"
            className={styles.input}
            disabled={loading || submitCheckLoading || !canSubmit || hasPendingSubmission}
            aria-label="URL de entrega do projeto"
          />
        </div>

        <div className={styles.inputWrapper}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Adicione comentários ou feedback sobre o projeto (opcional)"
            className={styles.textarea}
            disabled={loading || submitCheckLoading || !canSubmit || hasPendingSubmission}
            rows="4"
            aria-label="Feedback ou comentários sobre o projeto"
          />
        </div>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        {successMessage && (
          <p className={styles.success} role="status">
            {successMessage}
          </p>
        )}
      </div>

      {showSubmitButton && (
        <button
          type="submit"
          disabled={loading || !url.trim() || submitCheckLoading || !canSubmit || hasPendingSubmission}
          className={styles.btn}
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
              <span className={styles.spinner} aria-hidden="true" />
              Enviando...
            </>
          ) : submitCheckLoading ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
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
