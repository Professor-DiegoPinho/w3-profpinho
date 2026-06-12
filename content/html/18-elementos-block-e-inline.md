---
id: "5e7ea72f2068"
title: "Elementos Block e Inline"
description: "Entenda a diferença entre elementos que ocupam a linha toda e os que ficam no fluxo do texto"
order: 18
---

# Nem toda tag se comporta igual

Algumas tags ocupam a largura inteira disponível. Outras ficam apenas no espaço do próprio conteúdo.

É daí que vem a diferença entre elementos **block** e **inline**.

## Elementos block

Eles normalmente começam em uma nova linha e ocupam toda a largura disponível.

Exemplo:

```html
<div>Bloco 1</div>
<div>Bloco 2</div>
```

Cada `div` aparece em sua própria linha.

## Elementos inline

Eles ficam no fluxo do texto, sem quebrar a linha automaticamente.

```html
<span>Item 1</span>
<span>Item 2</span>
```

## Exemplo prático

```html
<p>
  Este é um <span>trecho destacado</span> dentro de um parágrafo.
</p>
```

Aqui o `span` fica junto com o texto, sem criar uma linha nova.

## Exemplos comuns

- block: `<div>`, `<p>`, `<h1>`;
- inline: `<span>`, `<a>`, `<strong>`.

## Por que isso importa?

Porque esse comportamento afeta diretamente o layout da página. Se uma tag está pulando linha quando não deveria, ou ficando espremida quando você queria um bloco, geralmente o problema começa aqui.
