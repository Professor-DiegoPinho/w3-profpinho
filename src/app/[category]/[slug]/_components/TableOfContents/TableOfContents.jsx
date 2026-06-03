'use client';

import { generateId } from '@/lib/generateId';
import { useEffect, useRef, useState } from 'react';
import styles from './TableOfContents.module.css';
import { List } from '@/assets/icons';

export default function TableOfContents({ content, title }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const tocRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // Extract headings from markdown content
  useEffect(() => {
    const contentWithTitle = title ? `# ${title}\n\n${content}` : content;

    // Remove code blocks (between ``` markers) to avoid treating # comments as headings
    const contentWithoutCodeBlocks = contentWithTitle.replace(/```[\s\S]*?```/g, '');

    const headingRegex = /^(#{1,4})\s+(.+)$/gm;
    const matches = [];
    let match;

    while ((match = headingRegex.exec(contentWithoutCodeBlocks)) !== null) {
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

  // Close TOC when clicking on a link (mobile)
  const handleLinkClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 70;
      const offset = 20;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - headerHeight - offset,
        behavior: 'smooth',
      });

      // Close TOC on mobile after clicking a link
      if (window.innerWidth <= 1199) {
        setIsOpen(false);
        document.body.classList.remove('toc-open');
      }
    }
  };

  // Control body overflow when TOC opens/closes on mobile
  useEffect(() => {
    if (window.innerWidth <= 640) {
      if (isOpen) {
        document.body.classList.add('toc-open');
      } else {
        document.body.classList.remove('toc-open');
      }
    }

    return () => {
      document.body.classList.remove('toc-open');
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        tocRef.current &&
        !tocRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        document.body.classList.remove('toc-open');
      }
    };

    if (window.innerWidth <= 1199) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isOpen]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        ref={toggleButtonRef}
        className={`${styles.tocMobileToggle} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Alternar Tabela de Conteúdos"
        aria-expanded={isOpen}
      >
        <svg
          className={styles.tocToggleIcon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* TOC Container with Slide Animation */}
      <nav
        ref={tocRef}
        className={`${styles.tableOfContents} ${isOpen ? styles.open : ''}`}
        aria-label="Tabela de conteúdos"
      >
        <div className={styles.tocContainer}>
          <header className={styles.tocHeader}>
            <List size={20} className={styles.tocTitleIcon} />
            <h3 className={styles.tocTitle}>Nesta página</h3>
          </header>
          <ul className={styles.tocList}>
            {headings.map((heading, index) => (
              <li
                key={heading.id + '-' + index}
                className={`${styles.tocItem} ${styles[`level${heading.level}`]} ${activeId === heading.id ? styles.active : ''
                  }`}
              >
                <button
                  onClick={() => handleLinkClick(heading.id)}
                  className={styles.tocLink}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
