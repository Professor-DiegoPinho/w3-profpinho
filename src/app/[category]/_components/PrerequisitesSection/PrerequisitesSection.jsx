import styles from "./PrerequisitesSection.module.css";

export default function PrerequisitesSection({ prerequisites = [] }) {
  if (!prerequisites || prerequisites.length === 0) return null;

  return (
    <div className={styles.metaBlock}>
      <h2>Pré-requisitos</h2>
      <ul className={styles.prerequisitesList}>
        {prerequisites.map((prerequisite) => (
          <li key={prerequisite}>{prerequisite}</li>
        ))}
      </ul>
    </div>
  );
}
