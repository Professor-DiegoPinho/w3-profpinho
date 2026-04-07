---
title: "Estrutura Básica de um Documento HTML"
description: "Como funciona a base de um arquivo HTML com doctype, html, head e body"
order: 3
---

# A base de um arquivo HTML

Quase todo documento HTML começa com uma estrutura parecida. Ela funciona como o esqueleto da página.

Veja o exemplo:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Minha página</title>
  </head>
  <body>
    <h1>Olá!</h1>
    <p>Bem-vindo ao meu site.</p>
  </body>
</html>
```

Pode parecer muita coisa para uma página tão simples, mas cada parte tem sua função.

## Entendendo cada bloco

### `<!DOCTYPE html>`

Indica ao navegador que o documento está usando **HTML5**.

```html
<!DOCTYPE html>
```

Sem isso, alguns navegadores podem entrar em modos antigos de interpretação. E aí a diversão vira manutenção estranha.

### `<html>`

É o elemento raiz do documento. Tudo fica dentro dele.

```html
<html>
  ...
</html>
```

### `<head>`

Guarda informações sobre a página que não aparecem diretamente no conteúdo principal.

```html
<head>
  <title>Minha página</title>
</head>
```

Aqui costumam ficar título da aba, metadados, links para arquivos de estilização (CSS) e outras configurações.

### `<body>`

Contém tudo o que aparece para a pessoa usuária.

```html
<body>
  <h1>Olá!</h1>
  <p>Bem-vindo ao meu site.</p>
</body>
```

Se você vê na tela, normalmente está dentro do `body`.

## Outro exemplo

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Loja do João</title>
  </head>
  <body>
    <h1>Promoções da semana</h1>
    <p>Confira os produtos com desconto.</p>
  </body>
</html>
```

Aqui o texto **Loja do João** aparece na aba do navegador, enquanto o título e o parágrafo aparecem dentro da página.

## O que vale guardar desta aula?

Mesmo que a página ainda seja pequena, vale a pena montar a estrutura correta desde o início. Isso evita bagunça e já acostuma você a escrever HTML do jeito esperado pelos navegadores.
