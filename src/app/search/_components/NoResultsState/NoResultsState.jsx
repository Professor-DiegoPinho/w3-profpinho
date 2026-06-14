'use client';

import styles from './NoResultsState.module.css';

export default function NoResultsState({ query, category }) {
  return (
    <div className={styles.noResultsState}>
      <div className={styles.noResultsIcon}>🔍</div>
      <h3>Nenhum resultado encontrado</h3>
      <p>Não encontramos nada para &quot;{query}&quot;{category && ` em ${category}`}.</p>
      <div className={styles.suggestions}>
        <h4>Tente:</h4>
        <ul>
          <li>Verificar a ortografia das palavras</li>
          <li>Usar palavras-chave diferentes</li>
          <li>Usar termos mais gerais</li>
          <li>Remover o filtro de categoria</li>
        </ul>
      </div>
    </div>
  );
}
