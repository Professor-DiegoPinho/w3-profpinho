---
id: "067aa460a262"
title: "Guia de Estilo HTML"
description: "Boas práticas simples para escrever HTML mais limpo, organizado e legível"
order: 31
---

# Escrever HTML do jeito menos sofrido

Navegador costuma perdoar muita coisa. Ser humano, nem sempre.

Por isso vale seguir algumas boas práticas para deixar o HTML mais limpo e legível.

## Exemplo organizado

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
<meta charset="UTF-8">
<title>Minha página</title>
  </head>
  <body>
<h1>Título</h1>
<p>Conteúdo da página.</p>
  </body>
</html>
```

## Boas práticas comuns

- usar indentação consistente;
- fechar corretamente as tags;
- escrever nomes claros;
- usar minúsculas nos elementos e atributos;
- evitar estrutura desnecessariamente confusa.

## Outro exemplo

Em vez de algo apertado assim:

```html
<div><h2>Produto</h2><p>Descrição</p></div>
```

prefira algo mais legível:

```html
<div>
  <h2>Produto</h2>
  <p>Descrição</p>
</div>
```

## O objetivo não é frescura

Código organizado não é vaidade técnica. É um jeito de evitar erro bobo, leitura ruim e manutenção cansativa.

Você pode até entender um HTML bagunçado hoje. Daqui a duas semanas, talvez nem você tenha essa coragem toda.
