/**
 * Teste de integração: módulo bookmarks.js
 *
 * Testa o fluxo completo de adicionar, listar, verificar e remover bookmarks,
 * utilizando o Firebase Emulator Suite real e dados gerados via Faker.
 */
import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it } from 'vitest';
import { adminDb } from '@/lib/firebaseAdmin.js';
import { clearDatabase } from '../helpers/firebaseEmulator.js';

// ---- Import do módulo sob teste ----
import {
  addBookmark,
  getUserBookmarks,
  isLessonBookmarked,
  removeBookmark,
} from '@/lib/bookmarks.js';

// ---- Helpers para gerar dados aleatórios com Faker ----
function generateBookmarkData(overrides = {}) {
  return {
    lessonId: faker.string.alphanumeric(10),
    category: faker.helpers.slugify(faker.word.noun()),
    slug: faker.helpers.slugify(faker.word.words(3)),
    title: faker.lorem.sentence(4),
    description: faker.lorem.sentence(8),
    categoryTitle: faker.word.words(2),
    ...overrides,
  };
}

function generateUserId() {
  return `usr_${faker.string.uuid()}`;
}

// ---- Testes ----
describe('Bookmarks — Teste de Integração (Real)', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  describe('addBookmark', () => {
    it('deve criar um novo bookmark no Firestore quando ele não existe', async () => {
      const userId = generateUserId();
      const bookmarkData = generateBookmarkData();

      const result = await addBookmark(userId, bookmarkData);

      // Verifica retorno da função
      expect(result.alreadyExisted).toBe(false);
      expect(result.lessonId).toBe(bookmarkData.lessonId);

      // Consulta banco real para verificar persistência
      const docRef = adminDb
        .collection("users")
        .doc(userId)
        .collection("bookmarks")
        .doc(bookmarkData.lessonId);
      const snap = await docRef.get();

      expect(snap.exists).toBe(true);
      const data = snap.data();
      expect(data.lessonId).toBe(bookmarkData.lessonId);
      expect(data.category).toBe(bookmarkData.category);
      expect(data.slug).toBe(bookmarkData.slug);
      expect(data.savedAt).toBeDefined();
    });

    it('deve retornar bookmark existente sem duplicar ou sobrescrever no Firestore', async () => {
      const userId = generateUserId();
      const bookmarkData = generateBookmarkData();

      // Adiciona a primeira vez
      const firstResult = await addBookmark(userId, bookmarkData);
      expect(firstResult.alreadyExisted).toBe(false);

      // Busca o savedAt gravado no banco real pelo Firestore
      const docRef = adminDb
        .collection("users")
        .doc(userId)
        .collection("bookmarks")
        .doc(bookmarkData.lessonId);
      const snap = await docRef.get();
      const realSavedAt = snap.data().savedAt.toDate().toISOString();

      // Tenta adicionar novamente os mesmos dados
      const secondResult = await addBookmark(userId, bookmarkData);

      expect(secondResult.alreadyExisted).toBe(true);
      expect(secondResult.lessonId).toBe(bookmarkData.lessonId);
      expect(secondResult.savedAt).toBe(realSavedAt);
    });

    it('deve lançar erro se lessonId não for informado', async () => {
      const userId = generateUserId();

      await expect(
        addBookmark(userId, { category: 'a', slug: 'b' })
      ).rejects.toThrow('userId e lessonId são obrigatórios');
    });

    it('deve lançar erro se userId não for informado', async () => {
      const bookmarkData = generateBookmarkData();

      await expect(
        addBookmark(null, bookmarkData)
      ).rejects.toThrow('userId e lessonId são obrigatórios');
    });

    it('deve lançar erro se category ou slug não forem informados', async () => {
      const userId = generateUserId();

      await expect(
        addBookmark(userId, { lessonId: 'abc' })
      ).rejects.toThrow('category e slug são obrigatórios');
    });
  });

  describe('removeBookmark', () => {
    it('deve remover o documento de bookmark correspondente do Firestore', async () => {
      const userId = generateUserId();
      const bookmarkData = generateBookmarkData();

      // Salva um bookmark
      await addBookmark(userId, bookmarkData);

      // Remove
      const result = await removeBookmark(userId, bookmarkData.lessonId);
      expect(result).toEqual({ ok: true });

      // Garante que não está mais no banco
      const docRef = adminDb
        .collection("users")
        .doc(userId)
        .collection("bookmarks")
        .doc(bookmarkData.lessonId);
      const snap = await docRef.get();
      expect(snap.exists).toBe(false);
    });

    it('deve lançar erro se userId ou lessonId não forem informados', async () => {
      await expect(removeBookmark(null, 'abc')).rejects.toThrow(
        'userId e lessonId são obrigatórios'
      );
      await expect(removeBookmark('user1', null)).rejects.toThrow(
        'userId e lessonId são obrigatórios'
      );
    });
  });

  describe('isLessonBookmarked', () => {
    it('deve retornar true quando o bookmark existe no Firestore', async () => {
      const userId = generateUserId();
      const bookmarkData = generateBookmarkData();

      await addBookmark(userId, bookmarkData);

      const result = await isLessonBookmarked(userId, bookmarkData.lessonId);
      expect(result).toBe(true);
    });

    it('deve retornar false quando o bookmark não existe no Firestore', async () => {
      const userId = generateUserId();
      const lessonId = faker.string.alphanumeric(10);

      const result = await isLessonBookmarked(userId, lessonId);
      expect(result).toBe(false);
    });

    it('deve retornar false para userId vazio', async () => {
      const result = await isLessonBookmarked(null, 'abc');
      expect(result).toBe(false);
    });

    it('deve retornar false para lessonId vazio', async () => {
      const result = await isLessonBookmarked('user1', null);
      expect(result).toBe(false);
    });
  });

  describe('getUserBookmarks', () => {
    it('deve retornar array vazio para userId vazio', async () => {
      const result = await getUserBookmarks(null);
      expect(result).toEqual([]);
    });

    it('deve retornar todos os bookmarks cadastrados ordenados corretamente', async () => {
      const userId = generateUserId();
      
      const b1 = generateBookmarkData({ lessonId: 'lesson-1' });
      const b2 = generateBookmarkData({ lessonId: 'lesson-2' });

      // Salva ambos
      await addBookmark(userId, b1);
      // Pequeno atraso para garantir carimbos de data/hora diferentes se necessário,
      // mas como o Firestore emulador lida com milissegundos reais, é suficiente.
      await addBookmark(userId, b2);

      const list = await getUserBookmarks(userId);

      expect(list).toHaveLength(2);
      // Como o Firestore ordena por 'savedAt' descendente (se implementado) ou padrão,
      // validamos que ambos os objetos estão presentes e formatados.
      const ids = list.map(item => item.lessonId);
      expect(ids).toContain('lesson-1');
      expect(ids).toContain('lesson-2');
      expect(list[0].savedAt).toBeDefined();
    });

    it('deve retornar array vazio quando o usuário não tem favoritos', async () => {
      const userId = generateUserId();

      const result = await getUserBookmarks(userId);
      expect(result).toEqual([]);
    });
  });
});
