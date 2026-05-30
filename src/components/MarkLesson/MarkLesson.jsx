"use client";

import { useState } from "react";
import styles from './MarkLesson.module.css';

export default function MarkLesson({
  courseSlug,
  lessonSlug,
  totalLessons,
  initialDone = false,
}) {
  const [isDone, setIsDone] = useState(initialDone);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    const optimisticState = !isDone;
    setIsDone(optimisticState);
    setLoading(true);

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug, lessonSlug, totalLessons }),
      });

      if (!res.ok) throw new Error("Falha ao salvar progresso.");

      const data = await res.json();
      setIsDone(data.isCompleted);
    } catch (err) {
      setIsDone(!optimisticState);
      console.error("Erro ao marcar aula:", err);
    } finally {
      setLoading(false);
    }
  }

  const btnClass = [
    styles.markLessonBtn,
    isDone ? styles.markLessonDone : styles.markLessonPending,
    loading ? styles.markLessonLoading : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.markLessonContainer}>
      <div className={styles.markLessonContent}>
        <div className={styles.markLessonTextSection}>
          <h3 className={styles.markLessonTitle}>
            {isDone ? "✓ Aula Concluída!" : "Marcar como Concluída"}
          </h3>
          <p className={styles.markLessonDescription}>
            {isDone 
              ? "Você já concluiu esta aula. Clique para desmarcar se necessário." 
              : "Marque esta aula como concluída para rastrear seu progresso."}
          </p>
        </div>
        <button
          onClick={handleToggle}
          disabled={loading}
          className={btnClass}
          aria-label={isDone ? "Desmarcar aula como concluída" : "Marcar aula como concluída"}
        >
          <span className={styles.markLessonIcon} aria-hidden="true">
            {loading ? (
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8" cy="8" r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="28"
                  strokeDashoffset="10"
                  className={styles.markLessonSpinner}
                />
              </svg>
            ) : isDone ? (
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8.5L6.5 12L13 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </span>
          <span className={styles.markLessonLabel}>
            {loading ? "Salvando..." : isDone ? "Desmarcar" : "Marcar"}
          </span>
        </button>
      </div>
    </div>
  );
}