"use client";

import { useState } from "react";
import { FeedbackCard } from "../FeedbackCard/FeedbackCard";
import { FeedbackInfoModal } from "../FeedbackInfoModal/FeedbackInfoModal";
import styles from "./FeedbacksPageClient.module.css";

export function FeedbacksPageClient({ feedbacks }) {
  const [expandedFeedbackId, setExpandedFeedbackId] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <>
      <div className={styles.infoWrapper}>
        <button
          className={styles.infoButton}
          onClick={() => setShowInfoModal(true)}
          title="Ver informações sobre o feedback"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="10" cy="4.5" r="1" fill="currentColor" />
            <line
              x1="10"
              y1="7"
              x2="10"
              y2="14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {feedbacks.map((feedback) => (
        <FeedbackCard
          key={feedback.id}
          feedback={feedback}
          isExpanded={expandedFeedbackId === feedback.id}
          onToggle={setExpandedFeedbackId}
        />
      ))}

      <FeedbackInfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
    </>
  );
}
