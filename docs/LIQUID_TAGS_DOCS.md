# Liquid Tags - Documentação

## Visão Geral

As liquid tags permitem incluir conteúdo dinâmico nos arquivos markdown. Atualmente, o sistema suporta incorporação de vídeos do YouTube através da tag `{% embed %}`.

## Tag: {% embed %}

### Sintaxe

```
{% embed URL_DO_YOUTUBE %}
```

### Formatos de URL Suportados

A tag `{% embed %}` aceita os seguintes formatos de URL do YouTube:

- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtube.com/watch?v=VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- Apenas o ID do vídeo: `VIDEO_ID`

### Exemplos de Uso

#### URL curta do YouTube
```markdown
{% embed https://youtu.be/G4RHpXSa7dw %}
```

#### URL completa do YouTube
```markdown
{% embed https://www.youtube.com/watch?v=UB1O30fR-EE %}
```

#### Apenas o ID do vídeo
```markdown
{% embed G4RHpXSa7dw %}
```

### Recursos

- **Responsivo**: Os vídeos se ajustam automaticamente ao tamanho da tela
- **Carregamento otimizado**: Carregamento lazy por padrão
- **Configurações otimizadas**: 
  - Sugestões relacionadas desabilitadas (`rel=0`)
  - Branding modesto (`modestbranding=1`)
  - Autoplay desabilitado (`autoplay=0`)
- **Acessibilidade**: Suporte completo a leitores de tela
- **Tratamento de erros**: URLs inválidas exibem mensagens de erro claras

### Tratamento de Erros

Quando uma URL inválida é fornecida, o sistema exibe uma mensagem de erro:

```html
<div class="embed-error">
  ❌ URL inválida do YouTube: [URL]
</div>
```

## Implementação Técnica

### Arquivos Envolvidos

1. **`src/lib/liquidTags.js`**: Processador principal das liquid tags
2. **`src/lib/markdown.js`**: Integração com o pipeline de markdown
3. **`src/components/MarkdownContent.js`**: Renderização do conteúdo processado
4. **`src/components/YouTubeEmbed.js`**: Componente React para vídeos (opcional)
5. **`src/app/globals.css`**: Estilos para os embeds

### Fluxo de Processamento

1. O arquivo markdown é lido em `getPost()`
2. As liquid tags são processadas por `processAllLiquidTags()`
3. O conteúdo processado é passado para `MarkdownContent`
4. O ReactMarkdown renderiza o HTML final com `rehype-raw`

### Extensibilidade

O sistema foi projetado para ser facilmente extensível. Para adicionar novas liquid tags:

1. Crie uma nova função de processamento em `liquidTags.js`
2. Adicione a chamada em `processAllLiquidTags()`
3. Implemente os estilos CSS necessários

## Troubleshooting

### Problemas Comuns

1. **Vídeo não aparece**: Verifique se a URL do YouTube está correta
2. **Erro de sintaxe**: Certifique-se de usar espaços corretos: `{% embed URL %}`
3. **Estilos incorretos**: Verifique se os estilos CSS foram carregados

### Verificação de Funcionamento

Para testar se as liquid tags estão funcionando:

1. Acesse a página `/html/99-test-liquid-tags`
2. Verifique se os vídeos do YouTube são exibidos corretamente
3. Teste em diferentes tamanhos de tela para verificar responsividade

## Próximos Passos

Possíveis melhorias futuras:

- Suporte para outros provedores de vídeo (Vimeo, etc.)
- Tags para incorporar tweets
- Tags para galerias de imagens
- Tags para gráficos interativos
- Cache de metadados dos vídeos