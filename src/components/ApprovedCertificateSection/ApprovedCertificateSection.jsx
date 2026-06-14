"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./ApprovedCertificateSection.module.css";
import * as Icons from '@/assets/icons';

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
    <div className={styles.approvedCertificateSection}>
      <div className={styles.approvedCertificateContainer}>
        <div className={styles.approvedCertificateHeader}>
          <Icons.Diploma size={48} className={styles.approvedCertificateIcon} />
          <div>
            <h4 className={styles.approvedCertificateTitle}>Seu Certificado</h4>
            <p className={styles.approvedCertificateSubtitle}>
              Baixe seu certificado ou compartilhe o link de validação
            </p>
          </div>
        </div>

        <div className={styles.approvedCertificateInfo}>
          <div className={styles.approvedCertificateDetail}>
            <span className={styles.approvedCertificateLabel}>ID do Certificado:</span>
            <code className={styles.approvedCertificateCode}>{certificate.certificateId}</code>
          </div>
          <div className={styles.approvedCertificateDetail}>
            <span className={styles.approvedCertificateLabel}>Emitido em:</span>
            <span>{new Date(certificate.generatedAt).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>

        <div className={styles.approvedCertificateActions}>
          <button
            className={`${styles.approvedCertificateBtn} ${styles.approvedCertificateBtnDownload}`}
            onClick={handleDownload}
            disabled={downloading}
            title="Baixar certificado em PDF"
          >
            <Icons.Download size={24} /> {downloading ? "Baixando..." : "Baixar PDF"}
          </button>
          <button
            className={`${styles.approvedCertificateBtn} ${styles.approvedCertificateBtnCopy} ${copiedValidationUrl ? styles.approvedCertificateBtnCopied : ""
              }`}
            onClick={handleCopyValidationUrl}
            title="Copiar link de validação"
          >
            {copiedValidationUrl ?
              <>
                <Icons.Check size={24} /> Link Copiado!
              </>
              : <>
                <Icons.Copy size={24} /> Compartilhar Link
              </>}
          </button>
        </div>

        <p className={styles.approvedCertificateHint}>
          Compartilhe o link no LinkedIn ou em sua rede profissional para validar seu certificado
        </p>
      </div>
    </div>
  );
}
