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

    // Converter imagens para base64 para que o Puppeteer consiga renderizar
    const publicDir = path.join(process.cwd(), "public");
    
    const imageFiles = [
      { src: "/images/logo.jpeg", path: path.join(publicDir, "images/logo.jpeg") },
      { src: "/images/diegopinho_sign.jpeg", path: path.join(publicDir, "images/diegopinho_sign.jpeg") }
    ];

    for (const image of imageFiles) {
      try {
        const imageBuffer = fs.readFileSync(image.path);
        const base64 = imageBuffer.toString("base64");
        const ext = image.path.toLowerCase().endsWith(".jpeg") ? "jpeg" : "png";
        const dataUrl = `data:image/${ext};base64,${base64}`;
        htmlContent = htmlContent.replace(new RegExp(`src="${image.src}"`, "g"), `src="${dataUrl}"`);
        console.log(`Imagem ${image.src} convertida para base64`);
      } catch (error) {
        console.warn(`Erro ao ler imagem ${image.path}:`, error.message);
      }
    }

    // Substituir placeholders no template
    htmlContent = htmlContent
      .replace(/{{STUDENT_NAME}}/g, certificateData.studentName)
      .replace(/{{COURSE_NAME}}/g, certificateData.courseName)
      .replace(/{{WORKLOAD_HOURS}}/g, certificateData.workloadHours.toString())
      .replace(/{{GENERATED_DATE}}/g, formattedDate)
      .replace(/{{CERTIFICATE_ID}}/g, certificateData.certificateId);

    // Iniciar navegador Puppeteer
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--allow-file-access-from-files",
      ],
    });

    const page = await browser.newPage();

    // Permitir acesso a arquivos locais
    await page.setBypassCSP(true);

    // IMPORTANTE: Setar viewport ANTES de setar conteúdo
    await page.setViewport({
      width: 1123,
      height: 794,
      deviceScaleFactor: 2, // melhora a qualidade
    });

    // Setar conteúdo HTML
    // Usar domcontentloaded em vez de networkidle2 porque as imagens já são base64
    await page.setContent(htmlContent, {
      waitUntil: "domcontentloaded",
    });

    // Aguardar um tempo fixo para renderização segura
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Aguardar que todas as imagens sejam carregadas
    await page.evaluate(() => {
      return new Promise((resolve) => {
        const images = Array.from(document.querySelectorAll("img"));
        let loadedCount = 0;
        
        if (images.length === 0) {
          resolve();
          return;
        }

        images.forEach((img) => {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              resolve();
            }
          };
          img.onerror = () => {
            loadedCount++;
            console.warn(`Falha ao carregar imagem: ${img.src}`);
            if (loadedCount === images.length) {
              resolve();
            }
          };
          // Disparar load novamente se a imagem já estava em cache
          if (img.complete) {
            loadedCount++;
            if (loadedCount === images.length) {
              resolve();
            }
          }
        });
      });
    });

    // Gerar PDF usando as dimensões definidas no @page do CSS
    const pdfBuffer = await page.pdf({
      preferCSSPageSize: true,
      landscape: false,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      printBackground: true,
    });

    // Converter Uint8Array para Buffer (necessário em versões recentes do Puppeteer)
    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("Erro ao gerar PDF do certificado:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
