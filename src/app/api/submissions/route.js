import { auth } from "@/auth";
import { getCourse } from "@/lib/courseAccess";
import { sendProjectSubmissionEmail } from "@/lib/emails";
import { adminDb } from "@/lib/firebaseAdmin";
import { getPostsInCategory } from "@/lib/markdown";
import { getLessonProgress } from "@/lib/progress";
import { deleteProjectSubmission, getProjectSubmissions, submitProjectUrl } from "@/lib/submissions";
import { validateUrl } from "@/lib/urlValidation";
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

  const submissions = await getProjectSubmissions(session.user.id, courseSlug);
  return NextResponse.json(submissions);
}

export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const body = await request.json();
  const { courseSlug, submissionUrl, platform, feedback } = body;

  console.log("📝 Recebi submissão:", {
    courseSlug,
    hasFeedback: !!feedback,
    feedbackLength: feedback?.length || 0,
  });

  // Validações
  if (!courseSlug || !submissionUrl) {
    return NextResponse.json(
      { error: "courseSlug e submissionUrl são obrigatórios." },
      { status: 400 }
    );
  }

  // Validar permissão: usuário completou todas as aulas?
  try {
    const userProgress = await getLessonProgress(session.user.id, courseSlug);
    const allLessons = await getPostsInCategory(courseSlug);
    
    // Filtrar aulas excluindo a do projeto
    const regularLessons = allLessons.filter((lesson) => lesson.slug !== "projeto");
    
    // Comparar aulas completadas com aulas do curso
    const completedLessons = userProgress?.completedLessons || [];
    const allCompleted = regularLessons.every((lesson) =>
      completedLessons.includes(lesson.slug)
    );

    if (!allCompleted) {
      console.warn(
        `⚠️ Tentativa de submissão não autorizada. Usuário ${session.user.id} não completou todas as aulas do curso ${courseSlug}`
      );
      return NextResponse.json(
        { 
          error: "Você deve completar todas as aulas do curso antes de apresentar o projeto.",
          code: "INCOMPLETE_LESSONS"
        },
        { status: 403 }
      );
    }

    // Validar se há uma submissão pendente de correção
    const submissionsRef = adminDb
      .collection("users")
      .doc(session.user.id)
      .collection("submissions")
      .doc(courseSlug);

    const submissionsSnap = await submissionsRef.get();
    if (submissionsSnap.exists) {
      const submissionsData = submissionsSnap.data();
      const attempts = Array.isArray(submissionsData.attempts) ? submissionsData.attempts : [];
      
      // Verificar se há uma submissão com status "pending"
      const hasPendingSubmission = attempts.some((attempt) => attempt.status === "pending");
      
      if (hasPendingSubmission) {
        console.warn(
          `⚠️ Tentativa de submissão bloqueada. Usuário ${session.user.id} tem uma submissão pendente de correção no curso ${courseSlug}`
        );
        return NextResponse.json(
          { 
            error: "Você já possui uma submissão aguardando correção. Aguarde o professor revisar antes de enviar uma nova.",
            code: "PENDING_SUBMISSION"
          },
          { status: 409 } // 409 Conflict
        );
      }
    }
  } catch (permissionError) {
    console.error("Erro ao validar permissão de submissão:", permissionError);
    return NextResponse.json(
      { error: "Erro ao validar permissões. Tente novamente." },
      { status: 500 }
    );
  }

  // Validar URL
  const validation = validateUrl(submissionUrl);
  if (!validation.isValid) {
    return NextResponse.json(
      { error: "A URL fornecida não é válida." },
      { status: 400 }
    );
  }

  try {
    const result = await submitProjectUrl(
      session.user.id,
      courseSlug,
      submissionUrl,
      platform || validation.platform,
      feedback || null
    );

    // Enviar email de confirmação de entrega
    try {
      const course = getCourse(courseSlug);
      const courseName = course?.title || courseSlug;

      await sendProjectSubmissionEmail({
        recipientEmail: session.user.email,
        studentName: session.user.name || "Aluno",
        courseName: courseName,
        submissionDate: new Date().toISOString().split('T')[0],
      });

      console.log(`✓ Email de submissão enviado para ${session.user.email}`);
    } catch (emailError) {
      // Log error mas não interrompe o fluxo de submissão
      console.error("❌ Erro ao enviar email de submissão:", emailError);
    }

    // Retornar todas as submissões após adicionar a nova
    const allSubmissions = await getProjectSubmissions(session.user.id, courseSlug);

    return NextResponse.json({
      submission: result.submission,
      submissions: allSubmissions.attempts || [],
      totalAttempts: result.totalAttempts,
    });
  } catch (error) {
    console.error("Erro ao salvar submissão:", error);
    return NextResponse.json(
      { error: "Falha ao enviar projeto. Tente novamente." },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const body = await request.json();
  const { courseSlug, submissionId } = body;

  if (!courseSlug || !submissionId) {
    return NextResponse.json(
      { error: "courseSlug e submissionId são obrigatórios." },
      { status: 400 }
    );
  }

  try {
    await deleteProjectSubmission(session.user.id, courseSlug, submissionId);

    // Retornar todas as submissões após deletar
    const allSubmissions = await getProjectSubmissions(session.user.id, courseSlug);

    return NextResponse.json({
      submissions: allSubmissions.attempts || [],
      totalAttempts: allSubmissions.attempts?.length || 0,
    });
  } catch (error) {
    console.error("Erro ao deletar submissão:", error);
    return NextResponse.json(
      { error: "Falha ao remover entrega. Tente novamente." },
      { status: 500 }
    );
  }
}
