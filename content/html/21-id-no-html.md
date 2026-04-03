---
title: "ID no HTML"
description: "Como usar o atributo id para identificar um elemento específico da página"
order: 21
---

# Identificando um elemento de forma única

O atributo `id` serve para dar um identificador único a um elemento.

Enquanto a `class` pode aparecer em vários lugares, o `id` deve ser usado uma vez por página para cada valor.

## Exemplo básico

```html
<h1 id="titulo-principal">Bem-vindo</h1>
```

## Usando com CSS

```css
#titulo-principal {
  color: darkblue;
}
```

## Usando em links internos

O `id` também é útil para criar âncoras na própria página.

```html
<a href="#contato">Ir para contato</a>

<h2 id="contato">Contato</h2>
```

Ao clicar no link, o navegador leva a pessoa até o elemento com aquele `id`.

## Classe ou id?

De forma simples:

- `class` para grupos;
- `id` para algo específico.

Se tudo virar `id`, pode acabar com a organização. Se tudo virar `class`, às vezes falta precisão. A boa notícia é que o HTML deixa você escolher o que faz mais sentido para cada caso.
