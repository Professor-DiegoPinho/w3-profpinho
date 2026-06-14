import styles from './Tables.module.css';

export function Table({ children }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>{children}</table>
    </div>
  );
}

export function TableHeader({ children }) {
  return <th className={styles.tableHeader}>{children}</th>;
}

export function TableCell({ children }) {
  return <td className={styles.tableCell}>{children}</td>;
}
