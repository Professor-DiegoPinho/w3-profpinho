import styles from "./StatCard.module.css";

export function StatCard({ title, value, icon, variant }) {
  let variantClass = "";
  if (variant === "pending") variantClass = styles.pending;
  else if (variant === "approved") variantClass = styles.approved;
  else if (variant === "rejected") variantClass = styles.rejected;

  return (
    <div className={`${styles.statCard} ${variantClass}`}>
      <div className={styles.statHeader}>
        <h2 className={styles.statTitle}>{title}</h2>
        {icon && <span className={styles.statIcon}>{icon}</span>}
      </div>
      <p className={styles.statValue}>{value}</p>
    </div>
  );
}
