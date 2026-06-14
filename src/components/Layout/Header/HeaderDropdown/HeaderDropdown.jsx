"use client";

import { isModifiedClick } from '@/components/Layout/utils/utils';
import Link from 'next/link';
import styles from './HeaderDropdown.module.css';

export default function HeaderDropdown({
  label,
  icon: Icon,
  iconSize = 20,
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
    // Para resumos, ir direto para o arquivo content.md
    const targetPath = group.type === 'resume' 
      ? `/${category.category}/content`
      : `/${category.category}`;

    if (!isModifiedClick(event) && !event.defaultPrevented && onNavigateStart) {
      onNavigateStart(targetPath);
    }

    onLinkClick?.();
  };

  return (
    <div
      className={styles.headerDropdownWrapper}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className={styles.headerDropdownTrigger} aria-label={`Abrir dropdown de ${label}`}>
        {Icon && <Icon size={iconSize} className={styles.headerDropdownIcon} />}
        <span className={styles.headerDropdownLabel}>{label}</span>
      </button>

      {isOpen && (
        <div className={styles.headerDropdownMenu}>
          <div className={styles.headerDropdownContent}>
            {group.categories.map((category) => {
              const isActive =
                currentCategory === category.category && (group.type === 'resume' || currentSlug);

              return (
                <Link
                  key={category.category}
                  href={group.type === 'resume' ? `/${category.category}/content` : `/${category.category}`}
                  className={`${styles.dropdownCategoryLink} ${isActive ? styles.active : ''}`}
                  onClick={(event) => handleCategoryClick(event, category)}
                >
                  <span className={styles.dropdownCategoryTitle}>{category.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
