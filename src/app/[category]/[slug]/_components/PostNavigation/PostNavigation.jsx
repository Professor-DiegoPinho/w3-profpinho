import Link from 'next/link';
import styles from './PostNavigation.module.css';

export default function PostNavigation({ previous, next, category }) {
  if (!previous && !next) {
    return null;
  }

  return (
    <div className={styles.postNavigation}>
      <div className={styles.navButtons}>
        {previous && (
          <Link
            href={`/${category}/${previous.slug}`}
            className={`${styles.navButton} ${styles.navPrevious}`}
          >
            <span className={styles.navDirection}>← Anterior</span>
            <span className={styles.navTitle}>{previous.title}</span>
          </Link>
        )}

        {next && (
          <Link
            href={`/${category}/${next.slug}`}
            className={`${styles.navButton} ${styles.navNext}`}
          >
            <span className={styles.navDirection}>Próximo →</span>
            <span className={styles.navTitle}>{next.title}</span>
          </Link>
        )}
      </div>
    </div>
  );
}