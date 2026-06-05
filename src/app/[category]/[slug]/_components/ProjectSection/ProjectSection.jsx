"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { WarningMessages } from "./WarningMessages/WarningMessages";
import { SubmissionsHistory } from "./SubmissionHistory/SubmissionsHistory";
import { DetailsModal } from "./DetailsModal/DetailsModal";
import ApprovedCertificateSection from "@/components/ApprovedCertificateSection/ApprovedCertificateSection";
import styles from "./ProjectSection.module.css";

export default function ProjectSection({
  courseSlug,
  initialSubmissions = [],
  userName,
  userId,
}) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [canSubmit, setCanSubmit] = useState(null);
  const [submitCheckLoading, setSubmitCheckLoading] = useState(true);
  const [missingLessons, setMissingLessons] = useState([]);
  const [hasPendingSubmission, setHasPendingSubmission] = useState(false);
  const [hasApprovedSubmission, setHasApprovedSubmission] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Verificar se há submissão pendente
  useEffect(() => {
    const pendingExists =
      Array.isArray(submissions) &&
      submissions.some((sub) => sub.status === "pending");
    setHasPendingSubmission(pendingExists);
  }, [submissions]);

  // Verificar se há submissão aprovada
  useEffect(() => {
    const approved =
      Array.isArray(submissions) &&
      submissions.some((sub) => sub.status === "approved");
    setHasApprovedSubmission(approved);
  }, [submissions]);

  // Verificar permissão de envio (aulas incompletas, etc.)
  useEffect(() => {
    if (!courseSlug) return;

    const checkSubmitPermission = async () => {
      setSubmitCheckLoading(true);
      try {
        const res = await fetch(
          `/api/submissions/can-submit?course=${courseSlug}`,
        );
        if (!res.ok) {
          setCanSubmit(true);
          setSubmitCheckLoading(false);
          return;
        }
        const data = await res.json();
        setCanSubmit(data.canSubmit);
        setMissingLessons(data.missingLessons || []);
      } catch (err) {
        console.error("Erro ao verificar permissão de envio:", err);
        setCanSubmit(true);
      } finally {
        setSubmitCheckLoading(false);
      }
    };

    checkSubmitPermission();
  }, [courseSlug]);

  // Gerenciar escuta de tecla ESC para fechar modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showDetailsModal) {
        setShowDetailsModal(false);
        setSelectedSubmission(null);
      }
    };

    if (showDetailsModal) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDetailsModal]);

  const handleOpenDetails = useCallback((submission) => {
    setSelectedSubmission(submission);
    setShowDetailsModal(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setShowDetailsModal(false);
    setSelectedSubmission(null);
  }, []);

  const isDisabled = !canSubmit || hasPendingSubmission || hasApprovedSubmission;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <h3 className={styles.title}>
            Para entregar seu projeto, clique no botão abaixo:
          </h3>

          {hasApprovedSubmission && (
            <ApprovedCertificateSection
              courseSlug={courseSlug}
              courseName=""
              workloadHours={0}
            />
          )}

          <WarningMessages
            submitCheckLoading={submitCheckLoading}
            canSubmit={canSubmit}
            missingLessons={missingLessons}
            hasPendingSubmission={hasPendingSubmission}
          />

          <SubmissionsHistory
            submissions={submissions}
            onOpenDetails={handleOpenDetails}
          />

          <DetailsModal
            isOpen={showDetailsModal}
            submission={selectedSubmission}
            onClose={handleCloseDetails}
          />
        </div>

        {isDisabled ? (
          <button className={styles.simpleBtn} disabled>
            Formulário de Entrega
          </button>
        ) : (
          <Link href={`/${courseSlug}/projeto/entrega`} className={styles.simpleBtn}>
            Formulário de Entrega
          </Link>
        )}
      </div>
    </div>
  );
}
