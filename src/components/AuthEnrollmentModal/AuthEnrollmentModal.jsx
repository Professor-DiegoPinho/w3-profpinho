"use client";
import './AuthEnrollmentModal.css';

import { signIn } from "next-auth/react";
import { useEffect, useRef } from "react";

export default function AuthEnrollmentModal({
  isOpen,
  category,
  onClose,
}) {
  const modalContentRef = useRef(null);

  const handleProviderSignIn = (provider) => {
    onClose();
    signIn(provider, { callbackUrl: `/${category}` });
  };

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
          Crie sua conta gratuita com Google ou GitHub para começar a aprender e desbloquear todo o conteúdo do curso.
        </p>

        <div className="auth-modal-actions">
          <div className="auth-modal-provider-actions">
            <button
              type="button"
              className="auth-modal-provider auth-modal-provider--google"
              onClick={() => handleProviderSignIn("google")}
            >
              Continuar com Google
            </button>
            <button
              type="button"
              className="auth-modal-provider auth-modal-provider--github"
              onClick={() => handleProviderSignIn("github")}
            >
              Continuar com GitHub
            </button>
          </div>
          <button
            type="button"
            className="auth-modal-cancel"
            onClick={onClose}
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  );
}
