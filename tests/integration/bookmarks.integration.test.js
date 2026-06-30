/**
 * Teste de integração: módulo bookmarks.js
 *
 * Testa o fluxo completo de adicionar, listar, verificar e remover bookmarks,
 * com o Firebase Admin SDK mockado e dados gerados via Faker.
 */
import { faker } from '@faker-js/faker';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// ---- Mock do Firebase Admin ----
// Usamos vi.hoisted() para garantir que os mocks estejam disponíveis no factory do vi.mock.
// A estratégia: criar mocks "leaf" (get/set/delete) que podemos espionar,
// e construir a cadeia de chaining com funções normais (não mocks) para que
// vi.clearAllMocks() não destrua a estrutura.
const { mockGet, mockSet, mockDelete } = vi.hoisted(() => {
  return {
    mockGet: vi.fn(),
    mockSet: vi.fn().mockResolvedValue(undefined),
    mockDelete: vi.fn().mockResolvedValue(undefined),
  };
});

vi.mock('@/lib/firebaseAdmin', () => {
  // Constrói a cadeia de chaining com closures (não com .mockReturnValue)
  // para que clearAllMocks não quebre a estrutura.
  const leafDoc = () => ({
    get: (...args) => mockGet(...args),
    set: (...args) => mockSet(...args),
    delete: (...args) => mockDelete(...args),
  });

  const bookmarksCollection = () => ({
    doc: () => leafDoc(),
    orderBy: () => ({ get: (...args) => mockGet(...args) }),
  });

  const userDoc = () => ({
    collection: () => bookmarksCollection(),
  });

  const usersCollection = () => ({
    doc: () => userDoc(),
  });

  return {
    adminDb: {
      collection: () => usersCollection(),
    },
  };
});

// Mocka FieldValue para que serverTimestamp retorne uma string identificável
vi.mock('firebase-admin/firestore', () => ({
  FieldValue: {
    serverTimestamp: () => 'SERVER_TIMESTAMP',
  },
}));

// ---- Import do módulo sob teste (após o mock) ----
import {
  addBookmark,
  getUserBookmarks,
  isLessonBookmarked,
  removeBookmark,
} from '@/lib/bookmarks.js';

// ---- Helpers para gerar dados aleatórios com Faker ----
function generateBookmarkData() {
  return {
    lessonId: faker.string.alphanumeric(10),
    category: faker.helpers.slugify(faker.word.noun()),
    slug: faker.helpers.slugify(faker.word.words(3)),
    title: faker.lorem.sentence(4),
    description: faker.lorem.sentence(8),
    categoryTitle: faker.word.words(2),
  };
}

function generateUserId() {
  return `usr_${faker.string.uuid()}`;
}

// ---- Testes ----
describe('Bookmarks — Teste de Integração', () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockSet.mockReset().mockResolvedValue(undefined);
    mockDelete.mockReset().mockResolvedValue(undefined);
  });

  describe('addBookmark', () => {
    it('deve criar um novo bookmark quando não existe', async () => {
      const userId = generateUserId();
      const bookmarkData = generateBookmarkData();

      // Simula que o doc NÃO existe no Firestore
      mockGet.mockResolvedValueOnce({ exists: false });

      const result = await addBookmark(userId, bookmarkData);

      // Verifica que set foi chamado com os dados corretos
      expect(mockSet).toHaveBeenCalledOnce();
      const savedPayload = mockSet.mock.calls[0][0];

      expect(savedPayload.lessonId).toBe(bookmarkData.lessonId);
      expect(savedPayload.category).toBe(bookmarkData.category);
      expect(savedPayload.slug).toBe(bookmarkData.slug);
      expect(savedPayload.title).toBe(bookmarkData.title);
      expect(savedPayload.description).toBe(bookmarkData.description);
      expect(savedPayload.savedAt).toBe('SERVER_TIMESTAMP');

      // Verifica resposta
      expect(result.alreadyExisted).toBe(false);
      expect(result.lessonId).toBe(bookmarkData.lessonId);
    });

    it('deve retornar bookmark existente sem duplicar', async () => {
      const userId = generateUserId();
      const bookmarkData = generateBookmarkData();
      const savedAt = new Date(faker.date.past());

      // Simula que o doc JÁ existe no Firestore
      mockGet.mockResolvedValueOnce({
        exists: true,
        data: () => ({
          ...bookmarkData,
          savedAt: { toDate: () => savedAt },
        }),
      });

      const result = await addBookmark(userId, bookmarkData);

      // Verifica que set NÃO foi chamado (não duplicou)
      expect(mockSet).not.toHaveBeenCalled();

      // Verifica resposta
      expect(result.alreadyExisted).toBe(true);
      expect(result.lessonId).toBe(bookmarkData.lessonId);
      expect(result.savedAt).toBe(savedAt.toISOString());
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
    it('deve chamar delete no documento correto', async () => {
      const userId = generateUserId();
      const lessonId = faker.string.alphanumeric(10);

      const result = await removeBookmark(userId, lessonId);

      expect(mockDelete).toHaveBeenCalledOnce();
      expect(result).toEqual({ ok: true });
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
    it('deve retornar true quando o bookmark existe', async () => {
      const userId = generateUserId();
      const lessonId = faker.string.alphanumeric(10);

      mockGet.mockResolvedValueOnce({ exists: true });

      const result = await isLessonBookmarked(userId, lessonId);
      expect(result).toBe(true);
    });

    it('deve retornar false quando o bookmark não existe', async () => {
      const userId = generateUserId();
      const lessonId = faker.string.alphanumeric(10);

      mockGet.mockResolvedValueOnce({ exists: false });

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

    it('deve retornar bookmarks formatados corretamente', async () => {
      const userId = generateUserId();
      const savedAt = new Date(faker.date.past());
      const bookmarkData = generateBookmarkData();

      // Simula docs retornados pela query orderBy().get()
      mockGet.mockResolvedValueOnce({
        docs: [
          {
            id: bookmarkData.lessonId,
            data: () => ({
              category: bookmarkData.category,
              slug: bookmarkData.slug,
              title: bookmarkData.title,
              description: bookmarkData.description,
              categoryTitle: bookmarkData.categoryTitle,
              savedAt: { toDate: () => savedAt },
            }),
          },
        ],
      });

      const result = await getUserBookmarks(userId);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        lessonId: bookmarkData.lessonId,
        category: bookmarkData.category,
        slug: bookmarkData.slug,
        title: bookmarkData.title,
        description: bookmarkData.description,
        categoryTitle: bookmarkData.categoryTitle,
        savedAt: savedAt.toISOString(),
      });
    });

    it('deve retornar array vazio quando não há bookmarks', async () => {
      const userId = generateUserId();

      mockGet.mockResolvedValueOnce({ docs: [] });

      const result = await getUserBookmarks(userId);
      expect(result).toEqual([]);
    });
  });
});
