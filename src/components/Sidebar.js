"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar({
  sidebarData,
  currentCategory,
  currentSlug,
  isOpen = true,
  isMobile = false,
  onLinkClick,
  onNavigateStart
}) {
  const [expandedCategories, setExpandedCategories] = useState(
    sidebarData.reduce((acc, category) => {
      acc[category.category] = true; // Start with all categories expanded
      return acc;
    }, {})
  );

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleLinkClick = () => {
    if (isMobile && onLinkClick) {
      onLinkClick();
    }
  };

  const handlePostLinkClick = (event, post) => {
    const isCurrentPost = currentCategory === post.category && currentSlug === post.slug;
    const targetPath = post.isLocked ? `/${post.category}` : `/${post.category}/${post.slug}`;
    const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

    if (!isCurrentPost && !isModifiedClick && !event.defaultPrevented && onNavigateStart) {
      onNavigateStart(targetPath);
    }

    handleLinkClick();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''} ${isMobile ? 'sidebar-mobile' : ''}`}>
      <nav className="sidebar-nav">
        {sidebarData.map((category) => (
          <div key={category.category} className="category-section">
            <button
              className="category-header"
              onClick={() => toggleCategory(category.category)}
            >
              <span className="category-title">{category.title}</span>
              <span className={`expand-icon ${expandedCategories[category.category] ? 'expanded' : ''}`}>
                ▼
              </span>
            </button>

            {expandedCategories[category.category] && (
              <ul className="posts-list">
                {category.posts.map((post) => (
                  <li key={post.slug} className="post-item">
                    <Link
                      href={post.isLocked ? `/${post.category}` : `/${post.category}/${post.slug}`}
                      className={`post-link ${currentCategory === post.category && currentSlug === post.slug
                        ? 'active'
                        : ''
                        } ${post.isLocked ? 'locked' : ''}`}
                      onClick={(event) => handlePostLinkClick(event, post)}
                    >
                      <span className="post-link-text">{post.title}</span>
                      {post.isLocked && <span className="post-lock-icon" aria-hidden="true">🔒</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}