import "./LessonCheckmark.css";

export default function LessonCheckmark({ isCompleted = false, size = "md" }) {
  return (
    <span
      className={`lesson-checkmark lesson-checkmark-${size} ${isCompleted ? "lesson-checkmark-completed" : "lesson-checkmark-pending"}`}
      aria-label={isCompleted ? "Aula concluída" : "Aula não concluída"}
      role="img"
    >
      {isCompleted ? (
        <svg
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M2.5 7.5L5.5 10.5L11.5 4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      )}
    </span>
  );
}