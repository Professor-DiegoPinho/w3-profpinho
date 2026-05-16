/**
 * Search index manager using Fuse.js for fuzzy search
 * Loads pre-generated search index from public/search-index.json
 * and provides fuzzy search capabilities
 */

import Fuse from 'fuse.js';

let searchIndex = null;
let fuseInstance = null;

/**
 * Load search index from JSON file
 * Called once during initialization
 */
function loadSearchIndex() {
  if (searchIndex) {
    return searchIndex;
  }

  try {
    // In Node.js environment (SSR/API routes)
    if (typeof window === 'undefined') {
      const fs = require('fs');
      const path = require('path');
      const indexPath = path.join(process.cwd(), 'public/search-index.json');
      
      if (!fs.existsSync(indexPath)) {
        console.warn('⚠️  Search index not found. Run `npm run build` first.');
        return { documents: [], metadata: {} };
      }

      const content = fs.readFileSync(indexPath, 'utf8');
      searchIndex = JSON.parse(content);
    }
    // In browser environment
    else {
      // Fetch synchronously via import (works in browser)
      // Note: In browser, we'd typically fetch this asynchronously
      // For now, we'll handle this in the API route instead
      return { documents: [], metadata: {} };
    }

    return searchIndex;
  } catch (error) {
    console.error('Error loading search index:', error);
    return { documents: [], metadata: {} };
  }
}

/**
 * Initialize Fuse.js instance with search options
 */
function initializeFuse() {
  if (fuseInstance) {
    return fuseInstance;
  }

  const index = loadSearchIndex();
  const documents = index.documents || [];

  // Fuse.js options configured for educational content
  const options = {
    keys: [
      {
        name: 'title',
        weight: 0.4 // 40% importance for title matches
      },
      {
        name: 'description',
        weight: 0.3 // 30% importance for description
      },
      {
        name: 'content',
        weight: 0.2 // 20% importance for content
      },
      {
        name: 'tags',
        weight: 0.1 // 10% importance for tags
      }
    ],
    threshold: 0.3, // Allow ~30% typo tolerance (fuzzy matching)
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2, // Don't match single characters
    shouldSort: true,
    useExtendedSearch: false // Keep it simple
  };

  fuseInstance = new Fuse(documents, options);
  return fuseInstance;
}

/**
 * Search for content using fuzzy search
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Array} Array of search results with scores
 */
export function searchContent(query, options = {}) {
  const {
    category = null,
    limit = 20
  } = options;

  if (!query || query.trim().length < 2) {
    return [];
  }

  const fuse = initializeFuse();
  
  // Perform fuzzy search
  let results = fuse.search(query);

  // Filter by category if specified
  if (category) {
    results = results.filter(result => result.item.category === category);
  }

  // Limit results
  results = results.slice(0, limit);

  // Transform results to include score and formatted data
  return results.map(result => ({
    ...result.item,
    searchScore: Math.round((1 - result.score) * 100), // Convert distance to relevance score (0-100)
    matches: result.matches // Fuse.js match information for highlighting
  }));
}

/**
 * Get all categories from the index
 */
export function getSearchCategories() {
  const index = loadSearchIndex();
  return index.metadata?.categories || [];
}

/**
 * Get search index metadata
 */
export function getSearchMetadata() {
  const index = loadSearchIndex();
  return index.metadata || {};
}

/**
 * Get all indexed documents
 */
export function getAllIndexedDocuments() {
  const index = loadSearchIndex();
  return index.documents || [];
}

/**
 * Get documents by category
 */
export function getIndexedDocumentsByCategory(category) {
  const documents = getAllIndexedDocuments();
  return documents.filter(doc => doc.category === category);
}

/**
 * Reload search index (useful after content updates in development)
 */
export function reloadSearchIndex() {
  searchIndex = null;
  fuseInstance = null;
  return loadSearchIndex();
}
