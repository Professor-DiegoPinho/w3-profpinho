"use client";

import { useEffect, useRef } from "react";

export default function AuthEnrollmentModal({
  isOpen,
  category,
  onClose,
  onConfirm,
}) {
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="auth-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onMouseDown={(event) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
          onClose();
        }
      }}
    >
      <div className="auth-modal-content" ref={modalContentRef}>
        <span className="auth-modal-badge">Acesso ao curso</span>
        <h3 id="auth-modal-title">Entre para liberar seu aprendizado</h3>
        <p>
          Crie sua conta gratuita com Google para começar a aprender {category} e desbloquear todo o conteúdo do curso.
        </p>

        <div className="auth-modal-actions">
          <button
            type="button"
            className="auth-modal-cancel"
            onClick={onClose}
          >
            Agora não
          </button>
          <button
            type="button"
            className="auth-modal-confirm"
            onClick={onConfirm}
          >
            Quero me cadastrar com Google
          </button>
        </div>
      </div>
    </div>
  );
}
