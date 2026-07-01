/**
 * Teste de integração: módulo certificates.js
 *
 * Valida o fluxo completo de criação, upload, recuperação e validação
 * de certificados, utilizando o Firebase Emulator Suite real e dados gerados via Factories.
 */
import { EventEmitter } from 'events';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { UserFactory, CertificateFactory } from '../helpers/factories';
import { adminDb, adminStorage } from '@/lib/firebaseAdmin';
import { clearDatabase } from '../helpers/firebaseEmulator';

// Importação do módulo sob teste
import {
  uploadCertificatePDF,
  updateCertificatePdfUrl,
  createCertificate,
  getCertificate,
  listUserCertificates,
  validateAndGetCertificate,
  getCertificateByOrCourse,
} from '@/lib/certificates';

// ---- Helpers locais ----

/** Cria um stream mockado que emite 'error' automaticamente */
function createErrorStream(message) {
  const stream = new EventEmitter();
  stream.end = () => process.nextTick(() => stream.emit('error', new Error(message)));
  return stream;
}

describe('Certificates — Teste de Integração (Real)', () => {
  const originalEnv = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  beforeEach(async () => {
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'test-bucket';
    await clearDatabase();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = originalEnv;
    vi.restoreAllMocks();
  });

  // =========================================================================
  // uploadCertificatePDF
  // =========================================================================
  describe('uploadCertificatePDF', () => {
    it('deve gravar o buffer no Storage Emulator e retornar a URL pública do PDF', async () => {
      const pdfBuffer = Buffer.from('conteúdo-pdf-real-no-emulador');
      const certificateId = `cert_${Date.now()}`;

      const url = await uploadCertificatePDF(pdfBuffer, certificateId);

      expect(url).toBe(`https://storage.googleapis.com/test-bucket/certificates/${certificateId}.pdf`);
      
      // Verifica se o arquivo foi realmente gravado no Storage Emulator
      const file = adminStorage.bucket('test-bucket').file(`certificates/${certificateId}.pdf`);
      const [exists] = await file.exists();
      expect(exists).toBe(true);
    });

    it('deve rejeitar quando a variável NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET não está definida', async () => {
      delete process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

      await expect(
        uploadCertificatePDF(Buffer.from('pdf'), 'id'),
      ).rejects.toThrow('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET não está configurado');
    });

    it('deve propagar o erro quando o stream de gravação falha', async () => {
      // Mockamos o bucket temporariamente apenas para simular falha física de stream
      vi.spyOn(adminStorage, 'bucket').mockImplementationOnce(() => ({
        file: () => ({
          createWriteStream: () => createErrorStream('falha no disco virtual do emulador'),
        }),
      }));

      await expect(
        uploadCertificatePDF(Buffer.from('pdf'), 'id'),
      ).rejects.toThrow('falha no disco virtual do emulador');
    });
  });

  // =========================================================================
  // updateCertificatePdfUrl
  // =========================================================================
  describe('updateCertificatePdfUrl', () => {
    it('deve persistir a URL do PDF e a data de upload na subcoleção do usuário', async () => {
      const userId = UserFactory.buildId();
      const certificateId = 'cert_update';
      const pdfUrl = 'https://storage.googleapis.com/test-bucket/certificates/cert_update.pdf';

      // Cria o documento vazio do certificado primeiro para permitir o .update()
      const docRef = adminDb
        .collection("users")
        .doc(userId)
        .collection("certificates")
        .doc(certificateId);
      await docRef.set({ studentName: 'João' });

      await updateCertificatePdfUrl(userId, certificateId, pdfUrl);

      // Consulta banco real
      const snap = await docRef.get();
      expect(snap.exists).toBe(true);
      const data = snap.data();
      expect(data.pdfUrl).toBe(pdfUrl);
      expect(data.pdfUploadedAt).toBeDefined();
    });
  });

  // =========================================================================
  // createCertificate
  // =========================================================================
  describe('createCertificate', () => {
    it('deve salvar atomicamente na subcoleção do usuário e no índice raiz via batch', async () => {
      const userId = UserFactory.buildId();
      const certInput = CertificateFactory.buildInput();

      const result = await createCertificate(userId, certInput);

      // O ID gerado segue o formato YYYYMMDD + 6 caracteres alfanuméricos
      expect(result.id).toMatch(/^\d{8}[A-Z0-9]{6}$/);
      expect(result.studentName).toBe(certInput.studentName);
      expect(result.courseSlug).toBe(certInput.courseSlug);
      expect(result.validatedCount).toBe(0);

      // Verifica gravação no documento da subcoleção
      const userCertSnap = await adminDb
        .collection("users")
        .doc(userId)
        .collection("certificates")
        .doc(result.id)
        .get();
      expect(userCertSnap.exists).toBe(true);
      expect(userCertSnap.data().studentName).toBe(certInput.studentName);

      // Verifica gravação no índice raiz
      const rootIndexSnap = await adminDb
        .collection("certificates")
        .doc(result.id)
        .get();
      expect(rootIndexSnap.exists).toBe(true);
      expect(rootIndexSnap.data().userId).toBe(userId);
    });
  });

  // =========================================================================
  // getCertificate
  // =========================================================================
  describe('getCertificate', () => {
    it('deve retornar os dados completos quando o certificado existe no Firestore', async () => {
      const userId = UserFactory.buildId();
      const stored = CertificateFactory.buildStored();
      
      // Salva diretamente no Firestore Emulator
      await adminDb
        .collection("users")
        .doc(userId)
        .collection("certificates")
        .doc(stored.certificateId)
        .set(stored);

      const result = await getCertificate(userId, stored.certificateId);

      expect(result.studentName).toBe(stored.studentName);
      expect(result.courseSlug).toBe(stored.courseSlug);
    });

    it('deve retornar null quando o certificado não existe no Firestore', async () => {
      const result = await getCertificate(UserFactory.buildId(), 'inexistente');
      expect(result).toBeNull();
    });
  });

  // =========================================================================
  // listUserCertificates
  // =========================================================================
  describe('listUserCertificates', () => {
    it('deve retornar todos os certificados do usuário ordenados por data de geração descrescente', async () => {
      const userId = UserFactory.buildId();
      
      // Cria certificados com datas diferentes
      const cert1 = CertificateFactory.buildStored({ 
        certificateId: 'cert1', 
        generatedAt: new Date('2026-01-01T12:00:00Z') 
      });
      const cert2 = CertificateFactory.buildStored({ 
        certificateId: 'cert2', 
        generatedAt: new Date('2026-02-01T12:00:00Z') 
      });

      const userCertCol = adminDb.collection("users").doc(userId).collection("certificates");
      await userCertCol.doc('cert1').set(cert1);
      await userCertCol.doc('cert2').set(cert2);

      const list = await listUserCertificates(userId);

      expect(list).toHaveLength(2);
      // Ordenação decrescente: o mais recente (cert2) deve vir primeiro
      expect(list[0].id).toBe('cert2');
      expect(list[1].id).toBe('cert1');
    });
  });

  // =========================================================================
  // validateAndGetCertificate
  // =========================================================================
  describe('validateAndGetCertificate', () => {
    it('deve retornar dados públicos válidos e incrementar o contador de validações', async () => {
      const userId = UserFactory.buildId();
      const stored = CertificateFactory.buildStored({ validatedCount: 3 });

      // Configura cenário real de duas etapas no Firestore
      await adminDb
        .collection("certificates")
        .doc(stored.certificateId)
        .set({ userId, certificateId: stored.certificateId });

      await adminDb
        .collection("users")
        .doc(userId)
        .collection("certificates")
        .doc(stored.certificateId)
        .set(stored);

      const result = await validateAndGetCertificate(stored.certificateId);

      expect(result.valid).toBe(true);
      expect(result.studentName).toBe(stored.studentName);
      
      // Verifica incremento no Firestore Emulator
      const updatedSnap = await adminDb
        .collection("users")
        .doc(userId)
        .collection("certificates")
        .doc(stored.certificateId)
        .get();
      
      expect(updatedSnap.data().validatedCount).toBe(4);
      expect(updatedSnap.data().lastValidatedAt).toBeDefined();
    });

    it('deve retornar null quando o certificado não existe no índice raiz', async () => {
      expect(await validateAndGetCertificate('id_inexistente')).toBeNull();
    });

    it('deve retornar null quando o índice raiz aponta para um documento de usuário inexistente', async () => {
      await adminDb
        .collection("certificates")
        .doc('id_orfao')
        .set({ userId: 'usr_fantasma', certificateId: 'id_orfao' });

      expect(await validateAndGetCertificate('id_orfao')).toBeNull();
    });
  });

  // =========================================================================
  // getCertificateByOrCourse
  // =========================================================================
  describe('getCertificateByOrCourse', () => {
    it('deve retornar o primeiro certificado encontrado para o slug do curso', async () => {
      const userId = UserFactory.buildId();
      const stored = CertificateFactory.buildStored({ courseSlug: 'react-avancado' });
      
      await adminDb
        .collection("users")
        .doc(userId)
        .collection("certificates")
        .doc(stored.certificateId)
        .set(stored);

      const result = await getCertificateByOrCourse(userId, 'react-avancado');

      expect(result.courseSlug).toBe('react-avancado');
      expect(result.id).toBe(stored.certificateId);
    });

    it('deve retornar null quando não existe certificado para o curso informado', async () => {
      expect(await getCertificateByOrCourse(UserFactory.buildId(), 'curso-sem-cert')).toBeNull();
    });
  });
});
