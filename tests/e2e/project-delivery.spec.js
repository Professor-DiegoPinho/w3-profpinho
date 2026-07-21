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

// ---- Dados compartilhados do curso ----
const COURSE_ID = 'logica-de-programacao-python';
const ALL_LESSON_SLUGS = [
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
];

// ---- Helpers de seed ----

/**
 * Cria um usuário no Firestore e retorna seus dados.
 */
async function seedUser(id, overrides = {}) {
  const user = {
    userId: id,
    email: overrides.email || `${id}@example.com`,
    name: overrides.name || 'Aluno Teste',
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    ...overrides,
  };
  await db.collection('users').doc(id).set(user);
  return user;
}

/**
 * Cria a matrícula do usuário no curso.
 */
async function seedEnrollment(userId, courseId = COURSE_ID) {
  await db.collection('enrollments').doc(`${userId}_${courseId}`).set({
    enrollmentId: `${userId}_${courseId}`,
    userId,
    courseId,
    enrolledAt: admin.firestore.Timestamp.fromDate(new Date()),
  });
}

/**
 * Define o progresso do usuário no curso.
 * @param {string[]} completedLessons - lista de slugs das aulas concluídas
 */
async function seedProgress(userId, completedLessons, courseId = COURSE_ID) {
  const totalLessons = ALL_LESSON_SLUGS.length;
  const completionPercentage = Math.round((completedLessons.length / totalLessons) * 100);

  await db.collection('users').doc(userId).collection('progress').doc(courseId).set({
    completedLessons,
    totalLessons,
    completionPercentage,
  });
}

/**
 * Define uma submissão de projeto no Firestore.
 */
async function seedSubmission(userId, attempts, courseId = COURSE_ID) {
  await db.collection('users').doc(userId).collection('submissions').doc(courseId).set({
    courseSlug: courseId,
    userId,
    attempts,
  });
}

/**
 * Define o cookie de mock de sessão e aceita cookies.
 */
async function setupSession(context, user, courseId = COURSE_ID) {
  await context.addCookies([
    {
      name: 'cookie-consent',
      value: 'accepted',
      domain: 'localhost',
      path: '/'
    },
    {
      name: 'e2e-mock-user',
      value: JSON.stringify({
        id: user.userId,
        name: user.name,
        email: user.email,
        enrolledCourseIds: [courseId],
      }),
      domain: 'localhost',
      path: '/'
    }
  ]);
}

// ---- Testes ----

test.describe('Entrega de Projeto E2E', () => {
  test.beforeEach(async ({ context }) => {
    await clearDatabase();
    // Pre-accept cookies para evitar overlay de consent
    await context.addCookies([{
      name: 'cookie-consent',
      value: 'accepted',
      domain: 'localhost',
      path: '/'
    }]);
  });

  test('Usuário que não completou 100% das aulas não consegue acessar formulário de entrega', async ({ page, context }) => {
    const userId = 'usr_incomplete_progress';
    const user = await seedUser(userId, { name: 'Aluno Incompleto', email: 'incompleto@example.com' });
    await seedEnrollment(userId);

    // Completa apenas metade das aulas (6 de 12)
    const halfLessons = ALL_LESSON_SLUGS.slice(0, 6);
    await seedProgress(userId, halfLessons);
    await setupSession(context, user);

    // Acessa a página do projeto — aguarda o conteúdo principal carregar
    await page.goto(`/${COURSE_ID}/projeto`);
    await expect(page.getByRole('heading', { name: 'Projeto Final', level: 1 })).toBeVisible();

    // O botão "Formulário de Entrega" deve estar desabilitado (renderizado como <button disabled>)
    // Aguarda o componente client-side (ProjectSection) carregar e verificar via API
    const disabledButton = page.locator('button:has-text("Formulário de Entrega")[disabled]');
    await expect(disabledButton).toBeVisible({ timeout: 10_000 });

    // Verifica que o aviso de aulas incompletas é exibido
    await expect(page.locator('text=Aulas incompletas')).toBeVisible();
  });

  test('Usuário que completou 100% do curso consegue acessar formulário de entrega', async ({ page, context }) => {
    const userId = 'usr_complete_progress';
    const user = await seedUser(userId, { name: 'Aluno Completo', email: 'completo@example.com' });
    await seedEnrollment(userId);

    // Completa todas as aulas
    await seedProgress(userId, ALL_LESSON_SLUGS);
    await setupSession(context, user);

    // Acessa a página do projeto — aguarda o conteúdo principal carregar
    await page.goto(`/${COURSE_ID}/projeto`);
    await expect(page.getByRole('heading', { name: 'Projeto Final', level: 1 })).toBeVisible();

    // O link "Formulário de Entrega" deve estar habilitado (renderizado como <a>)
    // Aguarda o componente client-side carregar a verificação de permissão
    const formLink = page.getByRole('link', { name: 'Formulário de Entrega' });
    await expect(formLink).toBeVisible({ timeout: 10_000 });
    await expect(formLink).toHaveAttribute('href', `/${COURSE_ID}/projeto/entrega`);

    // Clica e navega para o formulário
    await formLink.click();
    await page.waitForURL(`**/${COURSE_ID}/projeto/entrega`);

    // Verifica que o formulário está acessível com o checkbox de confirmação visível
    await expect(page.locator('#check-link')).toBeVisible();

    // Verifica que o botão de envio existe (pode estar desabilitado pois falta preencher URL e checkboxes)
    const submitButton = page.getByRole('button', { name: 'Enviar entrega do projeto' });
    await expect(submitButton).toBeVisible();
  });

  test('Usuário que acessou formulário de entrega consegue enviar um projeto para avaliação', async ({ page, context }) => {
    const userId = 'usr_submit_project';
    const user = await seedUser(userId, { name: 'Aluno Entregador', email: 'entregador@example.com' });
    await seedEnrollment(userId);
    await seedProgress(userId, ALL_LESSON_SLUGS);
    await setupSession(context, user);

    // Acessa o formulário de entrega — aguarda o heading principal
    await page.goto(`/${COURSE_ID}/projeto/entrega`);
    await expect(page.getByRole('heading', { name: 'Formulário de Entrega' })).toBeVisible();

    // Espera o carregamento da verificação de permissão (botão sai de "Verificando..." para "Enviar Entrega")
    const submitButton = page.getByRole('button', { name: 'Enviar entrega do projeto' });
    await expect(submitButton).toBeVisible({ timeout: 10_000 });
    await expect(submitButton).toHaveText('Enviar Entrega', { timeout: 10_000 });

    // Preenche a URL do projeto
    const urlInput = page.getByLabel('URL de entrega do projeto');
    await urlInput.fill('https://github.com/aluno/meu-projeto');
    // Aguarda o debounce da URL (useDebounce de 300ms) resolver antes de prosseguir
    await page.waitForTimeout(500);

    // Marca todos os checkboxes de confirmação
    await page.locator('#check-link').check();
    await page.locator('#check-public').check();
    await page.locator('#check-analysis').check();
    await page.locator('#check-name').check();

    // Agora o botão de envio deve estar habilitado
    await expect(submitButton).toBeEnabled();

    // Envia a submissão e aguarda a resposta da API
    const responsePromise = page.waitForResponse(response =>
      response.url().includes('/api/submissions') && response.request().method() === 'POST'
    );
    await submitButton.click();
    const apiResponse = await responsePromise;
    expect(apiResponse.status()).toBe(200);

    // Verifica que o modal de sucesso aparece
    await expect(page.locator('text=Projeto Enviado com Sucesso!')).toBeVisible();

    // Verifica no Firestore que a submissão foi salva
    const submissionDoc = await db.collection('users').doc(userId).collection('submissions').doc(COURSE_ID).get();
    expect(submissionDoc.exists).toBe(true);
    const data = submissionDoc.data();
    expect(data.attempts).toHaveLength(1);
    expect(data.attempts[0].status).toBe('pending');
    expect(data.attempts[0].url).toBe('https://github.com/aluno/meu-projeto');
  });

  test('Após envio, usuário não consegue mais acessar formulário de entrega, apenas ver status na tela do projeto', async ({ page, context }) => {
    const userId = 'usr_post_submit';
    const user = await seedUser(userId, { name: 'Aluno Pós-Envio', email: 'pos_envio@example.com' });
    await seedEnrollment(userId);
    await seedProgress(userId, ALL_LESSON_SLUGS);

    // Cria uma submissão pendente diretamente no Firestore
    await seedSubmission(userId, [
      {
        id: 'sub_pending_1',
        url: 'https://github.com/aluno/projeto-enviado',
        platform: 'github',
        status: 'pending',
        submittedAt: admin.firestore.Timestamp.fromDate(new Date()),
      }
    ]);

    await setupSession(context, user);

    // Acessa diretamente a página do projeto (em vez de tentar /entrega que redireciona via client-side)
    await page.goto(`/${COURSE_ID}/projeto`);
    await expect(page.getByRole('heading', { name: 'Projeto Final', level: 1 })).toBeVisible();

    // Verifica que a mensagem de submissão em análise é exibida
    await expect(page.locator('text=Submissão em análise')).toBeVisible({ timeout: 10_000 });

    // O botão de formulário deve estar desabilitado
    const disabledButton = page.locator('button:has-text("Formulário de Entrega")[disabled]');
    await expect(disabledButton).toBeVisible();

    // Verifica que o histórico de entregas está visível
    await expect(page.locator('text=Histórico de entregas')).toBeVisible();
    await expect(page.locator('text=https://github.com/aluno/projeto-enviado')).toBeVisible();

    // Tenta acessar o formulário de entrega — deve ser redirecionado para a página do projeto
    // O Content.jsx redireciona via router.push quando detecta submissão pendente
    await page.goto(`/${COURSE_ID}/projeto/entrega`);
    // Aguarda o redirecionamento client-side (useEffect detecta pending e faz router.push)
    await page.waitForURL(`**/${COURSE_ID}/projeto`, { timeout: 15_000 });
  });

  test('Usuário reprovado consegue acessar novamente formulário de entrega e fazer nova entrega', async ({ page, context }) => {
    const userId = 'usr_rejected_resubmit';
    const user = await seedUser(userId, { name: 'Aluno Reprovado', email: 'reprovado@example.com' });
    await seedEnrollment(userId);
    await seedProgress(userId, ALL_LESSON_SLUGS);

    // Cria uma submissão rejeitada no Firestore
    await seedSubmission(userId, [
      {
        id: 'sub_rejected_1',
        url: 'https://github.com/aluno/projeto-rejeitado',
        platform: 'github',
        status: 'rejected',
        submittedAt: admin.firestore.Timestamp.fromDate(new Date()),
        reviewedAt: admin.firestore.Timestamp.fromDate(new Date()),
        reviewComment: 'Projeto não atende aos requisitos mínimos.',
      }
    ]);

    await setupSession(context, user);

    // 1. Verifica na página do projeto que o histórico aparece e o link está habilitado
    await page.goto(`/${COURSE_ID}/projeto`);
    await expect(page.getByRole('heading', { name: 'Projeto Final', level: 1 })).toBeVisible();
    await expect(page.locator('text=Histórico de entregas (1)')).toBeVisible({ timeout: 10_000 });
    const formLink = page.getByRole('link', { name: 'Formulário de Entrega' });
    await expect(formLink).toBeVisible({ timeout: 10_000 });

    // 2. Navega diretamente para o formulário (page.goto evita problemas de state client-side)
    await page.goto(`/${COURSE_ID}/projeto/entrega`);
    await expect(page.getByRole('heading', { name: 'Formulário de Entrega' })).toBeVisible();

    // Espera o botão de envio ficar pronto (sai de "Verificando..." para "Enviar Entrega")
    const submitButton = page.getByRole('button', { name: 'Enviar entrega do projeto' });
    await expect(submitButton).toHaveText('Enviar Entrega', { timeout: 10_000 });

    // Preenche os dados para a nova entrega
    const urlInput = page.getByLabel('URL de entrega do projeto');
    await urlInput.fill('https://github.com/aluno/projeto-corrigido');
    // Aguarda o debounce da URL (useDebounce de 300ms) resolver antes de prosseguir
    await page.waitForTimeout(500);

    await page.locator('#check-link').check();
    await page.locator('#check-public').check();
    await page.locator('#check-analysis').check();
    await page.locator('#check-name').check();

    // Envia a nova submissão
    await expect(submitButton).toBeEnabled();

    const responsePromise = page.waitForResponse(response =>
      response.url().includes('/api/submissions') && response.request().method() === 'POST'
    );
    await submitButton.click();
    const apiResponse = await responsePromise;
    expect(apiResponse.status()).toBe(200);

    // Modal de sucesso
    await expect(page.locator('text=Projeto Enviado com Sucesso!')).toBeVisible();

    // Verifica no Firestore que agora existem 2 tentativas
    const submissionDoc = await db.collection('users').doc(userId).collection('submissions').doc(COURSE_ID).get();
    expect(submissionDoc.exists).toBe(true);
    const data = submissionDoc.data();
    expect(data.attempts).toHaveLength(2);
    expect(data.attempts[1].status).toBe('pending');
    expect(data.attempts[1].url).toBe('https://github.com/aluno/projeto-corrigido');
  });

  test('Aluno aprovado consegue acessar certificado na tela do projeto e baixar o arquivo', async ({ page, context }) => {
    const userId = 'usr_approved_cert';
    const certificateId = '20260714TESTED';
    const user = await seedUser(userId, { name: 'Aluno Aprovado', email: 'aprovado@example.com' });
    await seedEnrollment(userId);
    await seedProgress(userId, ALL_LESSON_SLUGS);

    // Cria uma submissão aprovada
    await seedSubmission(userId, [
      {
        id: 'sub_approved_1',
        url: 'https://github.com/aluno/projeto-aprovado',
        platform: 'github',
        status: 'approved',
        submittedAt: admin.firestore.Timestamp.fromDate(new Date()),
        reviewedAt: admin.firestore.Timestamp.fromDate(new Date()),
      }
    ]);

    // Cria o certificado na subcoleção do usuário
    await db.collection('users').doc(userId).collection('certificates').doc(certificateId).set({
      certificateId,
      studentName: user.name,
      courseSlug: COURSE_ID,
      courseName: 'Lógica de Programação com Python',
      workloadHours: 6,
      generatedAt: new Date().toISOString(),
      submissionId: 'sub_approved_1',
      validatedCount: 0,
      pdfUrl: `https://storage.googleapis.com/demo-test-project.appspot.com/certificates/${certificateId}.pdf`,
    });

    // Cria o registro raiz do certificado (para validação pública)
    await db.collection('certificates').doc(certificateId).set({
      userId,
      certificateId,
      createdAt: new Date(),
    });

    // Carrega um PDF dummy no Storage para o download funcionar
    const bucket = storage.bucket('demo-test-project.appspot.com');
    const file = bucket.file(`certificates/${certificateId}.pdf`);
    await file.save(Buffer.from('PDF Dummy Content'), {
      metadata: { contentType: 'application/pdf' },
    });

    await setupSession(context, user);

    // Acessa a página do projeto (projeto.md) — aguarda o conteúdo principal
    await page.goto(`/${COURSE_ID}/projeto`);
    await expect(page.getByRole('heading', { name: 'Projeto Final', level: 1 })).toBeVisible();

    // Verifica que a seção de certificado está visível (carregada via client-side fetch)
    await expect(page.getByRole('heading', { name: 'Seu Certificado' })).toBeVisible({ timeout: 10_000 });

    // Verifica que o ID do certificado é exibido
    await expect(page.locator(`text=${certificateId}`)).toBeVisible();

    // Clica para baixar o PDF e espera a resposta da API
    const downloadResponsePromise = page.waitForResponse(response =>
      response.url().includes(`/api/certificates/download/${certificateId}`) && response.request().method() === 'GET'
    );
    await page.getByRole('button', { name: /Baixar PDF/i }).click();
    const downloadResponse = await downloadResponsePromise;
    expect(downloadResponse.status()).toBe(200);

    // Verifica que o content-type da resposta é PDF
    const contentType = downloadResponse.headers()['content-type'];
    expect(contentType).toContain('application/pdf');
  });
});
