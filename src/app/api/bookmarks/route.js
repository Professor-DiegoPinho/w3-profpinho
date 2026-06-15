import { auth } from "@/auth";
import { addBookmark, getUserBookmarks } from "@/lib/bookmarks";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  try {
    const bookmarks = await getUserBookmarks(session.user.id);
    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error("Erro ao buscar bookmarks:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido." }, { status: 400 });
  }

  const { lessonId, category, slug, title, description, categoryTitle } = body;

  if (
    typeof lessonId !== "string" || lessonId.length === 0 ||
    typeof category !== "string" || category.length === 0 ||
    typeof slug !== "string" || slug.length === 0
  ) {
    return NextResponse.json(
      { error: "lessonId, category e slug são obrigatórios." },
      { status: 400 },
    );
  }

  // Validação de comprimento máximo para prevenir abuso
  if (lessonId.length > 50 || category.length > 100 || slug.length > 200) {
    return NextResponse.json(
      { error: "Campos excedem o comprimento máximo permitido." },
      { status: 400 },
    );
  }

  try {
    const bookmark = await addBookmark(session.user.id, {
      lessonId,
      category,
      slug,
      title: typeof title === "string" ? title.slice(0, 300) : null,
      description: typeof description === "string" ? description.slice(0, 500) : null,
      categoryTitle: typeof categoryTitle === "string" ? categoryTitle.slice(0, 200) : null,
    });

    return NextResponse.json(bookmark, { status: bookmark.alreadyExisted ? 200 : 201 });
  } catch (error) {
    console.error("Erro ao adicionar bookmark:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
