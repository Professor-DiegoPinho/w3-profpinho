import { auth } from '@/auth';
import Layout from '@/components/Layout';
import { getEnrolledCourseIds, mapSidebarWithLocks } from '@/lib/enrollment';
import { getSidebarData } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export default async function LessonRouteLayout({ children, params }) {
  const { category, slug } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  const enrolledCourseIds = await getEnrolledCourseIds(userId);
  const sidebarData = mapSidebarWithLocks(getSidebarData(), enrolledCourseIds);

  return (
    <Layout
      sidebarData={sidebarData}
      currentCategory={category}
      currentSlug={slug}
    >
      {children}
    </Layout>
  );
}
