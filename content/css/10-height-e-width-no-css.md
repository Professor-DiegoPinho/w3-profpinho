---
id: "28ca5b3afe4b"
title: "Height e Width no CSS"
description: "Como definir largura e altura de elementos com CSS"
order: 10
---

# Largura e altura de elementos

As propriedades `width` e `height` definem a **largura** e a **altura** de um elemento.

```css
div {
  width: 400px;
  height: 200px;
  background-color: lightblue;
}
```

## Unidades de medida

Você pode usar diferentes unidades para definir tamanhos.

**Pixels (`px`):** valor fixo, independente do tamanho da tela.

```css
div {
  width: 300px;
}
```

**Porcentagem (`%`):** relativo ao tamanho do elemento pai.

```css
div {
  width: 100%; /* ocupa toda a largura disponível */
}
```

**Viewport (`vw` e `vh`):** relativo ao tamanho da janela do navegador. `1vw` equivale a 1% da largura da janela, `1vh` equivale a 1% da altura.

```css
section {
  width: 100vw;
  height: 100vh; /* ocupa a tela inteira */
}
```

## Largura e altura máxima e mínima

Além de definir um tamanho fixo, você pode estabelecer limites com `min-width`, `max-width`, `min-height` e `max-height`.

```css
.container {
  width: 100%;
  max-width: 1200px; /* nunca passa de 1200px, mesmo em telas grandes */
}

img {
  width: 100%;
  max-width: 600px;
}
```

Essa combinação de `width: 100%` com `max-width` é muito usada para criar layouts que se adaptam a telas menores sem ficarem grandes demais em telas maiores.

```css
p {
  min-height: 100px; /* a altura cresce se o conteúdo precisar, mas nunca fica menor que 100px */
}
```

## Elementos sem tamanho definido

Quando você não define `width` e `height`, o navegador decide o tamanho automaticamente. Elementos de bloco como `div` e `p` ocupam 100% da largura disponível por padrão. Elementos inline como `span` ocupam só o espaço do seu conteúdo.

## Atenção ao box-sizing

Assim como o padding, definir `width` sem `box-sizing: border-box` pode gerar surpresas. O padding e a borda somam por padrão e fazem o elemento crescer além do que você definiu.

```css
/* Sem border-box: o div ocupa 260px no total */
div {
  width: 200px;
  padding: 30px;
}

/* Com border-box: o div ocupa exatamente 200px */
div {
  width: 200px;
  padding: 30px;
  box-sizing: border-box;
}
```
