import chromium from "@sparticuz/chromium";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer-core";

const PDF_CONFIG = {
  width: 1123,
  height: 794,
  preferCSSPageSize: true,
  printBackground: true,
  margin: 0,
};

const IMAGES = [
  { src: "/images/logo.png", path: "images/logo.png" },
  { src: "/images/diegopinho_sign.png", path: "images/diegopinho_sign.png" },
];

function formatDate(date) {
  const d = date?.toDate?.() || new Date(date);
  return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
    .map(n => String(n).padStart(2, "0"))
    .join("/");
}

function convertImagesToBase64(html, publicDir) {
  let result = html;
  
  for (const image of IMAGES) {
    try {
      const imagePath = path.join(publicDir, image.path);
      console.log(`Tentando carregar imagem: ${imagePath}`);
      
      if (!fs.existsSync(imagePath)) {
        console.warn(`Arquivo não encontrado: ${imagePath}`);
        continue;
      }
      
      const buffer = fs.readFileSync(imagePath);
      const ext = image.path.endsWith(".jpeg") ? "jpeg" : "png";
      const dataUrl = `data:image/${ext};base64,${buffer.toString("base64")}`;
      result = result.replace(new RegExp(`src="${image.src}"`, "g"), `src="${dataUrl}"`);
      console.log(`✓ Imagem ${image.src} convertida para base64 (${buffer.length} bytes)`);
    } catch (error) {
      console.error(`✗ Erro ao processar ${image.path}:`, error.message);
    }
  }
  
  return result;
}

/**
 * Gera um PDF do certificado renderizando HTML
 * @param {object} certificateData
 * @returns {Promise<Buffer>}
 */
export async function generateCertificatePDF(certificateData) {
  let browser = null;

  try {
    const templatePath = path.join(process.cwd(), "src/templates/certificate-template.html");
    let html = fs.readFileSync(templatePath, "utf-8");

    html = convertImagesToBase64(html, path.join(process.cwd(), "public"));

    html = html
      .replace(/{{STUDENT_NAME}}/g, certificateData.studentName)
      .replace(/{{COURSE_NAME}}/g, certificateData.courseName)
      .replace(/{{WORKLOAD_HOURS}}/g, certificateData.workloadHours)
      .replace(/{{GENERATED_DATE}}/g, formatDate(certificateData.generatedAt))
      .replace(/{{CERTIFICATE_ID}}/g, certificateData.certificateId);

    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();
    await page.setBypassCSP(true);
    await page.setViewport({ width: PDF_CONFIG.width, height: PDF_CONFIG.height, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => new Promise(resolve => {
      const images = Array.from(document.querySelectorAll("img"));
      if (!images.length) return resolve();
      
      let loaded = 0;
      images.forEach(img => {
        const checkLoad = () => {
          if (++loaded === images.length) resolve();
        };
        img.complete ? checkLoad() : (img.onload = img.onerror = checkLoad);
      });
    }));

    return await page.pdf({
      preferCSSPageSize: PDF_CONFIG.preferCSSPageSize,
      printBackground: PDF_CONFIG.printBackground,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
  } catch (error) {
    console.error("Erro ao gerar PDF do certificado:", error);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
}
