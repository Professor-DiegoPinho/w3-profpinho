import { auth } from "@/auth";
import { isEligibleForFeedback, submitFeedback, validateFeedbackData } from "@/lib/feedback";
import { getLessonProgress } from "@/lib/progress";
import { NextResponse } from "next/server";

/**
 * POST /api/feedback
 * Submeter feedback de um curso
 */
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { courseSlug, npsScore, answers, comment } = body;

    if (!courseSlug) {
      return NextResponse.json(
        { error: "courseSlug é obrigatório" },
        { status: 400 }
      );
    }

    // Validar estrutura dos dados
    const validation = validateFeedbackData({ npsScore, answers, comment });
    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Dados inválidos", details: validation.errors },
        { status: 400 }
      );
    }

    // Verificar elegibilidade (100% + projeto aprovado + não respondeu)
    const progressData = await getLessonProgress(userId, courseSlug);
    const isEligible = await isEligibleForFeedback(userId, courseSlug, progressData);

    if (!isEligible) {
      return NextResponse.json(
        {
          error: "Usuário não é elegível para enviar feedback",
          reason: "Curso deve estar 100% concluído e projeto aprovado",
        },
        { status: 403 }
      );
    }

    // Salvar feedback
    const result = await submitFeedback(userId, courseSlug, {
      npsScore,
      answers,
      comment: comment || "",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao salvar feedback:", error);
    return NextResponse.json(
      { error: "Erro ao salvar feedback" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/feedback?courseSlug=...
 * Obter feedback do usuário para um curso (se existe)
 */
export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get("courseSlug");

    if (!courseSlug) {
      return NextResponse.json(
        { error: "courseSlug é obrigatório" },
        { status: 400 }
      );
    }

    // Este endpoint pode ser usado para verificar se o usuário já respondeu
    // Retorna apenas metadata, não dados sensíveis
    const progressData = await getLessonProgress(session.user.id, courseSlug);

    if (!progressData) {
      return NextResponse.json({
        responded: false,
        respondedAt: null,
      });
    }

    return NextResponse.json({
      responded: progressData.feedbackResponded === true,
      respondedAt: progressData.feedbackRespondedAt || null,
    });
  } catch (error) {
    console.error("Erro ao buscar status de feedback:", error);
    return NextResponse.json(
      { error: "Erro ao buscar status de feedback" },
      { status: 500 }
    );
  }
}
