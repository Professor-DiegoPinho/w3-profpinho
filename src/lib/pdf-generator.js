import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

/**
 * Gera um PDF do certificado renderizando HTML
 * @param {object} certificateData - Dados do certificado
 * @param {string} certificateData.studentName - Nome do aluno
 * @param {string} certificateData.courseName - Nome do curso
 * @param {number} certificateData.workloadHours - Carga horária
 * @param {string} certificateData.certificateId - ID único do certificado
 * @param {Date} certificateData.generatedAt - Data de geração
 * @returns {Promise<Buffer>} Buffer do PDF pronto para download
 */
export async function generateCertificatePDF(certificateData) {
  let browser = null;

  try {
    // Converter data para formato dd/mm/YYYY
    // Se for um Timestamp do Firebase, converter com .toDate()
    let generatedDate = certificateData.generatedAt;
    if (generatedDate?.toDate && typeof generatedDate.toDate === 'function') {
      generatedDate = generatedDate.toDate();
    } else {
      generatedDate = new Date(generatedDate);
    }
    
    const day = String(generatedDate.getDate()).padStart(2, "0");
    const month = String(generatedDate.getMonth() + 1).padStart(2, "0");
    const year = generatedDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    // Ler template HTML
    const templatePath = path.join(process.cwd(), "src/templates/certificate-template.html");
    let htmlContent = fs.readFileSync(templatePath, "utf-8");

    // Substituir placeholders no template
    htmlContent = htmlContent
      .replace(/{{STUDENT_NAME}}/g, certificateData.studentName)
      .replace(/{{COURSE_NAME}}/g, certificateData.courseName)
      .replace(/{{WORKLOAD_HOURS}}/g, certificateData.workloadHours.toString())
      .replace(/{{GENERATED_DATE}}/g, formattedDate)
      .replace(/{{CERTIFICATE_ID}}/g, certificateData.certificateId);

    // Iniciar navegador Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Setar conteúdo HTML
    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    // Gerar PDF em formato A4 (paisagem, como certificado)
    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      printBackground: true,
    });

    return pdfBuffer;
  } catch (error) {
    console.error("Erro ao gerar PDF do certificado:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
