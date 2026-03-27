"use client";

import { useMemo, useRef, useState } from 'react';
import HeaderDropdown from './HeaderDropdown/HeaderDropdown';
import './HeaderNav.css';

export default function HeaderNav({
  sidebarData,
  currentCategory,
  currentSlug,
  onNavigateStart,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const timeoutRef = useRef(null);

  const { tutorialsGroup, coursesGroup, resumesGroup } = useMemo(() => {
    if (!Array.isArray(sidebarData)) {
      return { tutorialsGroup: null, coursesGroup: null, resumesGroup: null };
    }

    const tutorials = sidebarData.filter((cat) => cat.accessType === 'tutorial');
    const courses = sidebarData.filter(
      (cat) => cat.accessType === 'free-course' || cat.accessType === 'paid-course'
    );
    const resumes = sidebarData.filter((cat) => cat.accessType === 'resume');

    return {
      tutorialsGroup: tutorials.length > 0 ? { type: 'tutorial', categories: tutorials } : null,
      coursesGroup: courses.length > 0 ? { type: 'course', categories: courses } : null,
      resumesGroup: resumes.length > 0 ? { type: 'resume', categories: resumes } : null,
    };
  }, [sidebarData]);

  const handleMouseEnter = (dropdownName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleDropdownClick = () => {
    setOpenDropdown(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <nav className="header-nav">
      {tutorialsGroup && (
        <HeaderDropdown
          label="Tutoriais"
          icon="/icons/ic_tutorials.svg"
          group={tutorialsGroup}
          isOpen={openDropdown === 'tutorials'}
          onMouseEnter={() => handleMouseEnter('tutorials')}
          onMouseLeave={handleMouseLeave}
          currentCategory={currentCategory}
          currentSlug={currentSlug}
          onNavigateStart={onNavigateStart}
          onLinkClick={handleDropdownClick}
        />
      )}

      {coursesGroup && (
        <HeaderDropdown
          label="Cursos"
          icon="/icons/ic_courses.svg"
          group={coursesGroup}
          isOpen={openDropdown === 'courses'}
          onMouseEnter={() => handleMouseEnter('courses')}
          onMouseLeave={handleMouseLeave}
          currentCategory={currentCategory}
          currentSlug={currentSlug}
          onNavigateStart={onNavigateStart}
          onLinkClick={handleDropdownClick}
        />
      )}

      {resumesGroup && (
        <HeaderDropdown
          label="Resumos"
          icon="/icons/ic_resumes.svg"
          group={resumesGroup}
          isOpen={openDropdown === 'resumes'}
          onMouseEnter={() => handleMouseEnter('resumes')}
          onMouseLeave={handleMouseLeave}
          currentCategory={currentCategory}
          currentSlug={currentSlug}
          onNavigateStart={onNavigateStart}
          onLinkClick={handleDropdownClick}
        />
      )}
    </nav>
  );
}
