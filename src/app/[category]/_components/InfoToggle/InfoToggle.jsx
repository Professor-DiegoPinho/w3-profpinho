'use client';

import { useState } from 'react';
import styles from './InfoToggle.module.css';

export default function InfoToggle({ summary, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = async () => {
    if (isAnimating) return;

    if (!isOpen) {
      // Abrindo
      setIsOpen(true);
      setIsAnimating(true);
      await new Promise(resolve => setTimeout(resolve, 400));
      setIsAnimating(false);
    } else {
      // Fechando - marca como animando para manter conteúdo no DOM enquanto anima
      setIsAnimating(true);
      setIsOpen(false); // Muda a classe para "closed" IMEDIATAMENTE
      // Conteúdo continua renderizado porque isAnimating = true
      // Espera a animação CSS terminar
      await new Promise(resolve => setTimeout(resolve, 400));
      // Agora remove do DOM
      setIsAnimating(false);
    }
  };

  return (
    <div className={`${styles.toggle} ${isOpen ? styles.open : styles.closed}`}>
      <button
        className={styles.summary}
        onClick={handleToggle}
        aria-expanded={isOpen}
        type="button"
      >
        {summary}
      </button>
      
      {(isOpen || isAnimating) && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
}
