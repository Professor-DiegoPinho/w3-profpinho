export function WarningMessages({
  submitCheckLoading,
  canSubmit,
  missingLessons,
  hasPendingSubmission,
}) {
  return (
    <>
      {!submitCheckLoading && !canSubmit && missingLessons.length > 0 && (
        <div className="project-submission-warning">
          <p className="project-submission-warning-title">
            ⚠️ Aulas incompletas
          </p>
          <p className="project-submission-warning-description">
            Você precisa completar as seguintes aulas antes de enviar o projeto:
          </p>
          <ul className="project-submission-missing-lessons">
            {missingLessons.map((lesson) => (
              <li key={lesson.slug} className="project-submission-missing-lesson">
                {lesson.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasPendingSubmission && (
        <div className="project-submission-warning project-submission-pending-warning">
          <p className="project-submission-warning-title">
            ⏳ Submissão em análise
          </p>
          <p className="project-submission-warning-description">
            Você já possui uma entrega em análise. Aguarde a avaliação do professor antes de enviar uma nova.
          </p>
        </div>
      )}
    </>
  );
}
