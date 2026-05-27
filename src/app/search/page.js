'use client';

import EmptyState from '@/app/search/_components/EmptyState/EmptyState';
import NoResultsState from '@/app/search/_components/NoResultsState/NoResultsState';
import Pagination from '@/app/search/_components/Pagination/Pagination';
import SearchForm from '@/app/search/_components/SearchForm/SearchForm';
import SearchLoading from '@/app/search/_components/SearchLoading/SearchLoading';
import SearchResultCard from '@/app/search/_components/SearchResultCard/SearchResultCard';
import SearchStats from '@/app/search/_components/SearchStats/SearchStats';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import styles from './SearchPage.module.css';

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
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Buscar Conteúdo</h1>

        <SearchForm
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          categories={categories}
          isLoading={isLoading}
          handleSearch={handleSearch}
        />
      </div>

      <div>
        <SearchStats isLoading={isLoading} total={total} query={query} category={category} />

        {isLoading ? (
          <SearchLoading />
        ) : currentResults.length > 0 ? (
          <>
            <div className={styles.resultsGrid}>
              {currentResults.map((result) => (
                <SearchResultCard key={`${result.category}-${result.slug}`} result={result} />
              ))}
            </div>

            <Pagination page={page} totalPages={totalPages} changePage={changePage} />
          </>
        ) : query && !isLoading ? (
          <NoResultsState query={query} category={category} />
        ) : !query ? (
          <EmptyState />
        ) : null}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}