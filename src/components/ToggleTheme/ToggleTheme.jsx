'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from '@/assets/icons';
import styles from './ToggleTheme.module.css';

export default function ToggleTheme() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check actual theme set on document element (e.g. by layout script)
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(currentTheme);
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  // Avoid hydration mismatch/flashing by returning a placeholder or empty button of the same size while not mounted
  if (!mounted) {
    return (
      <div className={styles.toggleButton} aria-hidden="true" style={{ opacity: 0 }} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      className={`${styles.toggleButton} ${isDark ? styles.dark : styles.light}`}
      onClick={handleToggle}
      aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
    >
      <div className={styles.iconWrapper}>
        <Sun className={styles.sun} size={24} />
        <Moon className={styles.moon} size={24} />
      </div>
    </button>
  );
}
