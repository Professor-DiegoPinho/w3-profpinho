"use client";

import { FEEDBACK_QUESTIONS } from "@/lib/feedbackConfig";

export function FeedbackInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="admin-feedbacks-modal-overlay" onClick={onClose}>
      <div className="admin-feedbacks-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-feedbacks-modal-header">
          <h2>📚 Informações sobre Feedbacks</h2>
          <button 
            className="admin-feedbacks-modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="admin-feedbacks-modal-content">
          {/* NPS Information */}
          <div className="admin-feedbacks-modal-section">
            <h3>📊 Escala NPS (Net Promoter Score)</h3>
            <p className="admin-feedbacks-modal-description">
              O NPS varia de 0 a 10 e classifica os usuários em três categorias:
            </p>
            <div className="admin-feedbacks-nps-categories">
              <div className="admin-feedbacks-nps-category admin-feedbacks-nps-detractor">
                <span className="admin-feedbacks-nps-category-score">0-6</span>
                <strong>Detrator</strong>
                <p>Usuários insatisfeitos que podem prejudicar a reputação</p>
              </div>
              <div className="admin-feedbacks-nps-category admin-feedbacks-nps-passive">
                <span className="admin-feedbacks-nps-category-score">7-8</span>
                <strong>Neutro</strong>
                <p>Usuários satisfeitos, mas não necessariamente recomendariam</p>
              </div>
              <div className="admin-feedbacks-nps-category admin-feedbacks-nps-promoter">
                <span className="admin-feedbacks-nps-category-score">9-10</span>
                <strong>Promotor</strong>
                <p>Usuários satisfeitos que recomendariam o curso</p>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="admin-feedbacks-modal-section">
            <h3>❓ Perguntas do Feedback</h3>
            {FEEDBACK_QUESTIONS.map((question, idx) => (
              <div key={question.id} className="admin-feedbacks-question-info">
                <h4>{idx + 1}. {question.text}</h4>
                <div className="admin-feedbacks-question-options">
                  {question.options?.map((option) => (
                    <div 
                      key={option.value}
                      className={`admin-feedbacks-option ${question.worstOptions?.includes(option.value) ? "worst" : ""}`}
                    >
                      {question.worstOptions?.includes(option.value) && <span className="admin-feedbacks-worst-indicator">⚠️</span>}
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
                {question.worstOptions && (
                  <p className="admin-feedbacks-worst-note">
                    ℹ️ Respostas {question.worstOptions.map(v => `"${FEEDBACK_QUESTIONS.find(q => q.id === question.id)?.options?.find(o => o.value === v)?.label || v}"`).join(" ou ")} podem incluir comentário do aluno (opcional).
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="admin-feedbacks-modal-section">
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
