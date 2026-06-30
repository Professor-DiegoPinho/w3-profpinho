import { describe, it, expect } from 'vitest';
import { processLiquidTags, processAllLiquidTags } from '@/lib/liquidTags.js';

describe('processLiquidTags (embeds YouTube)', () => {
  it('deve converter {% embed %} com URL padrão do YouTube', () => {
    const input = '{% embed https://www.youtube.com/watch?v=dQw4w9WgXcQ %}';
    const result = processLiquidTags(input);

    expect(result).toContain('youtube-embed-container');
    expect(result).toContain('youtube.com/embed/dQw4w9WgXcQ');
    expect(result).toContain('iframe');
  });

  it('deve converter {% embed %} com URL curta do YouTube (youtu.be)', () => {
    const input = '{% embed https://youtu.be/dQw4w9WgXcQ %}';
    const result = processLiquidTags(input);

    expect(result).toContain('youtube.com/embed/dQw4w9WgXcQ');
  });

  it('deve converter {% embed %} com URL do YouTube embed', () => {
    const input = '{% embed https://www.youtube.com/embed/dQw4w9WgXcQ %}';
    const result = processLiquidTags(input);

    expect(result).toContain('youtube.com/embed/dQw4w9WgXcQ');
  });

  it('deve exibir erro para URL inválida do YouTube', () => {
    const input = '{% embed https://example.com/not-youtube %}';
    const result = processLiquidTags(input);

    expect(result).toContain('embed-error');
    expect(result).toContain('URL inválida');
  });

  it('deve processar múltiplos embeds no mesmo conteúdo', () => {
    const input = [
      'Texto antes',
      '{% embed https://www.youtube.com/watch?v=abc12345678 %}',
      'Texto do meio',
      '{% embed https://youtu.be/xyz98765432 %}',
      'Texto depois',
    ].join('\n');

    const result = processLiquidTags(input);

    expect(result).toContain('youtube.com/embed/abc12345678');
    expect(result).toContain('youtube.com/embed/xyz98765432');
    expect(result).toContain('Texto antes');
    expect(result).toContain('Texto do meio');
    expect(result).toContain('Texto depois');
  });

  it('deve retornar conteúdo inalterado se não houver embeds', () => {
    const input = '# Título\n\nTexto normal sem embed.';
    const result = processLiquidTags(input);

    expect(result).toBe(input);
  });

  it('deve retornar null/undefined inalterado', () => {
    expect(processLiquidTags(null)).toBeNull();
    expect(processLiquidTags(undefined)).toBeUndefined();
  });

  it('deve retornar string vazia inalterada', () => {
    expect(processLiquidTags('')).toBe('');
  });
});

describe('processAllLiquidTags (toggles)', () => {
  it('deve converter {% toggle %} em elemento <details>', () => {
    const input = '{% toggle "Clique para ver" %}Conteúdo oculto{% endtoggle %}';
    const result = processAllLiquidTags(input);

    expect(result).toContain('<details class="content-toggle">');
    expect(result).toContain('<summary class="content-toggle-summary">Clique para ver</summary>');
    expect(result).toContain('Conteúdo oculto');
  });

  it('deve processar toggle com conteúdo multiline', () => {
    const input = [
      '{% toggle "Exemplo de código" %}',
      '```javascript',
      'console.log("hello");',
      '```',
      '{% endtoggle %}',
    ].join('\n');

    const result = processAllLiquidTags(input);

    expect(result).toContain('<details');
    expect(result).toContain('Exemplo de código');
    expect(result).toContain('console.log');
  });

  it('deve escapar HTML no título do toggle', () => {
    const input = '{% toggle "Título com <script>alert(1)</script>" %}corpo{% endtoggle %}';
    const result = processAllLiquidTags(input);

    // O título deve ser escapado
    expect(result).not.toContain('<script>');
    expect(result).toContain('&lt;script&gt;');
  });
});

describe('processAllLiquidTags (links)', () => {
  it('deve converter {% links %} em cards de links', () => {
    const input = [
      '{% links "Links úteis" %}',
      '- [MDN Web Docs](https://developer.mozilla.org)',
      '- [W3Schools](https://www.w3schools.com)',
      '{% endlinks %}',
    ].join('\n');

    const result = processAllLiquidTags(input);

    expect(result).toContain('content-links-block');
    expect(result).toContain('Links úteis');
    expect(result).toContain('content-link-card');
    expect(result).toContain('developer.mozilla.org');
    expect(result).toContain('w3schools.com');
  });

  it('deve usar título padrão quando não informado', () => {
    const input = [
      '{% links %}',
      '- [Google](https://www.google.com)',
      '{% endlinks %}',
    ].join('\n');

    const result = processAllLiquidTags(input);

    expect(result).toContain('Links da aula');
  });

  it('deve retornar o body original se não houver links válidos', () => {
    const input = [
      '{% links "Test" %}',
      'texto sem links',
      '{% endlinks %}',
    ].join('\n');

    const result = processAllLiquidTags(input);

    expect(result).toContain('texto sem links');
    // Não deve ter a estrutura de cards
    expect(result).not.toContain('content-links-block');
  });

  it('deve escapar URLs e labels nos cards', () => {
    const input = [
      '{% links "Links" %}',
      '- [Site & "Docs"](https://example.com/page?a=1&b=2)',
      '{% endlinks %}',
    ].join('\n');

    const result = processAllLiquidTags(input);

    expect(result).toContain('&amp;');
    expect(result).toContain('&quot;');
  });
});

describe('processAllLiquidTags (combinado)', () => {
  it('deve processar embeds, toggles e links no mesmo conteúdo', () => {
    const input = [
      '# Aula 1',
      '',
      '{% embed https://www.youtube.com/watch?v=dQw4w9WgXcQ %}',
      '',
      '{% toggle "Ver resposta" %}A resposta é 42.{% endtoggle %}',
      '',
      '{% links "Referências" %}',
      '- [Docs](https://docs.example.com)',
      '{% endlinks %}',
    ].join('\n');

    const result = processAllLiquidTags(input);

    // Embed
    expect(result).toContain('youtube-embed-container');
    // Toggle
    expect(result).toContain('<details');
    expect(result).toContain('Ver resposta');
    // Links
    expect(result).toContain('content-links-block');
    expect(result).toContain('Referências');
  });

  it('deve retornar conteúdo inalterado se não houver liquid tags', () => {
    const input = '# Título\n\nParagrafo normal.\n\n- item 1\n- item 2';
    const result = processAllLiquidTags(input);

    expect(result).toBe(input);
  });
});
