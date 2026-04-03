---
title: "Citações HTML"
description: "Como marcar citações, abreviações e informações de autoria no HTML"
order: 10
---

# Marcando citações no HTML

HTML possui algumas tags específicas para conteúdos como citações, abreviações e informações de autoria.

Pode parecer detalhe, mas esses elementos ajudam a dar mais sentido ao texto.

## Citação em linha com `<q>`

Quando a citação é curta e fica no meio da frase, você pode usar `<q>`.

```html
<p>Como já disseram: <q>feito é melhor que perfeito</q>.</p>
```

## Citação em bloco com `<blockquote>`

Quando a citação é maior, faz mais sentido usar um bloco separado.

```html
<blockquote>
  A simplicidade é o último grau de sofisticação.
</blockquote>
```

## Abreviações com `<abbr>`

Se você usar uma sigla, pode explicar o significado com `<abbr>`.

```html
<p>Estou estudando <abbr title="HyperText Markup Language">HTML</abbr>.</p>
```

Nesse caso, o significado completo fica associado à sigla.

## Informações de contato com `<address>`

```html
<address>
  Escrito por Maria Silva.<br>
  São Paulo, Brasil.
</address>
```

Essa tag costuma ser usada para dados de contato ou autoria.

## Título de obra com `<cite>`

```html
<p>Meu livro favorito é <cite>Dom Casmurro</cite>.</p>
```

## Exemplo completo

```html
<p>
  A sigla <abbr title="Cascading Style Sheets">CSS</abbr> representa a parte visual da página.
</p>

<p>Um professor poderia dizer: <q>HTML organiza, CSS estiliza.</q></p>

<blockquote>
  Quanto melhor a estrutura do seu HTML, mais fácil será evoluir o projeto depois.
</blockquote>
```

## Quando usar isso?

Essas tags não aparecem em toda página e está tudo bem não chegar a utilizar no seu projeto, mas são úteis quando o conteúdo pede esse tipo de marcação. E quando você usa a tag certa, o HTML fica mais semântico e mais fácil de entender.
