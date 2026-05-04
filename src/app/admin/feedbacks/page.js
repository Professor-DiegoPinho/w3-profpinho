"use client";

import { FEEDBACK_QUESTIONS } from "@/lib/feedbackConfig";
import { useEffect, useState } from "react";
import "./feedbacks.css";

function formatDate(timestamp) {
  if (!timestamp) return "—";
  
  let date;
  if (typeof timestamp === "string") {
    date = new Date(timestamp);
  } else if (typeof timestamp?.toDate === "function") {
    date = timestamp.toDate();
  } else if (typeof timestamp === "number") {
    date = new Date(timestamp);
  } else {
    return "—";
  }

  if (isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getNpsColor(score) {
  if (score >= 9) return "admin-nps-promoter";
  if (score >= 7) return "admin-nps-passive";
  return "admin-nps-detractor";
}

function getNpsLabel(score) {
  if (score >= 9) return "Promotor";
  if (score >= 7) return "Neutro";
  return "Detrator";
}

function getAnswerLabel(questionId, answerValue) {
  const question = FEEDBACK_QUESTIONS.find(q => q.id === questionId);
  if (!question) return answerValue;
  
  const option = question.options?.find(opt => opt.value === answerValue);
  return option?.label || answerValue;
}

export default function FeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedFeedbackId, setExpandedFeedbackId] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/feedbacks");
        
        if (!response.ok) {
          throw new Error("Erro ao buscar feedbacks");
        }
        
        const data = await response.json();
        setFeedbacks(data.data || []);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar feedbacks:", err);
        setError(err.message);
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return (
      <div className="admin-feedbacks-container">
        <h1 className="admin-feedbacks-title">Feedbacks dos Alunos</h1>
        <div className="admin-feedbacks-loading">Carregando feedbacks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-feedbacks-container">
        <h1 className="admin-feedbacks-title">Feedbacks dos Alunos</h1>
        <div className="admin-feedbacks-error">Erro ao carregar feedbacks: {error}</div>
      </div>
    );
  }

  return (
    <div className="admin-feedbacks-container">
      <h1 className="admin-feedbacks-title">Feedbacks dos Alunos</h1>

      {feedbacks.length === 0 ? (
        <div className="admin-feedbacks-empty">Nenhum feedback encontrado</div>
      ) : (
        <div className="admin-feedbacks-stats">
          <div className="admin-feedbacks-stat-item">
            <span className="admin-feedbacks-stat-label">Total de Feedbacks:</span>
            <span className="admin-feedbacks-stat-value">{feedbacks.length}</span>
          </div>
          <div className="admin-feedbacks-stat-item">
            <span className="admin-feedbacks-stat-label">NPS Médio:</span>
            <span className="admin-feedbacks-stat-value">
              {(feedbacks.reduce((sum, f) => sum + f.npsScore, 0) / feedbacks.length).toFixed(1)}
            </span>
          </div>
        </div>
      )}

      {feedbacks.length > 0 && (
        <div className="admin-feedbacks-list">
          {feedbacks.map((feedback) => {
            const isExpanded = expandedFeedbackId === feedback.id;
            return (
              <div key={feedback.id} className="admin-feedback-card">
                <div 
                  className="admin-feedback-header"
                  onClick={() => setExpandedFeedbackId(isExpanded ? null : feedback.id)}
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
                    {feedback.answers && Object.keys(feedback.answers).length > 0 && (
                      <div className="admin-feedback-section">
                        <h4 className="admin-feedback-section-title">Respostas às Perguntas</h4>
                        <div className="admin-feedback-answers">
                          {Object.entries(feedback.answers).map(([questionId, answer]) => {
                            const question = FEEDBACK_QUESTIONS.find(q => q.id === questionId);
                            return (
                              <div key={questionId} className="admin-feedback-answer-item">
                                <strong>{question?.text || questionId}</strong>
                                <p>{getAnswerLabel(questionId, answer)}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="admin-feedback-section">
                      <h4 className="admin-feedback-section-title">Comentário Adicional</h4>
                      {feedback.comment ? (
                        <p className="admin-feedback-comment">{feedback.comment}</p>
                      ) : (
                        <p className="admin-feedback-comment" style={{ color: "#999", fontStyle: "italic" }}>
                          O usuário não escreveu nenhum comentário.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
