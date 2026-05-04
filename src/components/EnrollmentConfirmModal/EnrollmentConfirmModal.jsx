"use client";
import './EnrollmentConfirmModal.css';

import { useCallback, useRef } from "react";

export default function EnrollmentConfirmModal({
  isOpen,
  category,
  onEnroll,
  onClose,
  isLoading = false,
}) {
  const modalContentRef = useRef(null);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="enrollment-confirm-overlay"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enrollment-confirm-title"
      tabIndex={-1}
    >
      <div className="enrollment-confirm-content" ref={modalContentRef}>
        <span className="enrollment-confirm-badge">Acesso ao curso</span>
        <h3 id="enrollment-confirm-title">Inscreva-se para acessar as aulas</h3>
        <p>
          Para começar a aprender, você precisa se inscrever gratuitamente neste curso. Após a inscrição, terá acesso a todas as aulas e poderá enviar seus projetos para avaliação.
        </p>

        <div className="enrollment-confirm-actions">
          <button
            type="button"
            className="enrollment-confirm-btn enrollment-confirm-btn-primary"
            onClick={onEnroll}
            disabled={isLoading}
          >
            {isLoading ? "Inscrevendo..." : "Inscrever-se gratuitamente"}
          </button>
          <button
            type="button"
            className="enrollment-confirm-btn enrollment-confirm-btn-secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>
        </div>

        <button
          type="button"
          className="enrollment-confirm-close"
          onClick={onClose}
          aria-label="Fechar modal"
          disabled={isLoading}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
