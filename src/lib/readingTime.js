/**
 * Utility functions for calculating reading time
 */

/**
 * Calculate reading time for text content
 * @param {string} content - The text content to analyze
 * @param {number} wordsPerMinute - Average reading speed (default: 200 WPM)
 * @returns {object} Object with reading time information
 */
export function calculateReadingTime(content, wordsPerMinute = 200) {
  if (!content || typeof content !== 'string') {
    return {
      minutes: 0,
      words: 0,
      text: '0 min de leitura'
    };
  }

  // Remove HTML tags and markdown syntax
  const cleanContent = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links (keep text)
    .replace(/[#*_~`]/g, '') // Remove markdown syntax
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  // Count words (split by whitespace and filter empty strings)
  const words = cleanContent.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Calculate reading time in minutes
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Generate readable text
  let readingTimeText;
  if (minutes < 1) {
    readingTimeText = 'Menos de 1 min de leitura';
  } else if (minutes === 1) {
    readingTimeText = '1 min de leitura';
  } else {
    readingTimeText = `${minutes} min de leitura`;
  }

  return {
    minutes,
    words: wordCount,
    text: readingTimeText,
    wordsPerMinute
  };
}

/**
 * Get reading time category for styling purposes
 * @param {number} minutes - Reading time in minutes
 * @returns {string} Category (quick, medium, long)
 */
export function getReadingTimeCategory(minutes) {
  if (minutes <= 2) return 'quick';
  if (minutes <= 5) return 'medium';
  return 'long';
}

/**
 * Format reading time with appropriate icon
 * @param {number} minutes - Reading time in minutes
 * @returns {object} Object with icon and formatted text
 */
export function formatReadingTime(minutes) {
  const category = getReadingTimeCategory(minutes);

  let icon;
  let color;

  switch (category) {
    case 'quick':
      icon = '⚡'; // Lightning bolt for quick reads
      color = '#04AA6D'; // Green
      break;
    case 'medium':
      icon = '📖'; // Book for medium reads
      color = '#FFA500'; // Orange
      break;
    case 'long':
      icon = '📚'; // Books for long reads
      color = '#FF6B6B'; // Red
      break;
    default:
      icon = '📄';
      color = '#666';
  }

  const text = minutes < 1 ? 'Menos de 1 min' :
    minutes === 1 ? '1 min' :
      `${minutes} min`;

  return {
    icon,
    color,
    text,
    category,
    fullText: `${text} de leitura`
  };
}