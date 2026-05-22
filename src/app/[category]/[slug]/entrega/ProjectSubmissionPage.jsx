'use client';

import { NameEditModal } from '@/components/NameEditModal/NameEditModal';
import { ApprovedMessage } from '@/components/ProjectSubmission/components/ApprovedMessage';
import { DetailsModal } from '@/components/ProjectSubmission/components/DetailsModal';
import { FormSection } from '@/components/ProjectSubmission/components/FormSection';
import { SubmissionsHistory } from '@/components/ProjectSubmission/components/SubmissionsHistory';
import { useDebounce } from '@/components/ProjectSubmission/hooks/useDebounce';
import '@/components/ProjectSubmission/ProjectSubmission.css';
import { validateUrl } from '@/lib/urlValidation';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import './ProjectSubmissionPage.css';

export function ProjectSubmissionPage({
  category,
  projectTitle = 'Projeto',
  initialSubmissions = [],
  userName,
  userId,
}) {
  const { update: updateSession } = useSession();
  const [url, setUrl] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(null);
  const [submitCheckLoading, setSubmitCheckLoading] = useState(true);
  const [missingLessons, setMissingLessons] = useState([]);
  const [hasPendingSubmission, setHasPendingSubmission] = useState(false);
  const [hasApprovedSubmission, setHasApprovedSubmission] = useState(false);
  const [approvedSubmission, setApprovedSubmission] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [displayUserName, setDisplayUserName] = useState(userName);
  const [isNameEditOpen, setIsNameEditOpen] = useState(false);
  const [isLoadingNameEdit, setIsLoadingNameEdit] = useState(false);
  const [confirmedLink, setConfirmedLink] = useState(false);
  const [confirmedPublic, setConfirmedPublic] = useState(false);
  const [confirmedAnalysis, setConfirmedAnalysis] = useState(false);
  const [confirmedName, setConfirmedName] = useState(false);

  const debouncedUrl = useDebounce(url, 300);
  const { platform } = validateUrl(debouncedUrl);
  const allConfirmationsChecked = confirmedLink && confirmedPublic && confirmedAnalysis && confirmedName;

  // Verificar se há submissão pendente
  useEffect(() => {
    const pendingExists = Array.isArray(submissions) && submissions.some((sub) => sub.status === 'pending');
    setHasPendingSubmission(pendingExists);
  }, [submissions]);

  // Verificar se há submissão aprovada
  useEffect(() => {
    const approved = Array.isArray(submissions) && submissions.find((sub) => sub.status === 'approved');
    setHasApprovedSubmission(!!approved);
    if (approved) {
      setApprovedSubmission(approved);
    }
  }, [submissions]);

  // Buscar permissão de submissão
  useEffect(() => {
    const checkSubmitPermission = async () => {
      try {
        const response = await fetch(
          `/api/submissions?course=${category}`,
          { method: 'GET' }
        );
        if (!response.ok) {
          throw new Error('Erro ao verificar permissão de submissão');
        }
        const data = await response.json();
        setCanSubmit(data.canSubmit);
        setMissingLessons(data.missingLessons || []);
        setSubmissions(data.submissions?.attempts || []);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      } finally {
        setSubmitCheckLoading(false);
      }
    };

    checkSubmitPermission();
  }, [category]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault?.();
      if (!canSubmit) return;

      setLoading(true);
      setError('');
      setSuccessMessage('');

      try {
        const response = await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseSlug: category,
            url: debouncedUrl,
            platform,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao enviar submissão');
        }

        const data = await response.json();
        setSubmissions(data.submissions?.attempts || []);
        setUrl('');
        setSuccessMessage('Submissão realizada com sucesso! Aguarde a avaliação do professor.');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [canSubmit, debouncedUrl, platform, category]
  );

  const handleOpenDetails = useCallback((submission) => {
    setSelectedSubmission(submission);
    setShowDetailsModal(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setShowDetailsModal(false);
    setSelectedSubmission(null);
  }, []);

  const handleNameChange = (newName) => {
    setDisplayUserName(newName);
  };

  const handleOpenNameEdit = () => {
    setIsNameEditOpen(true);
  };

  const handleConfirmNameEdit = async (newName) => {
    setIsLoadingNameEdit(true);
    try {
      const response = await fetch(`/api/users/${userId}/name`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao atualizar nome');
      }

      const data = await response.json();
      setDisplayUserName(data.name);
      
      await updateSession({ 
        trigger: 'update',
      });
      
      setIsNameEditOpen(false);
      handleNameChange(data.name);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingNameEdit(false);
    }
  };

  const handleCancelNameEdit = () => {
    setIsNameEditOpen(false);
  };

  return (
    <>
      <div className="project-submission-page-container">
        <div className="project-submission-page-inner">
          <div className="project-submission-page-title-section">
            <h1>Formulário de Entrega</h1>
          </div>

          {hasApprovedSubmission && (
            <ApprovedMessage courseSlug={category} />
          )}

          {!hasApprovedSubmission && (
            <>
              <div className="project-submission-page-form-section">
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
                  showSubmitButton={false}
                />
              </div>

              <div className="project-submission-page-confirmation-section">
                <h2>Antes de entregar, verifique os items abaixo:</h2>

                <ul className="project-submission-page-confirmation-checklist">
                  <li className="project-submission-page-confirmation-item">
                    <input
                      type="checkbox"
                      id="check-link"
                      className="project-submission-page-confirmation-checkbox"
                      checked={confirmedLink}
                      onChange={(e) => setConfirmedLink(e.target.checked)}
                    />
                    <label htmlFor="check-link">
                      <strong>Link correto e acessível:</strong> verifiquei o endereço acima
                    </label>
                  </li>
                  <li className="project-submission-page-confirmation-item">
                    <input
                      type="checkbox"
                      id="check-public"
                      className="project-submission-page-confirmation-checkbox"
                      checked={confirmedPublic}
                      onChange={(e) => setConfirmedPublic(e.target.checked)}
                    />
                    <label htmlFor="check-public">
                      <strong>Projeto público:</strong> meu projeto está visível para avaliação
                    </label>
                  </li>
                  <li className="project-submission-page-confirmation-item">
                    <input
                      type="checkbox"
                      id="check-analysis"
                      className="project-submission-page-confirmation-checkbox"
                      checked={confirmedAnalysis}
                      onChange={(e) => setConfirmedAnalysis(e.target.checked)}
                    />
                    <label htmlFor="check-analysis">
                      <strong>Aguarde análise:</strong> entendo que não poderei enviar nova entrega até o professor avaliar
                    </label>
                  </li>
                  <li className="project-submission-page-confirmation-item">
                    <input
                      type="checkbox"
                      id="check-name"
                      className="project-submission-page-confirmation-checkbox"
                      checked={confirmedName}
                      onChange={(e) => setConfirmedName(e.target.checked)}
                    />
                    <label htmlFor="check-name">
                      <div className="project-submission-page-name-check">
                        <span><strong>Verificar nome no certificado:</strong> confirmo que meu nome está completo e correto</span>
                        <p className="project-submission-page-name-warning">
                          ⚠️ Após a entrega, o nome não poderá ser alterado. Verifique se está completo e correto.
                        </p>
                        <div className="project-submission-page-name-display">
                          <span className="project-submission-page-name-label">Seu nome no certificado:</span>
                          <div className="project-submission-page-name-value">
                            <strong>{displayUserName}</strong>
                            <button
                              type="button"
                              onClick={handleOpenNameEdit}
                              className="project-submission-page-name-edit-btn"
                              title="Clique para editar seu nome"
                              aria-label="Editar nome para o certificado"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16px"
                                viewBox="0 -960 960 960"
                                width="16px"
                                fill="currentColor"
                              >
                                <path d="M160-120q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm544-528 56-56-56-56-56 56 56 56Z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>

              <div className="project-submission-page-submit-section">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !url.trim() || submitCheckLoading || !canSubmit || hasPendingSubmission || !allConfirmationsChecked}
                  className="project-submission-btn"
                  aria-label="Enviar entrega do projeto"
                  title={
                    hasPendingSubmission
                      ? "Aguarde a análise da submissão anterior"
                      : !url.trim()
                      ? "Preencha o link da entrega"
                      : !allConfirmationsChecked
                      ? "Confirme todos os itens antes de enviar"
                      : "Enviar entrega do projeto"
                  }
                >
                  {loading ? (
                    <>
                      <span className="project-submission-spinner" aria-hidden="true" />
                      Enviando...
                    </>
                  ) : submitCheckLoading ? (
                    <>
                      <span className="project-submission-spinner" aria-hidden="true" />
                      Verificando...
                    </>
                  ) : (
                    "Enviar Entrega"
                  )}
                </button>
              </div>
            </>
          )}

          <SubmissionsHistory
            submissions={submissions}
            onOpenDetails={handleOpenDetails}
          />
        </div>
      </div>

      <DetailsModal
        isOpen={showDetailsModal}
        submission={selectedSubmission}
        onClose={handleCloseDetails}
      />

      <NameEditModal
        isOpen={isNameEditOpen}
        currentName={displayUserName}
        onConfirm={handleConfirmNameEdit}
        onCancel={handleCancelNameEdit}
        loading={isLoadingNameEdit}
      />
    </>
  );
}
