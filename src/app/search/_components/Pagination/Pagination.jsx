'use client';

import styles from './Pagination.module.css';

export default function Pagination({ page, totalPages, changePage }) {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => changePage(page - 1)}
        disabled={page === 1}
        className={styles.paginationButton}
      >
        ← Anterior
      </button>

      <div className={styles.paginationNumbers}>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(num => {
            return num === 1 ||
              num === totalPages ||
              Math.abs(num - page) <= 1;
          })
          .map((num, index, array) => {
            const showEllipsis = index > 0 && num - array[index - 1] > 1;

            return (
              <div key={num}>
                {showEllipsis && <span className={styles.paginationEllipsis}>...</span>}
                <button
                  onClick={() => changePage(num)}
                  className={`${styles.paginationNumber} ${num === page ? styles.active : ''}`}
                >
                  {num}
                </button>
              </div>
            );
          })}
      </div>

      <button
        onClick={() => changePage(page + 1)}
        disabled={page === totalPages}
        className={styles.paginationButton}
      >
        Próxima →
      </button>
    </div>
  );
}
