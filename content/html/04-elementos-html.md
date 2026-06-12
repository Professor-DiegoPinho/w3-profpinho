---
id: "04962b65cda3"
title: "Elementos HTML"
description: "O que são elementos HTML e como funcionam tags de abertura, conteúdo e fechamento"
order: 4
---

# O que é um elemento HTML?

Elemento HTML é um bloco de conteúdo marcado por tags.

Na maioria dos casos, ele tem:

- uma **tag de abertura**;
- um **conteúdo**;
- uma **tag de fechamento**.

Exemplo:

```html
<p>Este é um parágrafo.</p>
```

Nesse caso:

- `<p>` é a abertura;
- `Este é um parágrafo.` é o conteúdo;
- `</p>` é o fechamento.

## Outros exemplos comuns

```html
<h1>Título principal</h1>
<a href="https://exemplo.com">Acessar site</a>
```

O primeiro elemento cria um título. O segundo cria um link.

## Elementos podem ficar dentro de outros

Isso acontece o tempo todo em HTML. Veja:

```html
<p>Este texto tem uma palavra em <strong>destaque</strong>.</p>
```

Aqui, o elemento `<strong>` está dentro do `<p>`.

Esse encaixe é chamado de **aninhamento**. E ele precisa ser feito com cuidado.

## Aninhando do jeito certo

Correto:

```html
<p>Texto com <strong>destaque</strong>.</p>
```

Errado:

```html
<p>Texto com <strong>destaque.</p></strong>
```

No exemplo errado, a ordem de fechamento ficou bagunçada. O navegador até tenta adivinhar sua intenção, mas não é bom depender do navegador para corrigir erros de estrutura.

## Elementos vazios

Nem todo elemento tem conteúdo entre abertura e fechamento. Alguns são chamados de **elementos vazios**.

Exemplos:

```html
<br>
<hr>
<img src="foto.jpg" alt="Uma foto">
```

Esses elementos cumprem uma função específica e não precisam envolver texto.

## Exemplo completo

```html
<h1>Cardápio</h1>
<p>Hoje temos lasanha, sopa e salada.</p>
<hr>
<p>Bom apetite!</p>
```

Aqui você tem três elementos diferentes trabalhando juntos para montar o conteúdo da página.
