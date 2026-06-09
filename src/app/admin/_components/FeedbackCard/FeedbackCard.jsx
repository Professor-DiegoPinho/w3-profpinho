"use client";

import { FEEDBACK_QUESTIONS } from "@/lib/feedbackConfig";
import { formatDate } from "../../_utils/format";
import {
  getAnswerLabel,
  getNpsColor,
  getNpsLabel,
  isWorstAnswer
} from "../../_utils/feedback-helpers";
import styles from "./FeedbackCard.module.css";

export function FeedbackCard({ feedback, isExpanded, onToggle }) {
  const npsColor = getNpsColor(feedback.npsScore);

  return (
    <div className={styles.card}>
      <div 
        className={styles.header}
        onClick={() => onToggle(isExpanded ? null : feedback.id)}
      >
        <div className={styles.headerLeft}>
          <h3 className={styles.userName}>{feedback.userName}</h3>
          <p className={styles.course}>{feedback.courseSlug}</p>
        </div>
        
        <div className={styles.headerRight}>
          <div className={`${styles.npsBadge} ${styles[npsColor]}`}>
            <span className={styles.npsScore}>{feedback.npsScore}</span>
            <span className={styles.npsLabel}>{getNpsLabel(feedback.npsScore)}</span>
          </div>
          <span className={styles.date}>{formatDate(feedback.respondedAt)}</span>
        </div>

        <button className={styles.toggle} aria-label="Expandir feedback">
          {isExpanded ? "▼" : "▶"}
        </button>
      </div>

      {isExpanded && (
        <div className={styles.details}>
          {/* Seção de Respostas */}
          {feedback.answers && Object.keys(feedback.answers).length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>📋 Respostas</h4>
              <div className={styles.answers}>
                {Object.entries(feedback.answers).map(([questionId, answer]) => {
                  const question = FEEDBACK_QUESTIONS.find(q => q.id === questionId);
                  const hasComment = feedback.questionComments?.[questionId];
                  const isWorst = isWorstAnswer(questionId, answer, FEEDBACK_QUESTIONS);

                  return (
                    <div 
                      key={questionId} 
                      className={`${styles.answerItem} ${isWorst ? styles.answerWorst : ""}`}
                    >
                      <div className={styles.answerHeader}>
                        <strong className={isWorst ? styles.textWorst : styles.textNormal}>
                          {question?.text || questionId}
                        </strong>
                        {isWorst && <span className={styles.worstBadge}>⚠️ Resposta Crítica</span>}
                      </div>
                      <p className={styles.answerValue}>
                        {getAnswerLabel(questionId, answer, FEEDBACK_QUESTIONS)}
                      </p>
                      
                      {hasComment && (
                        <div className={styles.questionComment}>
                          <span className={styles.commentLabel}>💬 Comentário:</span>
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
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>💭 Comentário Geral</h4>
            {feedback.comment ? (
              <p className={styles.comment}>{feedback.comment}</p>
            ) : (
              <p className={styles.commentEmpty}>O usuário não escreveu nenhum comentário.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
