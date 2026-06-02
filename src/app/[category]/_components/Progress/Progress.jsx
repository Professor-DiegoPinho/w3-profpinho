"use client";

import { useEffect, useState, useTransition } from "react";
import styles from "./Progress.module.css";

/**
 * Barra de progresso de um curso.
 * Busca via API client-side para sempre refletir o estado mais recente.
 *
 * Props:
 *  - courseSlug:        string  (ex: "python")
 *  - totalLessons:      number  (total de aulas do curso)
 *  - initialProgress:   object  (dados do SSR para evitar flash)
 *    { completedLessons: [], completionPercentage: 0, totalLessons: 0 }
 *  - enrollmentDateLabel: string (ex: "15/03/2026")
 */
export default function Progress({
  courseSlug,
  totalLessons,
  initialProgress = null,
  enrollmentDateLabel = null,
}) {
  const [progress, setProgress] = useState(initialProgress);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!courseSlug) return;

    startTransition(async () => {
      try {
        const res = await fetch(`/api/progress?course=${courseSlug}`);
        if (!res.ok) return;
        const data = await res.json();
        setProgress(data);
      } catch (err) {
        console.error("Erro ao buscar progresso:", err);
      }
    });
  }, [courseSlug]);

  const completed = progress?.completedLessons?.length ?? 0;
  const total = totalLessons || progress?.totalLessons || 0;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isCourseComplete = completed === total && total > 0;

  if (total === 0) return null;

  return (
    <div className={`${styles.wrapper}${isCourseComplete ? ` ${styles.complete}` : ""}`}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.label}>
            {isCourseComplete ? (
              <>
                <span className={styles.completeIcon} aria-hidden="true">✓</span>
                Curso concluído!
              </>
            ) : (
              "Seu progresso"
            )}
          </span>
          {enrollmentDateLabel && (
            <>
              <span className={styles.separator} aria-hidden="true">•</span>
              <span className={styles.enrollmentInfo}>
                Inscreveu-se em {enrollmentDateLabel}
              </span>
            </>
          )}
        </div>
        <span className={styles.statsDesktop}>
          <strong>{completed}</strong> de <strong>{total}</strong> aulas
          <span className={styles.percentage}>{percentage}%</span>
        </span>
      </div>

      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percentage}% do curso concluído`}
      >
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className={styles.statsMobile}>
        <strong>{completed}</strong> de <strong>{total}</strong> aulas
        <span className={styles.percentageMobile}>{percentage}%</span>
      </div>
    </div>
  );
}
