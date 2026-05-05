---
title: "Variáveis"
description: "Como declarar e usar variáveis em JavaScript com var, let e const"
order: 4
---

# Variáveis

Variáveis armazenam valores para serem usados ao longo do código. Em JavaScript, existem três formas de declarar uma variável: `var`, `let` e `const`.

## let

Declara uma variável que pode ter seu valor alterado.

```javascript
let nome = "Ana";
let idade = 25;

nome = "Carlos"; // válido
```

## const

Declara uma variável cujo valor não pode ser reatribuído. Use sempre que o valor não precisar mudar.

```javascript
const PI = 3.14;
const pais = "Brasil";

PI = 3; // erro!
```

## var

A forma antiga de declarar variáveis. Ainda funciona, mas tem comportamentos inesperados relacionados ao escopo. Prefira `let` e `const` em todo código novo.

```javascript
var cidade = "Porto Alegre";
```

## Regras de nomenclatura

- Nomes podem conter letras, números, `_` e `$`;
- Não podem começar com número;
- JavaScript diferencia maiúsculas de minúsculas: `nome` e `Nome` são variáveis diferentes;
- O padrão da linguagem é **camelCase**: `nomeCompleto`, `idadeUsuario`.

```javascript
let nomeCompleto = "João Silva";
let idadeUsuario = 30;
const taxaJuros = 0.05;
```

## let ou const?

Uma boa regra: comece sempre com `const`. Se perceber que o valor precisa mudar, troque para `let`. Isso torna o código mais previsível e fácil de ler.
