/**
 * Teste E2E: Navegação e conteúdo público
 *
 * Testa os fluxos que qualquer visitante (sem autenticação) pode realizar:
 * - Home carrega corretamente
 * - Navegação para páginas de curso
 * - Página de validação de certificado acessível
 * - Health check da API
 */
import { expect, test } from '@playwright/test';

test.describe('Navegação pública', () => {
  test('a home deve carregar e exibir o título do site', async ({ page }) => {
    await page.goto('/');

    // Verifica que a página carregou (título ou elemento principal)
    await expect(page).toHaveTitle(/Diego Pinho|ProfPinho|Hub/i);

    // Verifica que o body não está vazio
    const body = page.locator('body');
    await expect(body).not.toBeEmpty();
  });

  test('a home deve exibir seções principais', async ({ page }) => {
    await page.goto('/');

    // Aguarda o conteúdo carregar (Next.js pode ter hydration delay)
    await page.waitForLoadState('networkidle');

    // Verifica que existe pelo menos um link ou botão visível
    const links = page.locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('deve navegar para a página de validação de certificado', async ({ page }) => {
    await page.goto('/validar-certificado');

    await page.waitForLoadState('networkidle');

    // Verifica que o título da página está correto
    await expect(page).toHaveTitle(/Validar Certificado/i);
  });

  test('a API de health deve retornar status healthy', async ({ request }) => {
    const response = await request.get('/api/health');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.status).toBe('healthy');
    expect(body.timestamp).toBeDefined();
  });

  test('deve retornar 404 para páginas inexistentes', async ({ page }) => {
    const response = await page.goto('/pagina-que-nao-existe-xyz');

    // Next.js retorna 404 para rotas inexistentes
    expect(response.status()).toBe(404);
  });
});
