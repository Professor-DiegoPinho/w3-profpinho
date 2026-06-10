import styles from './Skeleton.module.css';

export default function LessonContentSkeleton() {
  return (
    <article className={`${styles.page} ${styles.lessonLoadingSkeleton}`} aria-busy="true" aria-live="polite">
      <header className={styles.postHeader}>
        <div className={`${styles.skeletonLine} ${styles.skeletonBreadcrumb}`}></div>
        <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`}></div>
        <div className={`${styles.skeletonLine} ${styles.skeletonSubtitle}`}></div>
      </header>

      <div className={styles.postBody}>
        <div className={`${styles.skeletonLine} ${styles.skeletonSectionTitle}`}></div>

        <div className={`${styles.skeletonLine} ${styles.skeletonParagraph}`}></div>
        <div className={`${styles.skeletonLine} ${styles.skeletonParagraph}`}></div>
        <div className={`${styles.skeletonLine} ${styles.skeletonParagraph} ${styles.medium}`}></div>

        <div className={styles.skeletonQuote}>
          <div className={`${styles.skeletonLine} ${styles.skeletonQuoteLine}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonQuoteLine} ${styles.short}`}></div>
        </div>

        <div className={`${styles.skeletonLine} ${styles.skeletonSectionSubtitle}`}></div>
        <div className={`${styles.skeletonLine} ${styles.skeletonParagraph}`}></div>

        <div className={styles.skeletonList}>
          <div className={styles.skeletonListItem}>
            <span className={`${styles.skeletonLine} ${styles.skeletonListIndex}`}></span>
            <span className={`${styles.skeletonLine} ${styles.skeletonListLine}`}></span>
          </div>
          <div className={styles.skeletonListItem}>
            <span className={`${styles.skeletonLine} ${styles.skeletonListIndex}`}></span>
            <span className={`${styles.skeletonLine} ${styles.skeletonListLine}`}></span>
          </div>
          <div className={styles.skeletonListItem}>
            <span className={`${styles.skeletonLine} ${styles.skeletonListIndex}`}></span>
            <span className={`${styles.skeletonLine} ${styles.skeletonListLine} ${styles.long}`}></span>
          </div>
          <div className={styles.skeletonListItem}>
            <span className={`${styles.skeletonLine} ${styles.skeletonListIndex}`}></span>
            <span className={`${styles.skeletonLine} ${styles.skeletonListLine} ${styles.medium}`}></span>
          </div>
          <div className={styles.skeletonListItem}>
            <span className={`${styles.skeletonLine} ${styles.skeletonListIndex}`}></span>
            <span className={`${styles.skeletonLine} ${styles.skeletonListLine}`}></span>
          </div>
          <div className={styles.skeletonListItem}>
            <span className={`${styles.skeletonLine} ${styles.skeletonListIndex}`}></span>
            <span className={`${styles.skeletonLine} ${styles.skeletonListLine} ${styles.short}`}></span>
          </div>
        </div>
      </div>
    </article>
  );
}
