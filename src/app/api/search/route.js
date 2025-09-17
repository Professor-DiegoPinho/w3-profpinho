import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/markdown';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit')) || 10;

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        results: [],
        total: 0,
        message: 'Query must be at least 2 characters long'
      });
    }

    // Get all posts
    const allPosts = getAllPosts();

    // Filter by category if specified
    const postsToSearch = category
      ? allPosts.filter(post => post.category === category)
      : allPosts;

    // Search algorithm
    const searchResults = postsToSearch
      .map(post => {
        const searchQuery = query.toLowerCase().trim();
        let score = 0;
        const matches = [];

        // Title match (highest priority)
        if (post.title.toLowerCase().includes(searchQuery)) {
          score += 100;
          matches.push({
            type: 'title',
            text: highlightMatch(post.title, searchQuery)
          });
        }

        // Description match
        if (post.description && post.description.toLowerCase().includes(searchQuery)) {
          score += 50;
          matches.push({
            type: 'description',
            text: highlightMatch(post.description, searchQuery)
          });
        }

        // Content match
        if (post.content && post.content.toLowerCase().includes(searchQuery)) {
          score += 25;

          // Find context around the match
          const contentLower = post.content.toLowerCase();
          const matchIndex = contentLower.indexOf(searchQuery);

          if (matchIndex !== -1) {
            const start = Math.max(0, matchIndex - 50);
            const end = Math.min(post.content.length, matchIndex + searchQuery.length + 50);
            const context = post.content.substring(start, end);

            matches.push({
              type: 'content',
              text: highlightMatch(context, searchQuery),
              preview: true
            });
          }
        }

        // Category match
        if (post.category.toLowerCase().includes(searchQuery)) {
          score += 10;
        }

        // Tags match (if exists)
        if (post.tags && Array.isArray(post.tags)) {
          const tagMatch = post.tags.some(tag =>
            tag.toLowerCase().includes(searchQuery)
          );
          if (tagMatch) {
            score += 15;
          }
        }

        return score > 0 ? {
          ...post,
          score,
          matches,
          excerpt: getExcerpt(post.content, searchQuery)
        } : null;
      })
      .filter(result => result !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return NextResponse.json({
      results: searchResults,
      total: searchResults.length,
      query: query,
      category: category || 'all'
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', results: [], total: 0 },
      { status: 500 }
    );
  }
}

// Helper function to highlight search matches
function highlightMatch(text, query) {
  if (!text || !query) return text;

  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// Helper function to escape regex special characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper function to get excerpt around search term
function getExcerpt(content, query, maxLength = 200) {
  if (!content) return '';

  const queryIndex = content.toLowerCase().indexOf(query.toLowerCase());

  if (queryIndex === -1) {
    // If query not found, return beginning of content
    return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');
  }

  // Calculate start position to center the query
  const start = Math.max(0, queryIndex - Math.floor(maxLength / 2));
  const end = Math.min(content.length, start + maxLength);

  let excerpt = content.substring(start, end);

  // Add ellipsis if needed
  if (start > 0) excerpt = '...' + excerpt;
  if (end < content.length) excerpt = excerpt + '...';

  return excerpt;
}