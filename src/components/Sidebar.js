"use client";

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SIDEBAR_EXPANDED_COURSES_KEY = 'sidebar-expanded-my-course-lessons';

export default function Sidebar({
  sidebarData,
  currentCategory,
  isOpen = true,
  isMobile = false,
  onLinkClick,
  onNavigateStart
}) {
  const { status } = useSession();
  const [isMyCoursesOpen, setIsMyCoursesOpen] = useState(true);
  const [isAvailableCoursesOpen, setIsAvailableCoursesOpen] = useState(true);
  const [expandedMyCourseLessons, setExpandedMyCourseLessons] = useState({});
  const [hasLoadedExpandedLessons, setHasLoadedExpandedLessons] = useState(false);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(SIDEBAR_EXPANDED_COURSES_KEY);

      if (!storedValue) {
        return;
      }

      const parsedValue = JSON.parse(storedValue);

      if (parsedValue && typeof parsedValue === 'object') {
        setExpandedMyCourseLessons(parsedValue);
      }
    } catch {
      setExpandedMyCourseLessons({});
    } finally {
      setHasLoadedExpandedLessons(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedExpandedLessons) {
      return;
    }

    try {
      localStorage.setItem(
        SIDEBAR_EXPANDED_COURSES_KEY,
        JSON.stringify(expandedMyCourseLessons)
      );
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Falha ao persistir estado dos toggles da sidebar:', error);
      }
    }
  }, [expandedMyCourseLessons, hasLoadedExpandedLessons]);

  const handleLinkClick = () => {
    if (isMobile && onLinkClick) {
      onLinkClick();
    }
  };

  const handleCategoryLinkClick = (event, categorySlug) => {
    const isCurrentCategoryPage = currentCategory === categorySlug;
    const targetPath = `/${categorySlug}`;
    const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

    if (!isCurrentCategoryPage && !isModifiedClick && !event.defaultPrevented && onNavigateStart) {
      onNavigateStart(targetPath);
    }

    handleLinkClick();
  };

  const handlePostLinkClick = (event, post) => {
    const targetPath = `/${post.category}/${post.slug}`;
    const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

    if (!isModifiedClick && !event.defaultPrevented && onNavigateStart) {
      onNavigateStart(targetPath);
    }

    handleLinkClick();
  };

  const toggleMyCourseLessons = (categorySlug) => {
    setExpandedMyCourseLessons((prev) => ({
      ...prev,
      [categorySlug]: !prev[categorySlug],
    }));
  };

  const enrolledCourses = sidebarData.filter((category) =>
    Array.isArray(category.posts) && category.posts.some((post) => !post.isRestricted)
  );

  const availableCourses = sidebarData.filter((category) =>
    !enrolledCourses.some((enrolledCategory) => enrolledCategory.category === category.category)
  );
  const shouldShowMyCourses = status === 'authenticated';
  const shouldShowAvailableCourses = availableCourses.length > 0;

  const renderMyCourseLinks = (categories) => (
    categories.map((category) => {
      const isExpanded = Boolean(expandedMyCourseLessons[category.category]);

      return (
        <div key={category.category} className="category-section">
          <div className="category-link-row">
            <Link
              href={`/${category.category}`}
              className={`category-link ${currentCategory === category.category ? 'active' : ''}`}
              onClick={(event) => handleCategoryLinkClick(event, category.category)}
            >
              <span className="category-title">{category.title}</span>
            </Link>

            <button
              type="button"
              className="category-toggle-btn"
              aria-label={isExpanded ? 'Fechar aulas' : 'Abrir aulas'}
              onClick={() => toggleMyCourseLessons(category.category)}
            >
              <span className={`category-toggle-icon ${isExpanded ? 'open' : ''}`}>▾</span>
            </button>
          </div>

          {isExpanded && Array.isArray(category.posts) && category.posts.length > 0 && (
            <ul className="posts-list">
              {category.posts.map((post) => (
                <li key={post.slug} className="post-item">
                  <Link
                    href={`/${post.category}/${post.slug}`}
                    className="post-link"
                    onClick={(event) => handlePostLinkClick(event, post)}
                  >
                    <span className="post-link-text">{post.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    })
  );

  const renderCategoryLinks = (categories) => (
    categories.map((category) => (
      <div key={category.category} className="category-section">
        <Link
          href={`/${category.category}`}
          className={`category-link ${currentCategory === category.category ? 'active' : ''}`}
          onClick={(event) => handleCategoryLinkClick(event, category.category)}
        >
          <span className="category-title">{category.title}</span>
        </Link>
      </div>
    ))
  );

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''} ${isMobile ? 'sidebar-mobile' : ''}`}>
      <nav className="sidebar-nav">
        {shouldShowMyCourses && (
          <section className="sidebar-group">
            <button
              type="button"
              className="sidebar-group-title"
              onClick={() => setIsMyCoursesOpen((prev) => !prev)}
            >
              <span>Meus cursos</span>
              <span className={`sidebar-group-toggle ${isMyCoursesOpen ? 'open' : ''}`}>▾</span>
            </button>
            {isMyCoursesOpen && renderMyCourseLinks(enrolledCourses)}
          </section>
        )}

        {shouldShowAvailableCourses && (
          <section className="sidebar-group">
            <button
              type="button"
              className="sidebar-group-title"
              onClick={() => setIsAvailableCoursesOpen((prev) => !prev)}
            >
              <span>Cursos disponíveis</span>
              <span className={`sidebar-group-toggle ${isAvailableCoursesOpen ? 'open' : ''}`}>▾</span>
            </button>
            {isAvailableCoursesOpen && renderCategoryLinks(availableCourses)}
          </section>
        )}
      </nav>
    </aside>
  );
}