import styles from './MobileCategoriesView.module.css';
import * as Icons from '@/assets/icons';

function MobileCategoriesView({ tutorials, courses, resumes, onCategorySelect, getCategoryIcon, onClose }) {
  return (
    <nav className={`${styles.mobileSidebarNav} ${styles.mobileSidebarPage}`}>
      <div className={styles.headerRow}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Fechar menu"
          title="Fechar menu"
        >
          <Icons.Close className={styles.closeIcon} size={24} />
          Fechar
        </button>
      </div>

      <h2 className={styles.mobileSidebarTitle}>Conteúdo</h2>

      <ul className={styles.mobileCategoriesList}>
        {tutorials.length > 0 && (
          <li>
            <button
              className={styles.mobileCategoryBtn}
              onClick={() => onCategorySelect('tutorial')}
            >
              <Icons.Tutorials className={styles.mobileCategoryIcon} />
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
              <Icons.Courses className={styles.mobileCategoryIcon} />
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
              <Icons.Resumes className={styles.mobileCategoryIcon} />
              <span className={styles.mobileCategoryName}>Resumos</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default MobileCategoriesView;
