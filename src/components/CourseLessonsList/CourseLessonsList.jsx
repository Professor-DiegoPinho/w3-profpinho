"use client";
import './CourseLessonsList.css';

import AuthEnrollmentModal from "@/components/AuthEnrollmentModal/AuthEnrollmentModal";
import EnrollmentConfirmModal from "@/components/EnrollmentConfirmModal/EnrollmentConfirmModal";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const PREVIEW_LESSONS_COUNT = 3;

function getLessonReadingTimeLabel(minutes) {
  if (!minutes || minutes < 1) return "Leitura rápida";
  if (minutes === 1) return "1 min de leitura";
  return `${minutes} min de leitura`;
}

function CheckmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <path
        d="M7 12.5L10.5 16L17 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
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
  );
}

function CheckpointIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7 12l3 3 7-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CourseLessonsList({
  posts = [],
  category = "",
  completedLessons = [],
  isEnrolled = false,
}) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [showAllLessons, setShowAllLessons] = useState(isEnrolled);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEnrollmentConfirmModalOpen, setIsEnrollmentConfirmModalOpen] = useState(false);
  const [pendingLessonSlug, setPendingLessonSlug] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Separar o projeto das outras aulas
  const projectPost = posts.find(post => post.slug === 'projeto');
  const regularLessons = posts.filter(post => post.slug !== 'projeto');
  
  const hasMoreLessons = regularLessons.length > PREVIEW_LESSONS_COUNT;
  const hiddenLessonsCount = Math.max(0, regularLessons.length - PREVIEW_LESSONS_COUNT);

  const visibleLessons = useMemo(() => {
    if (showAllLessons || isEnrolled) return regularLessons;
    return regularLessons.slice(0, PREVIEW_LESSONS_COUNT);
  }, [regularLessons, showAllLessons, isEnrolled]);

  const handleLessonClick = (slug) => {
    if (isEnrolled) {
      router.push(`/${category}/${slug}`);
      return;
    }

    if (status !== "authenticated") {
      setIsAuthModalOpen(true);
      return;
    }

    setPendingLessonSlug(slug);
    setIsEnrollmentConfirmModalOpen(true);
  };

  const handleEnrollFromModal = async () => {
    if (isEnrolling) return;
    
    setIsEnrolling(true);
    try {
      const response = await fetch("/api/enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: category,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar enrollment");
      }

      const currentEnrolled = Array.isArray(session?.user?.enrolledCourseIds)
        ? session.user.enrolledCourseIds
        : [];

      if (!currentEnrolled.includes(category)) {
        await update({
          enrolledCourseIds: [...currentEnrolled, category],
        });
      }

      setIsEnrollmentConfirmModalOpen(false);
      if (pendingLessonSlug) {
        router.push(`/${category}/${pendingLessonSlug}`);
      }
    } catch (error) {
      console.error("Erro ao processar enrollment:", error);
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="course-lessons-block">
      <ul className="course-lesson-list">
        {visibleLessons.map((post, index) => {
          const isAnimatedLesson = showAllLessons && index >= PREVIEW_LESSONS_COUNT;
          const animationDelay = isAnimatedLesson
            ? { "--lesson-reveal-delay": `${(index - PREVIEW_LESSONS_COUNT) * 80}ms` }
            : undefined;
          const isDone = completedLessons.includes(post.slug);

          const lessonContent = (
            <>
              <span
                className={`course-lesson-icon ${isDone ? "course-lesson-icon-done" : ""}`}
                aria-hidden="true"
              >
                {isDone ? <CheckmarkIcon /> : <BookIcon />}
              </span>
              <div className="course-lesson-content">
                <p className="course-lesson-title">{post.title}</p>
                <span className="course-lesson-reading-time">
                  {getLessonReadingTimeLabel(post.readingTime?.minutes || 0)}
                </span>
              </div>
              {isEnrolled && (
                <span className="course-lesson-arrow" aria-hidden="true">›</span>
              )}
            </>
          );

          return (
            <li
              key={post.slug}
              className={`course-lesson-item ${isAnimatedLesson ? "course-lesson-item-reveal" : ""} ${isDone ? "course-lesson-item-done" : ""}`}
              style={animationDelay}
            >
              {isEnrolled ? (
                <Link
                  href={`/${category}/${post.slug}`}
                  className="course-lesson-link"
                >
                  {lessonContent}
                </Link>
              ) : (
                <button
                  type="button"
                  className="course-lesson-link course-lesson-button"
                  onClick={() => handleLessonClick(post.slug)}
                >
                  {lessonContent}
                </button>
              )}
            </li>
          );
        })}

        {!showAllLessons && hasMoreLessons && !isEnrolled && (
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
                  Mostrar mais {hiddenLessonsCount}{" "}
                  {hiddenLessonsCount === 1 ? "aula" : "aulas"}
                </span>
              </div>
            </button>
          </li>
        )}

        {showAllLessons && hasMoreLessons && !isEnrolled && (
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

      {projectPost && isEnrolled && (
        <div className="course-project-section">
          <div className="course-project-divider"></div>
          <div className="course-project-label">PROJETO</div>
          <ul className="course-project-list">
            <li className="course-project-item">
              <Link
                href={`/${category}/${projectPost.slug}`}
                className="course-project-link"
              >
                <span className="course-project-icon" aria-hidden="true">
                  <CheckpointIcon />
                </span>
                <div className="course-project-content">
                  <p className="course-project-title">{projectPost.title}</p>
                  <span className="course-project-description">
                    Aplique os conhecimentos adquiridos
                  </span>
                </div>
                <span className="course-project-arrow" aria-hidden="true">›</span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      <AuthEnrollmentModal
        isOpen={isAuthModalOpen}
        category={category}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <EnrollmentConfirmModal
        isOpen={isEnrollmentConfirmModalOpen}
        category={category}
        onEnroll={handleEnrollFromModal}
        onClose={() => {
          setIsEnrollmentConfirmModalOpen(false);
          setPendingLessonSlug(null);
        }}
        isLoading={isEnrolling}
      />
    </div>
  );
}