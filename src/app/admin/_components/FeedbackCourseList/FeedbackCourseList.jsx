import Link from "next/link";
import styles from "./FeedbackCourseList.module.css";
import { getNpsColor } from "../../_utils/feedback-helpers";

export function FeedbackCourseList({ coursesWithFeedback, stats, totalFeedbacks, overallNps }) {
  return (
    <>
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total de Feedbacks</div>
          <div className={styles.statValue}>{totalFeedbacks}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>NPS Geral</div>
          <div className={styles.statValue}>{overallNps}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Cursos com Feedback</div>
          <div className={styles.statValue}>{coursesWithFeedback.length}</div>
        </div>
      </div>

      <div className={styles.grid}>
        {coursesWithFeedback.map((course) => {
          const courseStats = stats[course.category] || {
            totalFeedbacks: 0,
            avgNps: 0,
            totalByCategory: { detrator: 0, neutro: 0, promoter: 0 },
          };

          const npsColor = getNpsColor(courseStats.avgNps);

          return (
            <Link
              key={course.category}
              href={`/admin/feedbacks/${course.category}`}
              className={styles.card}
            >
              <h3 className={styles.cardTitle}>{course.title}</h3>
              <div className={`${styles.npsBadge} ${styles[npsColor]}`}>
                {courseStats.avgNps}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
