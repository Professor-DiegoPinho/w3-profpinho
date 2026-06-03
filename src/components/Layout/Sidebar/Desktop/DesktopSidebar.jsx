"use client";

import SidebarHeader from '@/components/Layout/Sidebar/Desktop/SidebarHeader/SidebarHeader';
import SidebarList from '@/components/Layout/Sidebar/Desktop/SidebarList/SidebarList';
import { useSidebarContextData } from '@/components/Layout/Sidebar/hooks/useSidebarData';
import { useSidebarNavigation } from '@/components/Layout/Sidebar/hooks/useSidebarNavigation';
import { useSession } from 'next-auth/react';
import styles from './DesktopSidebar.module.css';
import { Courses, Resumes, Tutorials } from '@/assets/icons';

export default function DesktopSidebar({
  sidebarData,
  currentCategory,
  currentSlug,
  isOpen = true,
  isMobile = false,
  onLinkClick,
  onNavigateStart,
}) {
  const { data: session } = useSession();
  const { currentContext, contextItems, categoryTitle } = useSidebarContextData(
    sidebarData,
    currentCategory,
    session,
  );
  const handleSidebarNavigation = useSidebarNavigation({ onLinkClick, onNavigateStart });

  if (!currentContext || contextItems.length === 0) {
    return null;
  }

  const IconComponent =
    currentContext === 'course'
      ? Courses
      : currentContext === 'tutorial'
        ? Tutorials
        : Resumes;

  return (
    <aside
      className={`${styles.dynamicSidebar} ${isOpen ? styles.sidebarOpen : ''} ${isMobile ? styles.dynamicSidebarMobile : ''}`.trim()}
    >
      <nav className={styles.dynamicSidebarNav}>
        <SidebarHeader Icon={IconComponent} title={categoryTitle} />
        <SidebarList
          context={currentContext}
          items={contextItems}
          currentSlug={currentSlug}
          currentCategory={currentCategory}
          onPostClick={handleSidebarNavigation}
        />
      </nav>
    </aside>
  );
}
