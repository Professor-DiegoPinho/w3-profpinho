import { auth } from "@/auth";
import { isUserAdmin } from "@/lib/adminAuth";
import { redirect } from "next/navigation";
import { getFeedbacksStats, getCourses } from "../_utils/feedbacks";
import { FeedbackCourseList } from "../_components/FeedbackCourseList/FeedbackCourseList";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';

export default async function FeedbacksListPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const isAdmin = await isUserAdmin(session.user.id);
  if (!isAdmin) {
    redirect("/");
  }

  const [statsData, coursesData] = await Promise.all([
    getFeedbacksStats(),
    getCourses(),
  ]);

  // Mapear stats por courseSlug
  const stats = {};
  statsData.data?.forEach((stat) => {
    stats[stat.courseSlug] = stat;
  });

  // Filtrar apenas cursos que têm feedbacks
  const coursesWithFeedback = coursesData.filter((course) =>
    stats[course.category]
  );

  // Calcular estatísticas gerais
  const totalFeedbacks = Object.values(stats).reduce(
    (sum, stat) => sum + (stat.totalFeedbacks || 0),
    0
  );

  const allNpsScores = [];
  Object.values(stats).forEach((stat) => {
    for (let i = 0; i < stat.totalFeedbacks; i++) {
      allNpsScores.push(parseFloat(stat.avgNps) || 0);
    }
  });
  const overallNps =
    allNpsScores.length > 0
      ? (allNpsScores.reduce((a, b) => a + b, 0) / allNpsScores.length).toFixed(1)
      : "N/A";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Feedbacks dos Cursos</h1>
      </div>

      {coursesWithFeedback.length === 0 ? (
        <div className={styles.empty}>
          Nenhum curso com feedbacks ainda
        </div>
      ) : (
        <FeedbackCourseList
          coursesWithFeedback={coursesWithFeedback}
          stats={stats}
          totalFeedbacks={totalFeedbacks}
          overallNps={overallNps}
        />
      )}
    </div>
  );
}
