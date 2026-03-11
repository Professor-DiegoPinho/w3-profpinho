"use client";
import "./SignInModal.css";

import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function SignInModal({ isOpen, onClose }) {
  const cardRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !isMounted) return null;

  return createPortal(
    <div
      className="signin-overlay"
      onMouseDown={(e) => {
        if (cardRef.current && !cardRef.current.contains(e.target)) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-modal-title"
    >
      <div className="signin-card" ref={cardRef}>
        <div className="signin-glow-1" aria-hidden="true" />
        <div className="signin-glow-2" aria-hidden="true" />

        <button
          type="button"
          className="signin-close"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <span className="signin-close-icon" aria-hidden="true" />
        </button>

        <div className="signin-header">
          <div className="signin-icon-wrap" aria-hidden="true">
            <span className="signin-header-icon" />
          </div>
          <h2 id="signin-modal-title">Bem-vindo de volta!</h2>
          <p>Escolha como deseja entrar na plataforma</p>
        </div>

        <div className="signin-providers">
          <button
            type="button"
            className="signin-provider signin-provider--google"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <span className="signin-provider-icon">
              <span className="signin-provider-icon-asset signin-provider-icon-asset--google" aria-hidden="true" />
            </span>
            <span className="signin-provider-label">
              <span className="signin-provider-subtitle">Continuar com</span>
              <span className="signin-provider-name">Google</span>
            </span>
            <span className="signin-provider-arrow" aria-hidden="true">
              <span className="signin-provider-arrow-icon" />
            </span>
          </button>

          <button
            type="button"
            className="signin-provider signin-provider--github"
            disabled
            aria-disabled="true"
            aria-describedby="github-coming-soon"
          >
            <span className="signin-provider-icon">
              <span className="signin-provider-icon-asset signin-provider-icon-asset--github" aria-hidden="true" />
            </span>
            <span className="signin-provider-label">
              <span className="signin-provider-subtitle">Continuar com</span>
              <span className="signin-provider-name">GitHub</span>
            </span>
            <span
              id="github-coming-soon"
              className="signin-provider-badge"
              aria-label="Em breve"
            >
              Em breve
            </span>
          </button>
        </div>

        <p className="signin-terms">
          Ao entrar, você concorda com a nossa política de privacidade e termos de uso da plataforma.
        </p>
      </div>
    </div>,
    document.body
  );
}
