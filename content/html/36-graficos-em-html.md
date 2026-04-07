---
title: "Gráficos no HTML"
description: "Uma visão rápida sobre Canvas e SVG para desenhar gráficos e formas"
order: 36
---

# Duas formas de desenhar na página

Quando falamos em gráficos no HTML, dois nomes aparecem bastante: **Canvas** e **SVG**.

Os dois servem para desenhar, mas funcionam de jeitos diferentes.

## Canvas

O `<canvas>` cria uma área de desenho.

```html
<canvas id="meuCanvas" width="200" height="100" style="border:1px solid #000;"></canvas>
```

Normalmente ele é usado junto com JavaScript para desenhar linhas, formas e animações.

## SVG

O SVG representa formas como elementos vetoriais.

```html
<svg width="200" height="100">
  <rect width="200" height="100" style="fill: lightblue;"></rect>
  <circle cx="50" cy="50" r="30" fill="orange"></circle>
</svg>
```

## Diferença rápida

- `canvas` funciona como uma área de pintura;
- `svg` funciona como elementos gráficos declarados no próprio HTML.

## Quando lembrar disso?

Se a página precisar de desenho simples, ícones vetoriais ou gráficos básicos, esses recursos podem aparecer.

Mas, para começar em HTML, basta saber que eles existem e entender a ideia geral. Sem querer abraçar o planetário inteiro na primeira noite.
