"use client";
import SignInModal from '../SignInModal/SignInModal';
import './AuthButton.css';
import * as Icons from '@/assets/icons';

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const AVATAR_RETRY_DELAY_MS = 5000;

export default function AuthButton({ onNavigateStart }) {
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
        className="user-menu"
        ref={menuRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          className="user-avatar-button"
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
            className="user-avatar-image"
            onError={() => setAvatarLoadError(true)}
          />
        </button>

        {isMenuOpen && (
          <div
            className="user-dropdown"
            role="menu"
            aria-label="Menu do usuário"
          >
            <div className="user-dropdown-header">
              <p className="user-dropdown-name">{userName}</p>
              {session?.user?.email && (
                <p className="user-dropdown-email">{session.user.email}</p>
              )}
            </div>

            <div className="user-dropdown-divider" aria-hidden="true" />

            <Link
              href="/meu-perfil"
              className="user-dropdown-item"
              onClick={() => {
                onNavigateStart?.("/meu-perfil");
                handleMenuItemClick();
              }}
              role="menuitem"
            >
              <span className="user-dropdown-item-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="user-dropdown-item-label">Meu perfil</span>
            </Link>

            {session?.user?.role === "admin" && (
              <Link
                href="/admin"
                className="user-dropdown-item"
                onClick={() => {
                  onNavigateStart?.("/admin");
                  handleMenuItemClick();
                }}
                role="menuitem"
              >
                <span className="user-dropdown-item-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4 5V11C4 16.55 8.07 21.2 12 22.97C15.93 21.2 20 16.55 20 11V5L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 10V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 11H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="user-dropdown-item-label">Admin</span>
              </Link>
            )}

            <button
              type="button"
              className="user-dropdown-item"
              onClick={handleSignOut}
              role="menuitem"
            >
              <span className="user-dropdown-item-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="user-dropdown-item-label">Sair</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className="auth-button"
        onClick={handleAuthClick}
        aria-label="Entrar na plataforma"
      >
        <span className="auth-button-text">Entrar</span>
        <span className="auth-button-icon" aria-hidden="true">
          <Icons.Login className="auth-button-icon" size={20} />
        </span>
      </button>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </>
  );
}
