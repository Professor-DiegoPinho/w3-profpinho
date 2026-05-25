"use client";

import "./Toast.css";

export function Toast({ message, type = "success", isVisible = false }) {
  if (!isVisible) return null;

  return (
    <div className={`toast toast-${type}`}>
      {type === "success" && <span className="toast-icon">✓</span>}
      {type === "error" && <span className="toast-icon">✕</span>}
      <span className="toast-message">{message}</span>
    </div>
  );
}
