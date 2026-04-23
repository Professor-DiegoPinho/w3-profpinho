---
title: "Cores no CSS"
description: "As diferentes formas de definir cores no CSS: nome, hex, RGB e HSL"
order: 5
---

# Cores

No CSS você pode aplicar cores em textos, planos de fundo, bordas e outros elementos. Existem quatro formas principais de especificar uma cor.

## Por nome

O CSS reconhece mais de 140 nomes de cores em inglês.

```css
p {
  color: red;
  background-color: lightyellow;
}
```

É a forma mais simples, mas cobre só as cores básicas. Para algo mais preciso, use os outros formatos.

## Hexadecimal

O formato hexadecimal representa a cor com um `#` seguido de seis caracteres, combinando os canais de vermelho, verde e azul.

```css
h1 {
  color: #ff0000; /* vermelho puro */
}

p {
  color: #3a3a3a; /* cinza escuro */
}
```

É o formato mais usado no desenvolvimento web. Se os pares de caracteres se repetem, você pode abreviar:

```css
color: #ff0000; /* forma completa */
color: #f00;    /* forma abreviada, equivalente */
```

## RGB

O formato `rgb()` também usa os canais vermelho, verde e azul, mas com valores de 0 a 255.

```css
p {
  color: rgb(255, 0, 0);   /* vermelho puro */
  color: rgb(58, 58, 58);  /* cinza escuro */
}
```

Uma variação é o `rgba()`, que adiciona um quarto valor para controlar a **opacidade** (de 0 a 1):

```css
p {
  color: rgba(255, 0, 0, 0.5); /* vermelho com 50% de transparência */
}
```

## HSL

O formato `hsl()` define a cor pelo matiz (hue), saturação e luminosidade. É mais intuitivo para ajustar variações de uma mesma cor.

```css
p {
  color: hsl(0, 100%, 50%);   /* vermelho puro */
  color: hsl(0, 100%, 80%);   /* vermelho claro */
  color: hsl(0, 50%, 50%);    /* vermelho menos saturado */
}
```

Assim como o RGB, existe o `hsla()` com suporte a transparência:

```css
p {
  color: hsla(0, 100%, 50%, 0.3);
}
```

## Qual formato usar?

No dia a dia, o hexadecimal é o mais comum. Ferramentas de design como Figma e editores de código já entregam as cores nesse formato. O `rgba()` entra quando você precisa de transparência.
