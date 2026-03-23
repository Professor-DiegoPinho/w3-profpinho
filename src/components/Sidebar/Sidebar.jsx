"use client";
import './Sidebar.css';

import { useEffect, useMemo, useState } from 'react';
import CourseItem from './CourseItem/CourseItem';
import ResumeItem from './ResumeItem/ResumeItem';
import SectionHeader from './SectionHeader/SectionHeader';
import TutorialItem from './TutorialItem/TutorialItem';
import useExpandedItems from './useExpandedItems/useExpandedItems';
import { isCourseEnrolled, isModifiedClick } from './utils/utils';

export default function Sidebar({
  sidebarData,
  currentCategory,
  currentSlug,
  isOpen = true,
  isMobile = false,
  onLinkClick,
  onNavigateStart
}) {
  const [isTutorialsOpen, setIsTutorialsOpen] = useState(true);
  const [isCoursesOpen, setIsCoursesOpen] = useState(true);
  const [isResumesOpen, setIsResumesOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useExpandedItems();

  useEffect(() => {
    if (!currentCategory || !currentSlug) {
      return;
    }

    setExpandedItems((prev) => {
      if (prev[currentCategory]) {
        return prev;
      }

      return {
        ...prev,
        [currentCategory]: true,
      };
    });
  }, [currentCategory, currentSlug, setExpandedItems]);

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const handleCategoryLinkClick = (event, categorySlug) => {
    const isCurrentCategoryPage = currentCategory === categorySlug;
    const targetPath = `/${categorySlug}`;

    if (!isCurrentCategoryPage && !isModifiedClick(event) && !event.defaultPrevented && onNavigateStart) {
      onNavigateStart(targetPath);
    }

    handleLinkClick();
  };

  const handlePostLinkClick = (event, post) => {
    const targetPath = `/${post.category}/${post.slug}`;

    if (!isModifiedClick(event) && !event.defaultPrevented && onNavigateStart) {
      onNavigateStart(targetPath);
    }

    handleLinkClick();
  };

  const toggleCategoryLessons = (categorySlug) => {
    setExpandedItems((prev) => ({
      ...prev,
      [categorySlug]: !prev[categorySlug],
    }));
  };

  const tutorialCategories = useMemo(
    () => sidebarData.filter((category) => category.accessType === 'tutorial'),
    [sidebarData]
  );

  const courseCategories = useMemo(
    () => sidebarData.filter((category) => category.accessType === 'free-course' || category.accessType === 'paid-course'),
    [sidebarData]
  );

  const resumeCategories = useMemo(
    () => sidebarData.filter((category) => category.accessType === 'resume'),
    [sidebarData]
  );

  useEffect(() => {
    if (!currentCategory || !currentSlug) {
      return;
    }

    const isTutorialCategory = tutorialCategories.some(
      (category) => category.category === currentCategory
    );

    if (isTutorialCategory) {
      setIsTutorialsOpen(true);
      return;
    }

    const isCourseCategory = courseCategories.some(
      (category) => category.category === currentCategory
    );

    if (isCourseCategory) {
      setIsCoursesOpen(true);
      return;
    }

    const isResumeCategory = resumeCategories.some(
      (category) => category.category === currentCategory
    );

    if (isResumeCategory) {
      setIsResumesOpen(true);
    }
  }, [currentCategory, currentSlug, tutorialCategories, courseCategories, resumeCategories]);

  const shouldShowTutorials = tutorialCategories.length > 0;
  const shouldShowCourses = courseCategories.length > 0;
  const shouldShowResumes = resumeCategories.length > 0;

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''} ${isMobile ? 'sidebar-mobile' : ''}`.trim()}>
      <nav className="sidebar-nav">
        {shouldShowTutorials && (
          <section className="sidebar-group">
            <SectionHeader
              title="Tutoriais"
              iconSrc="/icons/ic_tutorials.svg"
              isOpen={isTutorialsOpen}
              onToggle={() => setIsTutorialsOpen((prev) => !prev)}
            />
            <div className={`sidebar-collapse ${isTutorialsOpen ? 'open' : ''}`.trim()}>
              <div className="sidebar-collapse-inner">
                {tutorialCategories.map((category) => {
                  const isExpanded = Boolean(expandedItems[category.category]);
                  const isCategoryActive =
                    currentCategory === category.category && Boolean(currentSlug);

                  return (
                    <TutorialItem
                      key={category.category}
                      category={category}
                      isExpanded={isExpanded}
                      isCategoryActive={isCategoryActive}
                      onToggle={toggleCategoryLessons}
                      onPostClick={handlePostLinkClick}
                      currentCategory={currentCategory}
                      currentSlug={currentSlug}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {shouldShowCourses && (
          <section className="sidebar-group">
            <SectionHeader
              title="Cursos"
              iconSrc="/icons/ic_courses.svg"
              isOpen={isCoursesOpen}
              onToggle={() => setIsCoursesOpen((prev) => !prev)}
            />
            <div className={`sidebar-collapse ${isCoursesOpen ? 'open' : ''}`.trim()}>
              <div className="sidebar-collapse-inner">
                {courseCategories.map((category) => {
                  const enrolled = isCourseEnrolled(category);
                  const isExpanded = Boolean(expandedItems[category.category]);
                  const isCategoryActive = currentCategory === category.category;

                  return (
                    <CourseItem
                      key={category.category}
                      category={category}
                      enrolled={enrolled}
                      isExpanded={isExpanded}
                      isCategoryActive={isCategoryActive}
                      onToggle={toggleCategoryLessons}
                      onCategoryClick={handleCategoryLinkClick}
                      onPostClick={handlePostLinkClick}
                      currentCategory={currentCategory}
                      currentSlug={currentSlug}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {shouldShowResumes && (
          <section className="sidebar-group">
            <SectionHeader
              title="Resumos"
              iconSrc="/icons/ic_resumes.svg"
              isOpen={isResumesOpen}
              onToggle={() => setIsResumesOpen((prev) => !prev)}
            />
            <div className={`sidebar-collapse ${isResumesOpen ? 'open' : ''}`.trim()}>
              <div className="sidebar-collapse-inner">
                {resumeCategories.map((category) => {
                  const firstPost = category?.posts?.[0];

                  if (!firstPost) {
                    return null;
                  }

                  const isCategoryActive =
                    currentCategory === category.category && currentSlug === firstPost.slug;

                  return (
                    <ResumeItem
                      key={category.category}
                      category={category}
                      isCategoryActive={isCategoryActive}
                      onPostClick={handlePostLinkClick}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </nav>
    </aside>
  );
}