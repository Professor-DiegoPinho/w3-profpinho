export function getStatusIcon(status) {
  switch (status) {
    case "pending":
      return "⏳";
    case "approved":
      return (
        <img
          src="/icons/ic_approved.svg"
          alt="Aprovado"
          className="project-submission-status-icon-img"
        />
      );
    case "rejected":
      return (
        <img
          src="/icons/ic_rejected.svg"
          alt="Reprovado"
          className="project-submission-status-icon-img"
        />
      );
    default:
      return "•";
  }
}

export function getStatusText(status) {
  switch (status) {
    case "pending":
      return "Em análise";
    case "approved":
      return "Aprovado";
    case "rejected":
      return "Reprovado";
    default:
      return "Em análise";
  }
}
