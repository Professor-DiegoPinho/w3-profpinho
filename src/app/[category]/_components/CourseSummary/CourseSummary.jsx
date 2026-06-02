import styles from "./CourseSummary.module.css";

export default function CourseSummary({
  totalLessons,
  totalEnrolledStudents,
  courseWorkloadHours,
}) {
  return (
    <div className={styles.summary}>
      <div className={styles.summaryItem}>
        <strong>
          {totalLessons} {totalLessons === 1 ? "Aula" : "Aulas"}
        </strong>
        <span>Conteúdo do curso</span>
      </div>
      <div className={styles.summaryItem}>
        <strong>
          {"+"}{totalEnrolledStudents < 100 ? 100 : totalEnrolledStudents}{" Alunos"}
        </strong>
        <span>Comunidade ativa</span>
      </div>
      <div className={styles.summaryItem}>
        <strong>
          {courseWorkloadHours}{" "}
          {courseWorkloadHours === 1 ? "Hora" : "Horas"}
        </strong>
        <span>Carga horária estimada</span>
      </div>
    </div>
  );
}
