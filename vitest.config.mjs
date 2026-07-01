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
    exclude: ['tests/e2e/**', 'node_modules/**'],
    fileParallelism: false,
    maxWorkers: 1,
    minWorkers: 1,
    projects: [
      {
        extends: true,
        test: {
          name: 'node-tests',
          include: ['tests/unit/**/*.test.js', 'tests/integration/**/*.test.js'],
          environment: 'node',
          setupFiles: ['./tests/setup.js'],
        },
      },
      {
        extends: true,
        test: {
          name: 'component-tests',
          include: ['tests/components/**/*.test.jsx'],
          environment: 'jsdom',
          setupFiles: ['./tests/setup.js'],
        },
      },
    ],
  },
});
