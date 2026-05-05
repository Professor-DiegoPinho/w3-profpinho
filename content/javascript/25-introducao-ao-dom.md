---
title: "Introdução ao DOM"
description: "O que é o DOM e como o JavaScript usa essa estrutura para interagir com a página"
order: 25
---

# Introdução ao DOM

O **DOM** (Document Object Model) é a representação da página HTML como uma árvore de objetos. Quando o navegador carrega uma página, ele lê o HTML e cria essa estrutura em memória. O JavaScript acessa e modifica o DOM para alterar a página em tempo real.

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1
        ├── p
        └── div
            └── button
```

Cada elemento HTML vira um **nó** nessa árvore. O JavaScript pode selecionar qualquer nó, ler ou alterar seu conteúdo, seus atributos e seu estilo.

## O objeto document

O ponto de entrada para o DOM é o objeto `document`. Ele representa o documento inteiro e oferece os métodos para selecionar elementos.

```javascript
console.log(document.title);   // título da página
console.log(document.URL);     // URL atual
console.log(document.body);    // o elemento <body>
```

## O que dá para fazer com o DOM?

Com o DOM, o JavaScript consegue:

- ler e alterar o texto e o HTML de qualquer elemento;
- criar, mover e remover elementos da página;
- alterar estilos e classes CSS dinamicamente;
- reagir a eventos como cliques, teclas e rolagem de tela.

Tudo isso sem recarregar a página.

## DOM e HTML são coisas diferentes

O DOM é criado a partir do HTML, mas não é o HTML. Quando o JavaScript altera o DOM, o arquivo HTML original não muda. A alteração existe apenas na memória do navegador durante aquela sessão.

{% links "Links da aula" %}
- [**MDN - Introdução ao DOM**](https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model/Introduction)
{% endlinks %}
