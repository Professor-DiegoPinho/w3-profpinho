
import { describe, expect, it } from 'vitest';
import { stripLessonPrefix } from '@/lib/slugUtils.js';

describe('stripLessonPrefix', () => {
  it('deve remover prefixo numérico simples (01-)', () => {
    expect(stripLessonPrefix('01-introducao-ao-html')).toBe('introducao-ao-html');
  });

  it('deve remover prefixos de múltiplos dígitos (123-)', () => {
    expect(stripLessonPrefix('123-aula-avancada')).toBe('aula-avancada');
  });

  it('deve retornar o slug inalterado se não houver prefixo numérico', () => {
    expect(stripLessonPrefix('introducao-ao-html')).toBe('introducao-ao-html');
  });

  it('deve retornar o slug inalterado se o número não estiver no início', () => {
    expect(stripLessonPrefix('aula-01-extra')).toBe('aula-01-extra');
  });

  it('deve lidar com slug que é apenas o prefixo (e.g., "01-")', () => {
    expect(stripLessonPrefix('01-')).toBe('');
  });

  it('deve lidar com slug que é apenas número sem hífen', () => {
    expect(stripLessonPrefix('01')).toBe('01');
  });

  it('deve retornar o valor original para tipos não-string', () => {
    expect(stripLessonPrefix(null)).toBeNull();
    expect(stripLessonPrefix(undefined)).toBeUndefined();
    expect(stripLessonPrefix(42)).toBe(42);
  });

  it('deve preservar o restante do slug após a remoção', () => {
    expect(stripLessonPrefix('05-css-grid-e-flexbox')).toBe('css-grid-e-flexbox');
  });

  it('deve lidar com prefixo de um único dígito', () => {
    expect(stripLessonPrefix('1-intro')).toBe('intro');
  });
});
