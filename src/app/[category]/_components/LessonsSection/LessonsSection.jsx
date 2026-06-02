import LessonsList from "@/app/[category]/_components/LessonsList/LessonsList";
import styles from "./LessonsSection.module.css";

export default function LessonsSection({
  posts,
  category,
  completedLessons,
  isEnrolled,
}) {
  return (
    <div className={styles.metaBlock}>
      <h2>Aulas do curso</h2>
      <LessonsList
        posts={posts}
        category={category}
        completedLessons={completedLessons}
        isEnrolled={isEnrolled}
      />
    </div>
  );
}
