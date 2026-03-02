import { auth } from '@/auth';
import Layout from '@/components/Layout';
import { getEnrolledCourseIds, mapSidebarWithAccess } from '@/lib/enrollment';
import { getSidebarData } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export default async function LessonRouteLayout({ children, params }) {
  const { category, slug } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  const enrolledCourseIds = Array.isArray(session?.user?.enrolledCourseIds)
    ? session.user.enrolledCourseIds
    : await getEnrolledCourseIds(userId);
  const sidebarData = mapSidebarWithAccess(getSidebarData(), enrolledCourseIds);

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
