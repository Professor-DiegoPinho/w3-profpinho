/**
 * Sistema de cache em memória para arquivos Markdown
 * Reduz I/O de disco e melhora performance
 * 
 * Cache é invalidado automaticamente em desenvolvimento (com file watching)
 * e pode ser invalidado manualmente em produção
 */

import fs, { watch } from 'fs';
import path from 'path';

const cache = new Map();
let isWatcherInitialized = false;

// Chaves de cache possíveis
export const CACHE_KEYS = {
  ALL_POSTS: 'all_posts',
  CATEGORIES: 'categories',
  SIDEBAR_DATA: 'sidebar_data',
  POSTS_BY_CATEGORY: (category) => `posts_by_category_${category}`,
  POST_BY_SLUG: (category, slug) => `post_${category}_${slug}`,
};

/**
 * Inicializa o watcher para invalidar cache automaticamente
 * Útil em desenvolvimento para detectar mudanças nos arquivos
 */
export function initCacheWatcher() {
  if (isWatcherInitialized) return;

  try {
    const contentDirectory = path.join(process.cwd(), 'content');
    
    // Só inicia o watcher se o diretório existe
    if (!fs.existsSync(contentDirectory)) {
      return;
    }

    watch(contentDirectory, { recursive: true }, (eventType, filename) => {
      // Ignora eventos de arquivo temporário
      if (filename?.endsWith('.swp') || filename?.endsWith('~')) {
        return;
      }

      invalidateCache();
      console.log(`📦 Cache invalidado - arquivo ${filename} foi modificado`);
    });

    isWatcherInitialized = true;
    console.log('👀 Cache watcher inicializado');
  } catch (error) {
    // Se houver erro ao iniciar o watcher, continua sem ele
    console.warn('⚠️ Não foi possível iniciar o cache watcher:', error.message);
  }
}

/**
 * Recupera valor do cache
 */
export function getFromCache(key) {
  if (cache.has(key)) {
    console.log(`✅ Cache hit - ${key}`);
    return cache.get(key);
  }
  console.log(`📥 Cache miss - ${key}`);
  return null;
}

/**
 * Armazena valor no cache
 */
export function setInCache(key, value) {
  cache.set(key, value);
}

/**
 * Invalida cache específico ou todo o cache
 */
export function invalidateCache(specificKey = null) {
  if (specificKey) {
    cache.delete(specificKey);
    console.log(`🗑️ Cache invalidado - ${specificKey}`);
  } else {
    cache.clear();
    console.log('🗑️ Cache completamente limpo');
  }
}

/**
 * Obtém tamanho do cache em bytes (aproximado)
 */
export function getCacheSize() {
  let totalSize = 0;
  
  cache.forEach((value) => {
    totalSize += JSON.stringify(value).length;
  });
  
  return {
    itemCount: cache.size,
    sizeInBytes: totalSize,
    sizeInKB: Math.round(totalSize / 1024),
    sizeInMB: Math.round(totalSize / 1024 / 1024 * 100) / 100,
  };
}

/**
 * Log de informações do cache (útil para debug)
 */
export function logCacheStats() {
  const stats = getCacheSize();
  console.log('📊 Estatísticas do Cache:');
  console.log(`   Itens: ${stats.itemCount}`);
  console.log(`   Tamanho: ${stats.sizeInKB}KB (${stats.sizeInMB}MB)`);
  console.log(`   Chaves: ${Array.from(cache.keys()).join(', ')}`);
}
