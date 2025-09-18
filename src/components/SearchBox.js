'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SearchBox({ className = '' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const router = useRouter();

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch(query);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle clicks outside to close search results
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = async (searchQuery) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=8`);
      const data = await response.json();

      if (data.results) {
        setResults(data.results);
        setIsOpen(true);
        setSelectedIndex(-1);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          const result = results[selectedIndex];
          router.push(`/${result.category}/${result.slug}`);
          setIsOpen(false);
          setQuery('');
        } else if (query.trim()) {
          // Navigate to search results page
          router.push(`/search?q=${encodeURIComponent(query)}`);
          setIsOpen(false);
        }
        break;

      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        searchRef.current?.blur();
        break;
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (results.length > 0) {
      setIsOpen(true);
    }
  };

  const handleResultClick = (result) => {
    router.push(`/${result.category}/${result.slug}`);
    setIsOpen(false);
    setQuery('');
  };

  const handleViewAllResults = () => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setIsOpen(false);
  };

  return (
    <div className={`search-container ${className}`} ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Buscar no conteúdo..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          className="search-input"
          autoComplete="off"
        />

        <div className="search-icon">
          {isLoading ? (
            <div className="search-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="search-results" ref={resultsRef}>
          {results.length > 0 ? (
            <>
              <div className="search-results-list">
                {results.map((result, index) => (
                  <div
                    key={`${result.category}-${result.slug}`}
                    className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="search-result-content">
                      <div className="search-result-header">
                        <h4 className="search-result-title">
                          <span dangerouslySetInnerHTML={{ __html: result.matches?.find(m => m.type === 'title')?.text || result.title }} />
                        </h4>
                        <span className="search-result-category">{result.category}</span>
                      </div>

                      {result.description && (
                        <p className="search-result-description">
                          <span dangerouslySetInnerHTML={{
                            __html: result.matches?.find(m => m.type === 'description')?.text || result.description
                          }} />
                        </p>
                      )}

                      {result.excerpt && (
                        <p className="search-result-excerpt">
                          <span dangerouslySetInnerHTML={{ __html: result.excerpt }} />
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {results.length >= 8 && (
                <div className="search-results-footer">
                  <button
                    onClick={handleViewAllResults}
                    className="view-all-button"
                  >
                    Ver todos os resultados para &quot;{query}&quot;
                  </button>
                </div>
              )}
            </>
          ) : query.trim().length >= 2 && !isLoading ? (
            <div className="search-no-results">
              <p>Nenhum resultado encontrado para &quot;{query}&quot;</p>
              <p className="search-suggestion">Tente usar palavras-chave diferentes</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}