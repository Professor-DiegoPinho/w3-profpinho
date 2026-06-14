import React from "react";
import styles from "./SuccessModal.module.css";

export function SuccessModal({ show, onReturn }) {
  if (!show) return null;

  return (
    <div className={styles.successModalOverlay}>
      <div className={styles.successModal}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.successTitle}>Projeto Enviado com Sucesso!</h2>
        <p className={styles.successDescription}>
          Seu projeto foi enviado e está em análise. Você será notificado quando o professor avaliar.
        </p>
        <button
          className={styles.successButton}
          onClick={onReturn}
        >
          Retornar para a tela do projeto
        </button>
      </div>
    </div>
  );
}
