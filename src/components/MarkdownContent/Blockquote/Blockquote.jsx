import styles from './Blockquote.module.css';

export function Blockquote({ children }) {
  return <blockquote className={styles.blockquote}>{children}</blockquote>;
}
