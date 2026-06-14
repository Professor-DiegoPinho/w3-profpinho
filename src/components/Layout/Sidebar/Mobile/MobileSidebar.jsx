"use client";

import {
  findSidebarCategory,
  getCategoryIcon,
  isUserEnrolled,
  useSidebarCollections,
} from '@/components/Layout/Sidebar/hooks/useSidebarData';
import { useSidebarNavigation } from '@/components/Layout/Sidebar/hooks/useSidebarNavigation';
import MobileCategoriesView from '@/components/Layout/Sidebar/Mobile/MobileCategoriesView/MobileCategoriesView';
import MobileContentView from '@/components/Layout/Sidebar/Mobile/MobileContentView/MobileContentView';
import MobilePostsView from '@/components/Layout/Sidebar/Mobile/MobilePostsView/MobilePostsView';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './MobileSidebar.module.css';

export default function MobileSidebar({
  sidebarData,
  currentCategory,
  currentSlug,
  isOpen = true,
  onLinkClick,
  onNavigateStart,
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const onLinkClickRef = useRef(onLinkClick);

  const { tutorials, courses, resumes } = useSidebarCollections(sidebarData);

  const selectedSubCategoryData = useMemo(() => {
    if (!selectedSubCategory || !sidebarData) {
      return null;
    }

    // Remove o sufixo __enrollment se existir
    const cleanCategorySlug = selectedSubCategory.endsWith('__enrollment')
      ? selectedSubCategory.replace('__enrollment', '')
      : selectedSubCategory;

    return findSidebarCategory(sidebarData, cleanCategorySlug);
  }, [selectedSubCategory, sidebarData]);

  const isEnrollmentScreen = selectedSubCategory?.endsWith('__enrollment') || false;
  const activePage = selectedSubCategory ? 2 : selectedCategory ? 1 : 0;
  const handleSidebarNavigation = useSidebarNavigation({ onLinkClick, onNavigateStart });

  // Atualizar a ref com o valor atual de onLinkClick
  useEffect(() => {
    onLinkClickRef.current = onLinkClick;
  }, [onLinkClick]);

  // Redirecionar automaticamente quando precisa de inscrição
  useEffect(() => {
    if (isEnrollmentScreen && selectedSubCategoryData) {
      const enrollmentUrl = `/${selectedSubCategoryData.category}`;
      router.push(enrollmentUrl);
      // Voltar para a TELA 1 ao redirecionar
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      if (onLinkClickRef.current) {
        onLinkClickRef.current();
      }
    }
  }, [isEnrollmentScreen, selectedSubCategoryData, router]);

  const handleCategorySelect = (categoryType) => {
    setSelectedCategory(categoryType);
    setSelectedSubCategory(null);
  };

  const handleSubCategorySelect = (categorySlug) => {
    setSelectedSubCategory(categorySlug);
  };

  const handleCourseSelect = (courseData) => {
    // Se não está logado ou é um curso pago e não está inscrito, mostra tela de inscrição
    if (!session || (courseData.accessType === 'paid-course' && !isUserEnrolled(session, courseData.category))) {
      // Marca como "precisa inscrição" criando um estado especial
      setSelectedSubCategory(`${courseData.category}__enrollment`);
    } else {
      // Se está logado e é gratuito ou está inscrito, vai para TELA 3
      setSelectedSubCategory(courseData.category);
    }
  };

  const handleBack = () => {
    if (selectedSubCategory) {
      setSelectedSubCategory(null);
    } else {
      setSelectedCategory(null);
    }
  };

  const handlePostLinkClick = (event, post) => {
    const targetPath = `/${post.category}/${post.slug}`;

    handleSidebarNavigation(event, targetPath);
  };

  const handleCategoryLinkClick = (event, categoryData) => {
    const firstSlug = categoryData.posts?.[0]?.slug || '';
    const targetPath = `/${categoryData.category}/${firstSlug}`;

    handleSidebarNavigation(event, targetPath);
  };

  // Renderização de 3 telas
  return (
    <aside className={`${styles.mobileSidebar} ${isOpen ? styles.sidebarOpen : ''}`.trim()}>
      <div className={styles.mobileSidebarViewport}>
        <div
          className={styles.mobileSidebarPages}
          style={{
            transform: `translate3d(-${(activePage * 100) / 3}%, 0, 0)`,
          }}
        >
          <MobileCategoriesView
            tutorials={tutorials}
            courses={courses}
            resumes={resumes}
            onCategorySelect={handleCategorySelect}
            getCategoryIcon={getCategoryIcon}
            onClose={onLinkClick}
          />

          <MobileContentView
            selectedCategory={selectedCategory}
            tutorials={tutorials}
            courses={courses}
            resumes={resumes}
            currentCategory={currentCategory}
            currentSlug={currentSlug}
            onBack={handleBack}
            onSubCategorySelect={handleSubCategorySelect}
            onCourseSelect={handleCourseSelect}
            onCategoryLinkClick={handleCategoryLinkClick}
          />

          <MobilePostsView
            selectedCategory={selectedCategory}
            selectedSubCategoryData={selectedSubCategoryData}
            isEnrollmentScreen={isEnrollmentScreen}
            currentSlug={currentSlug}
            onBack={handleBack}
            onPostClick={handlePostLinkClick}
          />
        </div>
      </div>
    </aside>
  );
}
