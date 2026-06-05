import React from "react";
import { formatDate } from "@/lib/dateFormatter";
import { getStatusIcon, getStatusText } from "@/lib/statusHelpers";
import styles from "./SubmissionsHistory.module.css";

export function SubmissionsHistory({ submissions = [], onOpenDetails }) {
  if (submissions.length === 0) return null;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return styles.statusBadgeApproved;
      case "rejected":
        return styles.statusBadgeRejected;
      case "pending":
        return styles.statusBadgePending;
      default:
        return "";
    }
  };

  const getStatusLabelClass = (status) => {
    switch (status) {
      case "approved":
        return styles.statusLabelApproved;
      case "rejected":
        return styles.statusLabelRejected;
      case "pending":
        return styles.statusLabelPending;
      default:
        return "";
    }
  };

  return (
    <div className={styles.history}>
      <h4 className={styles.historyTitle}>
        Histórico de entregas ({submissions.length})
      </h4>
      <ul className={styles.list}>
        {[...submissions].reverse().map((submission) => (
          <li
            key={submission.id}
            className={styles.item}
            onClick={() => onOpenDetails(submission)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onOpenDetails(submission);
              }
            }}
          >
            <div className={`${styles.statusBadge} ${getStatusBadgeClass(submission.status)}`}>
              <span className={styles.statusIcon}>
                {getStatusIcon(submission.status, styles.statusIconImg)}
              </span>
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <span className={styles.platform}>
                  {submission.platform}
                </span>
                <span className={styles.date}>
                  {formatDate(submission.submittedAt)}
                </span>
              </div>
              <a
                href={submission.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                onClick={(e) => e.stopPropagation()}
              >
                {submission.url}
              </a>
            </div>
            <div className={`${styles.statusLabel} ${getStatusLabelClass(submission.status)}`}>
              {getStatusText(submission.status)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
