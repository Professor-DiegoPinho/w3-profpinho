import React from "react";
import ApprovedCertificateSection from "@/components/ApprovedCertificateSection/ApprovedCertificateSection";
import styles from "./ApprovedMessage.module.css";

export function ApprovedMessage({ courseSlug }) {
  return (
    <>
      <div className={styles.successMessage}>
        <div className={styles.header}>
          <img
            src="/icons/ic_approved.svg"
            alt="Aprovado"
            className={styles.icon}
          />
          <p className={styles.title}>
            Projeto Aprovado
          </p>
        </div>
        <p className={styles.description}>
          Parabéns! Seu projeto foi aprovado. Você não pode mais enviar novas versões.
        </p>
      </div>
      <ApprovedCertificateSection
        courseSlug={courseSlug}
        courseName={courseSlug}
        workloadHours={0}
      />
    </>
  );
}
