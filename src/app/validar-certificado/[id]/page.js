import CertificateValidator from "@/components/CertificateValidator";

export const metadata = {
  title: "Validar Certificado | Diego Pinho",
  description: "Valide seu certificado de conclusão usando o ID único.",
};

export default function ValidarCertificadoComIdPage({ params }) {
  const certificateId = params?.id || null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      <CertificateValidator initialCertificateId={certificateId} />
    </div>
  );
}
