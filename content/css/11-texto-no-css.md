---
id: "88ce92e55c9b"
title: "Texto no CSS"
description: "Como estilizar textos com CSS: cor, alinhamento, decoração, transformação e espaçamento"
order: 11
---

# Estilizando textos com CSS

O CSS oferece várias propriedades para controlar a aparência de textos. As mais usadas no dia a dia cobrem cor, alinhamento, decoração, transformação e espaçamento.

## Cor do texto

A propriedade `color` define a cor do texto de um elemento.

```css
h1 {
  color: #333333;
}

p {
  color: rgb(80, 80, 80);
}
```

## Alinhamento

A propriedade `text-align` controla o alinhamento horizontal do texto.

```css
h1 { text-align: center; }
p  { text-align: left; }    /* padrão */
p  { text-align: right; }
p  { text-align: justify; } /* alinha nas duas margens */
```

## Decoração

A propriedade `text-decoration` adiciona ou remove linhas ao texto.

```css
a {
  text-decoration: none; /* remove o sublinhado padrão dos links */
}

h2 {
  text-decoration: underline;  /* sublinhado */
  text-decoration: line-through; /* tachado */
  text-decoration: overline;   /* linha acima */
}
```

## Transformação

A propriedade `text-transform` altera a capitalização do texto sem precisar reescrever o HTML.

```css
h1 { text-transform: uppercase; }   /* TUDO MAIÚSCULO */
p  { text-transform: lowercase; }   /* tudo minúsculo */
h2 { text-transform: capitalize; }  /* Primeira Letra De Cada Palavra */
```

## Espaçamento

**Entre letras:**

```css
h1 {
  letter-spacing: 3px;  /* aumenta o espaço entre cada caractere */
}
```

**Entre palavras:**

```css
p {
  word-spacing: 8px;
}
```

**Entre linhas:**

```css
p {
  line-height: 1.6; /* valores sem unidade são relativos ao tamanho da fonte */
}
```

`line-height` é uma das propriedades mais importantes para legibilidade. Textos corridos ficam mais fáceis de ler com valores entre `1.4` e `1.8`.

## Recuo do parágrafo

A propriedade `text-indent` define o recuo da primeira linha de um parágrafo.

```css
p {
  text-indent: 30px;
}
```
