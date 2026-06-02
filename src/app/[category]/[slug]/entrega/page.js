import { auth } from '@/auth';
import {
  canUserAccessCourseLessons,
  isCourseVisibleToUser
} from '@/lib/courseAccess';
import { getEnrolledCourseIds } from '@/lib/enrollment';
import { getCategoryTitle, getPost } from '@/lib/markdown';
import { getProjectSubmissions } from '@/lib/submissions';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ProjectSubmissionPage } from './ProjectSubmissionPage';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  if (!post) {
    return {
      title: 'Página Não Encontrada',
    };
  }

  return {
    title: `Entrega de ${post.title} | Diego Pinho Learning Hub`,
    description: `Envie seu projeto: ${post.title}`,
  };
}

export default async function ProjectSubmissionPageRoute({ params }) {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  // Validar se é o projeto
  if (!post || slug !== 'projeto') {
    notFound();
  }

  const session = await auth();
  const userId = session?.user?.id;
  const userName = session?.user?.name;

  if (!userId) {
    redirect('/');
  }

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

  const categoryTitle = getCategoryTitle(category);

  // Buscar submissões
  let projectSubmissions = [];
  const submissions = await getProjectSubmissions(userId, category);
  projectSubmissions = submissions?.attempts || [];

  return (
    <>
      <style>{`
        body {
          --custom-page-layout: true;
        }
      `}</style>
      <div className={styles.page}>
        <Link
          href={`/${category}/${slug}`}
          className={styles.backButton}
          aria-label="Voltar para a página do projeto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
            className={styles.backIcon}
            aria-hidden="true"
          >
            <path d="m313-440 196 196q12 12 11.5 28T508-188q-12 11-28 11.5T452-188L188-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l264-264q11-11 27.5-11t28.5 11q12 12 12 28.5T508-715L313-520h447q17 0 28.5 11.5T800-480q0 17-11.5 28.5T760-440H313Z" />
          </svg>
          Voltar para o projeto
        </Link>

        <div className={styles.content}>
          <ProjectSubmissionPage
            category={category}
            projectTitle={post.title}
            initialSubmissions={projectSubmissions}
            userName={userName}
            userId={userId}
          />
        </div>
      </div>
    </>
  );
}
