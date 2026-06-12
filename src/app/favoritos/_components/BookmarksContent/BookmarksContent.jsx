"use client";

import { useState } from "react";
import BookmarkCard from "../BookmarkCard/BookmarkCard";
import EmptyState from "../EmptyState/EmptyState";
import styles from "./BookmarksContent.module.css";

export default function BookmarksContent({ bookmarks: initialBookmarks }) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  const handleRemove = async (lessonId) => {
    // Estado otimista: remove imediatamente da lista
    const previousBookmarks = bookmarks;
    setBookmarks((prev) => prev.filter((b) => b.lessonId !== lessonId));

    try {
      const response = await fetch(`/api/bookmarks/${encodeURIComponent(lessonId)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Falha ao remover bookmark");
      }
    } catch {
      // Reverte em caso de erro
      setBookmarks(previousBookmarks);
    }
  };

  const countLabel =
    bookmarks.length === 1
      ? "1 aula favoritada"
      : `${bookmarks.length} aulas favoritadas`;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Meus Favoritos</h1>
        {bookmarks.length > 0 && (
          <p className={styles.subtitle}>{countLabel}</p>
        )}
      </header>

      {bookmarks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={styles.grid}>
          {bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.lessonId}
              bookmark={bookmark}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </section>
  );
}
