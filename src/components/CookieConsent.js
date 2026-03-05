"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_COOKIE_NAME = "cookie-consent";
const CONSENT_EXPIRES_DAYS = 30;
const TIME_BEFORE_SHOW = 500;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie(CONSENT_COOKIE_NAME);

    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, TIME_BEFORE_SHOW);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookie(CONSENT_COOKIE_NAME, "accepted", CONSENT_EXPIRES_DAYS);
    setIsVisible(false);
  };

  const handleReject = () => {
    setCookie(CONSENT_COOKIE_NAME, "rejected", CONSENT_EXPIRES_DAYS);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-container">
        <button
          className="cookie-consent-close"
          onClick={handleReject}
          aria-label="Fechar"
        >
          ✕
        </button>

        <div className="cookie-consent-content">
          <h3 className="cookie-consent-title">
            Política de Privacidade e Cookies
          </h3>

          <p className="cookie-consent-text">
            Utilizamos cookies para oferecer uma melhor experiência e analisar o
            tráfego deste site. Ao utilizar este site, você concorda com o uso
            de cookies. Para mais informações acesse nossa{" "}
            <Link
              href="/politica-de-privacidade"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidade
            </Link>
            .
          </p>

          <div className="cookie-consent-buttons">
            <button className="cookie-consent-reject" onClick={handleReject}>
              Rejeitar
            </button>
            <button className="cookie-consent-accept" onClick={handleAccept}>
              Aceitar tudo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
