import { NameEditModal } from "@/components/NameEditModal/NameEditModal";
import { useEffect, useState } from "react";

export function ConfirmationModal({
  isOpen,
  pendingSubmission,
  loading,
  onConfirm,
  onCancel,
  userName,
  userId,
  onNameChange,
}) {
  const [isLinkChecked, setIsLinkChecked] = useState(false);
  const [isPublicChecked, setIsPublicChecked] = useState(false);
  const [isAnalysisChecked, setIsAnalysisChecked] = useState(false);
  const [isNameChecked, setIsNameChecked] = useState(false);
  const [isNameEditOpen, setIsNameEditOpen] = useState(false);
  const [isLoadingNameEdit, setIsLoadingNameEdit] = useState(false);
  const [displayName, setDisplayName] = useState(userName);

  const allChecked = isLinkChecked && isPublicChecked && isAnalysisChecked && isNameChecked;

  // Resetar checkboxes quando o modal é fechado
  useEffect(() => {
    if (!isOpen) {
      setIsLinkChecked(false);
      setIsPublicChecked(false);
      setIsAnalysisChecked(false);
      setIsNameChecked(false);
      setDisplayName(userName);
    }
  }, [isOpen, userName]);

  const handleOpenNameEdit = () => {
    setIsNameEditOpen(true);
  };

  const handleConfirmNameEdit = async (newName) => {
    setIsLoadingNameEdit(true);
    try {
      const response = await fetch(`/api/users/${userId}/name`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar nome");
      }

      const data = await response.json();
      setDisplayName(data.name);
      setIsNameEditOpen(false);
      setIsNameChecked(false);
      if (onNameChange) {
        onNameChange(data.name);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingNameEdit(false);
    }
  };

  const handleCancelNameEdit = () => {
    setIsNameEditOpen(false);
  };

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
            <li className="project-submission-confirmation-item">
              <label className="project-submission-confirmation-label-checkbox">
                <input
                  type="checkbox"
                  checked={isNameChecked}
                  onChange={(e) => setIsNameChecked(e.target.checked)}
                  className="project-submission-confirmation-checkbox"
                  aria-label="Confirmar que o nome está correto para o certificado"
                />
                <div className="project-submission-confirmation-name-check">
                  <span><strong>Verificar nome no certificado:</strong> confirmo que meu nome está completo e correto</span>
                  <p className="project-submission-confirmation-name-warning">
                    ⚠️ Após a entrega, o nome não poderá ser alterado. Verifique se está completo e correto.
                  </p>
                  <div className="project-submission-confirmation-name-display">
                    <span className="project-submission-confirmation-name-label">Seu nome no certificado:</span>
                    <div className="project-submission-confirmation-name-value">
                      <strong>{displayName}</strong>
                      <button
                        type="button"
                        onClick={handleOpenNameEdit}
                        className="project-submission-confirmation-name-edit-btn"
                        title="Clique para editar seu nome"
                        aria-label="Editar nome para o certificado"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="16px"
                          viewBox="0 -960 960 960"
                          width="16px"
                          fill="currentColor"
                        >
                          <path d="M160-120q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm544-528 56-56-56-56-56 56 56 56Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
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

      <NameEditModal
        isOpen={isNameEditOpen}
        currentName={displayName}
        onConfirm={handleConfirmNameEdit}
        onCancel={handleCancelNameEdit}
        loading={isLoadingNameEdit}
      />
    </div>
  );
}
