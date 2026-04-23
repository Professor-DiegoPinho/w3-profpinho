---
title: "Media Queries"
description: "Como criar layouts responsivos com media queries, adaptando o estilo para diferentes tamanhos de tela"
order: 22
---

# Responsividade com Media Queries

Media queries permitem aplicar estilos CSS condicionalmente, dependendo das características do dispositivo, principalmente o **tamanho da tela**.

Com elas, você cria layouts que se adaptam a celulares, tablets e desktops com o mesmo arquivo CSS.

## Sintaxe

```css
@media (max-width: 768px) {
  /* estilos aplicados apenas quando a tela tem até 768px de largura */
  p {
    font-size: 14px;
  }
}
```

Tudo dentro do bloco `@media` só tem efeito quando a condição é verdadeira.

## max-width e min-width

**`max-width`:** os estilos valem até aquela largura. Útil para ajustar o layout em telas menores.

```css
@media (max-width: 600px) {
  .container {
    flex-direction: column;
  }
}
```

**`min-width`:** os estilos valem a partir daquela largura. Útil para adicionar estilos progressivamente.

```css
@media (min-width: 1024px) {
  .sidebar {
    display: block;
  }
}
```

## Mobile first

A abordagem **mobile first** consiste em escrever os estilos base para celular e usar `min-width` para adicionar estilos conforme a tela cresce. É a forma mais recomendada hoje.

```css
/* Estilo base: celular */
.container {
  flex-direction: column;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}

/* Desktop */
@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

## Breakpoints comuns

Não existe uma lista oficial, mas os breakpoints mais usados no mercado são:

```css
/* Celular: até 767px (sem media query se for mobile first) */

@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop pequeno */
}

@media (min-width: 1280px) {
  /* Desktop grande */
}
```

## Outras condições

Além do tamanho, media queries aceitam outras condições.

```css
@media (orientation: landscape) {
  /* tela em modo paisagem */
}

@media (prefers-color-scheme: dark) {
  /* usuário com tema escuro ativado no sistema */
  body {
    background-color: #121212;
    color: #ffffff;
  }
}
```

`prefers-color-scheme` é muito usada para implementar suporte automático ao modo escuro.
