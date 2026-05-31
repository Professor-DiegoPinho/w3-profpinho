import Link from 'next/link';
import styles from './Courses.module.css';

function ProfileCourseItem({ course }) {
  return (
    <li className={styles.courseItem}>
      <div className={styles.courseContent}>
        <h3 className={styles.courseTitle}>{course.title}</h3>
        <p className={styles.courseMeta}>
          {course.enrolledAt ? `Inscrição em ${course.enrolledAtLabel}` : 'Data de inscrição indisponível'}
        </p>
        {course.progress && (
          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${course.progress.completionPercentage || 0}%`,
                }}
              />
            </div>
            <span className={styles.progressText}>
              {course.progress.completionPercentage || 0}% completo
            </span>
          </div>
        )}
      </div>
      <Link
        href={`/${course.id}${course.nextLessonSlug ? `/${course.nextLessonSlug}` : ''}`}
        className={styles.courseLink}
        aria-label={`Acessar curso ${course.title}`}
      >
        {course.progress?.completionPercentage === 100 ? 'Acessar curso' : 'Continuar curso'}
      </Link>
    </li>
  );
}

function ProfileCoursesEmptyState() {
  return (
    <div className={styles.emptyState}>
      <p>Você ainda não possui inscrições em cursos.</p>
      <Link href="/" className={styles.courseLink}>
        Explorar cursos
      </Link>
    </div>
  );
}

export function Courses({ enrolledCourses, totalEnrolledCoursesLabel }) {
  return (
    <article className={styles.card}>
      <div className={styles.coursesHeader}>
        <div>
          <h2>Meus cursos</h2>
          <p className={styles.subtitle}>Acompanhe os cursos que já fazem parte da sua jornada.</p>
        </div>
      </div>

      {enrolledCourses.length > 0 ? (
        <ul className={styles.courseList}>
          {enrolledCourses.map((course) => (
            <ProfileCourseItem key={course.id} course={course} />
          ))}
        </ul>
      ) : (
        <ProfileCoursesEmptyState />
      )}

      <p className={styles.countText} aria-label="Quantidade de cursos inscritos">
        Total: <strong>{totalEnrolledCoursesLabel}</strong>
      </p>
    </article>
  );
}