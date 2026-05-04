// Regex para validar URLs (básico mas funcional)
const URL_PATTERN = /^(https?:\/\/)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&/=]*)$/;

// Padrões para detectar plataformas
const PLATFORM_PATTERNS = {
  github: {
    name: "GitHub",
    patterns: [/github\.com/i, /gist\.github\.com/i],
  },
  gist: {
    name: "GitHub Gist",
    patterns: [/gist\.github\.com/i],
  },
  codesandbox: {
    name: "CodeSandbox",
    patterns: [/codesandbox\.io/i],
  },
  codepen: {
    name: "CodePen",
    patterns: [/codepen\.io/i],
  },
  googledrive: {
    name: "Google Drive",
    patterns: [/drive\.google\.com/i, /docs\.google\.com/i],
  },
};

/**
 * Valida se a URL é válida
 * @param {string} url - URL para validar
 * @returns {boolean}
 */
export function isValidUrl(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    // Primeiro tenta fazer parse como URL
    new URL(url);
    // Depois valida com regex mais robusto
    return URL_PATTERN.test(url);
  } catch {
    return false;
  }
}

/**
 * Detecta a plataforma do link
 * @param {string} url - URL para detectar
 * @returns {string|null} - Nome da plataforma ou null
 */
export function detectPlatform(url) {
  if (!url || typeof url !== 'string') {
    return null;
  }

  const urlLower = url.toLowerCase();

  // Verificar GitHub Gist primeiro (para não confundir com GitHub)
  if (PLATFORM_PATTERNS.gist.patterns.some(pattern => pattern.test(urlLower))) {
    return PLATFORM_PATTERNS.gist.name;
  }

  // Verificar outros padrões em ordem de prioridade
  for (const [key, platform] of Object.entries(PLATFORM_PATTERNS)) {
    if (key === 'gist') continue; // já foi verificado
    
    if (platform.patterns.some(pattern => pattern.test(urlLower))) {
      return platform.name;
    }
  }

  return null;
}

/**
 * Valida se a URL é válida e retorna a plataforma detectada
 * @param {string} url - URL para validar
 * @returns {object} - { isValid, platform }
 */
export function validateUrl(url) {
  const isValid = isValidUrl(url);
  const platform = isValid ? detectPlatform(url) : null;

  return {
    isValid,
    platform,
  };
}
