import styles from "./Skeleton.module.css";

export default function BookmarksSkeleton() {
  return (
    <section
      className={styles.page}
      aria-busy="true"
      aria-live="polite"
    >
      <header className={styles.header}>
        <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonSubtitle}`} />
      </header>

      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={`bookmark-skeleton-${index}`} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={`${styles.skeletonLine} ${styles.skeletonBadge}`} />
            </div>
            <div className={styles.cardBody}>
              <div className={`${styles.skeletonLine} ${styles.skeletonCardTitle}`} />
              <div className={`${styles.skeletonLine} ${styles.skeletonCardDesc}`} />
              <div className={`${styles.skeletonLine} ${styles.skeletonCardDescShort}`} />
            </div>
            <div className={styles.cardFooter}>
              <div className={`${styles.skeletonLine} ${styles.skeletonDate}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
