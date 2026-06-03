'use client';

import { ReadingTimeCompact } from '@/app/[category]/[slug]/_components/ReadingTime/ReadingTime';
import Link from 'next/link';
import styles from './SearchResultCard.module.css';

export default function SearchResultCard({ result }) {
  return (
    <div className={styles.resultCard}>
      <Link href={`/${result.category}/${result.slug}`} className={styles.resultLink}>
        <div className={styles.resultCardHeader}>
          <h3 className={styles.resultCardTitle}>
            <span dangerouslySetInnerHTML={{
              __html: result.matches?.find(m => m.type === 'title')?.text || result.title
            }} />
          </h3>
          <span className={styles.resultCardCategory}>
            {result.category}
          </span>
        </div>

        {result.description && (
          <p className={styles.resultCardDescription}>
            <span dangerouslySetInnerHTML={{
              __html: result.matches?.find(m => m.type === 'description')?.text || result.description
            }} />
          </p>
        )}

        {result.excerpt && (
          <p className={styles.resultCardExcerpt}>
            <span dangerouslySetInnerHTML={{ __html: result.excerpt }} />
          </p>
        )}

        <div className={styles.resultCardFooter}>
          <div className={styles.resultMeta}>
            {result.readingTime && (
              <ReadingTimeCompact readingTime={result.readingTime} />
            )}
            <span className={styles.resultScore}>
              Relevância: {Math.round((result.score / 100) * 100)}%
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
