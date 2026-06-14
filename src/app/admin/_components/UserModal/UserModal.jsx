"use client";

import { useEffect, useState } from "react";
import { formatDate } from "../../_utils/format";
import styles from "./UserModal.module.css";
import * as Icons from "@/assets/icons";

export function UserModal({ user, onClose }) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!user) return;

    let active = true;
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/users/${user.userId}`);
        const data = await res.json();
        if (active && data.success) {
          setDetails(data);
        }
      } catch (err) {
        console.error("Erro ao buscar detalhes do usuário:", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();

    return () => {
      active = false;
    };
  }, [user]);

  if (!user) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBg}></div>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Detalhes do Aluno</h2>

        <div className={styles.modalInfo}>
          <p><strong>ID do Usuário:</strong> <code className={styles.code}>{user.userId}</code></p>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>E-mail:</strong> {user.email}</p>
          <p><strong>Data de Criação:</strong> {formatDate(user.createdAt)}</p>
          <p><strong>Último Login:</strong> {formatDate(user.lastLoginAt)}</p>
        </div>

        <h3 className={styles.sectionTitle}>Matrículas e Progresso</h3>

        <div className={styles.coursesSection}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>Carregando progresso do aluno...</p>
            </div>
          ) : details?.courses && details.courses.length > 0 ? (
            <div className={styles.courseList}>
              {details.courses.map((course) => (
                <div key={course.courseId} className={styles.courseCard}>
                  <div className={styles.courseHeader}>
                    <h4 className={styles.courseName}>{course.courseTitle}</h4>
                    <span
                      className={`${styles.badge} ${course.isEnrolled ? styles.badgeEnrolled : styles.badgeNotEnrolled
                        }`}
                    >
                      {course.isEnrolled ? "Matriculado" : "Não Matriculado"}
                    </span>
                  </div>

                  {course.enrolledAt && (
                    <p className={styles.courseMeta}>
                      Inscrito em: {formatDate(course.enrolledAt)}
                    </p>
                  )}

                  {course.isEnrolled && (
                    <div className={styles.progressWrapper}>
                      <div className={styles.progressBarBg}>
                        <div
                          className={styles.progressBarFill}
                          style={{ width: `${course.completionPercentage}%` }}
                        ></div>
                      </div>
                      <div className={styles.progressDetails}>
                        <span>
                          {course.completedLessonsCount} de {course.totalLessonsCount} aulas concluídas
                        </span>
                        <span className={styles.percentageText}>
                          {course.completionPercentage}%
                        </span>
                      </div>
                      <div className={styles.courseFooterActions}>
                        {course.completedAt && (
                          <p className={styles.completedMeta}>
                            <Icons.Check size={12} /> Concluído em: {formatDate(course.completedAt)}
                          </p>
                        )}
                        {course.certificate && (
                          <a
                            href={`/api/certificates/download/${course.certificate.certificateId}`}
                            download
                            className={styles.downloadCertBtn}
                            title="Baixar Certificado"
                          >
                            <Icons.Download size={12} />
                            <span>Certificado</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              Nenhum progresso ou matrícula registrados.
            </div>
          )}
        </div>

        <div className={styles.modalActions}>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            Fechar
          </button>
        </div>

        <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Fechar modal">
          ✕
        </button>
      </div>
    </div>
  );
}
