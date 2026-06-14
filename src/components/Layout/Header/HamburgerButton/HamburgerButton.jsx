'use client';

import styles from './HamburgerButton.module.css';

export default function HamburgerButton({ isSidebarOpen, toggleSidebar }) {
  return (
    <button
      className={styles.button}
      onClick={toggleSidebar}
      aria-label="Abrir menu"
    >
      <span className={`${styles.line} ${isSidebarOpen ? styles.open : ''}`}></span>
      <span className={`${styles.line} ${isSidebarOpen ? styles.open : ''}`}></span>
      <span className={`${styles.line} ${isSidebarOpen ? styles.open : ''}`}></span>
    </button>
  );
}
