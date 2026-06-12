import Link from "next/link";
import { Close } from "@/assets/icons/index";
import styles from "./BookmarkCard.module.css";

function formatDate(isoString) {
  if (!isoString) {
    return "";
  }

  try {
    return new Date(isoString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function BookmarkCard({ bookmark, onRemove }) {
  const { lessonId, category, slug, title, description, categoryTitle, savedAt } = bookmark;
  const href = `/${category}/${slug}`;
  const dateLabel = formatDate(savedAt);

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        {categoryTitle && (
          <span className={styles.badge}>{categoryTitle}</span>
        )}
        <button
          type="button"
          className={styles.removeButton}
          onClick={() => onRemove(lessonId)}
          title="Remover dos favoritos"
          aria-label={`Remover "${title}" dos favoritos`}
        >
          <Close size={16} />
        </button>
      </div>

      <div className={styles.cardBody}>
        <Link href={href} className={styles.titleLink}>
          <h2 className={styles.cardTitle}>{title}</h2>
        </Link>
        {description && (
          <p className={styles.cardDescription}>{description}</p>
        )}
      </div>

      {dateLabel && (
        <footer className={styles.cardFooter}>
          <time className={styles.cardDate} dateTime={savedAt}>
            Favoritado em {dateLabel}
          </time>
        </footer>
      )}
    </article>
  );
}
