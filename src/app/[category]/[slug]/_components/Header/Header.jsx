import Link from 'next/link';
import ReadingTime from '@/app/[category]/[slug]/_components/ReadingTime/ReadingTime';
import { ArrowLeft, ArrowRight, ChevronRight } from '@/assets/icons/index';
import { generateId } from '@/lib/generateId';
import BookmarkButton from './BookmarkButton/BookmarkButton';
import styles from './Header.module.css';

export default function Header({ categoryTitle, title, description, readingTime, navigation, category, isCourseContent, lessonId, isBookmarked }) {
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
          {isCourseContent && lessonId && (
            <BookmarkButton
              lessonId={lessonId}
              category={category}
              slug={navigation?.current?.slug || ''}
              title={title}
              description={description}
              categoryTitle={categoryTitle}
              initialIsBookmarked={isBookmarked}
            />
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

