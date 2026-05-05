"use client";

import { FEEDBACK_QUESTIONS } from "@/lib/feedbackConfig";
import {
  formatDate,
  getAnswerLabel,
  getNpsColor,
  getNpsLabel,
  isWorstAnswer
} from "./feedbackUtils";

export function FeedbackCard({ feedback, isExpanded, onToggle }) {
  return (
    <div className="admin-feedback-card">
      <div 
        className="admin-feedback-header"
        onClick={() => onToggle(isExpanded ? null : feedback.id)}
      >
        <div className="admin-feedback-header-left">
          <h3 className="admin-feedback-user-name">{feedback.userName}</h3>
          <p className="admin-feedback-course">{feedback.courseSlug}</p>
        </div>
        
        <div className="admin-feedback-header-right">
          <div className={`admin-nps-badge ${getNpsColor(feedback.npsScore)}`}>
            <span className="admin-nps-score">{feedback.npsScore}</span>
            <span className="admin-nps-label">{getNpsLabel(feedback.npsScore)}</span>
          </div>
          <span className="admin-feedback-date">{formatDate(feedback.respondedAt)}</span>
        </div>

        <button className="admin-feedback-toggle">
          {isExpanded ? "▼" : "▶"}
        </button>
      </div>

      {isExpanded && (
        <div className="admin-feedback-details">
          {/* Seção de Respostas */}
          {feedback.answers && Object.keys(feedback.answers).length > 0 && (
            <div className="admin-feedback-section">
              <h4 className="admin-feedback-section-title">📋 Respostas</h4>
              <div className="admin-feedback-answers">
                {Object.entries(feedback.answers).map(([questionId, answer]) => {
                  const question = FEEDBACK_QUESTIONS.find(q => q.id === questionId);
                  const hasComment = feedback.questionComments?.[questionId];
                  const isWorst = isWorstAnswer(questionId, answer, FEEDBACK_QUESTIONS);

                  return (
                    <div 
                      key={questionId} 
                      className={`admin-feedback-answer-item ${isWorst ? "admin-feedback-answer-worst" : ""}`}
                    >
                      <div className="admin-feedback-answer-header">
                        <strong>{question?.text || questionId}</strong>
                        {isWorst && <span className="admin-feedback-worst-badge">⚠️ Resposta Crítica</span>}
                      </div>
                      <p className="admin-feedback-answer-value">
                        {getAnswerLabel(questionId, answer, FEEDBACK_QUESTIONS)}
                      </p>
                      
                      {hasComment && (
                        <div className="admin-feedback-question-comment">
                          <span className="admin-feedback-comment-label">💬 Comentário:</span>
                          <p>{hasComment}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Seção de Comentário Geral */}
          <div className="admin-feedback-section">
            <h4 className="admin-feedback-section-title">💭 Comentário Geral</h4>
            {feedback.comment ? (
              <p className="admin-feedback-comment">{feedback.comment}</p>
            ) : (
              <p className="admin-feedback-comment-empty">O usuário não escreveu nenhum comentário.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
