---
title: "Opacity e Transparência"
description: "Como controlar a transparência de elementos com opacity e cores com canal alpha"
order: 23
---

# Aspectos de Opacidade e Transparência no CSS

No CSS, existem duas formas de trabalhar com transparência: a propriedade `opacity` e o canal alpha nas cores.

## A propriedade opacity

A propriedade `opacity` define o nível de transparência de um elemento inteiro. O valor vai de `0` (completamente transparente) a `1` (completamente opaco).

```css
.elemento {
  opacity: 1;    /* 100% visível */
  opacity: 0.5;  /* 50% transparente */
  opacity: 0;    /* invisível */
}
```

Um uso comum é criar efeitos de hover:

```css
img {
  opacity: 1;
  transition: opacity 0.3s;
}

img:hover {
  opacity: 0.7;
}
```

## opacity afeta tudo dentro do elemento

Esse é o detalhe mais importante: `opacity` se aplica ao elemento e a **todos os seus filhos**. Se você aplicar `opacity: 0.5` em um `div`, o texto dentro dele também ficará transparente.

```css
.card {
  opacity: 0.5;
  /* o título, o texto e as imagens dentro do card ficam todos com 50% de opacidade */
}
```

## Canal alpha nas cores

Para tornar só o plano de fundo transparente sem afetar o conteúdo, use o canal alpha diretamente na cor com `rgba()` ou `hsla()` (mais detalhado no capítulo sobre cores).

```css
/* Fundo semi-transparente, texto permanece 100% opaco */
.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
}
```

O quarto valor do `rgba()` funciona igual ao `opacity`: de `0` a `1`.

## Quando usar cada um

Use `opacity` quando quiser tornar o elemento inteiro transparente, texto, fundo e tudo mais juntos. Use o canal alpha (`rgba`, `hsla`) quando quiser transparência apenas na cor, sem afetar o conteúdo.

```css
/* Overlay escuro sobre uma imagem */
.overlay {
  background-color: rgba(0, 0, 0, 0.5); /* só o fundo é transparente */
  color: white; /* o texto continua totalmente visível */
}
```
