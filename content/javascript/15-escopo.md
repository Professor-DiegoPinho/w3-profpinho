---
title: "Escopo"
description: "Como o escopo determina onde uma variável pode ser acessada em JavaScript"
order: 15
---

# Escopo

Escopo determina em quais partes do código uma variável pode ser acessada. Em JavaScript, existem três tipos principais.

## Escopo global

Variáveis declaradas fora de qualquer bloco ou função são globais e podem ser acessadas em qualquer lugar do código.

```javascript
let nome = "Ana"; // escopo global

function saudar() {
  console.log(nome); // "Ana" — acessa a variável global
}

saudar();
```

## Escopo de função

Variáveis declaradas dentro de uma função só existem dentro dela.

```javascript
function calcular() {
  let resultado = 42;
  console.log(resultado); // 42
}

calcular();
console.log(resultado); // Erro! resultado não existe aqui
```

## Escopo de bloco

Variáveis declaradas com `let` e `const` dentro de um bloco `{}` só existem dentro dele.

```javascript
if (true) {
  let mensagem = "dentro do bloco";
  console.log(mensagem); // "dentro do bloco"
}

console.log(mensagem); // Erro! mensagem não existe aqui
```

Esse é um dos motivos para preferir `let` e `const` ao `var`: o `var` ignora o escopo de bloco e vaza para o escopo da função, o que pode causar bugs difíceis de identificar.

```javascript
if (true) {
  var vazando = "sou var";
}

console.log(vazando); // "sou var" — var ignorou o bloco
```

## Resumo

| Declaração | Escopo de bloco? |
|---|---|
| `var` | Não |
| `let` | Sim |
| `const` | Sim |

Prefira `const` e `let` para ter controle previsível sobre onde cada variável existe.
