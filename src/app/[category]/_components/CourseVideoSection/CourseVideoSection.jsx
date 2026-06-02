import YouTubeEmbed from "@/components/YouTubeEmbed/YouTubeEmbed";
import styles from "./CourseVideoSection.module.css";

export default function CourseVideoSection({ videoId, title = "Vídeo de apresentação" }) {
  if (!videoId) return null;

  return (
    <div className={styles.metaBlock}>
      <h2>{title}</h2>
      <YouTubeEmbed videoId={videoId} />
    </div>
  );
}
