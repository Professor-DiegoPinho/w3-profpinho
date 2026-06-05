import styles from './Links.module.css';

export function Link({ href, children }) {
  return (
    <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
