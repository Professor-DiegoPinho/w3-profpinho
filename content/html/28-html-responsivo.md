---
title: "HTML Responsivo"
description: "Como preparar a página para se adaptar melhor a diferentes tamanhos de tela"
order: 28
---

# A mesma página em telas diferentes

Hoje uma página pode ser aberta em notebook, celular, tablet e monitor gigante. Então ela precisa se comportar bem em tamanhos diferentes.

É isso que chamamos de **responsividade**.

## Meta viewport

Um passo importante é colocar esta linha no `head`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Isso ajuda o navegador em dispositivos móveis a renderizar a página da forma esperada.

## Imagens flexíveis

```html
<img src="produto.jpg" alt="Produto" style="max-width: 100%; height: auto;">
```

Assim a imagem pode se ajustar melhor ao espaço disponível.

## Exemplo simples de layout adaptável

```html
<div style="display: flex; flex-wrap: wrap; gap: 16px;">
  <div style="flex: 1 1 200px;">Bloco 1</div>
  <div style="flex: 1 1 200px;">Bloco 2</div>
</div>
```

## O que guardar daqui?

Responsividade não é um extra bonito. É parte do básico.

Se a página só funciona direito em uma tela específica, ela não está pronta. Ela está apenas tendo sorte naquele tamanho.
