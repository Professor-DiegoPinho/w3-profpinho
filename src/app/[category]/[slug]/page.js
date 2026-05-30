import { auth } from '@/auth';
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent';
import MarkLesson from '@/components/MarkLesson/MarkLesson';
import PostNavigation from '@/components/PostNavigation/PostNavigation';
import ProjectSubmission from '@/components/ProjectSubmission/ProjectSubmission';
import ReadingTime from '@/components/ReadingTime/ReadingTime';
import TableOfContents from '@/components/TableOfContents/TableOfContents';
import { CONTENT_TYPE } from '@/data';
import {
    canUserAccessCourseLessons,
    getCourseAccessType,
    isCourseVisibleToUser,
} from '@/lib/courseAccess';
import { getEnrolledCourseIds } from '@/lib/enrollment';
import { generateId } from '@/lib/generateId';
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

  const allLessons = getPostsInCategory(category);
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
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <span className={styles.categoryName}>
            {categoryTitle}
          </span>
          <span className={styles.separator}>›</span>
          <span>{post.title}</span>
        </div>
        <h1 id={generateId(post.title)}>{post.title}</h1>
        {post.description && (
          <p className={styles.description}>{post.description}</p>
        )}
        {post.readingTime && (
          <div className={styles.meta}>
            <ReadingTime readingTime={post.readingTime} showFullText={true} />
          </div>
        )}
      </header>

      <div className={styles.body}>
        <TableOfContents content={post.content} title={post.title} />
        {hasLessonAccess ? (
          <MarkdownContent content={post.content} title={post.title} />
        ) : (
          <div className={styles.lockedNotice}>
            <p>Esta aula está disponível apenas para alunos inscritos no curso.</p>
            <p>
              <a href={`/${category}`} className={styles.lockedLink}>
                Volte para a página do curso para se inscrever
              </a>
            </p>
          </div>
        )}
      </div>

      {userId && hasLessonAccess && isCourseContent && slug === 'projeto' ? (
        <div className={styles.completion}>
          <ProjectSubmission
            courseSlug={category}
            projectTitle={post.title}
            initialSubmissions={projectSubmissions}
            userName={userName}
            userId={userId}
            submitMode="simple"
          />
        </div>
      ) : userId && hasLessonAccess && isCourseContent ? (
        <div className={styles.completion}>
          <MarkLesson
            courseSlug={category}
            lessonSlug={slug}
            totalLessons={totalLessons}
            initialDone={isDone}
          />
        </div>
      ) : null}

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