'use client';

import styles from './SearchStats.module.css';

export default function SearchStats({ isLoading, total, query, category }) {
  if (!query) return null;

  return (
    <div className={styles.resultsInfo}>
      <p>
        {isLoading ? (
          'Buscando...'
        ) : total > 0 ? (
          <>
            <strong>{total}</strong> resultado{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''} para <strong>&quot;{query}&quot;</strong>
            {category && (
              <> em <strong>{category.charAt(0).toUpperCase() + category.slice(1)}</strong></>
            )}
          </>
        ) : (
          <>Nenhum resultado encontrado para <strong>&quot;{query}&quot;</strong></>
        )}
      </p>
    </div>
  );
}
