'use client';

import { formatReadingTime } from '@/lib/readingTime';
import styles from './ReadingTime.module.css';

const variantClassMap = {
  compact: styles.readingTimeCompact,
  detailed: styles.readingTimeDetailed,
  inline: styles.readingTimeInline,
  badge: styles.readingTimeBadge,
  default: styles.readingTimeDefault
};

const categoryClassMap = {
  quick: styles.readingTimeCategoryQuick,
  medium: styles.readingTimeCategoryMedium,
  long: styles.readingTimeCategoryLong
};

export default function ReadingTime({
  readingTime,
  variant = 'default',
  showIcon = true,
  showFullText = false,
  className = ''
}) {
  // Handle different input formats
  let minutes, words, text;

  if (typeof readingTime === 'object' && readingTime !== null) {
    minutes = readingTime.minutes || 0;
    words = readingTime.words || 0;
    text = readingTime.text || '';
  } else if (typeof readingTime === 'number') {
    minutes = readingTime;
    words = 0;
    text = `${minutes} min de leitura`;
  } else {
    minutes = 0;
    words = 0;
    text = 'Tempo não disponível';
  }

  const formatted = formatReadingTime(minutes);
  const variantClass = variantClassMap[variant] || variantClassMap.default;
  const displayText = showFullText ? formatted.fullText : formatted.text;

  return (
    <div
      className={`${styles.readingTime} ${variantClass} ${className}`.trim()}
      style={{ '--reading-time-color': formatted.color, 'backgroundColor': formatted.background }}
      title={`${words} palavras • ${formatted.fullText}`}
    >
      {showIcon && (
        <span className={styles.readingTimeIcon} role="img" aria-label="Tempo de leitura">
          {formatted.icon}
        </span>
      )}

      <span className={styles.readingTimeText}>
        {displayText}
      </span>

      {variant === 'badge' && (
        <span className={`${styles.readingTimeCategory} ${categoryClassMap[formatted.category] || ''}`}>
          {formatted.category === 'quick' && 'Leitura Rápida'}
          {formatted.category === 'medium' && 'Leitura Média'}
          {formatted.category === 'long' && 'Leitura Longa'}
        </span>
      )}
    </div>
  );
}

// Specialized components for specific use cases
export function ReadingTimeCompact({ readingTime, className = '' }) {
  return (
    <ReadingTime
      readingTime={readingTime}
      variant="compact"
      showIcon
      className={className}
    />
  );
}

export function ReadingTimeDetailed({ readingTime, className = '' }) {
  return (
    <ReadingTime
      readingTime={readingTime}
      variant="detailed"
      showIcon
      showFullText
      className={className}
    />
  );
}

export function ReadingTimeInline({ readingTime, className = '' }) {
  return (
    <ReadingTime
      readingTime={readingTime}
      variant="inline"
      showIcon={false}
      className={className}
    />
  );
}

export function ReadingTimeBadge({ readingTime, className = '' }) {
  return (
    <ReadingTime
      readingTime={readingTime}
      variant="badge"
      showIcon={true}
      className={className}
    />
  );
}