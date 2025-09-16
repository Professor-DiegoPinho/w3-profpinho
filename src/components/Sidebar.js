"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar({ sidebarData, currentCategory, currentSlug }) {
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

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link href="/" className="logo">
          <h1>Learning Hub</h1>
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
                      className={`post-link ${
                        currentCategory === post.category && currentSlug === post.slug 
                          ? 'active' 
                          : ''
                      }`}
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