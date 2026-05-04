import ApprovedCertificateSection from "@/components/ApprovedCertificateSection";

export function ApprovedMessage({ courseSlug }) {
  return (
    <>
      <div className="project-submission-success-message">
        <div className="project-submission-success-message-header">
          <img
            src="/icons/ic_approved.svg"
            alt="Aprovado"
            className="project-submission-success-message-icon"
          />
          <p className="project-submission-success-message-title">
            Projeto Aprovado
          </p>
        </div>
        <p className="project-submission-success-message-description">
          Parabéns! Seu projeto foi aprovado. Você não pode mais enviar novas versões.
        </p>
      </div>
      <ApprovedCertificateSection
        courseSlug={courseSlug}
        courseName={courseSlug}
        workloadHours={0}
      />
    </>
  );
}
