import ProjectSubmission from '@/components/ProjectSubmission/ProjectSubmission';
import MarkLesson from '@/app/[category]/[slug]/_components/MarkLesson/MarkLesson';
import styles from './Completion.module.css';

export default function Completion({
  userId,
  hasLessonAccess,
  isCourseContent,
  slug,
  category,
  title,
  projectSubmissions,
  userName,
  totalLessons,
  isDone,
}) {
  if (!userId || !hasLessonAccess || !isCourseContent) {
    return null;
  }

  if (slug === 'projeto') {
    return (
      <div className={styles.completion}>
        <ProjectSubmission
          courseSlug={category}
          projectTitle={title}
          initialSubmissions={projectSubmissions}
          userName={userName}
          userId={userId}
          submitMode="simple"
        />
      </div>
    );
  }

  return (
    <div className={styles.completion}>
      <MarkLesson
        courseSlug={category}
        lessonSlug={slug}
        totalLessons={totalLessons}
        initialDone={isDone}
      />
    </div>
  );
}
