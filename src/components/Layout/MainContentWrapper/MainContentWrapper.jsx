'use client';

import LessonContentSkeleton from '@/components/Skeletons/LessonContentSkeleton';
import ProfilePageSkeleton from '@/components/Skeletons/ProfilePageSkeleton';
import styles from './MainContentWrapper.module.css';

export default function MainContentWrapper({
  isRouteLoading,
  isProfileRouteLoading,
  children
}) {
  return (
    <div className={`${styles.wrapper} ${isRouteLoading ? styles.loading : ''}`}>
      {isRouteLoading ? (
        isProfileRouteLoading ? (
          <ProfilePageSkeleton />
        ) : (
          <LessonContentSkeleton />
        )
      ) : (
        children
      )}
    </div>
  );
}
