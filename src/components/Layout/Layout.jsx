"use client";

import CookieConsent from "@/components/CookieConsent/CookieConsent";
import DesktopSidebar from "@/components/Layout/Sidebar/Desktop/DesktopSidebar";
import MobileSidebar from "@/components/Layout/Sidebar/Mobile/MobileSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DiscordFloatingButton from "../DiscordFloatingButton/DiscordFloatingButton";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import SidebarOverlay from "./SidebarOverlay/SidebarOverlay";

const SIDEBAR_COLLAPSE_BREAKPOINT = 1100;

export default function Layout({ children, sidebarData = [] }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);
  const pathname = usePathname();

  // Detectar telas compactas para recolher a sidebar mais cedo
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= SIDEBAR_COLLAPSE_BREAKPOINT);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
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

  const resolvedCurrentCategory = pathname.split("/").filter(Boolean)[0];
  const resolvedCurrentSlug = pathname.split("/").filter(Boolean)[1];
  const routesWithoutSidebar = [
    "validar-certificado",
    "meu-perfil",
    "search",
    "admin",
  ];
  const shouldShowSidebar = Boolean(
    resolvedCurrentCategory &&
    resolvedCurrentSlug &&
    !routesWithoutSidebar.includes(resolvedCurrentCategory),
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNavigateStart = (targetPath) => {
    setPendingPath(targetPath);
    setIsRouteLoading(true);
  };

  return (
    <div className="app-layout">
      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        sidebarData={sidebarData}
        resolvedCurrentCategory={resolvedCurrentCategory}
        resolvedCurrentSlug={resolvedCurrentSlug}
        handleNavigateStart={handleNavigateStart}
      />

      <div
        className={`layout-body ${shouldShowSidebar ? "has-sidebar" : "no-sidebar"}`.trim()}
      >
        <SidebarOverlay
          isSidebarOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
        />

        {isMobile ? (
          <MobileSidebar
            sidebarData={sidebarData}
            currentCategory={resolvedCurrentCategory}
            currentSlug={resolvedCurrentSlug}
            isOpen={isSidebarOpen}
            onLinkClick={closeSidebar}
            onNavigateStart={handleNavigateStart}
          />
        ) : (
          shouldShowSidebar && (
            <DesktopSidebar
              sidebarData={sidebarData}
              currentCategory={resolvedCurrentCategory}
              currentSlug={resolvedCurrentSlug}
              isOpen={isSidebarOpen}
              isMobile={isMobile}
              onLinkClick={closeSidebar}
              onNavigateStart={handleNavigateStart}
            />
          )
        )}

        <main className="main-content">{children}</main>
      </div>

      <Footer />
      <CookieConsent />
      <DiscordFloatingButton />
    </div>
  );
}
