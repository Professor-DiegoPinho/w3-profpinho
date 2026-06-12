---
id: "87cbe02fd916"
title: "Listas HTML"
description: "Como criar listas ordenadas, não ordenadas e de descrição em HTML"
order: 17
---

# Agrupando itens em lista

Quando você tem vários itens relacionados, uma lista costuma ser a forma mais natural de exibir isso.

Em HTML, os tipos mais comuns são:

- lista não ordenada;
- lista ordenada;
- lista de descrição.

## Lista não ordenada

Usa marcadores. Ótima para itens sem hierarquia ou ordem específica.

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

## Lista ordenada

Usa numeração. Ótima para passos ou hierarquia.

```html
<ol>
  <li>Criar o arquivo</li>
  <li>Escrever o HTML</li>
  <li>Abrir no navegador</li>
</ol>
```

## Lista de descrição

Serve para pares de termo e explicação. Ótima para glossários ou FAQs.

```html
<dl>
  <dt>HTML</dt>
  <dd>Estrutura o conteúdo da página.</dd>

  <dt>CSS</dt>
  <dd>Cuida da aparência.</dd>
</dl>
```

## Qual usar?

A lógica é simples:

- use `<ul>` quando a ordem não importa;
- use `<ol>` quando a ordem importa;
- use `<dl>` quando existir relação de termo e descrição.
