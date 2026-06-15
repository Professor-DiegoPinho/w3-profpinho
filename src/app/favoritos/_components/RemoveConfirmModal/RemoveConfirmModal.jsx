"use client";

import { useEffect, useCallback } from "react";
import * as Icons from "@/assets/icons";
import styles from "./RemoveConfirmModal.module.css";

export default function RemoveConfirmModal({
  isOpen,
  lessonTitle,
  onConfirm,
  onCancel,
  loading = false,
}) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    },
    [onCancel]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="remove-confirm-title"
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onCancel}
          aria-label="Fechar modal"
          disabled={loading}
        >
          ✕
        </button>

        <h3 id="remove-confirm-title" className={styles.title}>
          <Icons.Warning size={20} className={styles.warningIcon} />
          Remover dos favoritos?
        </h3>

        <div className={styles.content}>
          <p className={styles.message}>
            Tem certeza de que deseja remover a aula{" "}
            <strong>"{lessonTitle}"</strong> da sua lista de favoritos?
          </p>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={`${styles.btn} ${styles.btnCancel}`}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`${styles.btn} ${styles.btnConfirm}`}
          >
            {loading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Removendo...
              </>
            ) : (
              "Remover"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
