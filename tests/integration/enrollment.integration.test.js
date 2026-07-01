/**
 * Teste de integração: módulo enrollment.js
 *
 * Valida verificação de matrícula, listagem de cursos inscritos,
 * data de matrícula e contagem de alunos, com Firebase Emulator Suite real
 * e dados gerados via Factories.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { adminDb } from '@/lib/firebaseAdmin';
import { clearDatabase } from '../helpers/firebaseEmulator';
import { UserFactory } from '../helpers/factories';
import { Timestamp } from 'firebase-admin/firestore';

// ---- Import do módulo sob teste ----
import {
  hasCourseEnrollment,
  getEnrolledCourseIds,
  getCourseEnrollmentDate,
  getCourseEnrollmentCount,
  mapSidebarWithAccess,
} from '@/lib/enrollment';

describe('Enrollment — Teste de Integração (Real)', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  // =========================================================================
  // hasCourseEnrollment
  // =========================================================================
  describe('hasCourseEnrollment', () => {
    it('deve retornar true se a matrícula existir no Firestore', async () => {
      const userId = UserFactory.buildId();
      const courseId = 'html-basico';
      const enrollmentId = `${userId}_${courseId}`;

      // Grava no banco real
      await adminDb.collection("enrollments").doc(enrollmentId).set({
        userId,
        courseId,
        enrolledAt: new Date(),
      });

      const result = await hasCourseEnrollment(userId, courseId);

      expect(result).toBe(true);
    });

    it('deve retornar false se a matrícula não existir no Firestore', async () => {
      const result = await hasCourseEnrollment(UserFactory.buildId(), 'html-basico');

      expect(result).toBe(false);
    });

    it('deve retornar false se os argumentos forem nulos ou indefinidos', async () => {
      expect(await hasCourseEnrollment(null, 'course1')).toBe(false);
      expect(await hasCourseEnrollment('user1', null)).toBe(false);
    });
  });

  // =========================================================================
  // getEnrolledCourseIds
  // =========================================================================
  describe('getEnrolledCourseIds', () => {
    it('deve retornar lista de IDs de cursos matriculados do usuário', async () => {
      const userId = UserFactory.buildId();

      // Grava 2 matrículas para este usuário e 1 para outro usuário
      await adminDb.collection("enrollments").doc(`${userId}_course1`).set({
        userId,
        courseId: 'course1',
        enrolledAt: new Date(),
      });
      await adminDb.collection("enrollments").doc(`${userId}_course2`).set({
        userId,
        courseId: 'course2',
        enrolledAt: new Date(),
      });
      await adminDb.collection("enrollments").doc(`otherUser_course1`).set({
        userId: 'otherUser',
        courseId: 'course1',
        enrolledAt: new Date(),
      });

      const list = await getEnrolledCourseIds(userId);

      expect(list).toHaveLength(2);
      expect(list).toContain('course1');
      expect(list).toContain('course2');
    });

    it('deve retornar array vazio para userId nulo/indefinido', async () => {
      const list = await getEnrolledCourseIds(null);
      expect(list).toEqual([]);
    });
  });

  // =========================================================================
  // getCourseEnrollmentDate
  // =========================================================================
  describe('getCourseEnrollmentDate', () => {
    it('deve converter data do tipo Timestamp do Firestore corretamente', async () => {
      const userId = UserFactory.buildId();
      const courseId = 'course1';
      const enrollmentId = `${userId}_${courseId}`;
      const now = new Date();

      await adminDb.collection("enrollments").doc(enrollmentId).set({
        userId,
        courseId,
        enrolledAt: Timestamp.fromDate(now),
      });

      const date = await getCourseEnrollmentDate(userId, courseId);

      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toBe(now.getTime());
    });

    it('deve lidar com datas armazenadas como strings ISO no Firestore', async () => {
      const userId = UserFactory.buildId();
      const courseId = 'course1';
      const enrollmentId = `${userId}_${courseId}`;
      const isoStr = '2026-03-21T11:00:00.000Z';

      await adminDb.collection("enrollments").doc(enrollmentId).set({
        userId,
        courseId,
        enrolledAt: isoStr,
      });

      const date = await getCourseEnrollmentDate(userId, courseId);

      expect(date).toBeInstanceOf(Date);
      expect(date.toISOString()).toBe(isoStr);
    });

    it('deve retornar null se a matrícula não existir ou não contiver enrolledAt', async () => {
      expect(await getCourseEnrollmentDate(UserFactory.buildId(), 'course_1')).toBeNull();

      const userId = UserFactory.buildId();
      await adminDb.collection("enrollments").doc(`${userId}_course1`).set({
        userId,
        courseId: 'course1',
      });
      expect(await getCourseEnrollmentDate(userId, 'course1')).toBeNull();
    });

    it('deve retornar null para argumentos inválidos', async () => {
      expect(await getCourseEnrollmentDate(null, 'course_1')).toBeNull();
    });
  });

  // =========================================================================
  // getCourseEnrollmentCount
  // =========================================================================
  describe('getCourseEnrollmentCount', () => {
    it('deve retornar a contagem correta de matrículas do curso', async () => {
      const courseId = 'course_js';

      // Grava 3 matrículas para o mesmo curso
      await adminDb.collection("enrollments").doc(`u1_${courseId}`).set({
        userId: 'u1',
        courseId,
      });
      await adminDb.collection("enrollments").doc(`u2_${courseId}`).set({
        userId: 'u2',
        courseId,
      });
      await adminDb.collection("enrollments").doc(`u3_${courseId}`).set({
        userId: 'u3',
        courseId,
      });

      const count = await getCourseEnrollmentCount(courseId);

      expect(count).toBe(3);
    });

    it('deve retornar 0 para courseId nulo/vazio', async () => {
      expect(await getCourseEnrollmentCount(null)).toBe(0);
    });
  });

  // =========================================================================
  // mapSidebarWithAccess
  // =========================================================================
  describe('mapSidebarWithAccess', () => {
    it('deve mapear os dados da barra lateral atualizando o acesso às aulas', () => {
      const sidebarData = [
        {
          category: 'html-basico', // público/aberto
          posts: [
            { slug: 'introducao', title: 'Intro' },
          ],
        },
        {
          category: 'js-avancado', // requer matrícula
          posts: [
            { slug: 'closures', title: 'Closures' },
          ],
        },
      ];

      // Caso 1: Usuário não matriculado em nenhum curso
      const res1 = mapSidebarWithAccess(sidebarData, []);

      const jsCat1 = res1.find(c => c.category === 'js-avancado');
      if (jsCat1) {
        expect(jsCat1.isEnrolled).toBe(false);
        expect(jsCat1.posts[0].isRestricted).toBe(true);
      }

      // Caso 2: Usuário matriculado em js-avancado
      const res2 = mapSidebarWithAccess(sidebarData, ['js-avancado']);
      const jsCat2 = res2.find(c => c.category === 'js-avancado');
      if (jsCat2) {
        expect(jsCat2.isEnrolled).toBe(true);
        expect(jsCat2.posts[0].isRestricted).toBe(false);
      }
    });
  });
});
