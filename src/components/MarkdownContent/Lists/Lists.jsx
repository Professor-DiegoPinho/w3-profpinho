import styles from './Lists.module.css';

export function UnorderedList({ children }) {
  return <ul className={styles.list}>{children}</ul>;
}

export function OrderedList({ children }) {
  return <ol className={styles.orderedList}>{children}</ol>;
}

export function ListItem({ children }) {
  return <li className={styles.listItem}>{children}</li>;
}
