---
title: "Parágrafos HTML"
description: "Como escrever textos em HTML com parágrafos, quebras de linha e separadores"
order: 7
---

# Escrevendo texto em HTML

Para escrever blocos de texto em HTML, usamos principalmente a tag `<p>`.

Exemplo:

```html
<p>HTML é a base da estrutura de uma página web.</p>
<p>Com ele você define títulos, textos, imagens e links.</p>
```

Cada `<p>` representa um parágrafo.

## Um detalhe que costuma confundir

No código, você pode apertar Enter várias vezes achando que o navegador vai respeitar exatamente aquele espaçamento. Só que não funciona assim.

Veja:

```html
<p>
  Este texto
  foi escrito
  em várias linhas.
</p>
```

No navegador, isso normalmente será exibido como uma linha contínua.

## Quebra de linha com `<br>`

Se você quiser forçar uma quebra de linha dentro do conteúdo, pode usar `<br>`.

```html
<p>Rua das Flores, 123<br>Centro<br>Santa Maria - RS</p>
```

Isso é útil para endereços, poemas ou casos em que a quebra faz sentido.

## Separação com `<hr>`

A tag `<hr>` cria uma linha horizontal para separar conteúdos.

```html
<p>Conteúdo da primeira parte.</p>
<hr>
<p>Conteúdo da segunda parte.</p>
```

Ela funciona como uma divisão temática na página.

## Exemplo prático

```html
<h1>Sobre mim</h1>

<p>Meu nome é Eduardo e eu gosto de desenvolvimento web.</p>

<p>Estou estudando HTML para construir páginas melhores e mais organizadas.</p>

<hr>

<p>Na próxima etapa, vou aprender CSS.</p>
```

## Quando usar cada um?

- use `<p>` para parágrafos;
- use `<br>` para quebra de linha pontual;
- use `<hr>` para separar seções.

Não vale sair usando `<br>` para empurrar layout. Isso até funciona por cinco minutos, mas depois vira gambiarra com crachá.
