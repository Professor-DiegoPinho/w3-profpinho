'use client';

import CertificatesSection from '@/components/CertificatesSection';
import { NameEditModal } from '@/components/NameEditModal/NameEditModal';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { AdditionalInfo } from '../AdditionalInfo/AdditionalInfo';
import { Connections } from '../Connections/Connections';
import { Courses } from '../Courses/Courses';
import { Header } from '../Header/Header';
import { Summary } from '../Summary/Summary';
import styles from './Content.module.css';

export function Content({
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
        <Header userImage={userImage} userName={userName} />

        <Summary userName={userName} userEmail={userEmail} onEditName={handleOpenNameEdit} />

        <div className={styles.grid}>
          <Courses
            enrolledCourses={enrolledCourses}
            totalEnrolledCoursesLabel={totalEnrolledCoursesLabel}
          />

          <article className={styles.card}>
            <CertificatesSection />
          </article>

          <Connections connectedAccounts={connectedAccounts} />

          <AdditionalInfo createdAtLabel={createdAtLabel} />
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