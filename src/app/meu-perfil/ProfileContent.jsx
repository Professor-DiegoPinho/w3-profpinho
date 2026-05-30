'use client';

import AvatarImage from '@/components/AvatarImage/AvatarImage';
import CertificatesSection from '@/components/CertificatesSection';
import { NameEditModal } from '@/components/NameEditModal/NameEditModal';
import ProfileConnectButton from '@/components/ProfileConnectButton/ProfileConnectButton';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import styles from './ProfileContent.module.css';

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
  const { update: updateSession } = useSession();
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
      
      // Sincronizar a sessão com o novo nome no JWT
      await updateSession({ 
        trigger: 'update',
      });
      
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
      <section className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <AvatarImage
              src={userImage}
              alt={`Foto de ${userName}`}
              width={72}
              height={72}
              className={styles.avatar}
            />
            <div>
              <h1>Meu perfil</h1>
              <p>Acompanhe seus cursos inscritos e os dados da sua conta.</p>
            </div>
          </div>
        </header>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Nome</span>
            <div className={styles.nameContainer}>
              <strong>{userName}</strong>
              <button
                type="button"
                onClick={handleOpenNameEdit}
                className={styles.nameEditButton}
                title="Clique para editar seu nome"
                aria-label="Editar nome"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  fill="currentColor"
                  className={styles.nameEditIcon}
                >
                  <path d="M160-120q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm544-528 56-56-56-56-56 56 56 56Z" />
                </svg>
                <span>Editar</span>
              </button>
            </div>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Email</span>
            <strong>{userEmail}</strong>
          </div>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.coursesHeader}>
              <div>
                <h2>Meus cursos</h2>
                <p className={styles.subtitle}>
                  Acompanhe os cursos que já fazem parte da sua jornada.
                </p>
              </div>
            </div>

            {enrolledCourses.length > 0 ? (
              <ul className={styles.courseList}>
                {enrolledCourses.map((course) => (
                  <li key={course.id} className={styles.courseItem}>
                    <div className={styles.courseContent}>
                      <h3 className={styles.courseTitle}>{course.title}</h3>
                      <p className={styles.courseMeta}>
                        {course.enrolledAt
                          ? `Inscrição em ${course.enrolledAtLabel}`
                          : 'Data de inscrição indisponível'}
                      </p>
                      {course.progress && (
                        <div className={styles.progress}>
                          <div className={styles.progressBar}>
                            <div
                              className={styles.progressFill}
                              style={{
                                width: `${course.progress.completionPercentage || 0}%`,
                              }}
                            />
                          </div>
                          <span className={styles.progressText}>
                            {course.progress.completionPercentage || 0}% completo
                          </span>
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/${course.id}${course.nextLessonSlug ? `/${course.nextLessonSlug}` : ''}`}
                      className={styles.courseLink}
                      aria-label={`Acessar curso ${course.title}`}
                    >
                      {course.progress?.completionPercentage === 100 ? 'Acessar curso' : 'Continuar curso'}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.emptyState}>
                <p>Você ainda não possui inscrições em cursos.</p>
                <Link href="/" className={styles.courseLink}>
                  Explorar cursos
                </Link>
              </div>
            )}

            <p className={styles.countText} aria-label="Quantidade de cursos inscritos">
              Total: <strong>{totalEnrolledCoursesLabel}</strong>
            </p>
          </article>

          <article className={styles.card}>
            <CertificatesSection />
          </article>

          <article className={styles.card}>
            <h2>Contas conectadas</h2>
            <p className={styles.connectionsSubtitle}>
              Visualize as opções de login vinculadas ao seu perfil.
            </p>

            <ul className={styles.connectionsList} aria-label="Lista de contas conectadas">
              {connectedAccounts.map((providerItem) => (
                <li
                  key={providerItem.key}
                  className={`${styles.connectionItem} ${
                    providerItem.isConnected ? styles.connected : styles.disconnected
                  }`}
                >
                  <div className={styles.connectionMain}>
                    <h3 className={styles.connectionTitle}>
                      <span
                        className={`${styles.connectionIcon} ${
                          providerItem.key === 'google' ? styles.googleIcon : styles.githubIcon
                        }`}
                        aria-hidden="true"
                      />
                      {providerItem.label}
                    </h3>
                  </div>

                  <div className={styles.connectionStatus}>
                    <span className={styles.connectionBadge}>
                      {providerItem.isConnected ? 'Conectada' : 'Não conectada'}
                    </span>
                    {!providerItem.isConnected && providerItem.isAvailable && (
                      <ProfileConnectButton
                        provider={providerItem.key}
                        providerLabel={providerItem.label}
                        className={styles.connectButton}
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

          <aside className={styles.card}>
            <h2>Informações adicionais</h2>
            <dl className={styles.infoList}>
              <div className={styles.infoRow}>
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
