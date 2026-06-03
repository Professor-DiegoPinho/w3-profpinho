import Link from 'next/link';
import ReadingTime from '@/app/[category]/[slug]/_components/ReadingTime/ReadingTime';
import { ArrowLeft, ArrowRight, Bookmark, ChevronRight } from '@/assets/icons/index';
import { generateId } from '@/lib/generateId';
import styles from './Header.module.css';

export default function Header({ categoryTitle, title, description, readingTime, navigation, category, isCourseContent }) {
  const { previous, next } = navigation || {};

  return (
    <header className={styles.header}>
      <div className={styles.toolbar}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href={`/${category}`} className={styles.categoryLink}>
            {categoryTitle}
          </Link>
          <ChevronRight size={22} className={styles.separatorIcon} />
          <span className={styles.currentPage}>{title}</span>
        </nav>

        <div className={styles.actions}>
          {readingTime && (
            <ReadingTime readingTime={readingTime} showFullText={true} />
          )}
          {previous && (
            <Link
              href={`/${category}/${previous.slug}`}
              className={styles.navButton}
              title={`Anterior: ${previous.title}`}
              aria-label={`Aula anterior: ${previous.title}`}
            >
              <ArrowLeft size={22} />
            </Link>
          )}
          {next && (
            <Link
              href={`/${category}/${next.slug}`}
              className={styles.navButton}
              title={`Próximo: ${next.title}`}
              aria-label={`Próxima aula: ${next.title}`}
            >
              <ArrowRight size={22} />
            </Link>
          )}
          {isCourseContent && (
            <button
              className={styles.bookmarkButton}
              title="Salvar nos favoritos"
              aria-label="Salvar nos favoritos"
              type="button"
            >
              <Bookmark size={18} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.titleRow}>
        <div className={styles.titleGroup}>
          <h1 id={generateId(title)}>{title}</h1>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
      </div>
    </header>
  );
}
