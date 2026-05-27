'use client';

import styles from './SearchLoading.module.css';

export default function SearchLoading() {
  return (
    <div className={styles.loadingState}>
      <div className={styles.loadingSpinner}></div>
      <p>Buscando conteúdo...</p>
    </div>
  );
}
