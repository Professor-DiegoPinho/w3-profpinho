import { auth } from "@/auth";
import { getPostsInCategory } from "@/lib/markdown";
import { getLessonProgress } from "@/lib/progress";
import { NextResponse } from "next/server";

/**
 * GET /api/submissions/can-submit?course=slug
 * Verifica se o usuário pode enviar um projeto do curso
 * Retorna se o usuário completou todas as aulas (excluindo projeto.md)
 */
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

  try {
    // Buscar todas as aulas do curso
    const allLessons = getPostsInCategory(courseSlug);
    
    // Filtrar apenas as aulas regulares (excluindo projeto.md)
    const regularLessons = allLessons.filter(lesson => lesson.slug !== 'projeto');
    
    // Se não há aulas regulares, o usuário pode enviar
    if (regularLessons.length === 0) {
      return NextResponse.json({
        canSubmit: true,
        totalLessons: 0,
        completedLessons: 0,
        message: "Nenhuma aula obrigatória encontrada.",
      });
    }

    // Buscar o progresso do usuário
    const progress = await getLessonProgress(session.user.id, courseSlug);
    const completedLessons = progress?.completedLessons ?? [];
    
    // Verificar se todas as aulas regulares foram completadas
    const allLessonsCompleted = regularLessons.every(lesson => 
      completedLessons.includes(lesson.slug)
    );

    return NextResponse.json({
      canSubmit: allLessonsCompleted,
      totalLessons: regularLessons.length,
      completedLessons: completedLessons.length,
      missingLessons: regularLessons
        .filter(lesson => !completedLessons.includes(lesson.slug))
        .map(lesson => ({
          slug: lesson.slug,
          title: lesson.title,
        })),
      message: allLessonsCompleted 
        ? "Você completou todas as aulas! Pode enviar seu projeto."
        : `Você precisa completar ${regularLessons.length - completedLessons.length} aula(s) antes de enviar o projeto.`,
    });
  } catch (error) {
    console.error("Erro ao verificar permissão de envio:", error);
    return NextResponse.json(
      { error: "Falha ao verificar permissão de envio." },
      { status: 500 }
    );
  }
}
