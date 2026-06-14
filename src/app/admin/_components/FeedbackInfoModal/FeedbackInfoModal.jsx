"use client";

import { FEEDBACK_QUESTIONS } from "@/lib/feedbackConfig";
import styles from "./FeedbackInfoModal.module.css";

export function FeedbackInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>📚 Informações sobre Feedbacks</h2>
          <button 
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalContent}>
          {/* NPS Information */}
          <div className={styles.modalSection}>
            <h3>📊 Escala NPS (Net Promoter Score)</h3>
            <p className={styles.modalDescription}>
              O NPS varia de 0 a 10 e classifica os usuários em três categorias:
            </p>
            <div className={styles.npsCategories}>
              <div className={`${styles.npsCategory} ${styles.npsDetractor}`}>
                <span className={styles.npsCategoryScore}>0-6</span>
                <strong>Detrator</strong>
                <p>Usuários insatisfeitos que podem prejudicar a reputação</p>
              </div>
              <div className={`${styles.npsCategory} ${styles.npsPassive}`}>
                <span className={styles.npsCategoryScore}>7-8</span>
                <strong>Neutro</strong>
                <p>Usuários satisfeitos, mas não necessariamente recomendariam</p>
              </div>
              <div className={`${styles.npsCategory} ${styles.npsPromoter}`}>
                <span className={styles.npsCategoryScore}>9-10</span>
                <strong>Promotor</strong>
                <p>Usuários satisfeitos que recomendariam o curso</p>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className={styles.modalSection}>
            <h3>❓ Perguntas do Feedback</h3>
            {FEEDBACK_QUESTIONS.map((question, idx) => (
              <div key={question.id} className={styles.questionInfo}>
                <h4>{idx + 1}. {question.text}</h4>
                <div className={styles.questionOptions}>
                  {question.options?.map((option) => {
                    const isWorst = question.worstOptions?.includes(option.value);
                    return (
                      <div 
                        key={option.value}
                        className={`${styles.option} ${isWorst ? styles.worst : ""}`}
                      >
                        {isWorst && <span className={styles.worstIndicator}>⚠️</span>}
                        <span>{option.label}</span>
                      </div>
                    );
                  })}
                </div>
                {question.worstOptions && (
                  <p className={styles.worstNote}>
                    ℹ️ Respostas {question.worstOptions.map(v => `"${FEEDBACK_QUESTIONS.find(q => q.id === question.id)?.options?.find(o => o.value === v)?.label || v}"`).join(" ou ")} podem incluir comentário do aluno (opcional).
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className={styles.modalSection}>
            <h3>💡 Sobre os Comentários</h3>
            <p>
              Quando um aluno seleciona uma resposta crítica (marcadas com ⚠️), 
              ele pode opcionalmente fornecer um comentário explicando por que deu aquela resposta. 
              Esses comentários aparecem na visualização de cada feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
