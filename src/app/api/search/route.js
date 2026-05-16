import { getSearchMetadata, searchContent } from '@/lib/search-index';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit')) || 20;

    if (!query || query.trim().length < 2 || query.length > 200) {
      return NextResponse.json({
        results: [],
        total: 0,
        message: 'Query must be between 2 and 200 characters long'
      });
    }

    // Perform fuzzy search using the pre-generated index
    const searchResults = searchContent(query, {
      category: category || null,
      limit
    });

    // Format results for API response
    const formattedResults = searchResults.map(result => ({
      slug: result.slug,
      title: result.title,
      description: result.description,
      category: result.category,
      content: result.content,
      tags: result.tags || [],
      score: result.searchScore, // Relevance score (0-100) from Fuse.js
      excerpt: result.content // Use preview from index as excerpt
    }));

    // Get metadata for response
    const metadata = getSearchMetadata();

    return NextResponse.json({
      results: formattedResults,
      total: formattedResults.length,
      query: query,
      category: category || 'all',
      metadata: {
        totalDocuments: metadata.totalDocuments,
        generatedAt: metadata.generatedAt
      }
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', results: [], total: 0 },
      { status: 500 }
    );
  }
}
