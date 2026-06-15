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

      <div className={styles.sectionsContainer}>
        {Array.from({ length: 2 }).map((_, secIndex) => (
          <div key={`section-skeleton-${secIndex}`} className={styles.section}>
            <div className={`${styles.skeletonLine} ${styles.skeletonSectionTitle}`} />
            
            <div className={styles.grid}>
              {Array.from({ length: 3 }).map((_, cardIndex) => (
                <div key={`card-skeleton-${secIndex}-${cardIndex}`} className={styles.card}>
                  <div className={styles.cardHeader} />
                  
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
          </div>
        ))}
      </div>
    </section>
  );
}
