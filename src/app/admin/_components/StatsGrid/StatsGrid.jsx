import styles from "./StatsGrid.module.css";

export function StatsGrid({ children }) {
  return <div className={styles.statsGrid}>{children}</div>;
}
