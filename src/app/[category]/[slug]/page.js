import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import MarkdownContent from '@/components/MarkdownContent';
import PostNavigation from '@/components/PostNavigation';
import { getPost, getSidebarData, getPostNavigation, getAllPosts } from '@/lib/markdown';

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export default async function PostPage({ params }) {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  if (!post) {
    notFound();
  }

  const sidebarData = getSidebarData();
  const navigation = getPostNavigation(category, slug);

  return (
    <Layout
      sidebarData={sidebarData}
      currentCategory={category}
      currentSlug={slug}
    >
      <article className="post-content">
        <header className="post-header">
          <div className="breadcrumb">
            <span className="category-name">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
            <span className="separator">›</span>
            <span className="post-title">{post.title}</span>
          </div>
          <h1>{post.title}</h1>
          {post.description && (
            <p className="post-description">{post.description}</p>
          )}
        </header>

        <div className="post-body">
          <MarkdownContent content={post.content} />
        </div>

        <PostNavigation
          previous={navigation.previous}
          next={navigation.next}
          category={category}
        />
      </article>
    </Layout>
  );
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  if (!post) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `${post.title} - ${category.charAt(0).toUpperCase() + category.slice(1)} Tutorial`,
    description: post.description,
  };
}