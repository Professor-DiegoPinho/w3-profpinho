/**
 * Componente YouTube Embed
 * Renderiza vídeos do YouTube de forma responsiva e otimizada
 */

export default function YouTubeEmbed({ videoId, title = "YouTube video player" }) {
  if (!videoId) {
    return (
      <div className="youtube-embed-error">
        <p>❌ ID do vídeo do YouTube inválido</p>
      </div>
    );
  }

  return (
    <div className="youtube-embed-container">
      <iframe
        className="youtube-embed"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

/**
 * Componente para exibir erro de embed
 */
export function EmbedError({ url, message }) {
  return (
    <div className="embed-error">
      <p>❌ {message}</p>
      {url && <p className="embed-error-url">URL: {url}</p>}
    </div>
  );
}