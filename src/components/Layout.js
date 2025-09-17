"use client";

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

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
  );
}