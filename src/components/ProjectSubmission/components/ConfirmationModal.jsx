import { useEffect, useState } from "react";

export function ConfirmationModal({
  isOpen,
  pendingSubmission,
  loading,
  onConfirm,
  onCancel,
}) {
  const [isLinkChecked, setIsLinkChecked] = useState(false);
  const [isPublicChecked, setIsPublicChecked] = useState(false);
  const [isAnalysisChecked, setIsAnalysisChecked] = useState(false);

  const allChecked = isLinkChecked && isPublicChecked && isAnalysisChecked;

  // Resetar checkboxes quando o modal é fechado
  useEffect(() => {
    if (!isOpen) {
      setIsLinkChecked(false);
      setIsPublicChecked(false);
      setIsAnalysisChecked(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="project-submission-confirmation-overlay">
      <div className="project-submission-confirmation-modal">
        <h3 className="project-submission-confirmation-title">
          ⚠️ Confirmar Entrega
        </h3>

        <div className="project-submission-confirmation-content">
          <p className="project-submission-confirmation-text">
            Você está prestes a enviar seu projeto. Antes de continuar, confirme que você fez o seguinte:
          </p>

          <ul className="project-submission-confirmation-checklist">
            <li className="project-submission-confirmation-item">
              <label className="project-submission-confirmation-label-checkbox">
                <input
                  type="checkbox"
                  checked={isLinkChecked}
                  onChange={(e) => setIsLinkChecked(e.target.checked)}
                  className="project-submission-confirmation-checkbox"
                  aria-label="Confirmar que o link está correto e acessível"
                />
                <span><strong>Link correto e acessível:</strong> verifiquei o endereço abaixo</span>
              </label>
            </li>
            <li className="project-submission-confirmation-item">
              <label className="project-submission-confirmation-label-checkbox">
                <input
                  type="checkbox"
                  checked={isPublicChecked}
                  onChange={(e) => setIsPublicChecked(e.target.checked)}
                  className="project-submission-confirmation-checkbox"
                  aria-label="Confirmar que o projeto está público"
                />
                <span><strong>Projeto público:</strong> meu projeto está visível para avaliação</span>
              </label>
            </li>
            <li className="project-submission-confirmation-item">
              <label className="project-submission-confirmation-label-checkbox">
                <input
                  type="checkbox"
                  checked={isAnalysisChecked}
                  onChange={(e) => setIsAnalysisChecked(e.target.checked)}
                  className="project-submission-confirmation-checkbox"
                  aria-label="Confirmar que está ciente da análise"
                />
                <span><strong>Aguarde análise:</strong> entendo que não poderei enviar nova entrega até o professor avaliar</span>
              </label>
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
            onClick={onCancel}
            disabled={loading}
            className="project-submission-confirmation-btn project-submission-confirmation-btn-cancel"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading || !allChecked}
            className="project-submission-confirmation-btn project-submission-confirmation-btn-confirm"
            title={!allChecked ? "Confirme todos os itens acima para enviar" : "Enviar projeto"}
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
  );
}
