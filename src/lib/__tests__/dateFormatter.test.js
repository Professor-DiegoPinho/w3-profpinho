import { describe, it, expect } from 'vitest';
import { formatDate, formatDateOnly } from '../dateFormatter.js';

describe('formatDate', () => {
  it('deve formatar uma data ISO com dia, mês, ano, hora e minuto', () => {
    // 15 de março de 2024, 14:30 UTC
    const timestamp = '2024-03-15T14:30:00Z';
    const result = formatDate(timestamp);

    // Verifica que contém os componentes esperados (formato pt-BR)
    expect(result).toMatch(/15\/03\/2024/);
    expect(result).toMatch(/\d{2}:\d{2}/);
  });

  it('deve formatar um timestamp numérico (Unix em ms)', () => {
    // 1 de janeiro de 2023, 12:00 UTC
    const timestamp = new Date('2023-01-01T12:00:00Z').getTime();
    const result = formatDate(timestamp);

    expect(result).toMatch(/01\/01\/2023/);
    expect(result).toMatch(/\d{2}:\d{2}/);
  });

  it('deve retornar string vazia para null', () => {
    expect(formatDate(null)).toBe('');
  });

  it('deve retornar string vazia para undefined', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('deve retornar string vazia para string vazia', () => {
    expect(formatDate('')).toBe('');
  });

  it('deve retornar string vazia para data inválida', () => {
    expect(formatDate('not-a-date')).toBe('');
  });

  it('deve lidar com objeto Date', () => {
    const date = new Date('2025-06-15T10:00:00Z');
    const result = formatDate(date);

    expect(result).toMatch(/15\/06\/2025/);
  });
});

describe('formatDateOnly', () => {
  it('deve formatar apenas dia, mês e ano (sem hora)', () => {
    const timestamp = '2024-07-20T18:45:00Z';
    const result = formatDateOnly(timestamp);

    expect(result).toMatch(/20\/07\/2024/);
    // Não deve conter hora
    expect(result).not.toMatch(/\d{2}:\d{2}/);
  });

  it('deve formatar um timestamp numérico', () => {
    // Usa horário ao meio-dia UTC para evitar mudança de dia por fuso horário
    const timestamp = new Date('2023-12-25T12:00:00Z').getTime();
    const result = formatDateOnly(timestamp);

    expect(result).toMatch(/25\/12\/2023/);
  });

  it('deve retornar string vazia para null', () => {
    expect(formatDateOnly(null)).toBe('');
  });

  it('deve retornar string vazia para undefined', () => {
    expect(formatDateOnly(undefined)).toBe('');
  });

  it('deve retornar string vazia para string vazia', () => {
    expect(formatDateOnly('')).toBe('');
  });

  it('deve retornar string vazia para data inválida', () => {
    expect(formatDateOnly('invalid')).toBe('');
  });
});
