import styles from "./CourseTagsSection.module.css";

export default function CourseTagsSection({ tags = [] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={styles.metaBlock}>
      <h2>Tags</h2>
      <div className={styles.tagsList}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tagChip}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
