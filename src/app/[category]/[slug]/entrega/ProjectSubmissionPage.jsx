'use client';

import { NameEditModal } from '@/components/NameEditModal/NameEditModal';
import { ApprovedMessage } from '@/components/ProjectSubmission/components/ApprovedMessage';
import { FormSection } from '@/components/ProjectSubmission/components/FormSection';
import { useDebounce } from '@/components/ProjectSubmission/hooks/useDebounce';
import '@/components/ProjectSubmission/ProjectSubmission.css';
import { validateUrl } from '@/lib/urlValidation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import styles from './ProjectSubmissionPage.module.css';

export function ProjectSubmissionPage({
  category,
  projectTitle = 'Projeto',
  initialSubmissions = [],
  userName,
  userId,
}) {
  const { update: updateSession } = useSession();
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [error, setError] = useState('');
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  // Redirecionar se há submissão pendente
  useEffect(() => {
    if (hasPendingSubmission) {
      router.push(`/${category}/projeto`);
    }
  }, [hasPendingSubmission, category, router]);

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
        setSubmissions(data.attempts || []);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      } finally {
        setSubmitCheckLoading(false);
      }
    };

    checkSubmitPermission();
  }, [category]);

  const handleReturnToProject = useCallback(() => {
    router.push(`/${category}/projeto`);
  }, [category, router]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault?.();
      if (!canSubmit) return;

      setLoading(true);
      setError('');

      try {
        const response = await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseSlug: category,
            submissionUrl: debouncedUrl,
            platform,
            feedback,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao enviar submissão');
        }

        const data = await response.json();
        setSubmissions(data.submissions?.attempts || []);
        setUrl('');
        setShowSuccessModal(true);
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
      {showSuccessModal && (
        <div className={styles.successModalOverlay}>
          <div className={styles.successModal}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.successTitle}>Projeto Enviado com Sucesso!</h2>
            <p className={styles.successDescription}>
              Seu projeto foi enviado e está em análise. Você será notificado quando o professor avaliar.
            </p>
            <button
              className={styles.successButton}
              onClick={handleReturnToProject}
            >
              Retornar para a tela do projeto
            </button>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.titleSection}>
            <h1>Formulário de Entrega</h1>
          </div>

          {hasApprovedSubmission && (
            <ApprovedMessage courseSlug={category} />
          )}

          {!hasApprovedSubmission && (
            <>
              <div className={styles.formSection}>
                <FormSection
                  url={url}
                  setUrl={setUrl}
                  feedback={feedback}
                  setFeedback={setFeedback}
                  error={error}
                  loading={loading}
                  submitCheckLoading={submitCheckLoading}
                  canSubmit={canSubmit}
                  hasPendingSubmission={hasPendingSubmission}
                  onSubmit={handleSubmit}
                  showSubmitButton={false}
                />
              </div>

              <div className={styles.confirmationSection}>
                <h2>Antes de entregar, verifique os items abaixo:</h2>

                <ul className={styles.checklist}>
                  <li className={styles.item}>
                    <input
                      type="checkbox"
                      id="check-link"
                      className={styles.checkbox}
                      checked={confirmedLink}
                      onChange={(e) => setConfirmedLink(e.target.checked)}
                    />
                    <label htmlFor="check-link">
                      <strong>Link correto e acessível:</strong> verifiquei o endereço acima
                    </label>
                  </li>
                  <li className={styles.item}>
                    <input
                      type="checkbox"
                      id="check-public"
                      className={styles.checkbox}
                      checked={confirmedPublic}
                      onChange={(e) => setConfirmedPublic(e.target.checked)}
                    />
                    <label htmlFor="check-public">
                      <strong>Projeto público:</strong> meu projeto está visível para avaliação
                    </label>
                  </li>
                  <li className={styles.item}>
                    <input
                      type="checkbox"
                      id="check-analysis"
                      className={styles.checkbox}
                      checked={confirmedAnalysis}
                      onChange={(e) => setConfirmedAnalysis(e.target.checked)}
                    />
                    <label htmlFor="check-analysis">
                      <strong>Aguarde análise:</strong> entendo que não poderei enviar nova entrega até o professor avaliar
                    </label>
                  </li>
                  <li className={styles.item}>
                    <input
                      type="checkbox"
                      id="check-name"
                      className={styles.checkbox}
                      checked={confirmedName}
                      onChange={(e) => setConfirmedName(e.target.checked)}
                    />
                    <label htmlFor="check-name">
                      <div className={styles.nameCheck}>
                        <span><strong>Verificar nome no certificado:</strong> confirmo que meu nome está completo e correto</span>
                        <p className={styles.nameWarning}>
                          ⚠️ Após a entrega, o nome não poderá ser alterado. Verifique se está completo e correto.
                        </p>
                        <div className={styles.nameDisplay}>
                          <span className={styles.nameLabel}>Seu nome no certificado:</span>
                          <div className={styles.nameValue}>
                            <strong>{displayUserName}</strong>
                            <button
                              type="button"
                              onClick={handleOpenNameEdit}
                              className={styles.nameEditButton}
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

              <div className={styles.submitSection}>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !url.trim() || submitCheckLoading || !canSubmit || hasPendingSubmission || !allConfirmationsChecked}
                  className={styles.submitButton}
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
                      <span className={styles.spinner} aria-hidden="true" />
                      Enviando...
                    </>
                  ) : submitCheckLoading ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Verificando...
                    </>
                  ) : (
                    "Enviar Entrega"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

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
