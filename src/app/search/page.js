'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { ReadingTimeCompact } from '@/components/ReadingTime';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sidebarData, setSidebarData] = useState([]);

  const resultsPerPage = 12;

  useEffect(() => {
    // Load sidebar data from API
    fetch('/api/sidebar')
      .then(res => res.json())
      .then(data => setSidebarData(data))
      .catch(err => console.error('Error loading sidebar data:', err));
  }, []);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery, initialCategory);
    }
  }, [initialQuery, initialCategory]);

  const performSearch = async (searchQuery, searchCategory = '', currentPage = 1) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        limit: (resultsPerPage * 3).toString() // Get more results for pagination
      });

      if (searchCategory) {
        params.append('category', searchCategory);
      }

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();

      if (data.results) {
        setResults(data.results);
        setTotal(data.results.length);
        setPage(currentPage);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query, category);
      // Update URL without page refresh
      const params = new URLSearchParams();
      params.set('q', query);
      if (category) params.set('category', category);
      window.history.pushState({}, '', `/search?${params}`);
    }
  };

  const categories = sidebarData.map(item => item.category);

  // Pagination
  const totalPages = Math.ceil(total / resultsPerPage);
  const startIndex = (page - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = results.slice(startIndex, endIndex);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Layout sidebarData={sidebarData}>
      <div className="search-page">
        <div className="search-page-header">
          <h1>Buscar Conteúdo</h1>

          <form onSubmit={handleSearch} className="search-page-form">
            <div className="search-form-row">
              <div className="search-form-group">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Digite sua busca..."
                  className="search-page-input"
                  autoFocus
                />
              </div>

              <div className="search-form-group">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="search-page-select"
                >
                  <option value="">Todas as categorias</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="search-page-button" disabled={isLoading}>
                {isLoading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </form>
        </div>

        <div className="search-page-content">
          {query && (
            <div className="search-results-info">
              <p>
                {isLoading ? (
                  'Buscando...'
                ) : total > 0 ? (
                  <>
                    <strong>{total}</strong> resultado{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''} para <strong>&quot;{query}&quot;</strong>
                    {category && (
                      <> em <strong>{category.charAt(0).toUpperCase() + category.slice(1)}</strong></>
                    )}
                  </>
                ) : (
                  <>Nenhum resultado encontrado para <strong>&quot;{query}&quot;</strong></>
                )}
              </p>
            </div>
          )}

          {isLoading ? (
            <div className="search-loading-state">
              <div className="loading-spinner-large"></div>
              <p>Buscando conteúdo...</p>
            </div>
          ) : currentResults.length > 0 ? (
            <>
              <div className="search-results-grid">
                {currentResults.map((result, index) => (
                  <div key={`${result.category}-${result.slug}`} className="search-result-card">
                    <Link href={`/${result.category}/${result.slug}`} className="search-result-link">
                      <div className="search-result-card-header">
                        <h3 className="search-result-card-title">
                          <span dangerouslySetInnerHTML={{
                            __html: result.matches?.find(m => m.type === 'title')?.text || result.title
                          }} />
                        </h3>
                        <span className="search-result-card-category">
                          {result.category}
                        </span>
                      </div>

                      {result.description && (
                        <p className="search-result-card-description">
                          <span dangerouslySetInnerHTML={{
                            __html: result.matches?.find(m => m.type === 'description')?.text || result.description
                          }} />
                        </p>
                      )}

                      {result.excerpt && (
                        <p className="search-result-card-excerpt">
                          <span dangerouslySetInnerHTML={{ __html: result.excerpt }} />
                        </p>
                      )}

                      <div className="search-result-card-footer">
                        <div className="search-result-meta">
                          {result.readingTime && (
                            <ReadingTimeCompact readingTime={result.readingTime} />
                          )}
                          <span className="search-result-score">
                            Relevância: {Math.round((result.score / 100) * 100)}%
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="search-pagination">
                  <button
                    onClick={() => changePage(page - 1)}
                    disabled={page === 1}
                    className="pagination-button"
                  >
                    ← Anterior
                  </button>

                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(num => {
                        // Show first, last, current, and adjacent pages
                        return num === 1 ||
                          num === totalPages ||
                          Math.abs(num - page) <= 1;
                      })
                      .map((num, index, array) => {
                        // Add ellipsis if there's a gap
                        const showEllipsis = index > 0 && num - array[index - 1] > 1;

                        return (
                          <div key={num}>
                            {showEllipsis && <span className="pagination-ellipsis">...</span>}
                            <button
                              onClick={() => changePage(num)}
                              className={`pagination-number ${num === page ? 'active' : ''}`}
                            >
                              {num}
                            </button>
                          </div>
                        );
                      })}
                  </div>

                  <button
                    onClick={() => changePage(page + 1)}
                    disabled={page === totalPages}
                    className="pagination-button"
                  >
                    Próxima →
                  </button>
                </div>
              )}
            </>
          ) : query && !isLoading ? (
            <div className="search-no-results-state">
              <div className="no-results-icon">🔍</div>
              <h3>Nenhum resultado encontrado</h3>
              <p>Não encontramos nada para &quot;{query}&quot;{category && ` em ${category}`}.</p>
              <div className="search-suggestions">
                <h4>Tente:</h4>
                <ul>
                  <li>Verificar a ortografia das palavras</li>
                  <li>Usar palavras-chave diferentes</li>
                  <li>Usar termos mais gerais</li>
                  <li>Remover o filtro de categoria</li>
                </ul>
              </div>
            </div>
          ) : !query ? (
            <div className="search-empty-state">
              <div className="empty-state-icon">📚</div>
              <h3>Busque por qualquer conteúdo</h3>
              <p>Digite uma palavra-chave no campo acima para encontrar artigos, tutoriais e recursos.</p>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}