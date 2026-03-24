"use client";

import { useState } from "react";
import "./MarkLesson.css";

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
    "mark-lesson-btn",
    isDone ? "mark-lesson-done" : "mark-lesson-pending",
    loading ? "mark-lesson-loading" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={btnClass}
      aria-label={isDone ? "Desmarcar aula como concluída" : "Marcar aula como concluída"}
    >
      <span className="mark-lesson-icon" aria-hidden="true">
        {loading ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle
              cx="8" cy="8" r="6"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="28"
              strokeDashoffset="10"
              className="mark-lesson-spinner"
            />
          </svg>
        ) : isDone ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8.5L6.5 12L13 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </span>
      <span className="mark-lesson-label">
        {loading ? "Salvando..." : isDone ? "Concluída" : "Marcar como concluída"}
      </span>
    </button>
  );
}