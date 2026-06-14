import styles from './Paragraph.module.css';

export function Paragraph({ children }) {
  return <p className={styles.paragraph}>{children}</p>;
}

export function Bold({ children }) {
  return <strong className={styles.bold}>{children}</strong>;
}

export function Italic({ children }) {
  return <em className={styles.italic}>{children}</em>;
}
