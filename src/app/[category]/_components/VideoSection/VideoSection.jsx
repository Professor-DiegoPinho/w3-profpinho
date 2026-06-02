import YouTubeEmbed from "@/components/YouTubeEmbed/YouTubeEmbed";
import styles from "./VideoSection.module.css";

export default function VideoSection({ videoId, title = "Vídeo de apresentação" }) {
  if (!videoId) return null;

  return (
    <div className={styles.metaBlock}>
      <h2>{title}</h2>
      <YouTubeEmbed videoId={videoId} />
    </div>
  );
}
