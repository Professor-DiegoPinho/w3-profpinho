import { expect, test } from '@playwright/test';
import admin from 'firebase-admin';

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'demo-test-project';

if (admin.apps.length === 0) {
  admin.initializeApp({ projectId: 'demo-test-project' });
}
const db = admin.firestore();

async function clearDatabase() {
  await fetch('http://127.0.0.1:8080/emulator/v1/projects/demo-test-project/databases/(default)/documents', {
    method: 'DELETE'
  });
}

test.describe('Categorias e Cursos E2E', () => {
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

  test('Como visitante, ao tentar acessar qualquer conteúdo de tutorial ou resumo, o conteúdo deverá carregar sem problemas', async ({ page }) => {
    // Acessar um tutorial (python). Deve redirecionar para a primeira aula e carregar o conteúdo
    await page.goto('/python');
    await page.waitForURL('**/python/introducao-ao-python');

    // Valida que o título da aula e o container principal estão visíveis
    await expect(page.locator('h1').first()).toHaveText('Introdução ao Python');
    await expect(page.locator('article')).toBeVisible();
    await expect(page.locator('text=Esta aula está disponível apenas para alunos inscritos no curso')).not.toBeVisible();

    // Acessar um resumo diretamente (python_resume/content).
    await page.goto('/python_resume/content');

    // Valida que o título do resumo e o container principal estão visíveis
    await expect(page.locator('h1').first()).toHaveText('Resumo Prático de Python');
    await expect(page.locator('article')).toBeVisible();
    await expect(page.locator('text=Esta aula está disponível apenas para alunos inscritos no curso')).not.toBeVisible();
  });

  test('Como visitante, ao tentar acessar qualquer conteúdo de curso, entrará na rota /[categories]. Aparecerá dois botões para se inscrever, e ao fazer isso, um modal para criar conta deve aparecer', async ({ page }) => {
    // Entrar na rota do curso
    await page.goto('/logica-de-programacao-python');

    // Valida que aparecem os botões de se inscrever (um no banner do topo/CTA e um na seção do final)
    const enrollButtons = page.getByRole('button', { name: 'Inscreva-se' });
    await expect(enrollButtons).toHaveCount(2);

    // Ao clicar em um dos botões, deve abrir o modal de autenticação
    await enrollButtons.first().click();
    
    // Valida a visibilidade do modal de autenticação para visitantes
    const authModalTitle = page.locator('#auth-modal-title');
    await expect(authModalTitle).toBeVisible();
    await expect(authModalTitle).toHaveText('Entre para liberar seu aprendizado');
  });

  test('Como aluno cadastrado, mas não inscrito no curso, o conteúdo do site deve mostrar todo o conteúdo da página e os botões para se inscrever agora cadastram o usuário corretamente (deve ser salvo no banco de dados o enrollment)', async ({ page, context }) => {
    const userId = 'usr_reg_not_enrolled';
    const email = 'aluno_reg@example.com';
    const name = 'Aluno Cadastrado';
    const courseId = 'logica-de-programacao-python';

    // Salva o usuário no Firestore (simulando usuário já cadastrado)
    await db.collection('users').doc(userId).set({
      userId,
      email,
      name,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    // Adiciona o cookie de mock de usuário autenticado
    await context.addCookies([{
      name: 'e2e-mock-user',
      value: JSON.stringify({ id: userId, name, email, enrolledCourseIds: [] }),
      domain: 'localhost',
      path: '/'
    }]);

    await page.goto('/logica-de-programacao-python');

    // Espera a sessão carregar no cliente antes de interagir
    await expect(page.getByRole('button', { name: 'Abrir menu do usuário' })).toBeVisible();

    // Mostra as duas opções de inscrição
    const enrollButtons = page.getByRole('button', { name: 'Inscreva-se' });
    await expect(enrollButtons).toHaveCount(2);

    // Garante que o enrollment ainda não existe no Firestore
    const initialDoc = await db.collection('enrollments').doc(`${userId}_${courseId}`).get();
    expect(initialDoc.exists).toBe(false);

    // Clica para se inscrever
    await enrollButtons.first().click();

    // Deve salvar no Firestore e redirecionar para a primeira aula
    await page.waitForURL('**/logica-de-programacao-python/as-4-etapas-e-hello-world');

    // Valida que o enrollment foi salvo corretamente no banco de dados
    const finalDoc = await db.collection('enrollments').doc(`${userId}_${courseId}`).get();
    expect(finalDoc.exists).toBe(true);
    expect(finalDoc.data().userId).toBe(userId);
    expect(finalDoc.data().courseId).toBe(courseId);
  });

  test('Como aluno cadastrado, mas não inscrito no curso, ao clicar em uma aula, o modal para se inscrever no curso deve aparecer', async ({ page, context }) => {
    const userId = 'usr_reg_not_enrolled_click_lesson';
    const email = 'aluno_click@example.com';
    const name = 'Aluno Cadastrado Clique';
    const courseId = 'logica-de-programacao-python';

    await db.collection('users').doc(userId).set({
      userId,
      email,
      name,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await context.addCookies([{
      name: 'e2e-mock-user',
      value: JSON.stringify({ id: userId, name, email, enrolledCourseIds: [] }),
      domain: 'localhost',
      path: '/'
    }]);

    await page.goto('/logica-de-programacao-python');

    // Espera a sessão carregar no cliente antes de interagir
    await expect(page.getByRole('button', { name: 'Abrir menu do usuário' })).toBeVisible();

    // Clica em uma aula disponível no preview (por exemplo, a primeira)
    const firstLessonButton = page.getByRole('button', { name: /As 4 etapas e Hello World/i });
    await expect(firstLessonButton).toBeVisible();
    await firstLessonButton.click();

    // Valida que o modal de confirmação de inscrição é exibido
    const confirmModalTitle = page.locator('#enrollment-confirm-title');
    await expect(confirmModalTitle).toBeVisible();
    await expect(confirmModalTitle).toHaveText('Inscreva-se para acessar as aulas');
  });

  test('Como aluno cadastrado e inscrito no curso, deve aparecer a lista de aulas mostrando todas as aulas e um toggle "Saiba mais" para as outras informações do curso, como vídeo, ebook, etc', async ({ page, context }) => {
    const userId = 'usr_enrolled_python';
    const email = 'aluno_enrolled@example.com';
    const name = 'Aluno Inscrito';
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

    await page.goto('/logica-de-programacao-python');

    // Espera a sessão carregar no cliente antes de interagir
    await expect(page.getByRole('button', { name: 'Abrir menu do usuário' })).toBeVisible();

    // Garante que todas as aulas do curso estão aparecendo diretamente sem a necessidade do botão "Ver mais"
    // "Prática com Python" é a lição 12 e não apareceria se estivesse limitada às 3 primeiras
    await expect(page.getByText('Prática com Python')).toBeVisible();

    // Valida o toggle "Saiba mais" para informações adicionais
    const toggleButton = page.getByRole('button', { name: 'Saiba mais' });
    await expect(toggleButton).toBeVisible();

    // Antes de abrir o toggle, o bloco com vídeo de apresentação e materiais do curso não deve estar visível
    await expect(page.locator('text=Vídeo de apresentação')).not.toBeVisible();
    await expect(page.locator('text=Materiais do curso')).not.toBeVisible();

    // Abre o toggle
    await toggleButton.click();

    // Após o clique, o conteúdo detalhado do curso deve aparecer
    await expect(page.locator('text=Vídeo de apresentação')).toBeVisible();
    await expect(page.locator('text=Materiais do curso')).toBeVisible();
  });
});
