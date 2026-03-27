"use client";

import { isPaidCourse } from '@/lib/courseAccess';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { isModifiedClick } from '../Sidebar/utils/utils';
import './MobileSidebar.css';

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

  const { tutorials, courses, resumes } = useMemo(() => {
    if (!sidebarData || !Array.isArray(sidebarData)) {
      return { tutorials: [], courses: [], resumes: [] };
    }

    const tutorialsData = sidebarData.filter((cat) => cat.accessType === 'tutorial');
    const coursesData = sidebarData.filter((cat) => cat.accessType === 'free-course' || cat.accessType === 'paid-course');
    const resumesData = sidebarData.filter((cat) => cat.accessType === 'resume');

    return {
      tutorials: tutorialsData,
      courses: coursesData,
      resumes: resumesData,
    };
  }, [sidebarData]);

  const selectedSubCategoryData = useMemo(() => {
    if (!selectedSubCategory || !sidebarData) {
      return null;
    }

    // Remove o sufixo __enrollment se existir
    const cleanCategorySlug = selectedSubCategory.endsWith('__enrollment')
      ? selectedSubCategory.replace('__enrollment', '')
      : selectedSubCategory;

    return sidebarData.find((cat) => cat.category === cleanCategorySlug);
  }, [selectedSubCategory, sidebarData]);

  const isEnrollmentScreen = selectedSubCategory?.endsWith('__enrollment') || false;

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
    if (!session || (isPaidCourse(courseData.accessType) && !isUserEnrolled(courseData.category))) {
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

    if (!isModifiedClick(event) && !event.defaultPrevented && onNavigateStart) {
      onNavigateStart(targetPath);
    }

    onLinkClick?.();
  };

  const handleCategoryLinkClick = (event, categoryData) => {
    const firstSlug = categoryData.posts?.[0]?.slug || '';
    const targetPath = `/${categoryData.category}/${firstSlug}`;

    if (!isModifiedClick(event) && !event.defaultPrevented && onNavigateStart) {
      onNavigateStart(targetPath);
    }

    onLinkClick?.();
  };

  const isUserEnrolled = (courseId) => {
    if (!session?.user?.enrolledCourseIds) {
      return false;
    }
    return session.user.enrolledCourseIds.includes(courseId);
  };

  const getCategoryIcon = (type) => {
    switch (type) {
      case 'tutorial':
        return '/icons/ic_tutorials.svg';
      case 'course':
        return '/icons/ic_courses.svg';
      case 'resume':
        return '/icons/ic_resumes.svg';
      default:
        return '/icons/ic_tutorials.svg';
    }
  };

  // Renderização de 3 telas
  return (
    <aside className={`mobile-sidebar ${isOpen ? 'sidebar-open' : ''}`.trim()}>
      {!selectedCategory ? (
        // TELA 1: Seleção de tipo (Tutoriais/Cursos/Resumos)
        <nav className="mobile-sidebar-nav categories-view">
          <h2 className="mobile-sidebar-title">Conteúdo</h2>

          <ul className="mobile-categories-list">
            {tutorials.length > 0 && (
              <li>
                <button
                  className="mobile-category-btn"
                  onClick={() => handleCategorySelect('tutorial')}
                >
                  <img
                    src={getCategoryIcon('tutorial')}
                    alt="Tutoriais"
                    className="mobile-category-icon"
                  />
                  <span className="mobile-category-name">Tutoriais</span>
                </button>
              </li>
            )}

            {courses.length > 0 && (
              <li>
                <button
                  className="mobile-category-btn"
                  onClick={() => handleCategorySelect('course')}
                >
                  <img
                    src={getCategoryIcon('course')}
                    alt="Cursos"
                    className="mobile-category-icon"
                  />
                  <span className="mobile-category-name">Cursos</span>
                </button>
              </li>
            )}

            {resumes.length > 0 && (
              <li>
                <button
                  className="mobile-category-btn"
                  onClick={() => handleCategorySelect('resume')}
                >
                  <img
                    src={getCategoryIcon('resume')}
                    alt="Resumos"
                    className="mobile-category-icon"
                  />
                  <span className="mobile-category-name">Resumos</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      ) : !selectedSubCategory ? (
        // TELA 2: Seleção de categoria específica dentro do tipo
        <nav className="mobile-sidebar-nav content-view">
          <div className="mobile-sidebar-header">
            <button className="mobile-back-btn" onClick={handleBack}>
              <span className="mobile-back-arrow">←</span>
              <span>Voltar</span>
            </button>
            <h2 className="mobile-content-title">
              {selectedCategory === 'tutorial'
                ? 'Tutoriais'
                : selectedCategory === 'course'
                  ? 'Cursos'
                  : 'Resumos'}
            </h2>
          </div>

          {selectedCategory === 'resume' ? (
            // Para resumos (direto para a aula)
            <ul className="mobile-content-list">
              {resumes.map((resume) => {
                const isActive =
                  currentCategory === resume.category &&
                  currentSlug === resume.posts[0]?.slug;

                return (
                  <li key={resume.category}>
                    <Link
                      href={`/${resume.category}/${resume.posts[0]?.slug || ''}`}
                      className={`mobile-content-link ${isActive ? 'active' : ''}`}
                      onClick={(event) =>
                        handleCategoryLinkClick(event, resume)
                      }
                    >
                      {resume.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : selectedCategory === 'tutorial' ? (
            // Para tutoriais (clica em um tutorial para ver as aulas)
            <ul className="mobile-content-list">
              {tutorials.map((tutorial) => (
                <li key={tutorial.category}>
                  <button
                    className="mobile-content-btn"
                    onClick={() => handleSubCategorySelect(tutorial.category)}
                  >
                    {tutorial.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            // Para cursos (clica em um curso para ver as aulas ou inscrição)
            <ul className="mobile-content-list">
              {courses.map((course) => (
                <li key={course.category}>
                  <button
                    className="mobile-content-btn"
                    onClick={() => handleCourseSelect(course)}
                  >
                    {course.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>
      ) : (
        // TELA 3: Lista de aulas (para tutoriais e cursos)
        <nav className="mobile-sidebar-nav content-view">
          <div className="mobile-sidebar-header">
            <button className="mobile-back-btn" onClick={handleBack}>
              <span className="mobile-back-arrow">←</span>
              <span>Voltar</span>
            </button>
            {selectedSubCategoryData && (
              <h2 className="mobile-content-title">
                {selectedSubCategoryData.title}
              </h2>
            )}
          </div>

          {selectedCategory === 'course' && selectedSubCategoryData ? (
            // Para cursos: mostrar lista de aulas apenas se não precisa de inscrição
            !isEnrollmentScreen ? (
              <ul className="mobile-content-list">
                {selectedSubCategoryData?.posts?.map((post) => {
                  const isActive = currentSlug === post.slug;

                  return (
                    <li key={post.slug}>
                      <Link
                        href={`/${post.category}/${post.slug}`}
                        className={`mobile-content-link ${isActive ? 'active' : ''}`}
                        onClick={(event) => handlePostLinkClick(event, post)}
                      >
                        {post.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null
          ) : (
            // Para tutoriais: mostrar lista de aulas normalmente
            <ul className="mobile-content-list">
              {selectedSubCategoryData?.posts?.map((post) => {
                const isActive = currentSlug === post.slug;

                return (
                  <li key={post.slug}>
                    <Link
                      href={`/${post.category}/${post.slug}`}
                      className={`mobile-content-link ${isActive ? 'active' : ''}`}
                      onClick={(event) => handlePostLinkClick(event, post)}
                    >
                      {post.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      )}
    </aside>
  );
}
