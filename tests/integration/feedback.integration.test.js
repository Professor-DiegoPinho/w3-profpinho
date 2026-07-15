import { beforeEach, describe, expect, it } from 'vitest';
import { adminDb } from '@/lib/firebaseAdmin';
import { clearDatabase } from '../helpers/firebaseEmulator';
import { UserFactory, FeedbackFactory, ProgressFactory } from '../helpers/factories';
import { FEEDBACK_QUESTIONS } from '@/lib/feedbackConfig';
import {
  isProjectApproved,
  isEligibleForFeedback,
  getUserFeedback,
  submitFeedback,
  getFeedbackStats,
  validateFeedbackData,
} from '@/lib/feedback';

describe('Feedback — Teste de Integração (Real)', () => {
  beforeEach(async () => {
    await clearDatabase();
  });


  describe('isProjectApproved', () => {
    it('deve retornar true quando o Firestore possui uma tentativa "approved"', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-css';


      await adminDb
        .collection("users")
        .doc(userId)
        .collection("submissions")
        .doc(courseSlug)
        .set({
          attempts: [
            { status: 'pending', url: 'http://a' },
            { status: 'approved', url: 'http://b' },
          ],
        });

      const approved = await isProjectApproved(userId, courseSlug);

      expect(approved).toBe(true);
    });

    it('deve retornar false quando nenhuma tentativa possui status "approved"', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-css';

      await adminDb
        .collection("users")
        .doc(userId)
        .collection("submissions")
        .doc(courseSlug)
        .set({
          attempts: [
            { status: 'pending', url: 'http://a' },
            { status: 'rejected', url: 'http://b' },
          ],
        });

      expect(await isProjectApproved(userId, courseSlug)).toBe(false);
    });

    it('deve retornar false quando não existem entregas no Firestore', async () => {
      expect(await isProjectApproved(UserFactory.buildId(), 'html-css')).toBe(false);
    });
  });


  describe('isEligibleForFeedback', () => {
    it('deve retornar true para aluno 100% completo, projeto aprovado e sem feedback respondido', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-css';


      await adminDb
        .collection("users")
        .doc(userId)
        .collection("submissions")
        .doc(courseSlug)
        .set({
          attempts: [{ status: 'approved', url: 'http://url' }],
        });

      const progress = ProgressFactory.buildCompleted({ feedbackResponded: false });

      expect(await isEligibleForFeedback(userId, courseSlug, progress)).toBe(true);
    });

    it('deve retornar false se a conclusão for menor que 100%', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-css';

      await adminDb
        .collection("users")
        .doc(userId)
        .collection("submissions")
        .doc(courseSlug)
        .set({
          attempts: [{ status: 'approved', url: 'http://url' }],
        });

      const progress = ProgressFactory.buildStored({
        completionPercentage: 99,
        feedbackResponded: false,
      });

      expect(await isEligibleForFeedback(userId, courseSlug, progress)).toBe(false);
    });

    it('deve retornar false se o aluno já tiver respondido ao feedback', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-css';

      await adminDb
        .collection("users")
        .doc(userId)
        .collection("submissions")
        .doc(courseSlug)
        .set({
          attempts: [{ status: 'approved', url: 'http://url' }],
        });

      const progress = ProgressFactory.buildCompleted({ feedbackResponded: true });

      expect(await isEligibleForFeedback(userId, courseSlug, progress)).toBe(false);
    });
  });


  describe('getUserFeedback', () => {
    it('deve retornar o feedback quando ele existe no Firestore', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-css';
      const mockFeedback = { npsScore: 10, comment: 'Ótimo' };

      await adminDb
        .collection("courseFeedback")
        .doc(`${userId}_${courseSlug}`)
        .set(mockFeedback);

      const feedback = await getUserFeedback(userId, courseSlug);

      expect(feedback.npsScore).toBe(10);
      expect(feedback.comment).toBe('Ótimo');
    });

    it('deve retornar null se o feedback não existir', async () => {
      expect(await getUserFeedback(UserFactory.buildId(), 'html-css')).toBeNull();
    });
  });

  describe('submitFeedback', () => {
    it('deve salvar o feedback, atualizar progresso e recalcular estatísticas de NPS com sucesso', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'nextjs-course';
      const answers = FeedbackFactory.buildValidAnswers();
      const feedbackData = {
        npsScore: 9,
        answers,
        comment: 'Curso excelente!',
      };


      await adminDb.collection("courseFeedback").doc(`user1_${courseSlug}`).set({
        userId: 'user1',
        courseSlug,
        npsScore: 9,
        answers,
      });
      await adminDb.collection("courseFeedback").doc(`user2_${courseSlug}`).set({
        userId: 'user2',
        courseSlug,
        npsScore: 10,
        answers,
      });


      const progressRef = adminDb
        .collection("users")
        .doc(userId)
        .collection("progress")
        .doc(courseSlug);
      await progressRef.set({
        completionPercentage: 100,
        feedbackResponded: false,
      });

      const response = await submitFeedback(userId, courseSlug, feedbackData);

      expect(response.success).toBe(true);
      expect(response.feedbackId).toBe(`${userId}_${courseSlug}`);


      const feedbackSnap = await adminDb.collection("courseFeedback").doc(response.feedbackId).get();
      expect(feedbackSnap.exists).toBe(true);
      expect(feedbackSnap.data().comment).toBe('Curso excelente!');


      const progressSnap = await progressRef.get();
      expect(progressSnap.data().feedbackResponded).toBe(true);
      expect(progressSnap.data().feedbackRespondedAt).toBeDefined();


      const statsSnap = await adminDb.collection("courseFeedbackStats").doc(courseSlug).get();
      expect(statsSnap.exists).toBe(true);
      expect(statsSnap.data().totalResponses).toBe(3);
      expect(statsSnap.data().avgNps).toBe(9.3);
      expect(statsSnap.data().distributionNps['9']).toBe(2);
      expect(statsSnap.data().distributionNps['10']).toBe(1);
    });

    it('deve lançar erro se o NPS for inválido', async () => {
      const invalidData = { npsScore: 11, answers: {} };

      await expect(submitFeedback('u1', 'c1', invalidData)).rejects.toThrow(
        'NPS deve ser um número entre 0 e 10'
      );
    });
  });


  describe('getFeedbackStats', () => {
    it('deve retornar dados salvos se existirem estatísticas agregadas', async () => {
      const courseSlug = 'course1';
      const mockStats = { courseSlug, totalResponses: 10, avgNps: 8.8 };
      
      await adminDb.collection("courseFeedbackStats").doc(courseSlug).set(mockStats);

      const stats = await getFeedbackStats(courseSlug);

      expect(stats.totalResponses).toBe(10);
      expect(stats.avgNps).toBe(8.8);
    });

    it('deve retornar objeto zerado padrão se as estatísticas não existirem', async () => {
      const stats = await getFeedbackStats('course_vazio');

      expect(stats).toEqual({
        courseSlug: 'course_vazio',
        totalResponses: 0,
        avgNps: 0,
        distributionNps: {},
      });
    });
  });


  describe('validateFeedbackData', () => {
    it('deve retornar isValid: true para dados perfeitamente corretos', () => {
      const answers = {};
      FEEDBACK_QUESTIONS.forEach((q) => {
        answers[q.id] = 'Ok';
      });

      const validation = validateFeedbackData({
        npsScore: 10,
        answers,
        comment: 'Legal',
      });

      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('deve retornar erros se o comentário for muito longo', () => {
      const answers = {};
      FEEDBACK_QUESTIONS.forEach((q) => {
        answers[q.id] = 'Ok';
      });

      const validation = validateFeedbackData({
        npsScore: 10,
        answers,
        comment: 'a'.repeat(1001),
      });

      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Comentário não pode ter mais de 1000 caracteres');
    });
  });
});
