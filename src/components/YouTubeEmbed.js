"use client";

import Image from "next/image";
import { useState } from "react";

export default function YouTubeEmbed({ videoId, title = "YouTube video player" }) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  if (!videoId) {
    return (
      <div className="youtube-embed-error">
        <p>❌ ID do vídeo do YouTube inválido</p>
      </div>
    );
  }

  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="youtube-embed-container">
      {!videoLoaded ? (
        <button
          type="button"
          className="youtube-lazy-load"
          onClick={() => setVideoLoaded(true)}
          aria-label="Carregar vídeo do YouTube"
        >
          <Image
            className="youtube-thumbnail"
            src={thumbnail}
            alt="Thumbnail do vídeo"
            loading="lazy"
            width={1280}
            height={720}
            unoptimized
          />
          <div className="youtube-play-button">
            <svg width="68" height="48" viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                fill="red"
              />
              <path d="M45 24 27 14v20" fill="white" />
            </svg>
          </div>
          <span className="youtube-loading-text">Clique para carregar o vídeo</span>
        </button>
      ) : (
        <iframe
          className="youtube-embed"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      )}
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