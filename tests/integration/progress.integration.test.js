/**
 * Teste de integração: módulo progress.js
 *
 * Valida leitura de progresso, toggle de conclusão de aulas (com recálculo
 * de porcentagem e datas) e verificação pontual de aula concluída,
 * com Firebase Emulator Suite real e dados gerados via Factories.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { adminDb } from '@/lib/firebaseAdmin';
import { clearDatabase } from '../helpers/firebaseEmulator';
import { UserFactory, ProgressFactory } from '../helpers/factories';

// ---- Mocks de dependências estáticas do sistema de arquivos ----
const { mockGetCourseLessonsCount } = vi.hoisted(() => ({
  mockGetCourseLessonsCount: vi.fn().mockReturnValue(10),
}));

vi.mock('@/lib/markdown', () => ({
  getCourseLessonsCount: (...args) => mockGetCourseLessonsCount(...args),
}));

// ---- Import do módulo sob teste (após o mock) ----
import {
  getLessonProgress,
  toggleLessonComplete,
  isLessonCompleted,
} from '@/lib/progress';

describe('Progress — Teste de Integração (Real)', () => {
  beforeEach(async () => {
    await clearDatabase();
    mockGetCourseLessonsCount.mockReset().mockReturnValue(10);
  });

  // =========================================================================
  // getLessonProgress
  // =========================================================================
  describe('getLessonProgress', () => {
    it('deve retornar objeto zerado quando o documento de progresso ainda não existe no Firestore', async () => {
      const progress = await getLessonProgress(UserFactory.buildId(), 'html-css');

      expect(progress).toEqual({
        completedLessons: [],
        totalLessons: 0,
        completionPercentage: 0,
        completedAt: null,
      });
    });

    it('deve retornar os dados persistidos quando o documento de progresso existe no Firestore', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-css';
      const stored = ProgressFactory.buildStored({
        completedLessons: ['intro', 'html'],
        totalLessons: 10,
        completionPercentage: 20,
      });

      // Grava no Firestore Emulator
      await adminDb
        .collection("users")
        .doc(userId)
        .collection("progress")
        .doc(courseSlug)
        .set(stored);

      const progress = await getLessonProgress(userId, courseSlug);

      expect(progress.completedLessons).toEqual(stored.completedLessons);
      expect(progress.completionPercentage).toBe(stored.completionPercentage);
    });

    it('deve retornar null sem consultar o Firestore quando userId é nulo', async () => {
      expect(await getLessonProgress(null, 'html-css')).toBeNull();
    });

    it('deve retornar null sem consultar o Firestore quando courseSlug é nulo', async () => {
      expect(await getLessonProgress(UserFactory.buildId(), null)).toBeNull();
    });
  });

  // =========================================================================
  // toggleLessonComplete
  // =========================================================================
  describe('toggleLessonComplete', () => {
    it('deve adicionar a aula ao array de concluídas e recalcular a porcentagem (1/5 = 20%)', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-css';
      mockGetCourseLessonsCount.mockReturnValue(5);

      const result = await toggleLessonComplete(userId, courseSlug, '01-intro', 5);

      expect(result.completedLessons).toEqual(['intro']); // prefixo numérico removido
      expect(result.totalLessons).toBe(5);
      expect(result.completionPercentage).toBe(20);
      expect(result.isCompleted).toBe(true);
      expect(result.isCourseCompleted).toBe(false);

      // Consulta o banco para atestar persistência
      const docSnap = await adminDb
        .collection("users")
        .doc(userId)
        .collection("progress")
        .doc(courseSlug)
        .get();

      expect(docSnap.exists).toBe(true);
      const dbData = docSnap.data();
      expect(dbData.completedLessons).toEqual(['intro']);
      expect(dbData.completionPercentage).toBe(20);
      expect(dbData.lastUpdatedAt).toBeDefined();
    });

    it('deve remover a aula do array quando ela já estava concluída (toggle off)', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-css';
      const stored = ProgressFactory.buildStored({
        completedLessons: ['intro', 'forms'],
        completedAt: null,
      });

      await adminDb
        .collection("users")
        .doc(userId)
        .collection("progress")
        .doc(courseSlug)
        .set(stored);

      mockGetCourseLessonsCount.mockReturnValue(5);

      const result = await toggleLessonComplete(userId, courseSlug, '02-forms', 5);

      expect(result.completedLessons).toEqual(['intro']);
      expect(result.isCompleted).toBe(false);
      expect(result.isCourseCompleted).toBe(false);

      // Garante remoção no Firestore Emulator
      const docSnap = await adminDb
        .collection("users")
        .doc(userId)
        .collection("progress")
        .doc(courseSlug)
        .get();
      expect(docSnap.data().completedLessons).toEqual(['intro']);
      expect(docSnap.data().completedAt).toBeNull();
    });

    it('deve definir completedAt na primeira vez que o curso atinge 100% no emulador', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-css';
      const stored = ProgressFactory.buildStored({
        completedLessons: ['intro', 'css'],
        completedAt: null,
      });

      await adminDb
        .collection("users")
        .doc(userId)
        .collection("progress")
        .doc(courseSlug)
        .set(stored);

      mockGetCourseLessonsCount.mockReturnValue(3);

      const result = await toggleLessonComplete(userId, courseSlug, '03-js', 3);

      expect(result.completionPercentage).toBe(100);
      expect(result.isCourseCompleted).toBe(true);

      const docSnap = await adminDb
        .collection("users")
        .doc(userId)
        .collection("progress")
        .doc(courseSlug)
        .get();
      expect(docSnap.data().completedAt).toBeDefined();
    });

    it('deve preservar o completedAt original quando o curso já tinha data de conclusão', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-css';
      const originalDate = new Date('2026-01-01T12:00:00Z').toISOString();
      const stored = ProgressFactory.buildStored({
        completedLessons: ['intro', 'css'],
        completedAt: originalDate,
      });

      await adminDb
        .collection("users")
        .doc(userId)
        .collection("progress")
        .doc(courseSlug)
        .set(stored);

      mockGetCourseLessonsCount.mockReturnValue(3);

      await toggleLessonComplete(userId, courseSlug, '03-js', 3);

      const docSnap = await adminDb
        .collection("users")
        .doc(userId)
        .collection("progress")
        .doc(courseSlug)
        .get();
      expect(docSnap.data().completedAt).toBe(originalDate);
    });

    it('deve lançar erro descritivo quando userId está ausente', async () => {
      await expect(
        toggleLessonComplete(null, 'html-css', 'intro'),
      ).rejects.toThrow('userId, courseSlug e lessonSlug são obrigatórios');
    });
  });

  // =========================================================================
  // isLessonCompleted
  // =========================================================================
  describe('isLessonCompleted', () => {
    it('deve retornar true para aula concluída no array', () => {
      const progress = ProgressFactory.buildStored({
        completedLessons: ['intro', 'estruturas-de-repeticao'],
      });

      expect(isLessonCompleted(progress, '01-intro')).toBe(true);
      expect(isLessonCompleted(progress, 'estruturas-de-repeticao')).toBe(true);
    });

    it('deve retornar false para aula não concluída', () => {
      const progress = ProgressFactory.buildStored({
        completedLessons: ['intro'],
      });

      expect(isLessonCompleted(progress, '02-condicionais')).toBe(false);
    });
  });
});
