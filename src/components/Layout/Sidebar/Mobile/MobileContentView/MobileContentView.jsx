import Link from 'next/link';
import styles from './MobileContentView.module.css';
import * as Icons from '@/assets/icons';

function MobileContentView({
  selectedCategory,
  tutorials,
  courses,
  resumes,
  currentCategory,
  currentSlug,
  onBack,
  onSubCategorySelect,
  onCourseSelect,
  onCategoryLinkClick,
}) {
  return (
    <nav className={`${styles.mobileSidebarNav} ${styles.mobileSidebarPage}`}>
      <div className={styles.mobileSidebarHeader}>
        <button className={styles.mobileBackBtn} onClick={onBack}>
          <Icons.ArrowLeft className={styles.mobileBackArrow} size={24} />
          <span>Voltar</span>
        </button>
        <h2 className={styles.mobileContentTitle}>
          {selectedCategory === 'tutorial'
            ? 'Tutoriais'
            : selectedCategory === 'course'
              ? 'Cursos'
              : 'Resumos'}
        </h2>
      </div>

      {selectedCategory === 'resume' ? (
        // Para resumos (direto para content.md)
        <ul className={styles.mobileContentList}>
          {resumes.map((resume) => {
            const isActive = currentCategory === resume.category && currentSlug === 'content';

            return (
              <li key={resume.category}>
                <Link
                  href={`/${resume.category}/content`}
                  className={`${styles.mobileContentLink} ${isActive ? styles.active : ''}`}
                  onClick={(event) => onCategoryLinkClick(event, resume)}
                >
                  {resume.title}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : selectedCategory === 'tutorial' ? (
        // Para tutoriais (clica em um tutorial para ver as aulas)
        <ul className={styles.mobileContentList}>
          {tutorials.map((tutorial) => (
            <li key={tutorial.category}>
              <button
                className={styles.mobileContentBtn}
                onClick={() => onSubCategorySelect(tutorial.category)}
              >
                {tutorial.title}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        // Para cursos (clica em um curso para ver as aulas ou inscrição)
        <ul className={styles.mobileContentList}>
          {courses.map((course) => (
            <li key={course.category}>
              <button
                className={styles.mobileContentBtn}
                onClick={() => onCourseSelect(course)}
              >
                {course.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default MobileContentView;
