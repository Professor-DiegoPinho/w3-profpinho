import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Habilita JSX automático (não precisa importar React manualmente)
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    include: ['tests/**/*.test.js', 'tests/**/*.test.jsx'],
    environment: 'node',
    environmentMatchGlobs: [
      // Testes de componentes React usam jsdom
      ['tests/components/**/*.test.jsx', 'jsdom'],
    ],
    setupFiles: ['./tests/setup.js'],
    // Excluir testes E2E (gerenciados pelo Playwright)
    exclude: ['tests/e2e/**', 'node_modules/**'],
  },
});
