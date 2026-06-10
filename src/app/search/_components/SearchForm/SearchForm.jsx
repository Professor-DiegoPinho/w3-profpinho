'use client';

import { useEffect, useRef } from 'react';
import styles from './SearchForm.module.css';

export default function SearchForm({
  query,
  setQuery,
  category,
  setCategory,
  categories,
  isLoading,
  handleSearch
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <form onSubmit={handleSearch} className={styles.form}>
      <div className={styles.formRow}>
        <div className={`${styles.formGroup} ${styles.inputGroup}`}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite sua busca..."
            className={styles.input}
            autoFocus
          />
        </div>

        <div className={styles.formGroup}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.select}
          >
            <option value="">Todas as categorias</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    </form>
  );
}
