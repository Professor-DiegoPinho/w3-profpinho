import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('deve renderizar o título principal e o subtítulo no Hero', async ({ page }) => {
    const mainTitle = page.locator('h1');
    await expect(mainTitle).toBeVisible();
    await expect(mainTitle).toHaveText('Aprenda programação com quem ensina de verdade.');

    const subtitle = page.locator('p').filter({ hasText: 'Seu local de referência' });
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toHaveText('Seu local de referência e confiança para aprender tecnologia.');
  });

  test('deve exibir as seções de catálogo de lições e cursos', async ({ page }) => {
    const titles = ['Tutoriais', 'Cursos', 'Resumos'];
    for (const title of titles) {
      const sectionHeader = page.locator('h2').filter({ hasText: title });
      await expect(sectionHeader).toBeVisible();
    }

    const categoryCard = page.locator('div[class*="card"]').first();
    await expect(categoryCard).toBeVisible();
    
    const cardTitle = categoryCard.locator('h2');
    await expect(cardTitle).toBeVisible();
    
    const cardLink = categoryCard.locator('a');
    await expect(cardLink).toBeVisible();
    expect(await cardLink.getAttribute('href')).not.toBeNull();
  });

  test('deve exibir biografia, credenciais do professor e CTAs com links corretos', async ({ page }) => {
    const aboutTitle = page.locator('h2').filter({ hasText: 'Sobre o Professor Diego Pinho' });
    await expect(aboutTitle).toBeVisible();

    const credentialText = ['Professor e Desenvolvedor', 'Autor de Livros Técnicos', 'Especialista Web FullStack'];
    for (const cred of credentialText) {
      await expect(page.locator('span').filter({ hasText: cred })).toBeVisible();
    }

    const portfolioLink = page.getByRole('link', { name: 'Conheça meu trabalho completo' });
    await expect(portfolioLink).toBeVisible();
    expect(await portfolioLink.getAttribute('href')).toBe('https://diegopinho.com.br');
    expect(await portfolioLink.getAttribute('target')).toBe('_blank');

    const consultLink = page.getByRole('link', { name: 'Solicite uma consultoria' });
    await expect(consultLink).toBeVisible();
    expect(await consultLink.getAttribute('href')).toContain('forms.gle');
    expect(await consultLink.getAttribute('target')).toBe('_blank');
  });

  test('deve listar os benefícios principais do Learning Hub', async ({ page }) => {
    const featuresTitle = page.locator('h2').filter({ hasText: 'Por que escolher o Learning Hub?' });
    await expect(featuresTitle).toBeVisible();

    const expectedFeatures = [
      'Conteúdo Abrangente',
      'Exemplos Práticos',
      'Aprendizado Estruturado',
      'Tecnologias Modernas'
    ];

    for (const feature of expectedFeatures) {
      const featureHeader = page.locator('h3').filter({ hasText: feature });
      await expect(featureHeader).toBeVisible();
    }
  });

  test('deve alternar o tema do documento e persistir a escolha no localStorage', async ({ page }) => {
    const html = page.locator('html');
    const themeButton = page.locator('button[aria-label^="Mudar para tema"]');

    await expect(themeButton).toBeVisible();

    const initialTheme = await html.getAttribute('data-theme') || 'light';
    const targetTheme = initialTheme === 'light' ? 'dark' : 'light';

    await themeButton.click();
    await expect(html).toHaveAttribute('data-theme', targetTheme);

    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe(targetTheme);

    await themeButton.click();
    await expect(html).toHaveAttribute('data-theme', initialTheme);
    
    const restoredTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(restoredTheme).toBe(initialTheme);
  });

  test('deve exibir o botão "Entrar" no cabeçalho para usuários não autenticados', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'Entrar' });
    await expect(loginButton).toBeVisible();
  });
});
