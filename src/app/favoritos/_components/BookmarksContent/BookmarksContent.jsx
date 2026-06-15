"use client";

import { useState } from "react";
import BookmarkCard from "../BookmarkCard/BookmarkCard";
import EmptyState from "../EmptyState/EmptyState";
import RemoveConfirmModal from "../RemoveConfirmModal/RemoveConfirmModal";
import SearchInput from "../SearchInput/SearchInput";
import styles from "./BookmarksContent.module.css";

export default function BookmarksContent({ bookmarks: initialBookmarks }) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRequestRemove = (bookmark) => {
    setSelectedBookmark(bookmark);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (!selectedBookmark) return;

    setIsDeleting(true);
    const lessonId = selectedBookmark.lessonId;
    const previousBookmarks = bookmarks;

    setBookmarks((prev) => prev.filter((b) => b.lessonId !== lessonId));

    try {
      const response = await fetch(`/api/bookmarks/${encodeURIComponent(lessonId)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Falha ao remover bookmark");
      }
      setIsModalOpen(false);
      setSelectedBookmark(null);
    } catch (error) {
      console.error("Erro ao remover dos favoritos:", error);
      setBookmarks(previousBookmarks);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelRemove = () => {
    if (isDeleting) return;
    setIsModalOpen(false);
    setSelectedBookmark(null);
  };
  const filteredBookmarks = bookmarks.filter((bookmark) =>
    (bookmark.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSearchActive = searchQuery.trim().length > 0;
  const groupedBookmarks = {};
  const courseOrder = [];

  if (!isSearchActive) {
    filteredBookmarks.forEach((bookmark) => {
      const courseTitle = bookmark.categoryTitle || "Outros";
      if (!groupedBookmarks[courseTitle]) {
        groupedBookmarks[courseTitle] = [];
        courseOrder.push(courseTitle);
      }
      groupedBookmarks[courseTitle].push(bookmark);
    });

    courseOrder.sort((a, b) => a.localeCompare(b, "pt-BR"));

    courseOrder.forEach((courseTitle) => {
      groupedBookmarks[courseTitle].sort((a, b) => {
        const orderA = typeof a.order === "number" ? a.order : 999;
        const orderB = typeof b.order === "number" ? b.order : 999;
        return orderA - orderB;
      });
    });
  } else {
    filteredBookmarks.sort((a, b) => {
      const catA = a.categoryTitle || "";
      const catB = b.categoryTitle || "";
      const catComp = catA.localeCompare(catB, "pt-BR");
      if (catComp !== 0) return catComp;
      return (a.order || 999) - (b.order || 999);
    });
  }

  const countLabel =
    bookmarks.length === 1
      ? "1 aula favoritada"
      : `${bookmarks.length} aulas favoritadas`;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        < div className={styles.titleContainer}>
          <h1 className={styles.title}>Meus Favoritos</h1>
          {bookmarks.length > 0 && (
            <p className={styles.subtitle}>{countLabel}</p>
          )}
        </div>
        {bookmarks.length > 0 && (
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery("")}
          />
        )}
      </header>


      {bookmarks.length === 0 ? (
        <EmptyState />
      ) : filteredBookmarks.length === 0 ? (
        <div className={styles.noResults}>
          <p className={styles.noResultsText}>
            Nenhum favorito encontrado para <strong>"{searchQuery}"</strong>
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className={styles.clearSearchBtn}
          >
            Limpar busca
          </button>
        </div>
      ) : isSearchActive ? (
        /* Modo Busca: Lista plana de cards */
        <div className={styles.grid}>
          {filteredBookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.lessonId}
              bookmark={bookmark}
              onRemove={() => handleRequestRemove(bookmark)}
            />
          ))}
        </div>
      ) : (
        /* Modo Padrão: Seções agrupadas e ordenadas por curso */
        <div className={styles.sectionsContainer}>
          {courseOrder.map((courseTitle) => (
            <div key={courseTitle} className={styles.section}>
              <h2 className={styles.sectionTitle}>{courseTitle}</h2>
              <div className={styles.grid}>
                {groupedBookmarks[courseTitle].map((bookmark) => (
                  <BookmarkCard
                    key={bookmark.lessonId}
                    bookmark={bookmark}
                    onRemove={() => handleRequestRemove(bookmark)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <RemoveConfirmModal
        isOpen={isModalOpen}
        lessonTitle={selectedBookmark?.title || ""}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
        loading={isDeleting}
      />
    </section>
  );
}
