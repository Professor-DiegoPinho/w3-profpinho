import { beforeEach, describe, expect, it } from 'vitest';
import { adminDb } from '@/lib/firebaseAdmin.js';
import { clearDatabase } from '../helpers/firebaseEmulator.js';
import { UserFactory, SubmissionFactory } from '../helpers/factories.js';
import {
  submitProjectUrl,
  getProjectSubmissions,
  deleteProjectSubmission,
} from '@/lib/submissions.js';

describe('Submissions — Teste de Integração (Real)', () => {
  beforeEach(async () => {
    await clearDatabase();
  });


  describe('submitProjectUrl', () => {
    it('deve criar uma nova submissão no Firestore', async () => {
      const payload = SubmissionFactory.buildSubmitPayload();

      const result = await submitProjectUrl(
        payload.userId,
        payload.courseSlug,
        payload.submissionUrl,
        payload.platform,
        payload.feedback,
      );


      expect(result.submission).toBeDefined();
      expect(result.submission.url).toBe(payload.submissionUrl);
      expect(result.submission.platform).toBe(payload.platform);
      expect(result.submission.status).toBe('pending');
      expect(result.submission.id).toBeDefined();
      expect(result.submission.submittedAt).toBeDefined();
      expect(result.submission.feedback).toBe(payload.feedback);
      expect(result.totalAttempts).toBe(1);


      const ref = adminDb
        .collection('users')
        .doc(payload.userId)
        .collection('submissions')
        .doc(payload.courseSlug);
      const snap = await ref.get();

      expect(snap.exists).toBe(true);
      const data = snap.data();
      expect(data.attempts).toHaveLength(1);
      expect(data.attempts[0].url).toBe(payload.submissionUrl);
      expect(data.courseSlug).toBe(payload.courseSlug);
    });

    it('deve criar submissão sem feedback quando não fornecido', async () => {
      const payload = SubmissionFactory.buildSubmitPayload();

      const result = await submitProjectUrl(
        payload.userId,
        payload.courseSlug,
        payload.submissionUrl,
        payload.platform,
        null,
      );

      expect(result.submission.feedback).toBeUndefined();
    });

    it('deve criar submissão sem feedback quando feedback é string vazia', async () => {
      const payload = SubmissionFactory.buildSubmitPayload();

      const result = await submitProjectUrl(
        payload.userId,
        payload.courseSlug,
        payload.submissionUrl,
        payload.platform,
        '',
      );

      expect(result.submission.feedback).toBeUndefined();
    });

    it('deve adicionar novas tentativas ao array existente (append)', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'curso-teste';


      const r1 = await submitProjectUrl(
        userId, courseSlug, 'https://github.com/user/repo1', 'GitHub',
      );
      expect(r1.totalAttempts).toBe(1);


      const r2 = await submitProjectUrl(
        userId, courseSlug, 'https://github.com/user/repo2', 'GitHub',
      );
      expect(r2.totalAttempts).toBe(2);


      const ref = adminDb
        .collection('users')
        .doc(userId)
        .collection('submissions')
        .doc(courseSlug);
      const snap = await ref.get();
      const data = snap.data();

      expect(data.attempts).toHaveLength(2);
      expect(data.attempts[0].url).toBe('https://github.com/user/repo1');
      expect(data.attempts[1].url).toBe('https://github.com/user/repo2');
    });

    it('deve usar "Outro" como plataforma quando não informada', async () => {
      const payload = SubmissionFactory.buildSubmitPayload();

      const result = await submitProjectUrl(
        payload.userId,
        payload.courseSlug,
        payload.submissionUrl,
        null,
      );

      expect(result.submission.platform).toBe('Outro');
    });

    it('deve lançar erro se userId não for informado', async () => {
      await expect(
        submitProjectUrl(null, 'course', 'https://example.com', 'GitHub'),
      ).rejects.toThrow('userId, courseSlug e submissionUrl são obrigatórios.');
    });

    it('deve lançar erro se courseSlug não for informado', async () => {
      await expect(
        submitProjectUrl('user1', null, 'https://example.com', 'GitHub'),
      ).rejects.toThrow('userId, courseSlug e submissionUrl são obrigatórios.');
    });

    it('deve lançar erro se submissionUrl não for informado', async () => {
      await expect(
        submitProjectUrl('user1', 'course', null, 'GitHub'),
      ).rejects.toThrow('userId, courseSlug e submissionUrl são obrigatórios.');
    });
  });


  describe('getProjectSubmissions', () => {
    it('deve retornar attempts vazio quando não há submissões', async () => {
      const userId = UserFactory.buildId();

      const result = await getProjectSubmissions(userId, 'curso-sem-submissao');

      expect(result).toEqual({
        attempts: [],
        lastSubmittedAt: null,
      });
    });

    it('deve retornar null para userId nulo', async () => {
      const result = await getProjectSubmissions(null, 'course');
      expect(result).toBeNull();
    });

    it('deve retornar null para courseSlug nulo', async () => {
      const result = await getProjectSubmissions('user1', null);
      expect(result).toBeNull();
    });

    it('deve retornar as submissões criadas com dados serializados', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-basico';


      await submitProjectUrl(
        userId, courseSlug, 'https://github.com/user/repo', 'GitHub', 'Meu projeto',
      );

      const result = await getProjectSubmissions(userId, courseSlug);

      expect(result).not.toBeNull();
      expect(result.attempts).toHaveLength(1);
      expect(result.attempts[0].url).toBe('https://github.com/user/repo');
      expect(result.attempts[0].platform).toBe('GitHub');
      expect(result.attempts[0].status).toBe('pending');
      expect(result.attempts[0].feedback).toBe('Meu projeto');
      expect(result.courseSlug).toBe(courseSlug);
    });

    it('deve retornar múltiplas tentativas ordenadas', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'js-avancado';

      await submitProjectUrl(userId, courseSlug, 'https://url1.com', 'GitHub');
      await submitProjectUrl(userId, courseSlug, 'https://url2.com', 'CodePen');

      const result = await getProjectSubmissions(userId, courseSlug);

      expect(result.attempts).toHaveLength(2);
      expect(result.attempts[0].url).toBe('https://url1.com');
      expect(result.attempts[1].url).toBe('https://url2.com');
    });
  });


  describe('deleteProjectSubmission', () => {
    it('deve remover uma tentativa específica pelo ID', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-basico';


      const r1 = await submitProjectUrl(userId, courseSlug, 'https://url1.com', 'GitHub');
      await submitProjectUrl(userId, courseSlug, 'https://url2.com', 'CodePen');


      const result = await deleteProjectSubmission(userId, courseSlug, r1.submission.id);

      expect(result.totalAttempts).toBe(1);


      const submissions = await getProjectSubmissions(userId, courseSlug);
      expect(submissions.attempts).toHaveLength(1);
      expect(submissions.attempts[0].url).toBe('https://url2.com');
    });

    it('deve manter array vazio após remover a última tentativa', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-basico';

      const r1 = await submitProjectUrl(userId, courseSlug, 'https://url.com', 'GitHub');
      const result = await deleteProjectSubmission(userId, courseSlug, r1.submission.id);

      expect(result.totalAttempts).toBe(0);

      const submissions = await getProjectSubmissions(userId, courseSlug);
      expect(submissions.attempts).toHaveLength(0);
    });

    it('deve lançar erro se o documento de submissões não existir', async () => {
      await expect(
        deleteProjectSubmission('user1', 'curso-inexistente', 'sub-id'),
      ).rejects.toThrow('Submissão não encontrada.');
    });

    it('deve lançar erro se userId não for informado', async () => {
      await expect(
        deleteProjectSubmission(null, 'course', 'sub-id'),
      ).rejects.toThrow('userId, courseSlug e submissionId são obrigatórios.');
    });

    it('deve lançar erro se courseSlug não for informado', async () => {
      await expect(
        deleteProjectSubmission('user1', null, 'sub-id'),
      ).rejects.toThrow('userId, courseSlug e submissionId são obrigatórios.');
    });

    it('deve lançar erro se submissionId não for informado', async () => {
      await expect(
        deleteProjectSubmission('user1', 'course', null),
      ).rejects.toThrow('userId, courseSlug e submissionId são obrigatórios.');
    });

    it('não deve alterar o array se o ID não corresponder a nenhuma tentativa', async () => {
      const userId = UserFactory.buildId();
      const courseSlug = 'html-basico';

      await submitProjectUrl(userId, courseSlug, 'https://url.com', 'GitHub');
      const result = await deleteProjectSubmission(userId, courseSlug, 'id-inexistente');


      expect(result.totalAttempts).toBe(1);
    });
  });
});
