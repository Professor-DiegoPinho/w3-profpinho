"use client";

import { useEffect, useState, useTransition } from "react";
import "./CourseProgress.css";

/**
 * Barra de progresso de um curso.
 * Busca via API client-side para sempre refletir o estado mais recente.
 *
 * Props:
 *  - courseSlug:        string  (ex: "python")
 *  - totalLessons:      number  (total de aulas do curso)
 *  - initialProgress:   object  (dados do SSR para evitar flash)
 *    { completedLessons: [], completionPercentage: 0, totalLessons: 0 }
 */
export default function CourseProgress({
  courseSlug,
  totalLessons,
  initialProgress = null,
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
    <div className={`course-progress-wrapper${isCourseComplete ? " course-progress-complete" : ""}`}>
      <div className="course-progress-header">
        <span className="course-progress-label">
          {isCourseComplete ? (
            <>
              <span className="course-progress-complete-icon" aria-hidden="true">✓</span>
              Curso concluído!
            </>
          ) : (
            "Seu progresso"
          )}
        </span>
        <span className="course-progress-stats">
          <strong>{completed}</strong> de <strong>{total}</strong> aulas
          <span className="course-progress-percentage">{percentage}%</span>
        </span>
      </div>

      <div
        className="course-progress-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percentage}% do curso concluído`}
      >
        <div
          className="course-progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}