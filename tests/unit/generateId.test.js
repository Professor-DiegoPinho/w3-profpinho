
import { describe, expect, it } from 'vitest';
import { generateId } from '@/lib/generateId.js';

describe('generateId', () => {
  it('deve converter texto para lowercase', () => {
    expect(generateId('Hello World')).toBe('hello-world');
  });

  it('deve substituir espaços por hífens', () => {
    expect(generateId('foo bar baz')).toBe('foo-bar-baz');
  });

  it('deve remover caracteres especiais (pontuação, acentos, etc.)', () => {
    expect(generateId('Hello, World!')).toBe('hello-world');
    expect(generateId('Olá Mundo?')).toBe('ol-mundo');
  });

  it('deve colapsar hífens consecutivos em um só', () => {
    expect(generateId('foo---bar')).toBe('foo-bar');
    expect(generateId('foo - bar')).toBe('foo-bar');
    // Múltiplos espaços também colapsam
    expect(generateId('foo   bar')).toBe('foo-bar');
  });

  it('deve preservar números no resultado', () => {
    expect(generateId('Aula 01 Intro')).toBe('aula-01-intro');
  });

  it('deve retornar string vazia para string vazia', () => {
    expect(generateId('')).toBe('');
  });

  it('deve retornar string vazia para valor não-string (null, undefined, number)', () => {
    expect(generateId(null)).toBe('');
    expect(generateId(undefined)).toBe('');
    expect(generateId(42)).toBe('');
    expect(generateId({})).toBe('');
  });

  it('deve lidar com string já em formato de ID', () => {
    expect(generateId('already-an-id')).toBe('already-an-id');
  });

  it('deve lidar com múltiplos espaços em branco (tabs, newlines)', () => {
    expect(generateId('foo\tbar\nbaz')).toBe('foo-bar-baz');
  });
});
