---
id: "afaf8920084f"
title: "Transições no CSS"
description: "Como criar animações suaves entre estados de elementos com CSS transitions"
order: 26
---

# Como fazer transições suaves?

A propriedade `transition` faz com que a mudança de um estilo aconteça de forma gradual, ao invés de instantânea. É a forma mais simples de adicionar movimento e fluidez a uma interface.

```css
button {
  background-color: blue;
  transition: background-color 0.3s;
}

button:hover {
  background-color: darkblue;
}
```

Sem o `transition`, a cor mudaria instantaneamente ao passar o mouse. Com ele, a mudança acontece em 0.3 segundos.

## Os valores da transition

A propriedade `transition` aceita quatro valores:

```css
element {
  transition: propriedade duração timing-function delay;
}
```

- **propriedade:** qual propriedade CSS será animada (`background-color`, `width`, `opacity`, etc.);
- **duração:** quanto tempo a animação leva (`0.3s`, `500ms`);
- **timing-function:** o ritmo da animação;
- **delay:** quanto tempo esperar antes de começar.

## Timing functions

O ritmo da animação define se ela começa rápida e desacelera, ou o contrário.

```css
div {
  transition: all 0.3s ease;        /* padrão: começa rápido, desacelera */
  transition: all 0.3s linear;      /* velocidade constante */
  transition: all 0.3s ease-in;     /* começa devagar, termina rápido */
  transition: all 0.3s ease-out;    /* começa rápido, termina devagar */
  transition: all 0.3s ease-in-out; /* devagar nas duas pontas */
}
```

## Animando múltiplas propriedades

Para animar mais de uma propriedade, separe com vírgula ou use `all`.

```css
button {
  background-color: blue;
  transform: scale(1);
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: darkblue;
  transform: scale(1.05);
}
```

Usar `all` é mais prático, mas pode causar animações indesejadas em propriedades que você não queria animar.

## Delay

O delay define quanto tempo esperar antes de iniciar a transição.

```css
.menu {
  opacity: 0;
  transition: opacity 0.3s ease 0.1s; /* espera 0.1s antes de começar */
}

.menu:hover {
  opacity: 1;
}
```

## Casos de uso comuns

Transições são usadas com frequência em:

- mudança de cor em botões no hover;
- aparecimento e desaparecimento de elementos com `opacity`;
- menus que deslizam com `transform`;
- crescimento de cards com `transform: scale()`.
