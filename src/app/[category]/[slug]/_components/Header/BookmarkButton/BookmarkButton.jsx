"use client";

import SignInModal from "@/components/SignInModal/SignInModal";
import { Bookmark, BookmarkChecked } from "@/assets/icons/index";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styles from "./BookmarkButton.module.css";

export default function BookmarkButton({
  lessonId,
  category,
  slug,
  title,
  description,
  categoryTitle,
  initialIsBookmarked,
}) {
  const { status } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleClick = async () => {
    // Se o usuário não está logado, abre o modal de login
    if (status !== "authenticated") {
      setIsSignInModalOpen(true);
      return;
    }

    if (isLoading || !lessonId) {
      return;
    }

    // Estado otimista
    const previousState = isBookmarked;
    setIsBookmarked(!isBookmarked);
    setIsLoading(true);

    // Animação de pop ao favoritar
    if (!previousState) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }

    try {
      if (previousState) {
        // Remover bookmark
        const response = await fetch(`/api/bookmarks/${encodeURIComponent(lessonId)}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Falha ao remover bookmark");
        }
      } else {
        // Adicionar bookmark
        const response = await fetch("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonId,
            category,
            slug,
            title,
            description,
            categoryTitle,
          }),
        });

        if (!response.ok) {
          throw new Error("Falha ao adicionar bookmark");
        }
      }
    } catch {
      // Reverte o estado otimista em caso de erro
      setIsBookmarked(previousState);
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isBookmarked ? BookmarkChecked : Bookmark;
  const label = isBookmarked ? "Remover dos favoritos" : "Salvar nos favoritos";

  return (
    <>
      <button
        className={`${styles.bookmarkButton} ${isBookmarked ? styles.active : ""} ${isAnimating ? styles.animating : ""}`}
        title={label}
        aria-label={label}
        aria-pressed={isBookmarked}
        type="button"
        onClick={handleClick}
        disabled={isLoading}
      >
        <Icon size={18} />
      </button>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </>
  );
}
