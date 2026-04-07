import { auth } from '@/auth';
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent';
import MarkLesson from '@/components/MarkLesson/MarkLesson';
import PostNavigation from '@/components/PostNavigation/PostNavigation';
import ReadingTime from '@/components/ReadingTime/ReadingTime';
import TableOfContents from '@/components/TableOfContents/TableOfContents';
import {
  canUserAccessCourseLessons,
  isCourseVisibleToUser,
  getCourseAccessType,
} from '@/lib/courseAccess';
import { CONTENT_TYPE } from '@/data';
import { getEnrolledCourseIds } from '@/lib/enrollment';
import { generateId } from '@/lib/generateId';
import { getAllPosts, getCategoryTitle, getPost, getPostNavigation, getPostsInCategory } from '@/lib/markdown';
import { getLessonProgress, isLessonCompleted } from '@/lib/progress';
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
    : await getEnrolledCourseIds(userId);

  if (!isCourseVisibleToUser(category, enrolledCourseIds)) {
    notFound();
  }

  const hasLessonAccess = canUserAccessCourseLessons(category, enrolledCourseIds);

  if (!hasLessonAccess) {
    redirect(`/${category}`);
  }

  const navigation = getPostNavigation(category, slug);
  const categoryTitle = getCategoryTitle(category);
  const contentAccessType = getCourseAccessType(category);
  const isCourseContent = 
    contentAccessType === CONTENT_TYPE.FREE_COURSE || 
    contentAccessType === CONTENT_TYPE.PAID_COURSE;

  const allLessons = getPostsInCategory(category);
  const totalLessons = allLessons.length;

  const progressData = userId
    ? await getLessonProgress(userId, category)
    : null;

  const isDone = isLessonCompleted(progressData, slug);

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
        <h1 id={generateId(post.title)}>{post.title}</h1>
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
        <TableOfContents content={post.content} title={post.title} />
        <MarkdownContent content={post.content} title={post.title} />
      </div>

      {userId && isCourseContent && (
        <div className="lesson-completion">
          <MarkLesson
            courseSlug={category}
            lessonSlug={slug}
            totalLessons={totalLessons}
            initialDone={isDone}
          />
        </div>
      )}

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