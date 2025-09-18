import { getSidebarData } from '@/lib/markdown';

export async function GET() {
  try {
    const sidebarData = getSidebarData();

    return Response.json(sidebarData);
  } catch (error) {
    console.error('Error fetching sidebar data:', error);
    return Response.json(
      { error: 'Failed to fetch sidebar data' },
      { status: 500 }
    );
  }
}