/**
 * Setup global para testes Vitest.
 *
 * - Importa matchers extras do @testing-library/jest-dom
 * - Carrega as variáveis de ambiente de .env.test para os testes locais
 */
import '@testing-library/jest-dom/vitest';
import fs from 'fs';
import path from 'path';

try {
  const envPath = path.resolve(process.cwd(), '.env.test');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const firstEquals = trimmed.indexOf('=');
        if (firstEquals !== -1) {
          const key = trimmed.slice(0, firstEquals).trim();
          const value = trimmed.slice(firstEquals + 1).trim();
          // Remove aspas simples/duplas das extremidades se existirem
          const cleanValue = value.replace(/^['"]|['"]$/g, '');
          process.env[key] = cleanValue;
        }
      }
    });
  }
} catch (error) {
  console.error('Erro ao carregar o arquivo .env.test no setup global:', error);
}
