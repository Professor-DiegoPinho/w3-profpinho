"use client";

import { Checkmark, Copy } from "@/assets/icons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./Certificates.module.css";

export default function Certificates() {
  const { data: session } = useSession();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchCertificates = async () => {
      try {
        const response = await fetch("/api/certificates/list");
        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Status ${response.status}: ${error}`);
        }

        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        console.error("Erro ao buscar certificados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [session?.user?.id]);

  const handleDownload = async (certificateId) => {
    try {
      const response = await fetch(
        `/api/certificates/download/${certificateId}`,
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.details || error.error || "Erro ao baixar certificado",
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificado-${certificateId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Erro ao baixar certificado:", error);
      alert(`Erro ao baixar o certificado: ${error.message}`);
    }
  };

  const handleCopyLink = (certificateId) => {
    const validationUrl = `${window.location.origin}/validar-certificado/${certificateId}`;
    navigator.clipboard.writeText(validationUrl);
    setCopiedId(certificateId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Certificados</h2>
        <p className={styles.loading}>Carregando certificados...</p>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Certificados</h2>
        <p className={styles.empty}>
          Nenhum certificado ainda. Complete um curso e envie o projeto de
          conclusão para obter seu certificado!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Certificados</h2>
      <div className={styles.certificatesList}>
        {certificates.map((cert) => (
          <div key={cert.id} className={styles.certificateCard}>
            <h3 className={styles.courseName}>{cert.courseName}</h3>
            <div className={styles.certificateInfo}>
              <p className={styles.courseDetails}>
                Carga horária: <strong>{cert.workloadHours} horas</strong>
              </p>
              <p className={styles.generatedDate}>
                Gerado em:{" "}
                <strong>
                  {new Date(
                    cert.generatedAt?.toDate?.() || cert.generatedAt,
                  ).toLocaleDateString("pt-BR")}
                </strong>
              </p>
              <p className={styles.certificateId}>
                ID: <code>{cert.certificateId}</code>
              </p>
              <div className={styles.actions}>
                <button
                  className={styles.downloadBtn}
                  onClick={() => handleDownload(cert.id)}
                  title="Baixar certificado em PDF"
                >
                  <img
                    src="/icons/ic_download.svg"
                    alt="Baixar"
                    className={styles.buttonIcon}
                    aria-hidden="true"
                  />
                  Baixar PDF
                </button>
                <button
                  className={`${styles.copyBtn} ${copiedId === cert.id ? styles.copied : ""}`}
                  onClick={() => handleCopyLink(cert.id)}
                  title="Copiar link de validação"
                >
                  {copiedId === cert.id ? (
                    <>
                      <Checkmark size={20} className={styles.buttonIcon} />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={20} className={styles.buttonIcon} />
                      Copiar Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
