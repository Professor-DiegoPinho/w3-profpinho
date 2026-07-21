import { beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('@/auth', () => ({
  auth: vi.fn().mockResolvedValue(null),
}));

vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((body, init) => ({ body, status: init?.status })),
  },
}));

import { adminDb } from '@/lib/firebaseAdmin.js';
import { clearDatabase } from '../helpers/firebaseEmulator.js';
import { UserFactory } from '../helpers/factories.js';


import { isUserAdmin } from '@/lib/adminAuth.js';

describe('AdminAuth (isUserAdmin) — Teste de Integração (Real)', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  it('deve retornar true para usuário com role "admin"', async () => {
    const userId = UserFactory.buildId();


    await adminDb.collection('users').doc(userId).set({
      name: 'Admin User',
      email: 'admin@test.com',
      role: 'admin',
    });

    const result = await isUserAdmin(userId);
    expect(result).toBe(true);
  });

  it('deve retornar false para usuário com role diferente de "admin"', async () => {
    const userId = UserFactory.buildId();

    await adminDb.collection('users').doc(userId).set({
      name: 'Regular User',
      email: 'user@test.com',
      role: 'student',
    });

    const result = await isUserAdmin(userId);
    expect(result).toBe(false);
  });

  it('deve retornar false para usuário sem campo role', async () => {
    const userId = UserFactory.buildId();

    await adminDb.collection('users').doc(userId).set({
      name: 'User Without Role',
      email: 'norole@test.com',
    });

    const result = await isUserAdmin(userId);
    expect(result).toBe(false);
  });

  it('deve retornar false para usuário inexistente no Firestore', async () => {
    const userId = UserFactory.buildId();

    const result = await isUserAdmin(userId);
    expect(result).toBe(false);
  });

  it('deve retornar false para userId null', async () => {
    const result = await isUserAdmin(null);
    expect(result).toBe(false);
  });

  it('deve retornar false para userId undefined', async () => {
    const result = await isUserAdmin(undefined);
    expect(result).toBe(false);
  });

  it('deve retornar false para userId string vazia', async () => {
    const result = await isUserAdmin('');
    expect(result).toBe(false);
  });

  it('deve retornar false para userId tipo não-string', async () => {
    const result = await isUserAdmin(42);
    expect(result).toBe(false);
  });

  it('deve retornar false para role null explícito', async () => {
    const userId = UserFactory.buildId();

    await adminDb.collection('users').doc(userId).set({
      name: 'User Null Role',
      role: null,
    });

    const result = await isUserAdmin(userId);
    expect(result).toBe(false);
  });

  it('deve distinguir corretamente admin de não-admin em múltiplos usuários', async () => {
    const adminId = UserFactory.buildId();
    const studentId = UserFactory.buildId();

    await adminDb.collection('users').doc(adminId).set({
      name: 'Admin',
      role: 'admin',
    });
    await adminDb.collection('users').doc(studentId).set({
      name: 'Student',
      role: 'student',
    });

    expect(await isUserAdmin(adminId)).toBe(true);
    expect(await isUserAdmin(studentId)).toBe(false);
  });
});
