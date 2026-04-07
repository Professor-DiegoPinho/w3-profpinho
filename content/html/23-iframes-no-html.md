---
title: "Iframes no HTML"
description: "Como incorporar outra página dentro da sua usando a tag iframe"
order: 23
---

# Colocando uma página dentro da outra

A tag `<iframe>` permite incorporar outro documento HTML dentro da sua página.

Pense nela como uma janela interna mostrando um conteúdo de outro site ou página.

## Exemplo básico

```html
<iframe src="pagina.html" title="Conteúdo incorporado"></iframe>
```

## Ajustando tamanho

```html
<iframe
  src="perfil.html"
  title="Perfil do usuário"
  width="600"
  height="300"
></iframe>
```

## Onde isso pode ser útil?

- páginas internas isoladas;
- visualizações incorporadas;
- conteúdos externos permitidos.

## Um ponto importante

O atributo `title` ajuda na acessibilidade e descreve o que está dentro do iframe.

## Cuidado no uso

Iframe resolve alguns cenários bem específicos. Mas, se você começar a usar para tudo, a página vira um emaranhado de janelas dentro de janelas, o que pode confundir mais do que ajudar. Use com moderação e sempre que fizer sentido para o conteúdo que você quer mostrar.
