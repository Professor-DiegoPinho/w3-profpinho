"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function GoogleSignInButton({ onNavigateStart }) {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const menuRef = useRef(null);

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
  }, [session?.user?.image]);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleSignOut = () => {
    setIsMenuOpen(false);
    signOut({ callbackUrl: "/" });
  };

  if (status === "authenticated") {
    const userImage = session?.user?.image;
    const userName = session?.user?.name || "Usuário";
    const avatarSrc = !userImage || avatarLoadError ? "/default-avatar.svg" : userImage;

    return (
      <div className="user-menu" ref={menuRef}>
        <button
          type="button"
          className="user-avatar-button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Abrir menu do usuário"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
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
                setIsMenuOpen(false);
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
    <button
      type="button"
      className="google-signin-button"
      onClick={handleGoogleSignIn}
      aria-label="Entrar com Google"
    >
      <span className="google-signin-text">Entrar com Google</span>
      <span className="google-signin-icon" aria-hidden="true">
        {/* Ícone do Google Fonts */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-640Zm0 400Z" />
        </svg>
      </span>
    </button>
  );
}
