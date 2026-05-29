import styles from './MobileCategoriesView.module.css';

function MobileCategoriesView({ tutorials, courses, resumes, onCategorySelect, getCategoryIcon }) {
  return (
    <nav className={`${styles.mobileSidebarNav} ${styles.mobileSidebarPage}`}>
      <h2 className={styles.mobileSidebarTitle}>Conteúdo</h2>

      <ul className={styles.mobileCategoriesList}>
        {tutorials.length > 0 && (
          <li>
            <button
              className={styles.mobileCategoryBtn}
              onClick={() => onCategorySelect('tutorial')}
            >
              <img
                src={getCategoryIcon('tutorial')}
                alt="Tutoriais"
                className={styles.mobileCategoryIcon}
              />
              <span className={styles.mobileCategoryName}>Tutoriais</span>
            </button>
          </li>
        )}

        {courses.length > 0 && (
          <li>
            <button
              className={styles.mobileCategoryBtn}
              onClick={() => onCategorySelect('course')}
            >
              <img
                src={getCategoryIcon('course')}
                alt="Cursos"
                className={styles.mobileCategoryIcon}
              />
              <span className={styles.mobileCategoryName}>Cursos</span>
            </button>
          </li>
        )}

        {resumes.length > 0 && (
          <li>
            <button
              className={styles.mobileCategoryBtn}
              onClick={() => onCategorySelect('resume')}
            >
              <img
                src={getCategoryIcon('resume')}
                alt="Resumos"
                className={styles.mobileCategoryIcon}
              />
              <span className={styles.mobileCategoryName}>Resumos</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default MobileCategoriesView;
