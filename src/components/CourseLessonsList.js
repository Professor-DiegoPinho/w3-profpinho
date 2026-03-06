"use client";

import { useMemo, useState } from "react";

const PREVIEW_LESSONS_COUNT = 3;

function getLessonReadingTimeLabel(minutes) {
  if (!minutes || minutes < 1) {
    return "Leitura rapida";
  }

  if (minutes === 1) {
    return "1 min de leitura";
  }

  return `${minutes} min de leitura`;
}

export default function CourseLessonsList({ posts = [] }) {
  const [showAllLessons, setShowAllLessons] = useState(false);

  const hasMoreLessons = posts.length > PREVIEW_LESSONS_COUNT;
  const hiddenLessonsCount = Math.max(0, posts.length - PREVIEW_LESSONS_COUNT);

  const visibleLessons = useMemo(() => {
    if (showAllLessons) {
      return posts;
    }

    return posts.slice(0, PREVIEW_LESSONS_COUNT);
  }, [posts, showAllLessons]);

  return (
    <div className="course-lessons-block">
      <ul className="course-lesson-list">
        {visibleLessons.map((post, index) => {
          const isAnimatedLesson = showAllLessons && index >= PREVIEW_LESSONS_COUNT;
          const animationDelay = isAnimatedLesson
            ? { "--lesson-reveal-delay": `${(index - PREVIEW_LESSONS_COUNT) * 80}ms` }
            : undefined;

          return (
            <li
              key={post.slug}
              className={`course-lesson-item ${isAnimatedLesson ? "course-lesson-item-reveal" : ""}`}
              style={animationDelay}
            >
              <span className="course-lesson-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path
                    d="M8.5 6.5A2.5 2.5 0 0 1 11 4h7.5v14H11A2.5 2.5 0 0 0 8.5 20V6.5Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 6.5H5.5V20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="course-lesson-content">
                <p className="course-lesson-title">{post.title}</p>
                <span className="course-lesson-reading-time">
                  {getLessonReadingTimeLabel(post.readingTime?.minutes || 0)}
                </span>
              </div>
            </li>
          );
        })}

        {!showAllLessons && hasMoreLessons && (
          <li className="course-lesson-action-item">
            <button
              type="button"
              className="course-lesson-action-btn"
              onClick={() => setShowAllLessons(true)}
            >
              <span className="course-lesson-icon course-lesson-icon-action" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path
                    d="M12 7v10M7 12h10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="course-lesson-content">
                <p className="course-lesson-title">Ver mais</p>
                <span className="course-lesson-reading-time">
                  Mostrar mais {hiddenLessonsCount} {hiddenLessonsCount === 1 ? 'aula' : 'aulas'}
                </span>
              </div>
            </button>
          </li>
        )}

        {showAllLessons && hasMoreLessons && (
          <li className="course-lesson-action-item">
            <button
              type="button"
              className="course-lesson-action-btn course-lesson-action-btn-close"
              onClick={() => setShowAllLessons(false)}
            >
              <span className="course-lesson-icon course-lesson-icon-action" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path
                    d="M7 12h10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="course-lesson-content">
                <p className="course-lesson-title">Ver menos</p>
                
              </div>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
