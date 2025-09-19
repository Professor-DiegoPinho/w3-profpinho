"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from './Sidebar';
import SearchBox from './SearchBox';
import Footer from './Footer';

export default function Layout({ children, sidebarData, currentCategory, currentSlug }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Fechar sidebar ao mudar de rota em mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [currentCategory, currentSlug, isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Header com busca */}
      <header className="app-header">
        <div className="header-content">
          {/* Botão hambúrguer - apenas visível no mobile */}
          {isMobile && (
            <button
              className="hamburger-button"
              onClick={toggleSidebar}
              aria-label="Abrir menu"
            >
              <span className={`hamburger-line ${isSidebarOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isSidebarOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isSidebarOpen ? 'open' : ''}`}></span>
            </button>
          )}

          <div className="header-brand">
            <Link href="/" className="header-logo">
              <img
                src="/diegopinho-learninghub-logo.svg"
                alt="Learning Hub Logo"
                className="header-logo-image"
              />
            </Link>
          </div>

          <SearchBox className="header-search" />
        </div>
      </header>

      {/* Container principal para sidebar e conteúdo */}
      <div className="layout-body">
        {/* Overlay para fechar sidebar no mobile */}
        {isMobile && isSidebarOpen && (
          <div className="sidebar-overlay" onClick={closeSidebar}></div>
        )}

        <Sidebar
          sidebarData={sidebarData}
          currentCategory={currentCategory}
          currentSlug={currentSlug}
          isOpen={isSidebarOpen}
          isMobile={isMobile}
          onLinkClick={closeSidebar}
        />

        <main className="main-content">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}