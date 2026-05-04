"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "./ApprovedCertificateSection.css";

export default function ApprovedCertificateSection({ courseSlug, courseName = "", workloadHours = 0 }) {
  const { data: session } = useSession();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [copiedValidationUrl, setCopiedValidationUrl] = useState(false);

  useEffect(() => {
    if (!session?.user?.id || !courseSlug) {
      setLoading(false);
      return;
    }

    // Buscar certificado via API
    const fetchCertificate = async () => {
      try {
        const response = await fetch(`/api/certificates/by-course/${courseSlug}`);
        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Status ${response.status}: ${error}`);
        }
        const data = await response.json();
        if (data) {
          setCertificate(data);
        }
      } catch (error) {
        console.error("Erro ao buscar certificado:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [session?.user?.id, courseSlug]);

  const handleDownload = async () => {
    if (!certificate?.id) return;

    setDownloading(true);
    try {
      const response = await fetch(`/api/certificates/download/${certificate.id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || error.error || "Erro ao baixar certificado");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificado-${certificate.certificateId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Erro ao baixar certificado:", error);
      alert(`Erro ao baixar o certificado: ${error.message}`);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyValidationUrl = () => {
    const validationUrl = `${window.location.origin}/validar-certificado/${certificate.id}`;
    navigator.clipboard.writeText(validationUrl);
    setCopiedValidationUrl(true);
    setTimeout(() => setCopiedValidationUrl(false), 2000);
  };

  if (loading || !certificate) {
    return null;
  }

  return (
    <div className="approved-certificate-section">
      <div className="approved-certificate-container">
        <div className="approved-certificate-header">
          <span className="approved-certificate-icon">🎓</span>
          <div>
            <h4 className="approved-certificate-title">Seu Certificado</h4>
            <p className="approved-certificate-subtitle">
              Baixe seu certificado ou compartilhe o link de validação
            </p>
          </div>
        </div>

        <div className="approved-certificate-info">
          <div className="approved-certificate-detail">
            <span className="approved-certificate-label">ID do Certificado:</span>
            <code className="approved-certificate-code">{certificate.certificateId}</code>
          </div>
          <div className="approved-certificate-detail">
            <span className="approved-certificate-label">Emitido em:</span>
            <span>{new Date(certificate.generatedAt).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>

        <div className="approved-certificate-actions">
          <button
            className="approved-certificate-btn approved-certificate-btn-download"
            onClick={handleDownload}
            disabled={downloading}
            title="Baixar certificado em PDF"
          >
            📥 {downloading ? "Baixando..." : "Baixar PDF"}
          </button>
          <button
            className={`approved-certificate-btn approved-certificate-btn-copy ${
              copiedValidationUrl ? "approved-certificate-btn-copied" : ""
            }`}
            onClick={handleCopyValidationUrl}
            title="Copiar link de validação"
          >
            {copiedValidationUrl ? "✓ Link Copiado!" : "🔗 Compartilhar Link"}
          </button>
        </div>

        <p className="approved-certificate-hint">
          Compartilhe o link no LinkedIn ou em sua rede profissional para validar seu certificado
        </p>
      </div>
    </div>
  );
}
