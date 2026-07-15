
import { describe, expect, it } from 'vitest';
import {
  calculateReadingTime,
  getReadingTimeCategory,
  formatReadingTime,
} from '@/lib/readingTime.js';


describe('calculateReadingTime', () => {
  it('deve calcular o tempo de leitura corretamente para texto simples', () => {
    const text = Array(200).fill('palavra').join(' ');
    const result = calculateReadingTime(text);

    expect(result.minutes).toBe(1);
    expect(result.words).toBe(200);
    expect(result.text).toBe('1 min de leitura');
  });

  it('deve arredondar para cima (ceil) o tempo de leitura', () => {
    const text = Array(201).fill('palavra').join(' ');
    const result = calculateReadingTime(text);

    expect(result.minutes).toBe(2);
    expect(result.words).toBe(201);
  });

  it('deve gerar texto "Menos de 1 min" para conteúdo muito curto mas não vazio', () => {
    const result = calculateReadingTime('palavra', 9999);

    expect(result.minutes).toBe(1);
    expect(result.text).toBe('1 min de leitura');
  });

  it('deve gerar texto plural para mais de 1 minuto', () => {
    const text = Array(600).fill('palavra').join(' ');
    const result = calculateReadingTime(text);

    expect(result.minutes).toBe(3);
    expect(result.text).toBe('3 min de leitura');
  });

  it('deve remover tags HTML do conteúdo antes de contar', () => {
    const text = '<p>Uma <strong>palavra</strong> aqui</p>';
    const result = calculateReadingTime(text);

    expect(result.words).toBe(3);
  });

  it('deve remover blocos de código markdown antes de contar', () => {
    const text = 'Texto antes\n```javascript\nconsole.log("hello");\n```\nTexto depois';
    const result = calculateReadingTime(text);

    expect(result.words).toBe(4);
  });

  it('deve remover inline code markdown antes de contar', () => {
    const text = 'Use o comando `npm install` para instalar';
    const result = calculateReadingTime(text);

    expect(result.words).toBe(5);
  });

  it('deve remover imagens markdown antes de contar', () => {
    const text = 'Texto ![alt](https://img.png) mais texto';
    const result = calculateReadingTime(text);

    expect(result.words).toBe(3);
  });

  it('deve remover links markdown mas preservar o texto', () => {
    const text = 'Visite [MDN](https://developer.mozilla.org) para docs';
    const result = calculateReadingTime(text);

    expect(result.words).toBe(3);
  });

  it('deve aceitar WPM customizado', () => {
    const text = Array(100).fill('palavra').join(' ');
    const result = calculateReadingTime(text, 100);

    expect(result.minutes).toBe(1);
    expect(result.wordsPerMinute).toBe(100);
  });

  it('deve retornar 0 minutos e 0 palavras para null', () => {
    const result = calculateReadingTime(null);

    expect(result.minutes).toBe(0);
    expect(result.words).toBe(0);
    expect(result.text).toBe('0 min de leitura');
  });

  it('deve retornar 0 minutos e 0 palavras para undefined', () => {
    const result = calculateReadingTime(undefined);

    expect(result.minutes).toBe(0);
    expect(result.words).toBe(0);
  });

  it('deve retornar 0 para string vazia', () => {
    const result = calculateReadingTime('');

    expect(result.minutes).toBe(0);
    expect(result.words).toBe(0);
  });

  it('deve retornar 0 para tipo não-string', () => {
    const result = calculateReadingTime(42);

    expect(result.minutes).toBe(0);
    expect(result.words).toBe(0);
  });
});


describe('getReadingTimeCategory', () => {
  it('deve retornar "quick" para 0 minutos', () => {
    expect(getReadingTimeCategory(0)).toBe('quick');
  });

  it('deve retornar "quick" para 1 minuto', () => {
    expect(getReadingTimeCategory(1)).toBe('quick');
  });

  it('deve retornar "quick" para 2 minutos', () => {
    expect(getReadingTimeCategory(2)).toBe('quick');
  });

  it('deve retornar "medium" para 3 minutos', () => {
    expect(getReadingTimeCategory(3)).toBe('medium');
  });

  it('deve retornar "medium" para 5 minutos', () => {
    expect(getReadingTimeCategory(5)).toBe('medium');
  });

  it('deve retornar "long" para 6 minutos', () => {
    expect(getReadingTimeCategory(6)).toBe('long');
  });

  it('deve retornar "long" para 20 minutos', () => {
    expect(getReadingTimeCategory(20)).toBe('long');
  });
});


describe('formatReadingTime', () => {
  it('deve retornar ícone ⚡ e cor verde para leitura rápida (1 min)', () => {
    const result = formatReadingTime(1);

    expect(result.icon).toBe('⚡');
    expect(result.color).toBe('#04AA6D');
    expect(result.category).toBe('quick');
    expect(result.text).toBe('1 min');
    expect(result.fullText).toBe('1 min de leitura');
  });

  it('deve retornar ícone 📖 e cor laranja para leitura média (4 min)', () => {
    const result = formatReadingTime(4);

    expect(result.icon).toBe('📖');
    expect(result.color).toBe('#FFA500');
    expect(result.category).toBe('medium');
    expect(result.text).toBe('4 min');
    expect(result.fullText).toBe('4 min de leitura');
  });

  it('deve retornar ícone 📚 e cor vermelha para leitura longa (10 min)', () => {
    const result = formatReadingTime(10);

    expect(result.icon).toBe('📚');
    expect(result.color).toBe('#FF6B6B');
    expect(result.category).toBe('long');
    expect(result.text).toBe('10 min');
    expect(result.fullText).toBe('10 min de leitura');
  });

  it('deve retornar "Menos de 1 min" para 0 minutos', () => {
    const result = formatReadingTime(0);

    expect(result.text).toBe('Menos de 1 min');
    expect(result.fullText).toBe('Menos de 1 min de leitura');
  });
});
