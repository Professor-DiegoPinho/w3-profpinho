import { auth } from '@/auth';
import MarkdownContent from '@/components/MarkdownContent';
import PostNavigation from '@/components/PostNavigation';
import ReadingTime from '@/components/ReadingTime';
import { hasCourseEnrollment } from '@/lib/enrollment';
import { getAllPosts, getCategoryTitle, getPost, getPostNavigation } from '@/lib/markdown';
import { notFound, redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

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

  const session = await auth();
  const userId = session?.user?.id;
  const enrolledCourseIds = Array.isArray(session?.user?.enrolledCourseIds)
    ? session.user.enrolledCourseIds
    : null;

  const isEnrolled = Array.isArray(enrolledCourseIds)
    ? enrolledCourseIds.includes(category)
    : await hasCourseEnrollment(userId, category);

  if (!isEnrolled) {
    redirect(`/${category}`);
  }

  const navigation = getPostNavigation(category, slug);
  const categoryTitle = getCategoryTitle(category);

  return (
    <article className="post-content">
      <header className="post-header">
        <div className="breadcrumb">
          <span className="category-name">
            {categoryTitle}
          </span>
          <span className="separator">›</span>
          <span className="post-title">{post.title}</span>
        </div>
        <h1>{post.title}</h1>
        {post.description && (
          <p className="post-description">{post.description}</p>
        )}
        {post.readingTime && (
          <div className="post-meta">
            <ReadingTime readingTime={post.readingTime} showFullText={true} />
          </div>
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
    title: `${post.title} - ${getCategoryTitle(category)} Tutorial`,
    description: post.description,
  };
}