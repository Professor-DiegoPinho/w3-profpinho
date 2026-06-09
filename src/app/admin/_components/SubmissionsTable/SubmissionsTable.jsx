"use client";

import { useState } from "react";
import { formatOrdinal, formatDate } from "../../_utils/format";
import { EvaluationModal } from "../EvaluationModal/EvaluationModal";
import styles from "./SubmissionsTable.module.css";

export function SubmissionsTable({ attempts }) {
  const [activeAttempt, setActiveAttempt] = useState(null);

  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Curso</th>
              <th>Tentativa</th>
              <th>Data de Submissão</th>
              <th>Link</th>
              <th>Avaliar</th>
            </tr>
          </thead>
          <tbody>
            {attempts.length > 0 ? (
              attempts.map((item) => {
                const uniqueId = `${item.userId}-${item.submissionId}-${item.attemptIndex}`;
                const isEvaluated = item.attempt?.status && item.attempt.status !== "pending";

                return (
                  <tr key={uniqueId} onClick={() => setActiveAttempt(item)}>
                    <td>{item.userName}</td>
                    <td>{item.courseSlug}</td>
                    <td>{formatOrdinal(item.attemptNumber)}</td>
                    <td>{formatDate(item.attempt?.submittedAt)}</td>
                    <td>
                      <a
                        href={item.attempt?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkButton}
                        title="Acessar link da submissão"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          className={styles.linkIcon}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </td>
                    <td>
                      {isEvaluated ? (
                        <span className={`${styles.statusBadge} ${styles[item.attempt.status]}`}>
                          {item.attempt.status === "approved" ? "✓ Aprovado" : "✕ Reprovado"}
                        </span>
                      ) : (
                        <button
                          type="button"
                          className={styles.evaluateButton}
                        >
                          <svg
                            className={styles.evaluateIcon}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Avaliar
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className={styles.emptyCell}>
                  Nenhuma submissão encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EvaluationModal
        attempt={activeAttempt}
        onClose={() => setActiveAttempt(null)}
      />
    </>
  );
}
