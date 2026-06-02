import styles from "./ResourcesSection.module.css";

function getShortLink(url) {
  try {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname.replace(/^www\./, "");
    const path = parsedUrl.pathname === "/" ? "" : parsedUrl.pathname;
    const shortPath = path.length > 18 ? `${path.slice(0, 18)}...` : path;
    return `${domain}${shortPath}`;
  } catch {
    return url;
  }
}

export default function ResourcesSection({ usefulLinks = [] }) {
  if (!usefulLinks || usefulLinks.length === 0) return null;

  return (
    <div className={styles.metaBlock}>
      <h2>Recursos adicionais</h2>
      <ul className={styles.resourceList}>
        {usefulLinks.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resourceLink}
            >
              {getShortLink(link.url)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
