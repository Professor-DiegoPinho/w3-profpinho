#!/usr/bin/env node

/**
 * Generate search index from markdown content
 * Runs during build to pre-process all lessons for fuzzy search
 * Output: public/search-index.json
 */

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDirectory = path.join(__dirname, '../content');
const publicDirectory = path.join(__dirname, '../public');
const outputPath = path.join(publicDirectory, 'search-index.json');

// Ensure public directory exists
if (!fs.existsSync(publicDirectory)) {
  fs.mkdirSync(publicDirectory, { recursive: true });
}

/**
 * Normalize text for search indexing
 * Remove markdown syntax, extra whitespace, etc.
 */
function normalizeText(text) {
  if (!text) return '';
  
  return text
    .replace(/#+\s+/g, ' ') // Remove markdown headers
    .replace(/[*_`]/g, '') // Remove markdown formatting
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Extract link text
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Extract first N characters from content, useful for preview
 */
function getContentPreview(content, maxChars = 300) {
  if (!content) return '';
  const normalized = normalizeText(content);
  return normalized.substring(0, maxChars);
}

/**
 * Get all markdown files from a category
 */
function getMarkdownFiles(categoryPath) {
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  return fs.readdirSync(categoryPath)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(categoryPath, file));
}

/**
 * Process a markdown file and extract searchable data
 */
function processMarkdownFile(filePath, category) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    
    const filename = path.basename(filePath, '.md');
    const slug = filename.replace(/^\d+-/, ''); // Remove numeric prefix
    
    return {
      id: `${category}-${slug}`,
      title: frontmatter.title || slug,
      category,
      slug,
      description: normalizeText(frontmatter.description || ''),
      content: getContentPreview(content, 500), // Store first 500 chars
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      order: frontmatter.order || 999,
      filename
    };
  } catch (error) {
    console.warn(`⚠️  Error processing file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Generate the search index
 */
function generateSearchIndex() {
  console.log('📑 Generating search index...');
  console.log(`📂 Content directory: ${contentDirectory}`);

  const categories = fs.readdirSync(contentDirectory)
    .filter(item => {
      const itemPath = path.join(contentDirectory, item);
      return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
    });

  const documents = [];
  const stats = {
    categories: {},
    totalFiles: 0,
    errors: 0
  };

  categories.forEach(category => {
    const categoryPath = path.join(contentDirectory, category);
    const markdownFiles = getMarkdownFiles(categoryPath);
    
    markdownFiles.forEach(filePath => {
      const document = processMarkdownFile(filePath, category);
      if (document) {
        documents.push(document);
        stats.totalFiles++;
        stats.categories[category] = (stats.categories[category] || 0) + 1;
      } else {
        stats.errors++;
      }
    });
  });

  // Sort by category and order
  documents.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.order - b.order;
  });

  const index = {
    documents,
    metadata: {
      totalDocuments: documents.length,
      categories: Object.keys(stats.categories).sort(),
      generatedAt: new Date().toISOString(),
      version: '1.0.0'
    },
    stats
  };

  // Write index file
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));

  // Print statistics
  console.log('✅ Search index generated successfully!');
  console.log(`📊 Statistics:`);
  console.log(`   - Total documents: ${index.metadata.totalDocuments}`);
  console.log(`   - Categories: ${index.metadata.categories.length}`);
  Object.entries(stats.categories).forEach(([category, count]) => {
    console.log(`     • ${category}: ${count} files`);
  });
  console.log(`   - Output: ${outputPath}`);
  console.log(`   - File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
  
  if (stats.errors > 0) {
    console.warn(`⚠️  ${stats.errors} files had errors during processing`);
  }
}

// Run the generator
try {
  generateSearchIndex();
  process.exit(0);
} catch (error) {
  console.error('❌ Error generating search index:', error);
  process.exit(1);
}
