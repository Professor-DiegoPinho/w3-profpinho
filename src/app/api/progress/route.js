import { auth } from "@/auth";
import { getLessonProgress, toggleLessonComplete } from "@/lib/progress";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const courseSlug = searchParams.get("course");

  if (!courseSlug) {
    return NextResponse.json(
      { error: "Parâmetro 'course' é obrigatório." },
      { status: 400 }
    );
  }

  const progress = await getLessonProgress(session.user.id, courseSlug);
  return NextResponse.json(progress);
}

export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const body = await request.json();
  const { courseSlug, lessonSlug, totalLessons } = body;

  if (!courseSlug || !lessonSlug) {
    return NextResponse.json(
      { error: "courseSlug e lessonSlug são obrigatórios." },
      { status: 400 }
    );
  }

  const result = await toggleLessonComplete(
    session.user.id,
    courseSlug,
    lessonSlug,
    totalLessons
  );

  return NextResponse.json(result);
}