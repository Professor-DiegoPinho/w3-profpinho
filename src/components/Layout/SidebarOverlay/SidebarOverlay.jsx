'use client';

import styles from './SidebarOverlay.module.css';

export default function SidebarOverlay({ isSidebarOpen, closeSidebar }) {
  if (!isSidebarOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={closeSidebar}
      aria-label="Fechar sidebar"
    />
  );
}
