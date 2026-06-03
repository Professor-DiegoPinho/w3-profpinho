import { auth } from '@/auth';
import PostNavigation from '@/app/[category]/[slug]/_components/PostNavigation/PostNavigation';
import Header from '@/app/[category]/[slug]/_components/Header/Header';
import Content from '@/app/[category]/[slug]/_components/Content/Content';
import Completion from '@/app/[category]/[slug]/_components/Completion/Completion';
import { CONTENT_TYPE } from '@/data';
import {
  canUserAccessCourseLessons,
  getCourseAccessType,
  isCourseVisibleToUser,
} from '@/lib/courseAccess';
import { getEnrolledCourseIds } from '@/lib/enrollment';
import { getAllPosts, getCategoryTitle, getCourseLessonsCount, getPost, getPostNavigation, getPostsInCategory } from '@/lib/markdown';
import { getLessonProgress, isLessonCompleted } from '@/lib/progress';
import { getProjectSubmissions } from '@/lib/submissions';
import { notFound, redirect } from 'next/navigation';
import styles from './page.module.css';

export const revalidate = 3600; // ISR: revalida a cada 1 hora

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
  const userName = session?.user?.name;
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

  const totalLessons = getCourseLessonsCount(category);

  const progressData = userId
    ? await getLessonProgress(userId, category)
    : null;

  const isDone = isLessonCompleted(progressData, slug);

  // Dados para o componente de submissão do projeto
  let projectSubmissions = null;
  if (slug === 'projeto' && userId) {
    const submissions = await getProjectSubmissions(userId, category);
    projectSubmissions = submissions?.attempts || [];
  }

  return (
    <article className={styles.page}>
      <Header
        categoryTitle={categoryTitle}
        title={post.title}
        description={post.description}
        readingTime={post.readingTime}
        navigation={navigation}
        category={category}
        isCourseContent={isCourseContent}
      />

      <Content
        content={post.content}
        title={post.title}
        hasLessonAccess={hasLessonAccess}
        category={category}
      />

      <Completion
        userId={userId}
        hasLessonAccess={hasLessonAccess}
        isCourseContent={isCourseContent}
        slug={slug}
        category={category}
        title={post.title}
        projectSubmissions={projectSubmissions}
        userName={userName}
        totalLessons={totalLessons}
        isDone={isDone}
      />

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