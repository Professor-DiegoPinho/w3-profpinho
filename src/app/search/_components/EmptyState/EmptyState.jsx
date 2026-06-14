'use client';

import styles from './EmptyState.module.css';

export default function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateIcon}>📚</div>
      <h3>Busque por qualquer conteúdo</h3>
      <p>Digite uma palavra-chave no campo acima para encontrar artigos, tutoriais e recursos.</p>
    </div>
  );
}
