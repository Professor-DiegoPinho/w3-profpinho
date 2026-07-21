
import { describe, expect, it } from 'vitest';
import {
  FEEDBACK_QUESTIONS,
  NPS_LABELS,
  DEFAULT_COMMENT_PLACEHOLDER,
} from '@/lib/feedbackConfig.js';


describe('FEEDBACK_QUESTIONS', () => {
  it('deve ser um array não vazio', () => {
    expect(Array.isArray(FEEDBACK_QUESTIONS)).toBe(true);
    expect(FEEDBACK_QUESTIONS.length).toBeGreaterThan(0);
  });

  it('cada pergunta deve ter id, text, type e options', () => {
    FEEDBACK_QUESTIONS.forEach((question) => {
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('text');
      expect(question).toHaveProperty('type');
      expect(question).toHaveProperty('options');

      expect(typeof question.id).toBe('string');
      expect(question.id.length).toBeGreaterThan(0);
      expect(typeof question.text).toBe('string');
      expect(question.text.length).toBeGreaterThan(0);
    });
  });

  it('cada pergunta deve ter type "multiple-choice"', () => {
    FEEDBACK_QUESTIONS.forEach((question) => {
      expect(question.type).toBe('multiple-choice');
    });
  });

  it('cada pergunta deve ter options como array com pelo menos 2 opções', () => {
    FEEDBACK_QUESTIONS.forEach((question) => {
      expect(Array.isArray(question.options)).toBe(true);
      expect(question.options.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('cada option deve ter value e label como strings não vazias', () => {
    FEEDBACK_QUESTIONS.forEach((question) => {
      question.options.forEach((option) => {
        expect(typeof option.value).toBe('string');
        expect(option.value.length).toBeGreaterThan(0);
        expect(typeof option.label).toBe('string');
        expect(option.label.length).toBeGreaterThan(0);
      });
    });
  });

  it('cada pergunta deve ter worstOptions como array', () => {
    FEEDBACK_QUESTIONS.forEach((question) => {
      expect(Array.isArray(question.worstOptions)).toBe(true);
    });
  });

  it('worstOptions devem conter apenas valores existentes nas options', () => {
    FEEDBACK_QUESTIONS.forEach((question) => {
      const validValues = question.options.map((o) => o.value);
      question.worstOptions.forEach((worstVal) => {
        expect(validValues).toContain(worstVal);
      });
    });
  });

  it('os IDs das perguntas devem ser únicos', () => {
    const ids = FEEDBACK_QUESTIONS.map((q) => q.id);
    const uniqueIds = [...new Set(ids)];

    expect(ids.length).toBe(uniqueIds.length);
  });

  it('deve conter as perguntas esperadas (difficulty, video-quality, text-quality, exercise-quality)', () => {
    const ids = FEEDBACK_QUESTIONS.map((q) => q.id);

    expect(ids).toContain('difficulty');
    expect(ids).toContain('video-quality');
    expect(ids).toContain('text-quality');
    expect(ids).toContain('exercise-quality');
  });
});


describe('NPS_LABELS', () => {
  it('deve ser um objeto não nulo', () => {
    expect(typeof NPS_LABELS).toBe('object');
    expect(NPS_LABELS).not.toBeNull();
  });

  it('deve ter labels para os extremos (0 e 10) e neutro (5)', () => {
    expect(NPS_LABELS).toHaveProperty('0');
    expect(NPS_LABELS).toHaveProperty('5');
    expect(NPS_LABELS).toHaveProperty('10');
  });

  it('cada label deve ser uma string não vazia', () => {
    Object.values(NPS_LABELS).forEach((label) => {
      expect(typeof label).toBe('string');
      expect(label.length).toBeGreaterThan(0);
    });
  });
});


describe('DEFAULT_COMMENT_PLACEHOLDER', () => {
  it('deve ser uma string não vazia', () => {
    expect(typeof DEFAULT_COMMENT_PLACEHOLDER).toBe('string');
    expect(DEFAULT_COMMENT_PLACEHOLDER.length).toBeGreaterThan(0);
  });
});
