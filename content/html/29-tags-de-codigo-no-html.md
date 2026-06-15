---
id: "16e251c8a052"
title: "Tags de Código no HTML"
description: "Como marcar trechos de código, teclado e saída de programa em HTML"
order: 29
---

# Mostrando código dentro da página

Quando você quer exibir comandos, atalhos ou saída de programa, existem algumas tags que ajudam a dar significado a esse conteúdo.

## Tag `<code>`

Usada para marcar um trecho de código.

```html
<p>Use a tag <code>&lt;h1&gt;</code> para criar títulos.</p>
```

## Tag `<pre>`

Mantém espaços e quebras de linha.

```html
<pre>
linha 1
linha 2
linha 3
</pre>
```

## Usando juntas

```html
<pre><code>
const nome = "João";
console.log(nome);
</code></pre>
```

## Outras tags úteis

- `<kbd>` para entrada do teclado;
- `<samp>` para saída de programa;
- `<var>` para variável.

Exemplo:

```html
<p>Pressione <kbd>Ctrl</kbd> + <kbd>S</kbd> para salvar.</p>
<p>Saída: <samp>Arquivo salvo com sucesso</samp></p>
```
