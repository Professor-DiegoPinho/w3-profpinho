---
id: "ca23336834ba"
title: "Caminhos de Arquivo no HTML"
description: "Como referenciar arquivos locais e pastas usando caminhos relativos e absolutos"
order: 25
---

# Onde está esse arquivo afinal?

Sempre que você coloca uma imagem, uma folha de estilo ou um link em HTML, o navegador precisa saber onde encontrar aquele arquivo.

É aí que entram os **caminhos de arquivo**.

## Exemplo simples

```html
<img src="foto.jpg" alt="Foto do produto">
```

Aqui o navegador procura `foto.jpg` na mesma pasta do arquivo HTML.

## Caminho relativo

```html
<img src="images/logo.png" alt="Logo">
```

Isso indica que a imagem está dentro da pasta `images`.

## Subindo uma pasta

```html
<img src="../imagens/banner.jpg" alt="Banner">
```

O `..` significa “voltar uma pasta”.

## Exemplo com CSS externo

```html
<link rel="stylesheet" href="css/styles.css">
```

## Por que isso costuma dar erro?

Porque basta errar uma pasta, um nome de arquivo ou uma extensão para o navegador não achar nada.

E ele não costuma fazer milagre. Se o caminho estiver errado, a imagem some e o CSS finge que nunca ouviu falar de você.

Portanto, sempre confira:

- nome do arquivo;
- extensão;
- nome das pastas;
- posição do HTML em relação ao recurso.
