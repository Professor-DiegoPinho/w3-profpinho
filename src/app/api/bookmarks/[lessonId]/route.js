import { auth } from "@/auth";
import { isLessonBookmarked, removeBookmark } from "@/lib/bookmarks";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { lessonId } = await params;

  if (typeof lessonId !== "string" || lessonId.length === 0) {
    return NextResponse.json(
      { error: "lessonId é obrigatório." },
      { status: 400 },
    );
  }

  try {
    const bookmarked = await isLessonBookmarked(session.user.id, lessonId);
    return NextResponse.json({ bookmarked });
  } catch (error) {
    console.error("Erro ao verificar bookmark:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { lessonId } = await params;

  if (typeof lessonId !== "string" || lessonId.length === 0) {
    return NextResponse.json(
      { error: "lessonId é obrigatório." },
      { status: 400 },
    );
  }

  try {
    await removeBookmark(session.user.id, lessonId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao remover bookmark:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
