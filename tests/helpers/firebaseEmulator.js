/**
 * Helper para interagir com o emulador do Firebase durante os testes.
 */

/**
 * Limpa todos os documentos da base de dados do Firestore no emulador local.
 */
export async function clearDatabase() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-test-project';
  const url = `http://127.0.0.1:8080/emulator/v1/projects/${projectId}/databases/(default)/documents`;

  try {
    const res = await fetch(url, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Falha ao limpar banco de dados local. Status: ${res.status}`);
    }
  } catch (error) {
    console.error('Erro ao conectar no Firestore Emulator para limpar banco:', error);
    throw error;
  }
}
