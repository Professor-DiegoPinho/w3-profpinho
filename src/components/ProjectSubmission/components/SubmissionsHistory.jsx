import { formatDate } from "../utils/dateFormatter";
import { getStatusIcon, getStatusText } from "../utils/statusHelpers";

export function SubmissionsHistory({ submissions, onOpenDetails }) {
  if (submissions.length === 0) return null;

  return (
    <div className="project-submission-history">
      <h4 className="project-submission-history-title">
        Histórico de entregas ({submissions.length})
      </h4>
      <ul className="project-submission-list">
        {[...submissions].reverse().map((submission) => (
          <li
            key={submission.id}
            className="project-submission-item"
            onClick={() => onOpenDetails(submission)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onOpenDetails(submission);
              }
            }}
          >
            <div className={`project-submission-item-status-badge project-submission-item-status-badge-${submission.status}`}>
              <span className="project-submission-item-status-icon">
                {getStatusIcon(submission.status)}
              </span>
            </div>
            <div className="project-submission-item-content">
              <div className="project-submission-item-header">
                <span className="project-submission-item-platform">
                  {submission.platform}
                </span>
                <span className="project-submission-item-date">
                  {formatDate(submission.submittedAt)}
                </span>
              </div>
              <a
                href={submission.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-submission-item-link"
                onClick={(e) => e.stopPropagation()}
              >
                {submission.url}
              </a>
              {submission.feedback && (
                <p className="project-submission-item-feedback">
                  {submission.feedback}
                </p>
              )}
            </div>
            <div className={`project-submission-item-status-label project-submission-item-status-label-${submission.status}`}>
              {getStatusText(submission.status)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
