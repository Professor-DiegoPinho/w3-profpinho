import { auth } from "@/auth";
import { isUserAdmin } from "@/lib/adminAuth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCourseFeedbacks, getCourseTitle } from "../../_utils/feedbacks";
import { FeedbacksPageClient } from "../../_components/FeedbacksPageClient/FeedbacksPageClient";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';

export default async function CourseFeedbacksPage({ params }) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const isAdmin = await isUserAdmin(session.user.id);
  if (!isAdmin) {
    redirect("/");
  }

  const { courseSlug } = await params;
  const [courseTitle, feedbacks] = await Promise.all([
    getCourseTitle(courseSlug),
    getCourseFeedbacks(courseSlug),
  ]);

  const npsAverage =
    feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + f.npsScore, 0) / feedbacks.length).toFixed(1)
      : 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backSection}>
          <Link href="/admin/feedbacks" className={styles.backLink}>
            ← Voltar
          </Link>
          <h1 className={styles.title}>{courseTitle}</h1>
        </div>
      </div>

      {feedbacks.length === 0 ? (
        <div className={styles.empty}>Nenhum feedback encontrado</div>
      ) : (
        <>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total de Feedbacks:</span>
              <span className={styles.statValue}>{feedbacks.length}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>NPS Médio:</span>
              <span className={styles.statValue}>{npsAverage}</span>
            </div>
          </div>

          <div className={styles.list}>
            <FeedbacksPageClient feedbacks={feedbacks} />
          </div>
        </>
      )}
    </div>
  );
}
