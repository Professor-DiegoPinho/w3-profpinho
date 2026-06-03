"use client";

import { useState } from "react";
import styles from './MarkLesson.module.css';
import * as Icons from "@/assets/icons";
import { Icon } from "@/assets/icons/Icon";

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
            {isDone
              ? (<><Icons.OpenBook size={20} /> Aula Concluída!</>)
              : (<><Icons.ClosedBook size={20} /> Marcar como Concluída</>)}
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
              <Icons.Loading size={20} className={styles.markLessonSpinner} />
            ) : isDone ? (
              <Icons.Check size={20} />
            ) : (
              <Icons.Circle size={20} />
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