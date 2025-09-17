"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar({
  sidebarData,
  currentCategory,
  currentSlug,
  isOpen = true,
  isMobile = false,
  onLinkClick
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

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''} ${isMobile ? 'sidebar-mobile' : ''}`}>
      <div className="sidebar-header">
        <Link href="/" className="logo" onClick={handleLinkClick}>
          <img src={"/diegopinho-learninghub-logo.svg"} alt="Learning Hub Logo" className="logo-image" />
        </Link>
      </div>

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
                      href={`/${post.category}/${post.slug}`}
                      className={`post-link ${currentCategory === post.category && currentSlug === post.slug
                        ? 'active'
                        : ''
                        }`}
                      onClick={handleLinkClick}
                    >
                      {post.title}
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