import { auth } from '@/auth';
import { getEnrolledCourseIds, mapSidebarWithAccess } from '@/lib/enrollment';
import { getSidebarData } from '@/lib/markdown';

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const rawSidebarData = getSidebarData();
    const enrolledCourseIds = Array.isArray(session?.user?.enrolledCourseIds)
      ? session.user.enrolledCourseIds
      : await getEnrolledCourseIds(userId);

    const sidebarData = mapSidebarWithAccess(rawSidebarData, enrolledCourseIds);

    return Response.json(sidebarData);
  } catch (error) {
    console.error('Error fetching sidebar data:', error);
    return Response.json(
      { error: 'Failed to fetch sidebar data' },
      { status: 500 }
    );
  }
}