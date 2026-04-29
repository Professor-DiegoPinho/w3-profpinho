---
title: "Padding no CSS"
description: "Como usar padding para controlar o espaço interno entre o conteúdo e a borda de um elemento"
order: 9
---

# O que é padding?

A propriedade `padding` define o **espaço interno** de um elemento, entre o seu conteúdo e a sua borda.

```css
div {
  padding: 20px;
  border: 1px solid #ccc;
}
```

O texto dentro do `div` ficará afastado 20px da borda em todos os lados.

## Lados individuais

Assim como a margin, você pode definir padding diferentes para cada lado.

```css
div {
  padding-top: 10px;
  padding-right: 30px;
  padding-bottom: 10px;
  padding-left: 30px;
}
```

## Escrita resumida

A propriedade `padding` segue a mesma lógica de valores da `margin`: **cima, direita, baixo, esquerda**.

```css
/* Um valor: aplica o mesmo em todos os lados */
padding: 20px;

/* Dois valores: cima/baixo (10px) e direita/esquerda (30px) */
padding: 10px 30px;

/* Três valores: cima (10px), direita/esquerda (30px), baixo (20px) */
padding: 10px 30px 20px;

/* Quatro valores: cima, direita, baixo, esquerda */
padding: 10px 30px 20px 30px;
```

## Padding e o tamanho do elemento

Por padrão, o `padding` é somado à largura e altura do elemento. Um elemento com `width: 200px` e `padding: 20px` vai ocupar `240px` de largura no total.

Para evitar isso, use `box-sizing: border-box`. Com ele, o padding passa a ser descontado de dentro da largura definida.

```css
div {
  width: 200px;
  padding: 20px;
  box-sizing: border-box; /* o elemento continua com 200px no total */
}
```

Muitos projetos aplicam `box-sizing: border-box` em todos os elementos logo no início, evitando surpresas de layout:

```css
* {
  box-sizing: border-box;
}
```

## Diferença entre padding e margin

Confundir os dois é comum no começo. A diferença é simples:

- **padding**: espaço dentro do elemento, entre o conteúdo e a borda;
- **margin**: espaço fora do elemento, entre ele e os vizinhos.

O plano de fundo de um elemento cobre o padding, mas não cobre a margin.

```css
div {
  background-color: lightblue;
  padding: 20px; /* o azul aparece aqui */
  margin: 20px;  /* aqui é transparente */
}
```
