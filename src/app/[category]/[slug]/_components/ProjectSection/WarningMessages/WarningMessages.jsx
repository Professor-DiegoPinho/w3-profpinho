import React from "react";
import styles from "./WarningMessages.module.css";
import * as Icons from "@/assets/icons";

export function WarningMessages({
  submitCheckLoading,
  canSubmit,
  missingLessons = [],
  hasPendingSubmission,
}) {
  return (
    <>
      {!submitCheckLoading && !canSubmit && missingLessons.length > 0 && (
        <div className={styles.warning}>
          <p className={styles.warningTitle}>
            <Icons.Warning size={24} /> Aulas incompletas
          </p>
          <p className={styles.warningDescription}>
            Você precisa completar as seguintes aulas antes de enviar o projeto:
          </p>
          <ul className={styles.missingLessons}>
            {missingLessons.map((lesson) => (
              <li key={lesson.slug} className={styles.missingLesson}>
                <Icons.Circle size={10} />
                {lesson.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasPendingSubmission && (
        <div className={`${styles.warning} ${styles.pendingWarning}`}>
          <p className={styles.warningTitle}>
            <Icons.Hourglass size={24} /> Submissão em análise
          </p>
          <p className={styles.warningDescription}>
            Você já possui uma entrega em análise. Aguarde a avaliação do professor antes de enviar uma nova.
          </p>
        </div>
      )}
    </>
  );
}
