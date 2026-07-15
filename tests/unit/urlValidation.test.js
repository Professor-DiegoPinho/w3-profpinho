
import { describe, expect, it } from 'vitest';
import { isValidUrl, detectPlatform, validateUrl } from '@/lib/urlValidation.js';


describe('isValidUrl', () => {
  it('deve retornar true para URL HTTP válida', () => {
    expect(isValidUrl('http://example.com')).toBe(true);
  });

  it('deve retornar true para URL HTTPS válida', () => {
    expect(isValidUrl('https://www.github.com/user/repo')).toBe(true);
  });

  it('deve retornar true para URL com query params', () => {
    expect(isValidUrl('https://example.com/page?foo=bar&baz=1')).toBe(true);
  });

  it('deve retornar true para URL com fragmento/hash', () => {
    expect(isValidUrl('https://example.com/page#section')).toBe(true);
  });

  it('deve retornar false para string sem protocolo', () => {
    expect(isValidUrl('www.example.com')).toBe(false);
  });

  it('deve retornar false para string vazia', () => {
    expect(isValidUrl('')).toBe(false);
  });

  it('deve retornar false para null/undefined', () => {
    expect(isValidUrl(null)).toBe(false);
    expect(isValidUrl(undefined)).toBe(false);
  });

  it('deve retornar false para tipo não-string', () => {
    expect(isValidUrl(42)).toBe(false);
    expect(isValidUrl({})).toBe(false);
  });

  it('deve retornar false para texto aleatório', () => {
    expect(isValidUrl('isso não é uma URL')).toBe(false);
  });

  it('deve retornar false para protocolo inválido (ftp)', () => {
    expect(isValidUrl('ftp://files.example.com/file.txt')).toBe(false);
  });
});


describe('detectPlatform', () => {
  it('deve detectar GitHub', () => {
    expect(detectPlatform('https://github.com/user/repo')).toBe('GitHub');
  });

  it('deve detectar GitHub Gist (prioridade sobre GitHub genérico)', () => {
    expect(detectPlatform('https://gist.github.com/user/abc123')).toBe('GitHub Gist');
  });

  it('deve detectar CodeSandbox', () => {
    expect(detectPlatform('https://codesandbox.io/s/my-sandbox')).toBe('CodeSandbox');
  });

  it('deve detectar CodePen', () => {
    expect(detectPlatform('https://codepen.io/user/pen/abcdef')).toBe('CodePen');
  });

  it('deve detectar Google Drive', () => {
    expect(detectPlatform('https://drive.google.com/file/d/abc/view')).toBe('Google Drive');
  });

  it('deve detectar Google Docs como Google Drive', () => {
    expect(detectPlatform('https://docs.google.com/document/d/abc')).toBe('Google Drive');
  });

  it('deve retornar null para URL de plataforma desconhecida', () => {
    expect(detectPlatform('https://example.com/project')).toBeNull();
  });

  it('deve retornar null para null/undefined/string vazia', () => {
    expect(detectPlatform(null)).toBeNull();
    expect(detectPlatform(undefined)).toBeNull();
    expect(detectPlatform('')).toBeNull();
  });

  it('deve retornar null para tipo não-string', () => {
    expect(detectPlatform(42)).toBeNull();
  });

  it('deve detectar plataformas case-insensitive', () => {
    expect(detectPlatform('https://GITHUB.COM/user/repo')).toBe('GitHub');
    expect(detectPlatform('https://CODESANDBOX.IO/s/test')).toBe('CodeSandbox');
  });
});


describe('validateUrl', () => {
  it('deve retornar isValid true e platform para URL válida de GitHub', () => {
    const result = validateUrl('https://github.com/user/repo');

    expect(result.isValid).toBe(true);
    expect(result.platform).toBe('GitHub');
  });

  it('deve retornar isValid true e platform null para URL válida sem plataforma conhecida', () => {
    const result = validateUrl('https://example.com/project');

    expect(result.isValid).toBe(true);
    expect(result.platform).toBeNull();
  });

  it('deve retornar isValid false e platform null para URL inválida', () => {
    const result = validateUrl('não-é-url');

    expect(result.isValid).toBe(false);
    expect(result.platform).toBeNull();
  });

  it('deve retornar isValid false e platform null para null', () => {
    const result = validateUrl(null);

    expect(result.isValid).toBe(false);
    expect(result.platform).toBeNull();
  });
});
