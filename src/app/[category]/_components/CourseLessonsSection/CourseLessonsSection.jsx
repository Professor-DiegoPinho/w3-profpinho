import LessonsList from "@/app/[category]/_components/LessonsList/LessonsList";
import styles from "./CourseLessonsSection.module.css";

export default function CourseLessonsSection({
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
