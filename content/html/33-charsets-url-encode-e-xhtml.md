---
id: "f8068e932aab"
title: "Charsets, URL Encode e XHTML"
description: "Noções básicas sobre codificação de caracteres, URLs e a diferença entre HTML e XHTML"
order: 33
---

# Três assuntos pequenos, mas úteis

Nesta aula vamos juntar três tópicos que aparecem bastante na prática: **charset**, **URL encode** e **XHTML**.

## Charset

Charset define como os caracteres do texto serão interpretados.

O mais comum hoje é UTF-8.

```html
<meta charset="UTF-8">
```

Sem isso, acentos e caracteres especiais podem aparecer quebrados. E texto quebrado passa uma energia bem triste de sistema abandonado.

## URL encode

Alguns caracteres precisam ser codificados em URLs.

Exemplo:

- espaço pode virar `%20`

Então uma URL como:

```text
busca.html?termo=curso html
```

pode ser representada como:

```text
busca.html?termo=curso%20html
```

## XHTML

XHTML é uma variação mais rígida do HTML.

A ideia principal era exigir uma escrita mais estrita, como:

```html
<br />
<img src="foto.jpg" alt="Foto" />
```

No HTML5 moderno, essa rigidez extra não costuma ser necessária no dia a dia.

## O que guardar?

- `UTF-8` ajuda o texto a aparecer corretamente;
- URL encode evita problemas em endereços;
- XHTML é mais uma referência histórica e de sintaxe rígida do que uma necessidade comum em projetos atuais.
