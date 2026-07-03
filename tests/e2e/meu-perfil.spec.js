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

test.describe('Tela Meu Perfil', () => {
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

  test('deve redirecionar para a home quando visitante tentar acessar o perfil', async ({ page }) => {
    await page.goto('/meu-perfil');
    await expect(page).toHaveURL('/');
  });

  test('deve exibir dados básicos do perfil para usuário autenticado sem matrículas', async ({ page, context }) => {
    const userId = 'usr_regular_student';
    const email = 'aluno@example.com';
    const name = 'Aluno de Teste';

    await db.collection('users').doc(userId).set({
      userId,
      email,
      name,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await context.addCookies([{
      name: 'e2e-mock-user',
      value: JSON.stringify({ id: userId, name, email }),
      domain: 'localhost',
      path: '/'
    }]);

    await page.goto('/meu-perfil');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toHaveText('Meu perfil');
    await expect(page.getByText(name)).toBeVisible();
    await expect(page.getByText(email)).toBeVisible();
    await expect(page.getByText('0 cursos inscritos')).toBeVisible();
  });

  test('deve exibir o progresso correto e link da próxima aula para cursos matriculados', async ({ page, context }) => {
    const userId = 'usr_enrolled_student';
    const email = 'matriculado@example.com';
    const name = 'Aluno Matriculado';
    const courseId = 'python';

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

    // Progress is stored as a subcollection: users/{userId}/progress/{courseSlug}
    await db.collection('users').doc(userId).collection('progress').doc(courseId).set({
      completedLessons: ['introducao-ao-python', 'como-instalar-o-python'],
      totalLessons: 30,
      completionPercentage: 7,
    });

    await context.addCookies([{
      name: 'e2e-mock-user',
      value: JSON.stringify({ id: userId, name, email, enrolledCourseIds: [courseId] }),
      domain: 'localhost',
      path: '/'
    }]);

    await page.goto('/meu-perfil');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('1 curso inscrito')).toBeVisible();
    await expect(page.getByText('Python')).toBeVisible();
    // Progress % is recalculated from actual lesson count on disk (2 completed / 30 total = 7%)
    await expect(page.getByText(/7% completo/)).toBeVisible();

    // The link uses aria-label="Acessar curso {title}" and visible text "Continuar curso"
    const resumeLink = page.getByRole('link', { name: /acessar curso/i });
    await expect(resumeLink).toBeVisible();
    expect(await resumeLink.getAttribute('href')).toContain('/python/');
  });

  test('deve permitir editar o nome completo com persistência no Firestore', async ({ page, context }) => {
    const userId = 'usr_name_edit';
    const email = 'editavel@example.com';
    const name = 'Nome Original';

    await db.collection('users').doc(userId).set({
      userId,
      email,
      name,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    await context.addCookies([{
      name: 'e2e-mock-user',
      value: JSON.stringify({ id: userId, name, email }),
      domain: 'localhost',
      path: '/'
    }]);

    await page.goto('/meu-perfil');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Editar nome' }).click();

    const nameInput = page.locator('#name-input');
    await expect(nameInput).toBeVisible();
    await nameInput.fill('Nome Editado E2E');
    
    await page.getByRole('button', { name: '✓ Salvar' }).click();

    // The user name appears in a <strong> tag inside the Summary component, not in h1
    await expect(page.locator('strong').filter({ hasText: 'Nome Editado E2E' })).toBeVisible();

    const updatedUserDoc = await db.collection('users').doc(userId).get();
    expect(updatedUserDoc.data().name).toBe('Nome Editado E2E');
  });
});
