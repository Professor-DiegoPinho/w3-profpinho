"use client";

import Link from 'next/link';
import { useMemo } from 'react';
import { isModifiedClick } from '../Sidebar/utils/utils';
import './DynamicSidebar.css';

export default function DynamicSidebar({
  sidebarData,
  currentCategory,
  currentSlug,
  isOpen = true,
  isMobile = false,
  onLinkClick,
  onNavigateStart,
}) {
  const { currentContext, contextItems, categoryTitle } = useMemo(() => {
    if (!currentCategory || !sidebarData) {
      return { currentContext: null, contextItems: [], categoryTitle: '' };
    }

    // Find the category that matches the current path
    const matchedCategory = sidebarData.find((cat) => cat.category === currentCategory);

    if (!matchedCategory) {
      return { currentContext: null, contextItems: [], categoryTitle: '' };
    }

    const accessType = matchedCategory.accessType;
    const title = matchedCategory.title || '';

    // If user is in a course lesson
    if (accessType === 'free-course' || accessType === 'paid-course') {
      return {
        currentContext: 'course',
        contextItems:
          matchedCategory.posts && matchedCategory.posts.length > 0
            ? matchedCategory.posts
            : [],
        categoryTitle: title,
      };
    }

    // If user is in a tutorial
    if (accessType === 'tutorial') {
      return {
        currentContext: 'tutorial',
        contextItems:
          matchedCategory.posts && matchedCategory.posts.length > 0
            ? matchedCategory.posts
            : [],
        categoryTitle: title,
      };
    }

    // If user is in a resume - show list of other resumes
    if (accessType === 'resume') {
      const allResumes = sidebarData.filter((cat) => cat.accessType === 'resume');
      return {
        currentContext: 'resume',
        contextItems: allResumes,
        categoryTitle: title,
      };
    }

    return { currentContext: null, contextItems: [], categoryTitle: '' };
  }, [currentCategory, sidebarData]);

  const handlePostLinkClick = (event, post) => {
    const targetPath = `/${post.category}/${post.slug}`;

    if (!isModifiedClick(event) && !event.defaultPrevented && onNavigateStart) {
      onNavigateStart(targetPath);
    }

    onLinkClick?.();
  };

  const handleCategoryClick = (event, categorySlug) => {
    const targetPath = `/${categorySlug}`;

    if (!isModifiedClick(event) && !event.defaultPrevented && onNavigateStart) {
      onNavigateStart(targetPath);
    }

    onLinkClick?.();
  };

  // Don't show sidebar if there's no context
  if (!currentContext || contextItems.length === 0) {
    return null;
  }

  const contextLabel =
    currentContext === 'course'
      ? 'Aulas'
      : currentContext === 'tutorial'
        ? 'Conteúdo'
        : 'Resumos';

  const contextIcon =
    currentContext === 'course'
      ? '/icons/ic_courses.svg'
      : currentContext === 'tutorial'
        ? '/icons/ic_tutorials.svg'
        : '/icons/ic_resumes.svg';

  return (
    <aside
      className={`dynamic-sidebar ${isOpen ? 'sidebar-open' : ''} ${isMobile ? 'dynamic-sidebar-mobile' : ''}`.trim()}
    >
      <nav className="dynamic-sidebar-nav">
        <div className="sidebar-header">
          <img src={contextIcon} alt="" className="sidebar-header-icon" />
          <span className="sidebar-header-title">{categoryTitle}</span>
        </div>

        <div className="sidebar-items open">
          <div className="sidebar-items-inner">
            {currentContext === 'resume' ? (
              // For resumes, show list of resume categories (other resumes)
              <ul className="dynamic-sidebar-list">
                {contextItems.map((resume) => {
                  const isActive =
                    currentCategory === resume.category &&
                    currentSlug === resume.posts[0]?.slug;

                  return (
                    <li key={resume.category}>
                      <Link
                        href={`/${resume.category}/${resume.posts[0]?.slug || ''}`}
                        className={`dynamic-sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={(event) =>
                          handlePostLinkClick(event, {
                            ...resume.posts[0],
                            category: resume.category,
                          })
                        }
                      >
                        {resume.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              // For courses and tutorials, show list of posts/lessons
              <ul className="dynamic-sidebar-list">
                {contextItems.map((post, index) => {
                  const isActive = currentSlug === post.slug;

                  return (
                    <li key={post.slug}>
                      <Link
                        href={`/${post.category}/${post.slug}`}
                        className={`dynamic-sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={(event) => handlePostLinkClick(event, post)}
                      >
                        <span className="lesson-title">{post.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}
