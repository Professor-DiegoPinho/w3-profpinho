"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import GoogleSignInButton from './GoogleSignInButton';
import LessonContentSkeleton from './LessonContentSkeleton';
import SearchBox from './SearchBox';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);
  const [sidebarData, setSidebarData] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    let isActive = true;

    fetch('/api/sidebar')
      .then((res) => res.json())
      .then((data) => {
        if (!isActive) {
          return;
        }

        setSidebarData(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (isActive) {
          setSidebarData([]);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

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
  }, [isMobile, pathname]);

  useEffect(() => {
    if (!pendingPath) {
      return;
    }

    if (pathname === pendingPath) {
      setIsRouteLoading(false);
      setPendingPath(null);
    }
  }, [pathname, pendingPath]);

  const resolvedCurrentCategory = pathname.split('/').filter(Boolean)[0];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
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

          <div className="header-auth">
            <GoogleSignInButton />
          </div>
        </div>
      </header>

      <div className="layout-body">
        {isMobile && isSidebarOpen && (
          <div className="sidebar-overlay" onClick={closeSidebar}></div>
        )}

        <Sidebar
          sidebarData={sidebarData}
          currentCategory={resolvedCurrentCategory}
          isOpen={isSidebarOpen}
          isMobile={isMobile}
          onLinkClick={closeSidebar}
          onNavigateStart={(targetPath) => {
            setPendingPath(targetPath);
            setIsRouteLoading(true);
          }}
        />

        <main className="main-content">
          <div className={`content-wrapper ${isRouteLoading ? 'content-wrapper-loading' : ''}`}>
            {isRouteLoading ? (
              <LessonContentSkeleton />
            ) : (
              children
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}