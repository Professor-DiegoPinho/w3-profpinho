---
id: "517353ccc12b"
title: "Head no HTML"
description: "Entenda o que vai dentro da tag head e por que ela é importante"
order: 26
---

# A parte da página que você quase não vê

O conteúdo do `<head>` geralmente não aparece diretamente na tela, mas ele ajuda o navegador a entender como a página deve funcionar.

É como os bastidores de um palco: pouca gente vê, mas sem isso a apresentação fica torta.

## Exemplo básico

```html
<head>
  <title>Minha página</title>
  <meta charset="UTF-8">
</head>
```

## O que costuma ficar no `head`?

- `<title>` para o título da aba;
- `<meta>` para metadados;
- `<link>` para arquivos CSS e favicon;
- `<style>` para CSS interno;
- `<script>` em alguns casos.

## Exemplo mais completo

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Site Responsivo</title>
  <link rel="stylesheet" href="styles.css">
</head>
```

## Por que isso importa?

Porque uma página sem `head` bem montado até pode abrir, mas começa a tropeçar em detalhes importantes: acentuação, responsividade, título da aba, estilos e por aí vai.

O conteúdo visível mora no `body`, mas muita coisa essencial começa no `head`.
