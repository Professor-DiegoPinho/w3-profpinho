'use client';

import { generateId } from '@/lib/generateId';
import { useEffect, useState } from 'react';
import './TableOfContents.css';

export default function TableOfContents({ content, title }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  // Extract headings from markdown content
  useEffect(() => {
    const contentWithTitle = title ? `# ${title}\n\n${content}` : content;
    const headingRegex = /^(#{1,4})\s+(.+)$/gm;
    const matches = [];
    let match;

    while ((match = headingRegex.exec(contentWithTitle)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = generateId(text);

      matches.push({
        id,
        text,
        level,
      });
    }

    setHeadings(matches);
  }, [content, title]);

  // Setup scroll spy
  useEffect(() => {
    if (headings.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-64px 0px -66%',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all heading elements
    const headingElements = headings.map((heading) =>
      document.getElementById(heading.id)
    );

    headingElements.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headingElements.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleClickHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 70; // Fixed header height
      const offset = 20; // Extra padding below header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: elementPosition - headerHeight - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="table-of-contents" aria-label="Tabela de conteúdos">
      <div className="toc-container">
        <h3 className="toc-title">Nesta página</h3>
        <ul className="toc-list">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`toc-item toc-level-${heading.level} ${
                activeId === heading.id ? 'active' : ''
              }`}
            >
              <button
                onClick={() => handleClickHeading(heading.id)}
                className="toc-link"
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
