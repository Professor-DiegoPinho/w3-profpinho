'use client';

import AuthButton from '@/components/AuthButton/AuthButton';
import HeaderNav from '@/components/Layout/Header/HeaderNav/HeaderNav';
import SearchBox from '@/components/Layout/Header/SearchBox/SearchBox';
import HamburgerButton from './HamburgerButton/HamburgerButton';
import styles from './Header.module.css';
import HeaderBrand from './HeaderBrand/HeaderBrand';

export default function Header({
  isSidebarOpen,
  toggleSidebar,
  sidebarData,
  resolvedCurrentCategory,
  resolvedCurrentSlug,
  handleNavigateStart
}) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <HamburgerButton
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        <HeaderBrand />

        <HeaderNav
          sidebarData={sidebarData}
          currentCategory={resolvedCurrentCategory}
          currentSlug={resolvedCurrentSlug}
          onNavigateStart={handleNavigateStart}
        />

        <SearchBox className={styles.search} />

        <div className={styles.auth}>
          <AuthButton onNavigateStart={handleNavigateStart} />
        </div>
      </div>
    </header>
  );
}
