"use client";

import { useState } from 'react';
import CourseItem from './sidebar/CourseItem';
import SectionHeader from './sidebar/SectionHeader';
import TutorialItem from './sidebar/TutorialItem';
import useExpandedItems from './sidebar/useExpandedItems';
import { isCourseEnrolled, isModifiedClick } from './sidebar/utils';

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
  const [expandedItems, setExpandedItems] = useExpandedItems();

  const handleLinkClick = () => {
    if (isMobile && onLinkClick) {
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

  const tutorialCategories = sidebarData.filter(
    (category) => category.accessType === 'tutorial'
  );

  const courseCategories = sidebarData.filter(
    (category) => category.accessType !== 'tutorial'
  );

  const shouldShowTutorials = tutorialCategories.length > 0;
  const shouldShowCourses = courseCategories.length > 0;

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''} ${isMobile ? 'sidebar-mobile' : ''}`}>
      <nav className="sidebar-nav">
        {shouldShowTutorials && (
          <section className="sidebar-group">
            <SectionHeader
              title="Tutoriais"
              iconSrc="/icons/ic_tutorials.svg"
              isOpen={isTutorialsOpen}
              onToggle={() => setIsTutorialsOpen((prev) => !prev)}
            />
            <div className={`sidebar-collapse ${isTutorialsOpen ? 'open' : ''}`}>
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
            <div className={`sidebar-collapse ${isCoursesOpen ? 'open' : ''}`}>
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
      </nav>
    </aside>
  );
}