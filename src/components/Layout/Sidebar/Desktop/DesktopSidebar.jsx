"use client";

import SidebarHeader from '@/components/Layout/Sidebar/Desktop/SidebarHeader/SidebarHeader';
import SidebarList from '@/components/Layout/Sidebar/Desktop/SidebarList/SidebarList';
import { useSidebarContextData } from '@/components/Layout/Sidebar/hooks/useSidebarData';
import { useSidebarNavigation } from '@/components/Layout/Sidebar/hooks/useSidebarNavigation';
import { useSession } from 'next-auth/react';
import styles from './DesktopSidebar.module.css';

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

  const contextIcon =
    currentContext === 'course'
      ? '/icons/ic_courses.svg'
      : currentContext === 'tutorial'
        ? '/icons/ic_tutorials.svg'
        : '/icons/ic_resumes.svg';

  return (
    <aside
      className={`${styles.dynamicSidebar} ${isOpen ? styles.sidebarOpen : ''} ${isMobile ? styles.dynamicSidebarMobile : ''}`.trim()}
    >
      <nav className={styles.dynamicSidebarNav}>
        <SidebarHeader icon={contextIcon} title={categoryTitle} />
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
