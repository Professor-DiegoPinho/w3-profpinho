import { expect, test } from '@playwright/test';
import admin from 'firebase-admin';

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
process.env.FIREBASE_STORAGE_EMULATOR_HOST = '127.0.0.1:9199';
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'demo-test-project';
process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'demo-test-project.appspot.com';

if (admin.apps.length === 0) {
  admin.initializeApp({ projectId: 'demo-test-project' });
}
const db = admin.firestore();
const storage = admin.storage();

async function clearDatabase() {
  await fetch('http://127.0.0.1:8080/emulator/v1/projects/demo-test-project/databases/(default)/documents', {
    method: 'DELETE'
  });
}

test.describe('Aulas e Projetos E2E', () => {
  test.beforeEach(async ({ context }) => {
    await clearDatabase();
    // Pre-accept cookies to prevent the cookie consent overlay from blocking interactions
    await context.addCookies([{
      name: 'cookie-consent',
      value: 'accepted',
      domain: 'localhost',
      path: '/'
    }]);
  });

  test('Como visitante, ao acessar uma aula de tutorial, consegue ver o título, descrição e conteúdo', async ({ page }) => {
    await page.goto('/python/introducao-ao-python');

    // Valida o título principal
    await expect(page.locator('h1').first()).toHaveText('Introdução ao Python');

    // Valida a descrição da aula
    await expect(page.locator('p[class*="description"]').first()).toBeVisible();

    // Valida o container do conteúdo
    await expect(page.locator('article[class*="page"]').first()).toBeVisible();
  });

  test('Aulas de curso (com usuário autenticado e matriculado) podem exibir videoaulas (iframe de vídeo)', async ({ page, context }) => {
    const userId = 'usr_course_student';
    const email = 'student@example.com';
    const name = 'Aluno Matriculado';
    const courseId = 'logica-de-programacao-python';

    // Insere o usuário e a matrícula no Firestore
    await db.collection('users').doc(userId).set({
      userId,
      email,
      name,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await db.collection('enrollments').doc(`${userId}_${courseId}`).set({
      enrollmentId: `${userId}_${courseId}`,
      userId,
      courseId,
      enrolledAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await context.addCookies([{
      name: 'e2e-mock-user',
      value: JSON.stringify({ id: userId, name, email, enrolledCourseIds: [courseId] }),
      domain: 'localhost',
      path: '/'
    }]);

    await page.goto('/logica-de-programacao-python/as-4-etapas-e-hello-world');

    // Espera a sessão carregar no cliente
    await expect(page.getByRole('button', { name: 'Abrir menu do usuário' })).toBeVisible();

    // Aulas de curso como "Lógica de Programação" renderizam o iframe de vídeo
    await expect(page.locator('iframe')).toBeVisible();
  });

  test('Botões superiores para avançar/retroceder entre aulas devem funcionar corretamente', async ({ page, context }) => {
    const userId = 'usr_nav_student';
    const email = 'nav_student@example.com';
    const name = 'Aluno Navegador';
    const courseId = 'logica-de-programacao-python';

    await db.collection('users').doc(userId).set({
      userId,
      email,
      name,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await db.collection('enrollments').doc(`${userId}_${courseId}`).set({
      enrollmentId: `${userId}_${courseId}`,
      userId,
      courseId,
      enrolledAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await context.addCookies([{
      name: 'e2e-mock-user',
      value: JSON.stringify({ id: userId, name, email, enrolledCourseIds: [courseId] }),
      domain: 'localhost',
      path: '/'
    }]);

    // Acessa a segunda aula: Entrada de Dados
    await page.goto('/logica-de-programacao-python/entrada-de-dados');
    await expect(page.getByRole('button', { name: 'Abrir menu do usuário' })).toBeVisible();

    // Clica no botão de próxima aula (Variáveis) usando role e nome
    const nextButton = page.getByRole('link', { name: /Próxima aula/i });
    await expect(nextButton).toBeVisible();
    await nextButton.click();
    await page.waitForURL('**/logica-de-programacao-python/variaveis');

    // Clica no botão de aula anterior (Entrada de Dados) usando role e nome
    const prevButton = page.getByRole('link', { name: /Aula anterior/i });
    await expect(prevButton).toBeVisible();
    await prevButton.click();
    await page.waitForURL('**/logica-de-programacao-python/entrada-de-dados');
  });

  test('Botão de salvar aula como favorita deve salvar no Firestore e exibir na página de favoritos', async ({ page, context }) => {
    const userId = 'usr_fav_student';
    const email = 'fav_student@example.com';
    const name = 'Aluno Favoritador';
    const courseId = 'logica-de-programacao-python';
    const lessonId = '3242e9a84f88'; // ID do frontmatter de 01-as-4-etapas-e-hello-world.md

    await db.collection('users').doc(userId).set({
      userId,
      email,
      name,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await db.collection('enrollments').doc(`${userId}_${courseId}`).set({
      enrollmentId: `${userId}_${courseId}`,
      userId,
      courseId,
      enrolledAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await context.addCookies([{
      name: 'e2e-mock-user',
      value: JSON.stringify({ id: userId, name, email, enrolledCourseIds: [courseId] }),
      domain: 'localhost',
      path: '/'
    }]);

    await page.goto('/logica-de-programacao-python/as-4-etapas-e-hello-world');
    await expect(page.getByRole('button', { name: 'Abrir menu do usuário' })).toBeVisible();

    // Clica no botão de favoritar e espera a resposta da API retornar
    const favButton = page.getByRole('button', { name: 'Salvar nos favoritos' });
    await expect(favButton).toBeVisible();

    const responsePromise = page.waitForResponse(response =>
      response.url().includes('/api/bookmarks') && response.request().method() === 'POST'
    );
    await favButton.click();
    await responsePromise;

    // Garante que o estado mudou
    await expect(page.getByRole('button', { name: 'Remover dos favoritos' })).toBeVisible();

    // Verifica no Firestore
    const favRef = db.collection('users').doc(userId).collection('bookmarks').doc(lessonId);
    const doc = await favRef.get();
    expect(doc.exists).toBe(true);
    expect(doc.data().slug).toBe('as-4-etapas-e-hello-world');

    // Navega para /favoritos
    await page.goto('/favoritos');
    await expect(page.getByRole('button', { name: 'Abrir menu do usuário' })).toBeVisible();

    // Verifica se o card da aula favoritada aparece na listagem
    await expect(page.getByText('As 4 etapas e Hello World').first()).toBeVisible();
  });

  test('Em aulas de curso, deve permitir marcar a aula como concluída', async ({ page, context }) => {
    const userId = 'usr_progress_student';
    const email = 'progress_student@example.com';
    const name = 'Aluno Progresso';
    const courseId = 'logica-de-programacao-python';
    const lessonSlug = 'as-4-etapas-e-hello-world';

    await db.collection('users').doc(userId).set({
      userId,
      email,
      name,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await db.collection('enrollments').doc(`${userId}_${courseId}`).set({
      enrollmentId: `${userId}_${courseId}`,
      userId,
      courseId,
      enrolledAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await context.addCookies([{
      name: 'e2e-mock-user',
      value: JSON.stringify({ id: userId, name, email, enrolledCourseIds: [courseId] }),
      domain: 'localhost',
      path: '/'
    }]);

    await page.goto('/logica-de-programacao-python/as-4-etapas-e-hello-world');
    await expect(page.getByRole('button', { name: 'Abrir menu do usuário' })).toBeVisible();

    // Clica em marcar como concluída e aguarda a resposta da API
    const markButton = page.getByRole('button', { name: 'Marcar aula como concluída' });
    await expect(markButton).toBeVisible();

    const responsePromise = page.waitForResponse(response =>
      response.url().includes('/api/progress') && response.request().method() === 'POST'
    );
    await markButton.click();
    await responsePromise;

    // Valida que o botão mudou para desmarcar
    await expect(page.getByRole('button', { name: 'Desmarcar aula como concluída' })).toBeVisible();

    // Valida persistência no Firestore
    const progressRef = db.collection('users').doc(userId).collection('progress').doc(courseId);
    const progressDoc = await progressRef.get();
    expect(progressDoc.exists).toBe(true);
    expect(progressDoc.data().completedLessons).toContain(lessonSlug);
  });

  test('Aula chamada "projeto" possui um link para entregar projeto', async ({ page, context }) => {
    const userId = 'usr_project_student';
    const email = 'project_student@example.com';
    const name = 'Aluno Projeto';
    const courseId = 'logica-de-programacao-python';

    await db.collection('users').doc(userId).set({
      userId,
      email,
      name,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await db.collection('enrollments').doc(`${userId}_${courseId}`).set({
      enrollmentId: `${userId}_${courseId}`,
      userId,
      courseId,
      enrolledAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    // Como o botão depende de ter concluído todas as aulas normais (12 ao todo):
    await db.collection('users').doc(userId).collection('progress').doc(courseId).set({
      completedLessons: [
        'as-4-etapas-e-hello-world',
        'entrada-de-dados',
        'variaveis',
        'tipos-de-dados',
        'tipos-booleanos-e-condicionais',
        'condicoes-aninhadas',
        'logica-booleana',
        'logica-booleana-pt2',
        'listas-e-iteracoes',
        'laco-de-repeticao-for-in-range',
        'laco-de-repeticao-while',
        'pratica'
      ],
      totalLessons: 12,
      completionPercentage: 100,
    });

    await context.addCookies([{
      name: 'e2e-mock-user',
      value: JSON.stringify({ id: userId, name, email, enrolledCourseIds: [courseId] }),
      domain: 'localhost',
      path: '/'
    }]);

    await page.goto('/logica-de-programacao-python/projeto');
    await expect(page.getByRole('button', { name: 'Abrir menu do usuário' })).toBeVisible();

    // Valida o link do formulário de entrega
    const formLink = page.getByRole('link', { name: 'Formulário de Entrega' });
    await expect(formLink).toBeVisible();
    await expect(formLink).toHaveAttribute('href', '/logica-de-programacao-python/projeto/entrega');
  });

  test('Fluxos de acesso ao formulário de entrega com base no status da entrega', async ({ page, context }) => {
    const userId = 'usr_form_flow_student';
    const email = 'form_flow_student@example.com';
    const name = 'Aluno Fluxo';
    const courseId = 'logica-de-programacao-python';

    await db.collection('users').doc(userId).set({
      userId,
      email,
      name,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await db.collection('enrollments').doc(`${userId}_${courseId}`).set({
      enrollmentId: `${userId}_${courseId}`,
      userId,
      courseId,
      enrolledAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    // Mock do progresso concluído para habilitar submissão nos testes de formulário
    const progressRef = db.collection('users').doc(userId).collection('progress').doc(courseId);
    await progressRef.set({
      completedLessons: [
        'as-4-etapas-e-hello-world',
        'entrada-de-dados',
        'variaveis',
        'tipos-de-dados',
        'tipos-booleanos-e-condicionais',
        'condicoes-aninhadas',
        'logica-booleana',
        'logica-booleana-pt2',
        'listas-e-iteracoes',
        'laco-de-repeticao-for-in-range',
        'laco-de-repeticao-while',
        'pratica'
      ],
      totalLessons: 12,
      completionPercentage: 100,
    });

    await context.addCookies([{
      name: 'e2e-mock-user',
      value: JSON.stringify({ id: userId, name, email, enrolledCourseIds: [courseId] }),
      domain: 'localhost',
      path: '/'
    }]);

    // Caso 1: Sem submissões. Consegue ver e acessar o formulário
    await page.goto('/logica-de-programacao-python/projeto/entrega');
    await expect(page.getByRole('button', { name: 'Abrir menu do usuário' })).toBeVisible();
    await expect(page.locator('#check-link')).toBeVisible();

    // Caso 2: Possui submissão pendente de avaliação. Deve ser redirecionado para a página do projeto.
    // Salva na subcoleção correta: users/{userId}/submissions/{courseSlug}
    await db.collection('users').doc(userId).collection('submissions').doc(courseId).set({
      courseSlug: courseId,
      userId,
      attempts: [
        {
          id: 'sub_pending_1',
          url: 'https://github.com/user/project',
          platform: 'github',
          status: 'pending',
          submittedAt: admin.firestore.Timestamp.fromDate(new Date()),
        }
      ]
    });

    await page.goto('/logica-de-programacao-python/projeto/entrega');
    await page.waitForURL('**/logica-de-programacao-python/projeto');

    // Caso 3: Possui submissão aprovada. Acessa o formulário mas ele fica oculto, exibindo a mensagem de aprovação.
    await db.collection('users').doc(userId).collection('submissions').doc(courseId).set({
      courseSlug: courseId,
      userId,
      attempts: [
        {
          id: 'sub_approved_1',
          url: 'https://github.com/user/project',
          platform: 'github',
          status: 'approved',
          submittedAt: admin.firestore.Timestamp.fromDate(new Date()),
        }
      ]
    });

    await page.goto('/logica-de-programacao-python/projeto/entrega');
    await expect(page.getByRole('button', { name: 'Abrir menu do usuário' })).toBeVisible();
    await expect(page.locator('#check-link')).not.toBeVisible();
    await expect(page.locator('text=Parabéns! Seu projeto foi aprovado')).toBeVisible();
  });

  test('Aluno que já entregou alguma vez consegue ver o histórico de entrega', async ({ page, context }) => {
    const userId = 'usr_history_student';
    const email = 'history_student@example.com';
    const name = 'Aluno Histórico';
    const courseId = 'logica-de-programacao-python';

    await db.collection('users').doc(userId).set({
      userId,
      email,
      name,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await db.collection('enrollments').doc(`${userId}_${courseId}`).set({
      enrollmentId: `${userId}_${courseId}`,
      userId,
      courseId,
      enrolledAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    // Adiciona uma entrega rejeitada para exibir no histórico (na subcoleção do usuário)
    await db.collection('users').doc(userId).collection('submissions').doc(courseId).set({
      courseSlug: courseId,
      userId,
      attempts: [
        {
          id: 'sub_rejected_1',
          url: 'https://github.com/user/rejected-project',
          platform: 'github',
          status: 'rejected',
          submittedAt: admin.firestore.Timestamp.fromDate(new Date()),
        }
      ]
    });

    await context.addCookies([{
      name: 'e2e-mock-user',
      value: JSON.stringify({ id: userId, name, email, enrolledCourseIds: [courseId] }),
      domain: 'localhost',
      path: '/'
    }]);

    await page.goto('/logica-de-programacao-python/projeto');
    await expect(page.getByRole('button', { name: 'Abrir menu do usuário' })).toBeVisible();

    // Valida o título do histórico e se a URL da entrega anterior está visível
    await expect(page.locator('text=Histórico de entregas (1)')).toBeVisible();
    await expect(page.locator('text=https://github.com/user/rejected-project')).toBeVisible();
  });

  test('Aluno aprovado consegue baixar o certificado do curso', async ({ page, context }) => {
    const userId = 'usr_certificate_student';
    const email = 'certificate_student@example.com';
    const name = 'Aluno Certificado';
    const courseId = 'logica-de-programacao-python';
    const certificateId = '20260706TESTED';

    await db.collection('users').doc(userId).set({
      userId,
      email,
      name,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await db.collection('enrollments').doc(`${userId}_${courseId}`).set({
      enrollmentId: `${userId}_${courseId}`,
      userId,
      courseId,
      enrolledAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    // Define a submissão aprovada (na subcoleção do usuário)
    await db.collection('users').doc(userId).collection('submissions').doc(courseId).set({
      courseSlug: courseId,
      userId,
      attempts: [
        {
          id: 'sub_approved_cert',
          url: 'https://github.com/user/approved-project',
          platform: 'github',
          status: 'approved',
          submittedAt: admin.firestore.Timestamp.fromDate(new Date()),
        }
      ]
    });

    // Salva o registro do certificado no Firestore
    const certRef = db.collection('users').doc(userId).collection('certificates').doc(certificateId);
    await certRef.set({
      certificateId,
      studentName: name,
      courseSlug: courseId,
      courseName: 'Lógica de Programação com Python',
      workloadHours: 6,
      generatedAt: new Date().toISOString(),
      submissionId: 'sub_approved_cert',
      validatedCount: 0,
      pdfUrl: `https://storage.googleapis.com/demo-test-project.appspot.com/certificates/${certificateId}.pdf`,
    });

    const rootCertRef = db.collection('certificates').doc(certificateId);
    await rootCertRef.set({
      userId,
      certificateId,
      createdAt: new Date(),
    });

    // Carrega um arquivo dummy no Storage para o download resolver
    const bucket = storage.bucket('demo-test-project.appspot.com');
    const file = bucket.file(`certificates/${certificateId}.pdf`);
    await file.save(Buffer.from('PDF Dummy Content'), {
      metadata: {
        contentType: 'application/pdf',
      }
    });

    await context.addCookies([{
      name: 'e2e-mock-user',
      value: JSON.stringify({ id: userId, name, email, enrolledCourseIds: [courseId] }),
      domain: 'localhost',
      path: '/'
    }]);

    await page.goto('/logica-de-programacao-python/projeto');
    await expect(page.getByRole('button', { name: 'Abrir menu do usuário' })).toBeVisible();

    // Valida que a seção de certificado está visível
    await expect(page.getByRole('heading', { name: 'Seu Certificado' })).toBeVisible();

    // Clica para baixar o PDF e espera o retorno da API de download
    const downloadResponsePromise = page.waitForResponse(response =>
      response.url().includes(`/api/certificates/download/${certificateId}`) && response.request().method() === 'GET'
    );
    await page.getByRole('button', { name: /Baixar PDF/i }).click();
    const downloadResponse = await downloadResponsePromise;
    expect(downloadResponse.status()).toBe(200);
  });
});
