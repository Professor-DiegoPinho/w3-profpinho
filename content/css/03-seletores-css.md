---
title: "Seletores CSS"
description: "Como selecionar elementos HTML para aplicar estilos com CSS"
order: 3
---

# O que são seletores?

Seletores são a parte do CSS que define **quais elementos HTML** vão receber um estilo. Antes de aplicar qualquer cor ou tamanho, o navegador precisa saber o que estilizar.

Existem vários tipos de seletores. Os mais usados no dia a dia são quatro.

## Seletor de elemento

Seleciona todos os elementos de um determinado tipo.

```css
p {
  color: gray;
}
```

Todos os parágrafos da página ficarão cinza.

## Seletor de classe

Seleciona elementos que possuem um atributo `class` específico. No CSS, classes são indicadas com um ponto `.` antes do nome.

```html
<p class="destaque">Este parágrafo é destacado.</p>
<p>Este não.</p>
```

```css
.destaque {
  color: orange;
  font-weight: bold;
}
```

Só o parágrafo com `class="destaque"` vai receber o estilo. Classes são reutilizáveis: você pode aplicar a mesma classe em quantos elementos quiser.

## Seletor de ID

Seleciona um único elemento que possui um `id` específico. No CSS, IDs são indicados com `#` antes do nome.

```html
<h1 id="titulo-principal">Bem-vindo</h1>
```

```css
#titulo-principal {
  color: navy;
  font-size: 40px;
}
```

IDs devem ser únicos na página: cada `id` pode aparecer apenas uma vez por documento HTML.

## Seletor universal

Seleciona todos os elementos da página de uma vez.

```css
* {
  margin: 0;
  padding: 0;
}
```

Muito usado para "zerar" estilos padrão do navegador antes de começar a estilizar a página.

## Agrupando seletores

Quando dois ou mais elementos compartilham o mesmo estilo, você pode agrupá-los separando com vírgula. Isso evita repetição.

```css
/* Sem agrupamento */
h1 { color: navy; }
h2 { color: navy; }
h3 { color: navy; }

/* Com agrupamento */
h1, h2, h3 {
  color: navy;
}
```

Os dois blocos fazem a mesma coisa. O agrupado é mais fácil de manter.

## Especificidade dos seletores

Quando um elemento é selecionado por mais de um seletor, o navegador precisa decidir qual estilo aplicar. Ele usa uma regra chamada **especificidade** para isso.

- Seletor de ID (`#id`) tem maior especificidade que seletor de classe (`.classe`), que por sua vez tem maior especificidade que seletor de elemento (`elemento`).

```css
/* Seletor de elemento */
p {
  color: gray;
}

/* Seletor de classe */
.destaque {
  color: orange;
}

/* Seletor de ID */
#titulo-principal {
  color: navy;
}
```
