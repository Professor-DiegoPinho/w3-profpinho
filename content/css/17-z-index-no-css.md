---
id: "6afc0f770c92"
title: "Z-index no CSS"
description: "Como controlar a ordem de empilhamento de elementos com z-index"
order: 17
---

# Para que serve o z-index?

Quando elementos se sobrepõem na página, o `z-index` define qual deles aparece na frente. Pense nele como a profundidade do elemento no eixo Z, que aponta em direção a você.

Quanto maior o valor, mais na frente o elemento aparece na tela.

```css
.elemento-a {
  position: absolute;
  z-index: 1;
}

.elemento-b {
  position: absolute;
  z-index: 2; /* aparece na frente do 'elemento-a' */
}
```

## z-index só funciona com position

O `z-index` não tem efeito em elementos com `position: static`, que é o valor padrão. O elemento precisa ter `position: relative`, `absolute`, `fixed` ou `sticky` para que o z-index funcione.

```css
/* Não funciona */
div {
  z-index: 10;
}

/* Funciona */
div {
  position: relative;
  z-index: 10;
}
```

## Valores negativos

O `z-index` aceita valores negativos. Um elemento com `z-index: -1` fica atrás do fluxo normal da página.

```css
.fundo-decorativo {
  position: absolute;
  z-index: -1;
}
```

## Uso no dia a dia

`z-index` aparece com frequência em situações como:

- menus dropdown que precisam ficar acima do conteúdo;
- modais e overlays que cobrem a página inteira;
- tooltips que aparecem sobre outros elementos;
- cabeçalhos fixos que precisam ficar acima do conteúdo que passa por baixo.

```css
.modal-overlay {
  position: fixed;
  z-index: 1000;
}

.modal {
  position: fixed;
  z-index: 1001; /* acima do overlay */
}
```

Não existe um valor máximo definido, mas é boa prática usar valores com margem entre eles (10, 100, 1000) para facilitar inserir elementos intermediários no futuro sem precisar renumerar tudo.
