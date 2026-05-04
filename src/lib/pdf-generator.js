import { Document, Image, Page, renderToBuffer, StyleSheet, Text, View } from "@react-pdf/renderer";
import fs from "fs";
import path from "path";

const styles = StyleSheet.create({
  page: {
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
  },

  leftSection: {
    width: "25%",
    backgroundColor: "#ffffff",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRightWidth: 2,
    borderRightColor: "#f0f0f0",
  },

  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  logo: {
    width: "100%",
    maxWidth: 150,
    objectFit: "contain",
  },

  rightSection: {
    flex: 1,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 20,
    paddingBottom: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    position: "relative",
  },

  title: {
    fontSize: 48,
    fontWeight: "900",
    color: "#e74c3c",
    marginBottom: 30,
    lineHeight: 1.2,
    letterSpacing: -1,
    textAlign: "center",
  },

  contentText: {
    fontSize: 18,
    color: "#333",
    lineHeight: 1.6,
    marginBottom: 20,
    maxWidth: "100%",
    textAlign: "center",
  },

  bold: {
    fontWeight: "bold",
    color: "#000",
  },

  dateLocation: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    fontWeight: "500",
    textAlign: "center",
  },

  signatures: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
    gap: 60,
  },

  signatureBlock: {
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 150,
    position: "relative",
  },

  signatureImage: {
    maxWidth: "100%",
    maxHeight: 60,
    objectFit: "contain",
    position: "absolute",
    top: 5,
    left: 0,
    right: 0,
  },

  // Espaço vazio no bloco do aluno (sem imagem), mesma altura da imagem
  signatureSpace: {
    height: 72,
    position: "absolute",
    top: 0,
    width: "100%",
  },

  signatureLine: {
    borderTopWidth: 2,
    borderTopColor: "#333",
    width: "100%",
    marginTop: 45,
    marginBottom: 8,
  },

  signatureName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
    textAlign: "center",
  },

  signatureTitle: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
    marginTop: 2,
    textAlign: "center",
  },

  footer: {
    position: "absolute",
    bottom: 20,
    right: 50,
    fontSize: 12,
    color: "#666",
    alignItems: "flex-end",
  },

  certificateCode: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    textAlign: "right",
  },

  certificateCodeLabel: {
    fontSize: 11,
    color: "#999",
    textAlign: "right",
  },
});

function formatDate(date) {
  const d = date?.toDate?.() || new Date(date);
  return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
    .map(n => String(n).padStart(2, "0"))
    .join("/");
}

function loadImageAsBase64(imagePath) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.warn(`Arquivo não encontrado: ${imagePath}`);
      return null;
    }
    const buffer = fs.readFileSync(imagePath);
    return `data:image/png;base64,${buffer.toString("base64")}`;
  } catch (error) {
    console.error(`Erro ao carregar imagem ${imagePath}:`, error.message);
    return null;
  }
}

function CertificateDocument({ certificateData, logoBase64, signatureBase64 }) {
  const formattedDate = formatDate(certificateData.generatedAt);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          <View style={styles.logoContainer}>
            {logoBase64 && <Image src={logoBase64} style={styles.logo} />}
          </View>
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          {/* Title */}
          <Text style={styles.title}>
            {"CERTIFICADO\nDE CONCLUSÃO"}
          </Text>

          {/* Content */}
          <Text style={styles.contentText}>
            Certificamos que{" "}
            <Text style={styles.bold}>{certificateData.studentName}</Text>
            {" "}concluiu com sucesso o curso{" "}
            <Text style={styles.bold}>{certificateData.courseName}</Text>
            {", com carga horária de "}
            <Text style={styles.bold}>
              {certificateData.workloadHours} horas
            </Text>
            .
          </Text>

          {/* Date and Location */}
          <Text style={styles.dateLocation}>
            São Paulo, {formattedDate}
          </Text>

          {/* Signatures */}
          <View style={styles.signatures}>
            {/* Director Signature */}
            <View style={styles.signatureBlock}>
              {signatureBase64 && (
                <Image
                  src={signatureBase64}
                  style={styles.signatureImage}
                />
              )}
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>Diego Martins de Pinho</Text>
              <Text style={styles.signatureTitle}>Diretor</Text>
            </View>

            {/* Student Signature - sem imagem, mas com espaço equivalente */}
            <View style={styles.signatureBlock}>
              <View style={styles.signatureSpace} />
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>
                {certificateData.studentName}
              </Text>
              <Text style={styles.signatureTitle}>Aluno(a)</Text>
            </View>
          </View>

          {/* Footer - alinhado à direita, posição absoluta */}
          <View style={styles.footer}>
            <Text style={styles.certificateCode}>
              Código: {certificateData.certificateId}
            </Text>
            <Text style={styles.certificateCodeLabel}>
              Este código pode ser validado em: https://hub.diegopinho.com.br/validar-certificado/
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export async function generateCertificatePDF(certificateData) {
  try {
    const publicDir = path.join(process.cwd(), "public");

    const logoPath = path.join(publicDir, "images/logo.png");
    const signaturePath = path.join(publicDir, "images/diegopinho_sign.png");

    const logoBase64 = loadImageAsBase64(logoPath);
    const signatureBase64 = loadImageAsBase64(signaturePath);

    const pdfBuffer = await renderToBuffer(
      <CertificateDocument
        certificateData={certificateData}
        logoBase64={logoBase64}
        signatureBase64={signatureBase64}
      />
    );

    console.log(`✓ Certificado criado: ${certificateData.certificateId}`);
    return pdfBuffer;
  } catch (error) {
    console.error("Erro ao gerar PDF do certificado:", error);
    throw error;
  }
}