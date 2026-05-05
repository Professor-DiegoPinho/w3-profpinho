---
title: "Loop: while e do...while"
description: "Como usar while e do...while para repetir código enquanto uma condição for verdadeira"
order: 11
---

# Loop: while e do...while

## while

Repete um bloco de código enquanto a condição for verdadeira. A condição é verificada **antes** de cada execução.

```javascript
let contador = 0;

while (contador < 5) {
  console.log(contador);
  contador++;
}
// 0, 1, 2, 3, 4
```

Se a condição já for falsa no início, o bloco nunca é executado.

## do...while

Parecido com o `while`, mas a condição é verificada **depois** da execução. Isso garante que o bloco rode pelo menos uma vez.

```javascript
let numero = 10;

do {
  console.log(numero);
  numero++;
} while (numero < 5);

// 10 — executou uma vez mesmo com a condição falsa
```

## Cuidado com loops infinitos

Se a condição nunca se tornar falsa, o loop nunca termina e trava o navegador.

```javascript
// Não faça isso:
while (true) {
  console.log("infinito");
}
```

Sempre garanta que algo dentro do loop fará a condição se tornar falsa em algum momento.

## while ou for?

Use `for` quando você sabe de antemão quantas vezes o loop vai repetir. Use `while` quando a repetição depende de uma condição que pode mudar de forma menos previsível, como aguardar uma entrada do usuário ou processar dados até encontrar um valor específico.
