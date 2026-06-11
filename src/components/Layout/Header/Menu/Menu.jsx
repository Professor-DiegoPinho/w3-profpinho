"use client";
import SignInModal from '../../../SignInModal/SignInModal';
import styles from './Menu.module.css';
import * as Icons from '@/assets/icons';

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const AVATAR_RETRY_DELAY_MS = 5000;

export default function Menu({ onNavigateStart }) {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const [avatarRetryKey, setAvatarRetryKey] = useState(0);
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    setAvatarLoadError(false);
    setAvatarRetryKey(0);
  }, [session?.user?.image]);

  useEffect(() => {
    if (!avatarLoadError || !session?.user?.image) {
      return undefined;
    }

    // Retry after a short delay so transient CDN/network failures can recover.
    const retryTimer = setTimeout(() => {
      setAvatarLoadError(false);
      setAvatarRetryKey((currentKey) => currentKey + 1);
    }, AVATAR_RETRY_DELAY_MS);

    return () => clearTimeout(retryTimer);
  }, [avatarLoadError, session?.user?.image]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 150);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleAvatarClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleAuthClick = () => {
    setIsSignInModalOpen(true);
  };

  const handleSignOut = () => {
    handleMenuItemClick();
    signOut({ callbackUrl: "/" });
  };

  if (status === "authenticated") {
    const userImage = session?.user?.image;
    const userName = session?.user?.name || "Usuário";
    const userImageWithVersion = userImage
      ? `${userImage}${userImage.includes("?") ? "&" : "?"}v=${avatarRetryKey}`
      : null;
    const avatarSrc =
      !userImageWithVersion || avatarLoadError
        ? "/default-avatar.svg"
        : userImageWithVersion;

    return (
      <div
        className={styles.menu}
        ref={menuRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          className={styles.avatarButton}
          aria-label="Abrir menu do usuário"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          onClick={handleAvatarClick}
        >
          <Image
            src={avatarSrc}
            alt={`Foto de ${userName}`}
            width={42}
            height={42}
            className={styles.avatarImage}
            onError={() => setAvatarLoadError(true)}
          />
        </button>

        {isMenuOpen && (
          <div
            className={styles.dropdown}
            role="menu"
            aria-label="Menu do usuário"
          >
            <div className={styles.dropdownHeader}>
              <p className={styles.dropdownName}>{userName}</p>
              {session?.user?.email && (
                <p className={styles.dropdownEmail}>{session.user.email}</p>
              )}
            </div>

            <div className={styles.dropdownDivider} aria-hidden="true" />

            <Link
              href="/meu-perfil"
              className={styles.dropdownItem}
              onClick={() => {
                onNavigateStart?.("/meu-perfil");
                handleMenuItemClick();
              }}
              role="menuitem"
            >
              <Icons.User className={styles.dropdownItemIcon} aria-hidden="true" />
              <span className={styles.dropdownItemLabel}>Meu perfil</span>
            </Link>

            <button
              type="button"
              className={styles.dropdownItem}
              onClick={handleSignOut}
              role="menuitem"
            >
              <Icons.Logout className={styles.dropdownItemIcon} aria-hidden="true" />
              <span className={styles.dropdownItemLabel}>Sair</span>
            </button>

            <div className={styles.dropdownDivider} aria-hidden="true" />

            {session?.user?.role === "admin" && (
              <Link
                href="/admin"
                className={styles.dropdownItem}
                onClick={() => {
                  onNavigateStart?.("/admin");
                  handleMenuItemClick();
                }}
                role="menuitem"
              >
                <Icons.Admin className={styles.dropdownItemIcon} aria-hidden="true" />
                <span className={styles.dropdownItemLabel}>Admin</span>
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className={styles.menuButton}
        onClick={handleAuthClick}
        aria-label="Entrar na plataforma"
      >
        <span className={styles.menuButtonText}>Entrar</span>
        <span className={styles.menuButtonIcon} aria-hidden="true">
          <Icons.Login className={styles.menuButtonIcon} size={20} />
        </span>
      </button>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </>
  );
}
