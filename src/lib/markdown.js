import { content } from '@/data';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { processAllLiquidTags } from './liquidTags.js';
import { CACHE_KEYS, getFromCache, initCacheWatcher, setInCache } from './markdown-cache.js';
import { calculateReadingTime } from './readingTime.js';

const contentDirectory = path.join(process.cwd(), 'content');

// Inicializa o cache watcher em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  initCacheWatcher();
}

function normalizeCategorySlug(slug) {
  if (typeof slug !== 'string') {
    return slug;
  }

  return slug.replace(/[_-](resume|resumo)$/i, '');
}

function inferCategoryAccessType(slug) {
  if (typeof slug !== 'string') {
    return null;
  }

  if (/[_-](resume|resumo)$/i.test(slug)) {
    return 'resume';
  }

  return null;
}

function getCategoryMeta(category) {
  const normalizedCategory = normalizeCategorySlug(category);
  const inferredAccessType = inferCategoryAccessType(category);

  if (inferredAccessType) {
    const typedMatch = content.find(
      (item) => item.slug === normalizedCategory && item.accessType === inferredAccessType
    );

    if (typedMatch) {
      return typedMatch;
    }
  }

  return (
    content.find((item) => item.slug === category)
    || content.find((item) => item.slug === normalizedCategory)
    || null
  );
}

export function getCategoryTitle(category) {
  const matchingCourse = getCategoryMeta(category);

  if (matchingCourse?.title) {
    return matchingCourse.title;
  }

  return category
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getCategoryDescription(category) {
  const matchingCourse = getCategoryMeta(category);

  if (matchingCourse?.description) {
    return matchingCourse.description;
  }

  return `Aprenda ${getCategoryTitle(category)} do básico até conceitos avançados.`;
}

// Get all categories (folders) in the content directory
export function getCategories() {
  const categories = fs.readdirSync(contentDirectory)
    .filter(item => {
      const itemPath = path.join(contentDirectory, item);
      return fs.statSync(itemPath).isDirectory();
    });

  return categories;
}

// Get all markdown files in a category
export function getPostsInCategory(category) {
  // Tenta recuperar do cache
  const cacheKey = CACHE_KEYS.POSTS_BY_CATEGORY(category);
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  const categoryPath = path.join(contentDirectory, category);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs.readdirSync(categoryPath)
    .filter(file => file.endsWith('.md'));

  const posts = files.map(file => {
    const filePath = path.join(categoryPath, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const fileSlug = file.replace(/\.md$/, '');
    // Remove prefixo numérico do slug para exibir nas URLs
    const slug = fileSlug.replace(/^\d+-/, '');

    // Calcula o tempo de leitura
    const readingTime = calculateReadingTime(content);

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      order: data.order || 999,
      category,
      readingTime,
      ...data
    };
  });

  // Sort by order
  const sorted = posts.sort((a, b) => a.order - b.order);
  
  // Armazena no cache
  setInCache(cacheKey, sorted);
  
  return sorted;
}

// Conta o número de aulas de um curso, excluindo projeto.md
export function getCourseLessonsCount(category) {
  const posts = getPostsInCategory(category);
  // Filtra o arquivo projeto.md para não contar como uma aula
  return posts.filter(post => post.slug !== 'projeto').length;
}

// Conta rapidamente o número de arquivos .md em uma categoria (sem fazer parse do conteúdo)
export function getPostsCountInCategory(category) {
  const categoryPath = path.join(contentDirectory, category);

  if (!fs.existsSync(categoryPath)) {
    return 0;
  }

  return fs.readdirSync(categoryPath)
    .filter(file => file.endsWith('.md')).length;
}

// Get a specific post by category and slug
// Handles both slugs with and without numeric prefixes (e.g., "01-intro" or "intro")
export function getPost(category, slug) {
  // Tenta recuperar do cache
  const cacheKey = CACHE_KEYS.POST_BY_SLUG(category, slug);
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  let actualSlug = slug;
  let filePath = path.join(contentDirectory, category, `${slug}.md`);

  // Protege contra path traversal
  const resolvedPath = path.resolve(filePath);
  const resolvedBase = path.resolve(contentDirectory);
  if (!resolvedPath.startsWith(resolvedBase + path.sep)) {
    return null;
  }

  // Se o arquivo não existe e o slug não tem prefixo, tenta encontrar com prefixo
  if (!fs.existsSync(filePath) && !/^\d+-/.test(slug)) {
    const categoryPath = path.join(contentDirectory, category);
    if (fs.existsSync(categoryPath)) {
      const files = fs.readdirSync(categoryPath)
        .filter(file => file.endsWith('.md'));
      
      // Procura por um arquivo que, sem o prefixo, matches o slug
      const matchedFile = files.find(file => {
        const fileSlug = file.replace(/\.md$/, '');
        const normalizedFileSlug = fileSlug.replace(/^\d+-/, '');
        return normalizedFileSlug === slug;
      });

      if (matchedFile) {
        actualSlug = matchedFile.replace(/\.md$/, '');
        filePath = path.join(categoryPath, matchedFile);
      }
    }
  }

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Processa as liquid tags no conteúdo markdown
  const processedContent = processAllLiquidTags(content);

  // Calcula o tempo de leitura
  const readingTime = calculateReadingTime(content);

  // Normaliza o slug removendo prefixo numérico para URLs
  const normalizedSlug = actualSlug.replace(/^\d+-/, '');

  const post = {
    slug: normalizedSlug,
    category,
    content: processedContent,
    title: data.title || slug,
    description: data.description || '',
    order: data.order || 999,
    readingTime,
    ...data
  };

  // Armazena no cache
  setInCache(cacheKey, post);

  return post;
}

// Get all posts from all categories (with full content for search)
// Normalizes slugs by removing numeric prefixes (internal organization only)
export function getAllPosts() {
  // Tenta recuperar do cache
  const cacheKey = CACHE_KEYS.ALL_POSTS;
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  const categories = getCategories();
  const allPosts = [];

  categories.forEach(category => {
    const categoryPath = path.join(contentDirectory, category);

    if (!fs.existsSync(categoryPath)) {
      return;
    }

    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md'));

    const posts = files.map(file => {
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      // Remove prefixo numérico do slug para exibir nas URLs
      const fileSlug = file.replace(/\.md$/, '');
      const slug = fileSlug.replace(/^\d+-/, '');

      // Calcula o tempo de leitura
      const readingTime = calculateReadingTime(content);

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        order: data.order || 999,
        category,
        content: content, // Include full content for search
        readingTime,
        ...data
      };
    });

    allPosts.push(...posts);
  });

  // Armazena no cache
  setInCache(cacheKey, allPosts);

  return allPosts;
}

// Generate sidebar structure
export function getSidebarData() {
  // Tenta recuperar do cache
  const cacheKey = CACHE_KEYS.SIDEBAR_DATA;
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  const categories = getCategories();

  const sidebarData = categories.map(category => {
    const posts = getPostsInCategory(category);

    return {
      category,
      title: getCategoryTitle(category),
      description: getCategoryDescription(category),
      posts
    };
  });

  // Armazena no cache
  setInCache(cacheKey, sidebarData);

  return sidebarData;
}

// Get navigation info for a post (previous and next)
export function getPostNavigation(category, currentSlug) {
  const posts = getPostsInCategory(category);
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);

  const previous = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return { previous, next };
}