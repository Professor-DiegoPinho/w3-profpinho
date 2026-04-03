---
title: "Formatação de Texto em HTML"
description: "Como destacar partes do texto com tags de formatação no HTML"
order: 9
---

# Destacando partes do texto

Às vezes um texto precisa de ênfase. Em outras, precisa indicar algo importante, removido ou complementar. Para isso, o HTML possui algumas tags próprias.

## Texto com alta importância

```html
<p>Leia o <strong>manual</strong> antes de continuar.</p>
```

A tag `<strong>` indica importância.

## Ênfase

```html
<p>Você <em>realmente</em> precisa salvar esse arquivo.</p>
```

A tag `<em>` dá ênfase ao trecho.

## Negrito e itálico

Também existem:

```html
<p><b>Texto em negrito</b></p>
<p><i>Texto em itálico</i></p>
```

Visualmente podem parecer semelhantes a `strong` e `em`, mas o significado semântico não é exatamente o mesmo.

## Marca-texto

```html
<p>O prazo termina na <mark>sexta-feira</mark>.</p>
```

A tag `<mark>` destaca o texto.

## Texto menor

```html
<p>Oferta válida até hoje. <small>Consulte as condições.</small></p>
```

## Texto removido e inserido

```html
<p>Preço antigo: <del>R$ 100</del></p>
<p>Preço novo: <ins>R$ 79</ins></p>
```

## Subscrito e sobrescrito

```html
<p>H<sub>2</sub>O</p>
<p>2<sup>3</sup> = 8</p>
```

## Exemplo completo

```html
<p>
  O curso de <strong>HTML</strong> é uma ótima porta de entrada para a web.
  Em poucas aulas você já consegue criar uma página com <em>estrutura</em>,
  destacar trechos com <mark>informações importantes</mark>
  e até escrever fórmulas como H<sub>2</sub>O.
</p>
```

## Uma observação útil

Nem toda formatação deve ser escolhida só pelo visual. Sempre que possível, use a tag que melhor representa o significado do trecho. Isso deixa o HTML mais claro e melhor estruturado.
