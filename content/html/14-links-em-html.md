---
title: "Links em HTML"
description: "Como criar links em HTML para navegar entre páginas e recursos"
order: 14
---

# Criando links

Um dos elementos mais importantes da web é o link. Sem ele, a internet seria um monte de páginas soltas, cada uma no seu canto, sem conversar com ninguém.

No HTML, links são criados com a tag `<a>`.

## Exemplo básico

```html
<a href="https://exemplo.com">Visitar site</a>
```

- `<a>` é a tag de link;
- `href` define o destino;
- o texto entre as tags é a parte clicável.

## Link para outra página do projeto

```html
<a href="contato.html">Ir para contato</a>
```

Esse tipo de link aponta para um arquivo da própria aplicação.

## Abrindo em nova aba

```html
<a href="https://exemplo.com" target="_blank">Abrir em outra aba</a>
```

O atributo `target="_blank"` faz o navegador abrir o destino em uma nova aba ou janela.

## Link em uma imagem

Uma imagem também pode virar link:

```html
<a href="home.html">
  <img src="logo.png" alt="Logo do site">
</a>
```

## Exemplo prático

```html
<h1>Menu</h1>

<p><a href="index.html">Página inicial</a></p>
<p><a href="produtos.html">Ver produtos</a></p>
<p><a href="contato.html">Falar conosco</a></p>
```

## O que observar?

Sempre que criar um link, pense em duas coisas:

- para onde a pessoa vai;
- se o texto do link deixa isso claro.

Evite coisas muito genéricas como “clique aqui” quando o contexto puder ser mais específico. Link bom já entrega a intenção sem fazer a pessoa jogar no modo adivinhação.
