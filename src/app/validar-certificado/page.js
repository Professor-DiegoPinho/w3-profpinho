import CertificateValidator from "@/components/CertificateValidator";

export const metadata = {
  title: "Validar Certificado | Diego Pinho",
  description: "Valide seu certificado de conclusão usando o ID único.",
};

export default function ValidarCertificadoPage({ params }) {
  const certificateId = params?.id || null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-white-ghost-white)" }}>
      <CertificateValidator initialCertificateId={certificateId} />
    </div>
  );
}
