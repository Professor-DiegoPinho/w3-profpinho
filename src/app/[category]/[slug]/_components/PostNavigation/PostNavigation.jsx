import Link from 'next/link';
import styles from './PostNavigation.module.css';
import * as Icons from "@/assets/icons"

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
            <span className={styles.navDirection}><Icons.ChevronLeft size={16} /> Anterior</span>
            <span className={styles.navTitle}>{previous.title}</span>
          </Link>
        )}

        {next && (
          <Link
            href={`/${category}/${next.slug}`}
            className={`${styles.navButton} ${styles.navNext}`}
          >
            <span className={styles.navDirection} >Próximo <Icons.ChevronRight size={16} /></span>
            <span className={styles.navTitle}>{next.title}</span>
          </Link>
        )}
      </div>
    </div>
  );
}