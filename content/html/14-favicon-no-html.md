---
id: "f2aec6265879"
title: "Favicon no HTML"
description: "Como definir o pequeno ícone que aparece na aba do navegador"
order: 14
---

# Aquele ícone pequeno da aba

O **favicon** é o ícone que aparece na aba do navegador, nos favoritos e, em alguns casos, no histórico.

É um detalhe pequeno, mas ajuda bastante na identificação da página.

## Exemplo básico

```html
<head>
  <title>Minha página</title>
  <link rel="icon" href="favicon.ico">
</head>
```

## O que essa linha faz?

A tag `<link>` informa ao navegador qual arquivo deve ser usado como ícone da página.

## Exemplo com PNG

```html
<head>
  <link rel="icon" type="image/png" href="icone.png">
</head>
```

## Onde essa tag fica?

Dentro do `<head>`, porque ela é uma configuração da página, não conteúdo visível do `body`.

## Vale a pena mesmo?

Sim. Quando a pessoa abre várias abas, páginas sem favicon ficam com um ícone genérico, o que pode dificultar a identificação.
