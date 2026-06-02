import styles from "./CourseEbookSection.module.css";

export default function CourseEbookSection({ courseEbook }) {
  if (!courseEbook || Object.keys(courseEbook).length === 0) return null;

  const { url, image, siteName, title, displayUrl } = courseEbook;

  if (!url) return null;

  return (
    <div className={styles.metaBlock}>
      <h2>Materiais do curso</h2>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.ebookCard}
      >
        {image ? (
          <div
            className={styles.ebookImage}
            style={{ backgroundImage: `url(${image})` }}
            role="img"
            aria-label={`Imagem do site ${siteName}`}
          />
        ) : (
          <div className={styles.ebookImageFallback}>
            {siteName.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div className={styles.ebookContent}>
          <p className={styles.ebookSite}>{siteName}</p>
          <h3 className={styles.ebookTitle}>{title}</h3>
          <p className={styles.ebookDomain}>{displayUrl}</p>
          <span className={styles.ebookCta}>Abrir material completo ↗</span>
        </div>
      </a>
    </div>
  );
}
