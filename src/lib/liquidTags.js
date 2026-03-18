// Processador de Liquid Tags para Markdown
// Suporta {% embed url %} para vídeos do YouTube

/**
 * Extrai o ID do vídeo de uma URL do YouTube
 * @param {string} url - URL do YouTube
 * @returns {string|null} - ID do vídeo ou null se inválido
 */
function extractYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    /^[a-zA-Z0-9_-]{11}$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1] || match[0];
    }
  }

  return null;
}

/**
 * Processa a tag {% embed %} e converte para HTML do YouTube
 * @param {string} url - URL do vídeo
 * @returns {string} - HTML do embed ou mensagem de erro
 */
function processEmbedTag(url) {
  const videoId = extractYouTubeId(url);

  if (!videoId) {
    return `<div class="embed-error">❌ URL inválida do YouTube: ${url}</div>`;
  }

  // Gera o HTML do iframe do YouTube com configurações otimizadas
  return `<div class="youtube-embed-container">
    <iframe 
      class="youtube-embed"
      src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0" 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen>
    </iframe>
  </div>`;
}

/**
 * Escapa caracteres especiais para uso seguro em HTML
 * @param {string} value - Texto para escapar
 * @returns {string} - Texto escapado
 */
function escapeHtml(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Processa as tags de bloco {% toggle "Título" %}...{% endtoggle %}
 * @param {string} content - Conteúdo markdown
 * @returns {string} - Conteúdo com toggles convertidos
 */
function processToggleTags(content) {
  const toggleRegex = /\{\%\s*toggle\s+"([^"]+)"\s*\%\}([\s\S]*?)\{\%\s*endtoggle\s*\%\}/g;

  return content.replace(toggleRegex, (match, title, body) => {
    const safeTitle = escapeHtml(title.trim());
    const toggleBody = body.trim();

    return `<details class="content-toggle">
  <summary class="content-toggle-summary">${safeTitle}</summary>

${toggleBody}

</details>`;
  });
}

/**
 * Remove marcações simples de markdown do texto de um link
 * @param {string} value - Texto com possível markdown
 * @returns {string} - Texto limpo
 */
function cleanMarkdownText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .trim();
}

/**
 * Obtém o domínio amigável de uma URL
 * @param {string} url - URL absoluta
 * @returns {string} - Domínio sem www ou fallback
 */
function getDomainFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'link externo';
  }
}

/**
 * Processa as tags de bloco {% links "Título" %}...{% endlinks %}
 * @param {string} content - Conteúdo markdown
 * @returns {string} - Conteúdo com cards de links
 */
function processLinksTags(content) {
  const linksRegex = /\{\%\s*links(?:\s+"([^"]+)")?\s*\%\}([\s\S]*?)\{\%\s*endlinks\s*\%\}/g;

  return content.replace(linksRegex, (match, title, body) => {
    const sectionTitle = escapeHtml((title || 'Links da aula').trim());
    const lines = body
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const cards = lines
      .map(line => {
        const linkMatch = line.match(/^\-\s+\[(.+?)\]\((https?:\/\/[^\s)]+)\)\s*$/i);
        if (!linkMatch) {
          return null;
        }

        const label = cleanMarkdownText(linkMatch[1]);
        const url = linkMatch[2].trim();
        const safeLabel = escapeHtml(label);
        const safeUrl = escapeHtml(url);
        const safeDomain = escapeHtml(getDomainFromUrl(url));

        return `    <a class="content-link-card" href="${safeUrl}" target="_blank" rel="noopener noreferrer">\n      <span class="content-link-card-header">\n        <span class="content-link-card-icon" aria-hidden="true">↗</span>\n        <span class="content-link-card-title">${safeLabel}</span>\n      </span>\n      <span class="content-link-card-domain" aria-label="domínio do link">${safeDomain}</span>\n    </a>`;
      })
      .filter(Boolean);

    if (!cards.length) {
      return body.trim();
    }

    return `<section class="content-links-block">\n  <h3 class="content-links-heading">🔗 ${sectionTitle}</h3>\n  <div class="content-links-grid">\n${cards.join('\n')}\n  </div>\n</section>`;
  });
}

/**
 * Processa todas as liquid tags em um texto markdown
 * @param {string} content - Conteúdo markdown
 * @returns {string} - Conteúdo com liquid tags processadas
 */
export function processLiquidTags(content) {
  if (!content || typeof content !== 'string') {
    return content;
  }

  // Regex para encontrar {% embed url %}
  const embedRegex = /\{\%\s*embed\s+([^\s]+)\s*\%\}/g;

  return content.replace(embedRegex, (match, url) => {
    return processEmbedTag(url.trim());
  });
}

/**
 * Processa liquid tags mais complexas no futuro
 * @param {string} content - Conteúdo markdown
 * @returns {string} - Conteúdo processado
 */
export function processAllLiquidTags(content) {
  let processedContent = content;

  // Processa embeds
  processedContent = processLiquidTags(processedContent);

  // Processa cards de links
  processedContent = processLinksTags(processedContent);

  // Processa toggles
  processedContent = processToggleTags(processedContent);

  // Aqui podem ser adicionadas outras liquid tags no futuro
  // processedContent = processOtherTags(processedContent);

  return processedContent;
}

export default processAllLiquidTags;