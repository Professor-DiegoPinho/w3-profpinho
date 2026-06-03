import { Clock } from '@/assets/icons/index';
import { formatReadingTime } from '@/lib/readingTime';
import styles from './ReadingTime.module.css';

export default function ReadingTime({
  readingTime,
  showFullText = false,
  className = ''
}) {
  let minutes, words;

  if (typeof readingTime === 'object' && readingTime !== null) {
    minutes = readingTime.minutes || 0;
    words = readingTime.words || 0;
  } else if (typeof readingTime === 'number') {
    minutes = readingTime;
    words = 0;
  } else {
    minutes = 0;
    words = 0;
  }

  const formatted = formatReadingTime(minutes);
  const displayText = showFullText ? formatted.fullText : formatted.text;

  return (
    <div
      className={`${styles.readingTime} ${styles[formatted.category]} ${className}`.trim()}
      title={`${words} palavras • ${formatted.fullText}`}
    >
      <Clock size={26} className={styles.icon} />
      <span className={styles.text}>{displayText}</span>
    </div>
  );
}

export function ReadingTimeCompact({ readingTime, className = '' }) {
  return (
    <ReadingTime readingTime={readingTime} showFullText={false} className={className} />
  );
}