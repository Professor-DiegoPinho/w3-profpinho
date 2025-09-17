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

  // Aqui podem ser adicionadas outras liquid tags no futuro
  // processedContent = processOtherTags(processedContent);

  return processedContent;
}

export default processAllLiquidTags;