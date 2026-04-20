"use client";

import { validateUrl } from "@/lib/urlValidation";
import { useCallback, useEffect, useState } from "react";
import { ApprovedMessage } from "./components/ApprovedMessage";
import { ConfirmationModal } from "./components/ConfirmationModal";
import { DetailsModal } from "./components/DetailsModal";
import { FormSection } from "./components/FormSection";
import { SubmissionsHistory } from "./components/SubmissionsHistory";
import { WarningMessages } from "./components/WarningMessages";
import { useDebounce } from "./hooks/useDebounce";
import "./ProjectSubmission.css";

export default function ProjectSubmission({
  courseSlug,
  projectTitle = "Projeto",
  initialSubmissions = [],
}) {
  const [url, setUrl] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [canSubmit, setCanSubmit] = useState(null);
  const [submitCheckLoading, setSubmitCheckLoading] = useState(true);
  const [missingLessons, setMissingLessons] = useState([]);
  const [hasPendingSubmission, setHasPendingSubmission] = useState(false);
  const [hasApprovedSubmission, setHasApprovedSubmission] = useState(false);
  const [approvedSubmission, setApprovedSubmission] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingSubmission, setPendingSubmission] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  const debouncedUrl = useDebounce(url, 300);
  const { platform } = validateUrl(debouncedUrl);

  // Verificar se há submissão pendente
  useEffect(() => {
    const pendingExists = Array.isArray(submissions) && submissions.some((sub) => sub.status === "pending");
    setHasPendingSubmission(pendingExists);
  }, [submissions]);

  // Verificar se há submissão aprovada
  useEffect(() => {
    const approved = Array.isArray(submissions) && submissions.find((sub) => sub.status === "approved");
    setHasApprovedSubmission(!!approved);
    if (approved) {
      setApprovedSubmission(approved);
    }
  }, [submissions]);

  useEffect(() => {
    if (!courseSlug) return;

    const checkSubmitPermission = async () => {
      setSubmitCheckLoading(true);
      try {
        const res = await fetch(`/api/submissions/can-submit?course=${courseSlug}`);
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (showConfirmation) {
          setShowConfirmation(false);
          setPendingSubmission(null);
        }
        if (showDetailsModal) {
          setShowDetailsModal(false);
          setSelectedSubmission(null);
        }
      }
    };

    const handleOverlayClick = (e) => {
      if (showConfirmation && e.target.className === "project-submission-confirmation-overlay") {
        setShowConfirmation(false);
        setPendingSubmission(null);
      }
      if (showDetailsModal && e.target.className === "project-submission-details-overlay") {
        setShowDetailsModal(false);
        setSelectedSubmission(null);
      }
    };

    if (showConfirmation || showDetailsModal) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("click", handleOverlayClick);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [showConfirmation, showDetailsModal]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!canSubmit) {
      setError("Você precisa completar todas as aulas antes de enviar o projeto.");
      return;
    }

    if (hasPendingSubmission) {
      setError("Você já possui uma submissão em análise. Aguarde o professor revisar antes de enviar uma nova.");
      return;
    }

    // Validar URL apenas ao enviar
    const validation = validateUrl(url);
    if (!validation.isValid) {
      setError("Por favor, insira uma URL válida.");
      return;
    }

    setError("");
    setSuccessMessage("");

    const trimmedFeedback = feedback.trim();

    setPendingSubmission({
      url,
      platform: validation.platform || "Outro",
      feedback: trimmedFeedback.length > 0 ? trimmedFeedback : null,
    });
    setShowConfirmation(true);
  }, [url, feedback, courseSlug, canSubmit, hasPendingSubmission]);

  const handleConfirmSubmission = useCallback(async () => {
    if (!pendingSubmission) return;

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          submissionUrl: pendingSubmission.url,
          platform: pendingSubmission.platform,
          feedback: pendingSubmission.feedback,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Falha ao enviar projeto.");
      }

      const data = await res.json();
      setSubmissions(data.submissions || []);
      setUrl("");
      setFeedback("");
      setShowConfirmation(false);
      setPendingSubmission(null);
      setSuccessMessage("✓ Projeto enviado com sucesso!");
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Erro ao enviar projeto:", err);
      setError(err.message || "Erro ao enviar projeto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [pendingSubmission, courseSlug]);

  const handleCancelSubmission = useCallback(() => {
    setShowConfirmation(false);
    setPendingSubmission(null);
  }, []);

  const handleOpenDetails = useCallback((submission) => {
    setSelectedSubmission(submission);
    setShowDetailsModal(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setShowDetailsModal(false);
    setSelectedSubmission(null);
  }, []);



  return (
    <div className="project-submission-container">
      <div className="project-submission-content">
        <div className="project-submission-text-section">
          <h3 className="project-submission-title">Entregar {projectTitle}</h3>
          <p className="project-submission-description">
            Compartilhe o link da sua entrega. Lembre-se de deixar o projeto público para que possamos avaliar seu trabalho! 
          </p>
        </div>

        <WarningMessages
          submitCheckLoading={submitCheckLoading}
          canSubmit={canSubmit}
          missingLessons={missingLessons}
          hasPendingSubmission={hasPendingSubmission}
        />

        {hasApprovedSubmission && (
          <ApprovedMessage courseSlug={courseSlug} />
        )}

        {!hasApprovedSubmission && (
          <FormSection
            url={url}
            setUrl={setUrl}
            feedback={feedback}
            setFeedback={setFeedback}
            error={error}
            successMessage={successMessage}
            loading={loading}
            submitCheckLoading={submitCheckLoading}
            canSubmit={canSubmit}
            hasPendingSubmission={hasPendingSubmission}
            onSubmit={handleSubmit}
          />
        )}

        <SubmissionsHistory
          submissions={submissions}
          onOpenDetails={handleOpenDetails}
        />

        <ConfirmationModal
          isOpen={showConfirmation}
          pendingSubmission={pendingSubmission}
          loading={loading}
          onConfirm={handleConfirmSubmission}
          onCancel={handleCancelSubmission}
        />

        <DetailsModal
          isOpen={showDetailsModal}
          submission={selectedSubmission}
          onClose={handleCloseDetails}
        />
      </div>
    </div>
  );
}
