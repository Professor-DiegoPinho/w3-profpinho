'use client';

import { formatReadingTime } from '@/lib/readingTime';

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

  // Different display variants
  const getVariantClass = () => {
    switch (variant) {
      case 'compact':
        return 'reading-time-compact';
      case 'detailed':
        return 'reading-time-detailed';
      case 'inline':
        return 'reading-time-inline';
      case 'badge':
        return 'reading-time-badge';
      default:
        return 'reading-time-default';
    }
  };

  const displayText = showFullText ? formatted.fullText : formatted.text;

  return (
    <div
      className={`reading-time ${getVariantClass()} ${className}`}
      style={{ '--reading-time-color': formatted.color }}
      title={`${words} palavras • ${formatted.fullText}`}
    >
      {showIcon && (
        <span className="reading-time-icon" role="img" aria-label="Tempo de leitura">
          {formatted.icon}
        </span>
      )}

      <span className="reading-time-text">
        {displayText}
      </span>

      {variant === 'badge' && (
        <span className={`reading-time-category reading-time-category-${formatted.category}`}>
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
      showIcon={true}
      className={className}
    />
  );
}

export function ReadingTimeDetailed({ readingTime, className = '' }) {
  return (
    <ReadingTime
      readingTime={readingTime}
      variant="detailed"
      showIcon={true}
      showFullText={true}
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