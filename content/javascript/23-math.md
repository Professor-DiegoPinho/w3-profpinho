---
id: "b2410935f003"
title: "Math"
description: "Como usar o objeto Math do JavaScript para operações matemáticas comuns"
order: 23
---

# Math

O objeto `Math` oferece propriedades e métodos para operações matemáticas. Não precisa ser instanciado: é usado diretamente.

## Constantes

```javascript
Math.PI;    // 3.141592653589793
Math.E;     // 2.718281828459045
```

## Arredondamento

```javascript
Math.round(4.5);  // 5  — arredonda para o inteiro mais próximo
Math.ceil(4.1);   // 5  — sempre arredonda para cima
Math.floor(4.9);  // 4  — sempre arredonda para baixo
Math.trunc(4.9);  // 4  — remove a parte decimal sem arredondar
Math.trunc(-4.9); // -4
```

## Valor absoluto e potência

```javascript
Math.abs(-10);     // 10 — valor absoluto (sem sinal)
Math.pow(2, 8);    // 256 — 2 elevado a 8 (equivale a 2 ** 8)
Math.sqrt(25);     // 5  — raiz quadrada
Math.cbrt(27);     // 3  — raiz cúbica
```

## Mínimo e máximo

```javascript
Math.min(3, 1, 7, 2); // 1
Math.max(3, 1, 7, 2); // 7

// Funciona com arrays usando spread:
const nums = [3, 1, 7, 2];
Math.min(...nums); // 1
Math.max(...nums); // 7
```

## Número aleatório

`Math.random()` retorna um decimal entre `0` (incluso) e `1` (excluso).

```javascript
Math.random(); // ex: 0.7382...
```

Para gerar um inteiro aleatório entre dois valores:

```javascript
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

aleatorio(1, 10); // número inteiro de 1 a 10
```

## Logaritmo e exponencial

```javascript
Math.log(Math.E); // 1  — logaritmo natural
Math.log2(8);     // 3  — logaritmo na base 2
Math.log10(1000); // 3  — logaritmo na base 10
Math.exp(1);      // 2.718... — e elevado a 1
```
