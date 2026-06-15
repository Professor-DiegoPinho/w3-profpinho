import Link from "next/link";
import * as Icons from "@/assets/icons/index";
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
  const { category, slug, title, description, savedAt } = bookmark;
  const href = `/${category}/${slug}`;
  const dateLabel = formatDate(savedAt);

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <button
          type="button"
          className={styles.removeButton}
          onClick={onRemove}
          title="Remover dos favoritos"
          aria-label={`Remover "${title}" dos favoritos`}
        >
          <Icons.Trash size={20} />
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
