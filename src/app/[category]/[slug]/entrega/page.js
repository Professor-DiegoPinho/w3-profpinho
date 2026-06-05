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
import { Content } from './_components/Content/Content';
import styles from './page.module.css';
import * as Icons from '@/assets/icons';

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
      <div className={styles.page}>
        <div className={styles.pageContainer}>
          <Link
            href={`/${category}/${slug}`}
            className={styles.backButton}
            aria-label="Voltar para a página do projeto"
          >
            <Icons.ChevronLeft size={24} />
            Voltar
          </Link>

          <div className={styles.content}>
            <Content
              category={category}
              projectTitle={post.title}
              initialSubmissions={projectSubmissions}
              userName={userName}
              userId={userId}
            />
          </div>
        </div>
      </div>
    </>
  );
}
