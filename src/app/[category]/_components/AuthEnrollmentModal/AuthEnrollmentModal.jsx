"use client";
import { Github, Google } from '@/assets/icons';
import styles from './AuthEnrollmentModal.module.css';

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
      className={styles.authModalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onMouseDown={(event) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
          onClose();
        }
      }}
    >
      <div className={styles.authModalContent} ref={modalContentRef}>
        <span className={styles.authModalBadge}>Acesso ao curso</span>
        <h3 id="auth-modal-title">Entre para liberar seu aprendizado</h3>
        <p>
          Crie sua conta gratuita com Google ou GitHub para começar a aprender e desbloquear todo o conteúdo do curso.
        </p>

        <div className={styles.authModalActions}>
          <div className={styles.authModalProviderActions}>
            <button
              type="button"
              className={styles.actionButton}
              onClick={() => handleProviderSignIn("google")}
            >
              <Google size={16} />
              Continuar com Google
            </button>
            <button
              type="button"
              className={styles.actionButton}
              onClick={() => handleProviderSignIn("github")}
            >
              <Github size={16} />
              Continuar com GitHub
            </button>
          </div>
          <button
            type="button"
            className={styles.authModalCancel}
            onClick={onClose}
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  );
}
