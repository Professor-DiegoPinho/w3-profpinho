---
title: "Testando Liquid Tags"
description: "Exemplos de como usar liquid tags para embeds do YouTube"
order: 999
---

# Testando Liquid Tags

Este arquivo demonstra como usar as liquid tags para incorporar vídeos do YouTube nos arquivos markdown.

## Sintaxe Básica

Para incluir um vídeo do YouTube, use a seguinte sintaxe:

```
{% embed https://youtu.be/VIDEO_ID %}
```

## Exemplos

### Vídeo sobre HTML Básico

{% embed https://youtu.be/G4RHpXSa7dw %}

### Usando URL completa do YouTube

{% embed https://www.youtube.com/watch?v=UB1O30fR-EE %}

### Testando URL inválida

{% embed https://exemplo-url-invalida.com %}

## Diferentes formatos de URL suportados

As liquid tags suportam os seguintes formatos de URL do YouTube:

- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtube.com/watch?v=VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

## Recursos dos vídeos incorporados

Os vídeos incorporados têm as seguintes características:

- **Responsivos**: Ajustam-se automaticamente ao tamanho da tela
- **Carregamento otimizado**: Carregamento lazy por padrão
- **Configurações do YouTube**: Desabilitação de sugestões relacionadas e branding modesto
- **Acessibilidade**: Suporte completo a leitores de tela e navegação por teclado