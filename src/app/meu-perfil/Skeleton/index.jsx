import styles from "./Skeleton.module.css";

export default function ProfilePageSkeleton() {
  return (
    <section
      className={`${styles.profilePage} ${styles.profileLoadingSkeleton}`}
      aria-busy="true"
      aria-live="polite"
    >
      <header className={`${styles.profileHeader} ${styles.profileSkeletonHeader}`}>
        <div className={`${styles.skeletonBlock} ${styles.profileSkeletonAvatar}`} />
        <div className={styles.profileSkeletonHeaderText}>
          <div className={`${styles.skeletonLine} ${styles.profileSkeletonTitle}`} />
          <div className={`${styles.skeletonLine} ${styles.profileSkeletonSubtitle}`} />
        </div>
      </header>

      <div className={styles.profileSummaryGrid}>
        <div className={`${styles.profileSummaryCard} ${styles.profileSkeletonCard}`}>
          <div className={`${styles.skeletonLine} ${styles.profileSkeletonLabel}`} />
          <div className={`${styles.skeletonLine} ${styles.profileSkeletonValue}`} />
        </div>
        <div className={`${styles.profileSummaryCard} ${styles.profileSkeletonCard}`}>
          <div className={`${styles.skeletonLine} ${styles.profileSkeletonLabel}`} />
          <div className={`${styles.skeletonLine} ${styles.profileSkeletonValue}`} />
        </div>
      </div>

      <div className={styles.profileGrid}>
        <article className={styles.profileCard}>
          <div className={styles.profileCoursesHeader}>
            <div>
              <div className={`${styles.skeletonLine} ${styles.profileSkeletonSectionTitle}`} />
              <div className={`${styles.skeletonLine} ${styles.profileSkeletonSectionSubtitle}`} />
            </div>
          </div>

          <ul className={styles.profileCourseList}>
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={`course-skeleton-${index}`} className={styles.profileCourseItem}>
                <div className={styles.profileCourseContent}>
                  <div className={`${styles.skeletonLine} ${styles.profileSkeletonCourseTitle}`} />
                  <div className={`${styles.skeletonLine} ${styles.profileSkeletonCourseMeta}`} />
                </div>
                <div className={`${styles.skeletonLine} ${styles.profileSkeletonCourseButton}`} />
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.profileCard}>
          <div className={`${styles.skeletonLine} ${styles.profileSkeletonSectionTitle} ${styles.short}`} />
          <div className={`${styles.skeletonLine} ${styles.profileSkeletonParagraph}`} />
        </article>
      </div>
    </section>
  );
}
