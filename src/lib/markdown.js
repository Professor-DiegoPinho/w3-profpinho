import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

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
  const categoryPath = path.join(contentDirectory, category);
  
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs.readdirSync(categoryPath)
    .filter(file => file.endsWith('.md'));

  const posts = files.map(file => {
    const filePath = path.join(categoryPath, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    const slug = file.replace(/\.md$/, '');
    
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      order: data.order || 999,
      category,
      ...data
    };
  });

  // Sort by order
  return posts.sort((a, b) => a.order - b.order);
}

// Get a specific post by category and slug
export function getPost(category, slug) {
  const filePath = path.join(contentDirectory, category, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    category,
    content,
    title: data.title || slug,
    description: data.description || '',
    order: data.order || 999,
    ...data
  };
}

// Get all posts from all categories
export function getAllPosts() {
  const categories = getCategories();
  const allPosts = [];

  categories.forEach(category => {
    const posts = getPostsInCategory(category);
    allPosts.push(...posts);
  });

  return allPosts;
}

// Generate sidebar structure
export function getSidebarData() {
  const categories = getCategories();
  
  const sidebarData = categories.map(category => {
    const posts = getPostsInCategory(category);
    
    return {
      category,
      title: category.charAt(0).toUpperCase() + category.slice(1),
      posts
    };
  });

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