---
id: "4b5125406167"
title: "Background no CSS"
description: "Como definir planos de fundo com cor, imagem e as principais propriedades de background"
order: 6
---

# Propriedades de background

As propriedades de background controlam o **plano de fundo** de um elemento. Você pode usar cor sólida, imagem ou uma combinação dos dois.

## Cor de fundo

A propriedade `background-color` define uma cor sólida como plano de fundo.

```css
body {
  background-color: #f4f4f4;
}

.card {
  background-color: white;
}
```

Funciona em qualquer elemento HTML, não só no `body`.

## Imagem de fundo

A propriedade `background-image` define uma imagem como plano de fundo.

```css
body {
  background-image: url("fundo.jpg");
}
```

Por padrão, a imagem se repete até preencher todo o elemento. Para controlar isso, use `background-repeat`.

## Repetição da imagem

```css
body {
  background-image: url("textura.png");
  background-repeat: repeat;    /* padrão: repete nos dois eixos */
  background-repeat: repeat-x;  /* repete só na horizontal */
  background-repeat: repeat-y;  /* repete só na vertical */
  background-repeat: no-repeat; /* não repete */
}
```

## Posição da imagem

Quando a imagem não se repete, você pode controlar onde ela aparece com `background-position`.

```css
body {
  background-image: url("logo.png");
  background-repeat: no-repeat;
  background-position: center top;
}
```

Os valores podem ser palavras-chave (`top`, `bottom`, `left`, `right`, `center`) ou valores em pixels e porcentagem.

## Tamanho da imagem

A propriedade `background-size` controla o tamanho da imagem de fundo.

```css
body {
  background-image: url("fundo.jpg");
  background-size: cover;   /* cobre todo o elemento, pode cortar */
  background-size: contain; /* cabe inteira no elemento, pode sobrar espaço */
  background-size: 400px 300px; /* tamanho fixo */
}
```

`cover` é o valor mais usado quando você quer uma imagem de fundo que preencha a tela inteira sem distorcer.

## Fixar o fundo ao rolar a página

Com `background-attachment` você pode fazer o fundo ficar fixo enquanto o conteúdo rola.

```css
body {
  background-image: url("fundo.jpg");
  background-attachment: fixed;  /* fundo fica parado enquanto a página rola */
  background-attachment: scroll; /* padrão: fundo rola junto com a página */
}
```

## Escrita resumida

Em vez de declarar cada propriedade separadamente, você pode usar a propriedade `background` para reunir tudo em uma linha.

```css
body {
  background: #f4f4f4 url("fundo.jpg") no-repeat center center / cover;
}
```

A ordem é: `cor imagem repetição posição / tamanho`. Use a forma resumida quando o valor ficar legível. Se ficar confuso, prefira as propriedades separadas.
