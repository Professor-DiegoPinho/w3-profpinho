import Image from "next/image";
import styles from "./Header.module.css";

export default function Header({
  courseImage,
  courseBadge,
  showAccessBadge,
  courseAccessLabel,
  courseTitle,
  courseDescription,
}) {
  return (
    <header className={styles.header}>
      {courseImage && (
        <div className={styles.logo}>
          <Image
            src={courseImage}
            alt={`Logo do curso ${courseTitle}`}
            width={72}
            height={72}
          />
        </div>
      )}
      <div className={styles.badges}>
        {courseBadge && (
          <span className={styles.badge}>{courseBadge}</span>
        )}
        {showAccessBadge && (
          <span className={styles.badge}>{courseAccessLabel}</span>
        )}
      </div>
      <h1>{courseTitle}</h1>
      <p className={styles.description}>{courseDescription}</p>
    </header>
  );
}
