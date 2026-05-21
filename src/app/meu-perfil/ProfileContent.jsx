'use client';

import AvatarImage from '@/components/AvatarImage/AvatarImage';
import CertificatesSection from '@/components/CertificatesSection';
import { NameEditModal } from '@/components/NameEditModal/NameEditModal';
import ProfileConnectButton from '@/components/ProfileConnectButton/ProfileConnectButton';
import Link from 'next/link';
import { useState } from 'react';

export function ProfileContent({
  userImage,
  userName: initialUserName,
  userEmail,
  enrolledCourses,
  totalEnrolledCoursesLabel,
  createdAtLabel,
  connectedAccounts,
  userId,
}) {
  const [userName, setUserName] = useState(initialUserName);
  const [isNameEditOpen, setIsNameEditOpen] = useState(false);
  const [isLoadingNameEdit, setIsLoadingNameEdit] = useState(false);

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
      setUserName(data.name);
      setIsNameEditOpen(false);
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
      <section className="profile-page">
        <header className="profile-header">
          <div className="profile-header-content">
            <AvatarImage
              src={userImage}
              alt={`Foto de ${userName}`}
              width={72}
              height={72}
              className="profile-avatar"
            />
            <div>
              <h1>Meu perfil</h1>
              <p>Acompanhe seus cursos inscritos e os dados da sua conta.</p>
            </div>
          </div>
        </header>

        <div className="profile-summary-grid">
          <div className="profile-summary-card">
            <span className="profile-summary-label">Nome</span>
          <div className="profile-name-container">
              <strong>{userName}</strong>
              <button
                type="button"
                onClick={handleOpenNameEdit}
                className="profile-name-edit-btn"
                title="Clique para editar seu nome"
                aria-label="Editar nome"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  fill="currentColor"
                  className="profile-name-edit-icon"
                >
                  <path d="M160-120q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm544-528 56-56-56-56-56 56 56 56Z" />
                </svg>
                <span>Editar</span>
              </button>
            </div>
          </div>
          <div className="profile-summary-card">
            <span className="profile-summary-label">Email</span>
            <strong>{userEmail}</strong>
          </div>
        </div>

        <div className="profile-grid">
          <article className="profile-card">
            <div className="profile-courses-header">
              <div>
                <h2>Meus cursos</h2>
                <p className="profile-courses-subtitle">
                  Acompanhe os cursos que já fazem parte da sua jornada.
                </p>
              </div>
            </div>

            {enrolledCourses.length > 0 ? (
              <ul className="profile-course-list">
                {enrolledCourses.map((course) => (
                  <li key={course.id} className="profile-course-item">
                    <div className="profile-course-content">
                      <h3 className="profile-course-title">{course.title}</h3>
                      <p className="profile-course-meta">
                        {course.enrolledAt
                          ? `Inscrição em ${course.enrolledAtLabel}`
                          : 'Data de inscrição indisponível'}
                      </p>
                      {course.progress && (
                        <div className="profile-course-progress">
                          <div className="profile-course-progress-bar">
                            <div
                              className="profile-course-progress-fill"
                              style={{
                                width: `${course.progress.completionPercentage || 0}%`,
                              }}
                            />
                          </div>
                          <span className="profile-course-progress-text">
                            {course.progress.completionPercentage || 0}% completo
                          </span>
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/${course.id}${course.nextLessonSlug ? `/${course.nextLessonSlug}` : ''}`}
                      className="profile-course-link"
                      aria-label={`Acessar curso ${course.title}`}
                    >
                      {course.progress?.completionPercentage === 100 ? 'Acessar curso' : 'Continuar curso'}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="profile-empty-state">
                <p>Você ainda não possui inscrições em cursos.</p>
                <Link href="/" className="profile-course-link">
                  Explorar cursos
                </Link>
              </div>
            )}

            <p className="profile-course-count-text" aria-label="Quantidade de cursos inscritos">
              Total: <strong>{totalEnrolledCoursesLabel}</strong>
            </p>
          </article>

          <article className="profile-card">
            <CertificatesSection />
          </article>

          <article className="profile-card">
            <h2>Contas conectadas</h2>
            <p className="profile-connections-subtitle">
              Visualize as opções de login vinculadas ao seu perfil.
            </p>

            <ul className="profile-connections-list" aria-label="Lista de contas conectadas">
              {connectedAccounts.map((providerItem) => (
                <li
                  key={providerItem.key}
                  className={`profile-connection-item ${
                    providerItem.isConnected ? 'is-connected' : 'is-disconnected'
                  }`}
                >
                  <div className="profile-connection-main">
                    <h3 className="profile-connection-title">
                      <span
                        className={`profile-connection-icon ${providerItem.iconClassName}`}
                        aria-hidden="true"
                      />
                      {providerItem.label}
                    </h3>
                  </div>

                  <div className="profile-connection-status">
                    <span className="profile-connection-badge">
                      {providerItem.isConnected ? 'Conectada' : 'Não conectada'}
                    </span>
                    {!providerItem.isConnected && providerItem.isAvailable && (
                      <ProfileConnectButton
                        provider={providerItem.key}
                        providerLabel={providerItem.label}
                      />
                    )}
                    {!providerItem.isConnected && !providerItem.isAvailable && (
                      <p>Provider indisponível no ambiente atual</p>
                    )}
                    {providerItem.isConnected && (
                      <p>
                        {providerItem.connectedAtLabel
                          ? `Conectada em ${providerItem.connectedAtLabel}`
                          : 'Conectada'}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <aside className="profile-card">
            <h2>Informações adicionais</h2>
            <dl className="profile-info-list">
              <div>
                <dt>Conta criada em</dt>
                <dd>{createdAtLabel || 'Nao disponivel'}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <NameEditModal
        isOpen={isNameEditOpen}
        currentName={userName}
        onConfirm={handleConfirmNameEdit}
        onCancel={handleCancelNameEdit}
        loading={isLoadingNameEdit}
      />
    </>
  );
}
