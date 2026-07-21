/**
 * Mock centralizado do Firebase Admin SDK para testes de integração.
 *
 * Fornece helpers para criar documentos e snapshots mockados,
 * simulando o comportamento do Firestore sem conexão real.
 */
import { vi } from 'vitest';

/**
 * Cria um documento mockado do Firestore.
 * @param {string} id - ID do documento
 * @param {object|null} data - Dados do documento (null se não existe)
 * @returns {object} Mock de DocumentSnapshot
 */
export function createMockDoc(id, data = null) {
  const exists = data !== null;
  return {
    id,
    exists,
    data: () => (exists ? { ...data } : undefined),
    ref: { id },
  };
}

/**
 * Cria um snapshot de query mockado do Firestore.
 * @param {Array} docs - Array de documentos mockados
 * @returns {object} Mock de QuerySnapshot
 */
export function createMockSnapshot(docs = []) {
  return {
    docs,
    empty: docs.length === 0,
    size: docs.length,
    forEach: (fn) => docs.forEach(fn),
  };
}

/**
 * Cria um mock completo do adminDb com chaining configurado.
 * Retorna o objeto mockado e referências internas para configurar retornos.
 */
export function createFirebaseMock() {
  const mockGet = vi.fn();
  const mockSet = vi.fn().mockResolvedValue(undefined);
  const mockUpdate = vi.fn().mockResolvedValue(undefined);
  const mockDelete = vi.fn().mockResolvedValue(undefined);

  // Cria um mock doc que suporta subcoleções
  const createDocMock = () => ({
    get: mockGet,
    set: mockSet,
    update: mockUpdate,
    delete: mockDelete,
    collection: vi.fn().mockReturnValue({
      doc: vi.fn().mockReturnValue({
        get: mockGet,
        set: mockSet,
        update: mockUpdate,
        delete: mockDelete,
      }),
      where: vi.fn().mockReturnValue({
        get: mockGet,
        orderBy: vi.fn().mockReturnValue({ get: mockGet }),
      }),
      orderBy: vi.fn().mockReturnValue({ get: mockGet }),
    }),
  });

  const mockDoc = vi.fn().mockImplementation(() => createDocMock());
  const mockWhere = vi.fn().mockReturnValue({
    get: mockGet,
    where: vi.fn().mockReturnValue({ get: mockGet }),
    orderBy: vi.fn().mockReturnValue({ get: mockGet }),
  });
  const mockOrderBy = vi.fn().mockReturnValue({ get: mockGet });

  const adminDb = {
    collection: vi.fn().mockReturnValue({
      doc: mockDoc,
      where: mockWhere,
      orderBy: mockOrderBy,
    }),
  };

  return {
    adminDb,
    mocks: {
      get: mockGet,
      set: mockSet,
      update: mockUpdate,
      delete: mockDelete,
      doc: mockDoc,
      where: mockWhere,
    },
  };
}
