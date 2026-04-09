import { auth } from "@/auth";
import { getCourse } from "@/lib/courseAccess";
import { sendProjectSubmissionEmail } from "@/lib/emails";
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
  const { courseSlug, submissionUrl, platform } = body;

  // Validações
  if (!courseSlug || !submissionUrl) {
    return NextResponse.json(
      { error: "courseSlug e submissionUrl são obrigatórios." },
      { status: 400 }
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
      platform || validation.platform
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
