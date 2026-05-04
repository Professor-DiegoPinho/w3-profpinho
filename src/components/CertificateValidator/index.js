"use client";

import { useEffect, useState } from "react";
import styles from "./CertificateValidator.module.css";

export default function CertificateValidator({ initialCertificateId }) {
  const [certificateId, setCertificateId] = useState(initialCertificateId || "");
  const [validationResult, setValidationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(!!initialCertificateId);

  useEffect(() => {
    if (initialCertificateId) {
      handleValidate(initialCertificateId);
    }
  }, [initialCertificateId]);

  const handleValidate = async (idToValidate = certificateId) => {
    if (!idToValidate.trim()) {
      alert("Por favor, informe o ID do certificado");
      return;
    }

    setLoading(true);
    setValidationResult(null);

    try {
      const response = await fetch(`/api/certificates/validate?id=${encodeURIComponent(idToValidate)}`);
      const data = await response.json();

      setValidationResult({
        isValid: response.ok && data.valid,
        data,
        status: response.status,
      });
      setShowResult(true);
    } catch (error) {
      console.error("Erro ao validar certificado:", error);
      setValidationResult({
        isValid: false,
        data: { error: "Erro ao conectar ao servidor" },
        status: null,
      });
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCertificateId(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidate();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>🔍 Validar Certificado</h2>
          <p className={styles.description}>
            Digite o código do certificado para validar sua autenticidade
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="certificate-id" className={styles.label}>
              ID do Certificado
            </label>
            <input
              id="certificate-id"
              type="text"
              value={certificateId}
              onChange={handleInputChange}
              placeholder="ex: 20260414A7K9M2"
              className={styles.input}
              maxLength="14"
              disabled={loading}
            />
            <small className={styles.hint}>
              O ID tem 14 caracteres (data + 6 dígitos aleatórios)
            </small>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading || !certificateId.trim()}
          >
            {loading ? "Validando..." : "Validar Certificado"}
          </button>
        </form>

        {showResult && validationResult && (
          <div className={`${styles.result} ${validationResult.isValid ? styles.valid : styles.invalid}`}>
            {validationResult.isValid ? (
              <>
                <div className={styles.resultIcon}>✓</div>
                <h3 className={styles.resultTitle}>Certificado Válido!</h3>
                <div className={styles.resultData}>
                  <div className={styles.resultItem}>
                    <strong>Aluno(a):</strong>
                    <span>{validationResult.data.studentName}</span>
                  </div>
                  <div className={styles.resultItem}>
                    <strong>Curso:</strong>
                    <span>{validationResult.data.courseName}</span>
                  </div>
                  <div className={styles.resultItem}>
                    <strong>Carga Horária:</strong>
                    <span>{validationResult.data.workloadHours} horas</span>
                  </div>
                  <div className={styles.resultItem}>
                    <strong>Data de Emissão:</strong>
                    <span>
                      {new Date(validationResult.data.generatedAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </span>
                  </div>
                  <div className={styles.resultItem}>
                    <strong>ID do Certificado:</strong>
                    <code>{validationResult.data.certificateId}</code>
                  </div>
                </div>
                <p className={styles.successMessage}>
                  Este certificado foi emitido por Diego Pinho e é válido para fins acadêmicos
                  e profissionais.
                </p>
              </>
            ) : (
              <>
                <div className={styles.resultIcon}>✗</div>
                <h3 className={styles.resultTitle}>Certificado Inválido</h3>
                <p className={styles.errorMessage}>
                  {validationResult.data?.message || "Este ID de certificado não foi encontrado no sistema."}
                </p>
                <p className={styles.errorHint}>
                  Verifique se o ID foi digitado corretamente. Se o problema persistir, entre
                  em contato com o suporte.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
