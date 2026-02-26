import { auth } from '@/auth';
import CourseEnrollmentButton from '@/components/CourseEnrollmentButton';
import Layout from '@/components/Layout';
import { getEnrolledCourseIds, mapSidebarWithLocks } from '@/lib/enrollment';
import { getCategories, getPostsInCategory, getSidebarData } from '@/lib/markdown';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const categories = getCategories();

  return categories.map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const posts = getPostsInCategory(category);

  if (!posts.length) {
    notFound();
  }

  const session = await auth();
  const userId = session?.user?.id;
  const enrolledCourseIds = await getEnrolledCourseIds(userId);

  const sidebarData = mapSidebarWithLocks(getSidebarData(), enrolledCourseIds);
  const firstPost = posts[0];
  const totalLessons = posts.length;
  const totalReadingMinutes = posts.reduce((acc, post) => acc + (post.readingTime?.minutes || 0), 0);

  return (
    <Layout sidebarData={sidebarData} currentCategory={category}>
      <section className="course-enrollment-page">
        <header className="course-enrollment-header">
          <span className="course-enrollment-badge">Curso</span>
          <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
          <p>
            {firstPost.description || `Aprenda ${category} com aulas progressivas do básico ao avançado.`}
          </p>
        </header>

        <div className="course-enrollment-summary">
          <div className="course-summary-item">
            <strong>{totalLessons}</strong>
            <span>lições disponíveis</span>
          </div>
          <div className="course-summary-item">
            <strong>{totalReadingMinutes}</strong>
            <span>min de conteúdo estimado</span>
          </div>
          <div className="course-summary-item">
            <strong>{firstPost.title}</strong>
            <span>primeira lição</span>
          </div>
        </div>

        <div className="course-enrollment-actions">
          <CourseEnrollmentButton category={category} firstPostSlug={firstPost.slug} />
        </div>
      </section>
    </Layout>
  );
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const posts = getPostsInCategory(category);

  if (!posts.length) {
    return {
      title: 'Curso não encontrado',
    };
  }

  const firstPost = posts[0];

  return {
    title: `Inscrição - ${category.charAt(0).toUpperCase() + category.slice(1)}`,
    description: firstPost.description || `Resumo e inscrição para o curso de ${category}.`,
  };
}