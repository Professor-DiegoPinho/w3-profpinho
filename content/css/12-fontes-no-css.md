---
id: "7963d2c459fb"
title: "Fontes no CSS"
description: "Como definir famílias de fontes, tamanho, peso, estilo e como usar Google Fonts"
order: 12
---

# Propriedades de fonte

As propriedades de fonte controlam a aparência tipográfica do texto: qual fonte usar, qual o tamanho, se é negrito, itálico e assim por diante.

## Família da fonte

A propriedade `font-family` define qual fonte será usada. É uma boa prática listar mais de uma opção: o navegador usa a primeira disponível e vai para a próxima se não encontrar.

```css
body {
  font-family: "Roboto", Arial, sans-serif;
}
```

O último valor costuma ser uma família genérica como `sans-serif`, `serif` ou `monospace`, garantindo que sempre haverá uma fonte de fallback.

## Tamanho da fonte

A propriedade `font-size` define o tamanho do texto.

```css
h1 { font-size: 32px; }
p  { font-size: 16px; }
small { font-size: 0.8rem; } /* relativo ao tamanho da fonte raiz */
```

`rem` é uma unidade relativa ao tamanho da fonte do elemento `<html>`. É bastante usada por facilitar o ajuste de proporções em toda a página de uma vez só.

## Peso da fonte

A propriedade `font-weight` controla se o texto é normal ou negrito.

```css
p      { font-weight: normal; } /* equivale a 400 */
strong { font-weight: bold; }   /* equivale a 700 */
h1     { font-weight: 300; }    /* light, se a fonte suportar */
```

Os valores numéricos vão de 100 a 900 em múltiplos de 100, mas só funcionam se a fonte tiver aquele peso disponível.

## Estilo da fonte

A propriedade `font-style` define se o texto é itálico.

```css
em { font-style: italic; }
p  { font-style: normal; }
```

## Google Fonts

O Google Fonts oferece centenas de fontes gratuitas que você pode usar em qualquer projeto. Para incluir uma delas, adicione um `<link>` no `<head>` do HTML apontando para a fonte escolhida.

```html
<head>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>
```

Depois, use normalmente no CSS:

```css
body {
  font-family: "Roboto", sans-serif;
}
```

O endereço do link você obtém diretamente no site [fonts.google.com](https://fonts.google.com), escolhendo a fonte e os pesos desejados.

## Escrita resumida

Assim como `border` e `background`, a propriedade `font` aceita vários valores em uma só linha.

```css
p {
  font: italic 400 16px/1.6 "Roboto", sans-serif;
}
```

A ordem é: `estilo peso tamanho/line-height família`. Na prática, a maioria dos desenvolvedores prefere as propriedades separadas para facilitar a leitura.
