"use client";
import styles from './LessonsList.module.css';

import AuthEnrollmentModal from "@/app/[category]/_components/AuthEnrollmentModal/AuthEnrollmentModal";
import EnrollmentConfirmModal from "@/components/EnrollmentConfirmModal/EnrollmentConfirmModal";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ClosedBook, OpenBook, Code, Plus, Minus } from "@/assets/icons";

const PREVIEW_LESSONS_COUNT = 3;

function getLessonReadingTimeLabel(minutes) {
  if (!minutes || minutes < 1) return "Leitura rápida";
  if (minutes === 1) return "1 min de leitura";
  return `${minutes} min de leitura`;
}



export default function LessonsList({
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
    <div className={styles.block}>
      <ul className={styles.list}>
        {visibleLessons.map((post, index) => {
          const isAnimatedLesson = showAllLessons && index >= PREVIEW_LESSONS_COUNT;
          const animationDelay = isAnimatedLesson
            ? { "--lesson-reveal-delay": `${(index - PREVIEW_LESSONS_COUNT) * 80}ms` }
            : undefined;
          const isDone = completedLessons.includes(post.slug);

          const lessonContent = (
            <>
              <span
                className={`${styles.icon} ${isDone ? styles.done : ""}`}
                aria-hidden="true"
              >
                {isDone ? <OpenBook /> : <ClosedBook />}
              </span>
              <div className={styles.content}>
                <p className={styles.title}>{post.title}</p>
                <span className={styles.readingTime}>
                  {getLessonReadingTimeLabel(post.readingTime?.minutes || 0)}
                </span>
              </div>
              {isEnrolled && (
                <span className={styles.arrow} aria-hidden="true">›</span>
              )}
            </>
          );

          return (
            <li
              key={post.slug}
              className={`${styles.item} ${isAnimatedLesson ? styles.reveal : ""} ${isDone ? styles.done : ""}`}
              style={animationDelay}
            >
              {isEnrolled ? (
                <Link
                  href={`/${category}/${post.slug}`}
                  className={styles.link}
                >
                  {lessonContent}
                </Link>
              ) : (
                <button
                  type="button"
                  className={`${styles.link} ${styles.button}`}
                  onClick={() => handleLessonClick(post.slug)}
                >
                  {lessonContent}
                </button>
              )}
            </li>
          );
        })}

        {!showAllLessons && hasMoreLessons && !isEnrolled && (
          <li className={styles.actionItem}>
            <button
              type="button"
              className={styles.actionBtn}
              onClick={() => setShowAllLessons(true)}
            >
              <Plus size={20} className={`${styles.icon} ${styles.action}`} aria-hidden="true" />
              <div className={styles.content}>
                <p className={styles.title}>Ver mais</p>
                <span className={styles.readingTime}>
                  Mostrar mais {hiddenLessonsCount}{" "}
                  {hiddenLessonsCount === 1 ? "aula" : "aulas"}
                </span>
              </div>
            </button>
          </li>
        )}

        {showAllLessons && hasMoreLessons && !isEnrolled && (
          <li className={styles.actionItem}>
            <button
              type="button"
              className={styles.actionBtn}
              onClick={() => setShowAllLessons(false)}
            >
              <Minus size={20} className={`${styles.icon} ${styles.action}`} aria-hidden="true" />
              <div className={styles.content}>
                <p className={styles.title}>Ver menos</p>
              </div>
            </button>
          </li>
        )}
      </ul>

      {projectPost && isEnrolled && (
        <div className={styles.projectSection}>
          <div className={styles.projectDivider}></div>
          <ul className={styles.projectList}>
            <li className={styles.projectItem}>
              <Link
                href={`/${category}/${projectPost.slug}`}
                className={styles.projectLink}
              >
                <span className={styles.projectIcon} aria-hidden="true">
                  <Code />
                </span>
                <div className={styles.projectContent}>
                  <p className={styles.projectTitle}>{projectPost.title}</p>
                  <span className={styles.projectDescription}>
                    Aplique os conhecimentos adquiridos
                  </span>
                </div>
                <span className={styles.projectArrow} aria-hidden="true">›</span>
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
