/**
 * Script para gerar IDs únicos no frontmatter de todas as aulas (.md).
 *
 * Uso: node scripts/generate-lesson-ids.js
 *
 * - Percorre todos os arquivos .md em content/
 * - Ignora arquivos que já possuem o campo `id`
 * - Gera um UUID curto (12 chars) usando crypto.randomUUID()
 * - Insere o campo `id` como primeira propriedade do frontmatter
 * - Idempotente: pode ser executado múltiplas vezes sem duplicar IDs
 */

const { randomUUID } = require("crypto");
const fs = require("fs");
const path = require("path");

const contentDir = path.resolve(__dirname, "..", "content");

function generateShortId() {
  // Gera um UUID v4 e extrai 12 caracteres alfanuméricos (sem hifens)
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

function getAllMarkdownFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      results.push(fullPath);
    }
  }

  return results;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  // Verifica se tem frontmatter
  if (!content.startsWith("---")) {
    return { skipped: true, reason: "no-frontmatter" };
  }

  const endIndex = content.indexOf("---", 3);
  if (endIndex === -1) {
    return { skipped: true, reason: "malformed-frontmatter" };
  }

  const frontmatter = content.slice(3, endIndex);

  // Verifica se já possui id
  if (/^id\s*:/m.test(frontmatter)) {
    return { skipped: true, reason: "already-has-id" };
  }

  const newId = generateShortId();

  // Insere o id como primeira propriedade do frontmatter
  const newFrontmatter = `\nid: "${newId}"${frontmatter}`;
  const newContent = `---${newFrontmatter}---${content.slice(endIndex + 3)}`;

  fs.writeFileSync(filePath, newContent, "utf-8");

  return { skipped: false, id: newId };
}

function main() {
  console.log(`\n📁 Buscando arquivos .md em: ${contentDir}\n`);

  const files = getAllMarkdownFiles(contentDir);
  console.log(`📄 Total de arquivos encontrados: ${files.length}\n`);

  const generatedIds = new Set();
  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const relativePath = path.relative(contentDir, file);

    try {
      const result = processFile(file);

      if (result.skipped) {
        skipped++;
        console.log(`  ⏭  ${relativePath} (${result.reason})`);
      } else {
        // Verificação de colisão (extremamente improvável, mas seguro)
        if (generatedIds.has(result.id)) {
          console.error(`  ❌ COLISÃO de ID detectada: ${result.id} em ${relativePath}`);
          errors++;
          continue;
        }

        generatedIds.add(result.id);
        updated++;
        console.log(`  ✅ ${relativePath} → id: "${result.id}"`);
      }
    } catch (err) {
      errors++;
      console.error(`  ❌ Erro em ${relativePath}: ${err.message}`);
    }
  }

  console.log(`\n--- Resumo ---`);
  console.log(`  Atualizados: ${updated}`);
  console.log(`  Ignorados:   ${skipped}`);
  console.log(`  Erros:       ${errors}`);
  console.log(`  Total:       ${files.length}\n`);

  if (errors > 0) {
    process.exit(1);
  }
}

main();
