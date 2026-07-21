
import { afterEach, describe, expect, it } from 'vitest';
import {
  CACHE_KEYS,
  getFromCache,
  setInCache,
  invalidateCache,
  getCacheSize,
} from '@/lib/markdown-cache.js';


afterEach(() => {
  invalidateCache();
});


describe('CACHE_KEYS', () => {
  it('deve ter chaves estáticas para ALL_POSTS, CATEGORIES e SIDEBAR_DATA', () => {
    expect(CACHE_KEYS.ALL_POSTS).toBe('all_posts');
    expect(CACHE_KEYS.CATEGORIES).toBe('categories');
    expect(CACHE_KEYS.SIDEBAR_DATA).toBe('sidebar_data');
  });

  it('POSTS_BY_CATEGORY deve gerar chave dinâmica com a categoria', () => {
    expect(CACHE_KEYS.POSTS_BY_CATEGORY('html-basico')).toBe('posts_by_category_html-basico');
  });

  it('POST_BY_SLUG deve gerar chave dinâmica com categoria e slug', () => {
    expect(CACHE_KEYS.POST_BY_SLUG('html-basico', 'introducao')).toBe('post_html-basico_introducao');
  });
});


describe('getFromCache / setInCache', () => {
  it('deve retornar null para chave não existente (cache miss)', () => {
    const result = getFromCache('chave-inexistente');
    expect(result).toBeNull();
  });

  it('deve retornar o valor armazenado para chave existente (cache hit)', () => {
    const data = { title: 'Aula 1', content: 'Conteúdo' };
    setInCache('minha-chave', data);

    const result = getFromCache('minha-chave');
    expect(result).toEqual(data);
  });

  it('deve sobrescrever valor existente ao setar novamente', () => {
    setInCache('key', 'valor-antigo');
    setInCache('key', 'valor-novo');

    expect(getFromCache('key')).toBe('valor-novo');
  });

  it('deve armazenar e recuperar arrays corretamente', () => {
    const posts = [{ slug: 'a' }, { slug: 'b' }];
    setInCache('posts', posts);

    expect(getFromCache('posts')).toEqual(posts);
  });

  it('deve armazenar e recuperar valores primitivos', () => {
    setInCache('count', 42);
    expect(getFromCache('count')).toBe(42);

    setInCache('flag', true);
    expect(getFromCache('flag')).toBe(true);
  });
});


describe('invalidateCache', () => {
  it('deve remover apenas a chave especificada quando fornecida', () => {
    setInCache('key1', 'valor1');
    setInCache('key2', 'valor2');

    invalidateCache('key1');

    expect(getFromCache('key1')).toBeNull();
    expect(getFromCache('key2')).toBe('valor2');
  });

  it('deve limpar todo o cache quando nenhuma chave é fornecida', () => {
    setInCache('key1', 'valor1');
    setInCache('key2', 'valor2');
    setInCache('key3', 'valor3');

    invalidateCache();

    expect(getFromCache('key1')).toBeNull();
    expect(getFromCache('key2')).toBeNull();
    expect(getFromCache('key3')).toBeNull();
  });

  it('não deve lançar erro ao invalidar chave inexistente', () => {
    expect(() => invalidateCache('inexistente')).not.toThrow();
  });
});


describe('getCacheSize', () => {
  it('deve retornar 0 itens para cache vazio', () => {
    const stats = getCacheSize();

    expect(stats.itemCount).toBe(0);
    expect(stats.sizeInBytes).toBe(0);
  });

  it('deve contar corretamente o número de itens', () => {
    setInCache('a', 'x');
    setInCache('b', 'y');
    setInCache('c', 'z');

    const stats = getCacheSize();
    expect(stats.itemCount).toBe(3);
  });

  it('deve calcular tamanho aproximado em bytes', () => {
    setInCache('data', { title: 'Aula 1' });

    const stats = getCacheSize();
    expect(stats.sizeInBytes).toBeGreaterThan(0);
    expect(stats.sizeInKB).toBeDefined();
    expect(stats.sizeInMB).toBeDefined();
  });

  it('deve atualizar após invalidação', () => {
    setInCache('a', 'valor');
    setInCache('b', 'valor');

    expect(getCacheSize().itemCount).toBe(2);

    invalidateCache('a');
    expect(getCacheSize().itemCount).toBe(1);

    invalidateCache();
    expect(getCacheSize().itemCount).toBe(0);
  });
});
