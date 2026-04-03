---
title: "Classes no HTML"
description: "Como usar o atributo class para aplicar estilos e identificar grupos de elementos"
order: 20
---

# Dando nome a grupos de elementos

O atributo `class` serve para marcar elementos que pertencem ao mesmo grupo.

Isso é muito útil para aplicar estilos em vários lugares sem repetir regra por regra.

## Exemplo básico

```html
<p class="destaque">Texto importante</p>
<p class="destaque">Outro texto importante</p>
```

Com CSS, você pode estilizar os dois de uma vez:

```css
.destaque {
  color: red;
  font-weight: bold;
}
```

## Exemplo com elementos diferentes

```html
<h2 class="card-titulo">Curso de HTML</h2>
<p class="card-titulo">Texto com a mesma classe</p>
```

A mesma classe pode ser usada em tags diferentes.

## Mais de uma classe

Um elemento também pode ter várias classes, separadas por espaço:

```html
<button class="botao primario grande">Comprar</button>
```

## Quando pensar em classe?

Quando vários elementos compartilham aparência ou comportamento parecido, `class` costuma ser o caminho natural.

É quase como colar etiquetas parecidas em partes diferentes da página para o CSS saber com quem está lidando.
