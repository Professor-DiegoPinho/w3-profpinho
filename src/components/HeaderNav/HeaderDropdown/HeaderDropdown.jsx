"use client";

import { isModifiedClick } from '@/components/Sidebar/utils/utils';
import Link from 'next/link';
import './HeaderDropdown.css';

export default function HeaderDropdown({
  label,
  icon,
  group,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  currentCategory,
  currentSlug,
  onNavigateStart,
  onLinkClick,
}) {
  const handleCategoryClick = (event, category) => {
    const targetPath = `/${category.category}`;

    if (!isModifiedClick(event) && !event.defaultPrevented && onNavigateStart) {
      onNavigateStart(targetPath);
    }

    onLinkClick?.();
  };

  return (
    <div
      className="header-dropdown-wrapper"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="header-dropdown-trigger" aria-label={`Abrir dropdown de ${label}`}>
        {icon && <img src={icon} alt="" className="header-dropdown-icon" />}
        <span className="header-dropdown-label">{label}</span>
      </button>

      {isOpen && (
        <div className="header-dropdown-menu">
          <div className="header-dropdown-content">
            {group.categories.map((category) => {
              const isActive =
                currentCategory === category.category && (group.type === 'resume' || currentSlug);

              return (
                <Link
                  key={category.category}
                  href={`/${category.category}`}
                  className={`dropdown-category-link ${isActive ? 'active' : ''}`}
                  onClick={(event) => handleCategoryClick(event, category)}
                >
                  <span className="dropdown-category-title">{category.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
