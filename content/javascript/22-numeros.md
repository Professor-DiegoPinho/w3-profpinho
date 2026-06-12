---
id: "67eea61debb8"
title: "Números"
description: "Como trabalhar com números em JavaScript: inteiros, decimais, NaN, Infinity e conversões"
order: 22
---

# Números

Em JavaScript, todos os números são do tipo `number`, sejam inteiros ou decimais.

```javascript
let inteiro = 42;
let decimal = 3.14;
let negativo = -10;
```

## Precisão decimal

Operações com decimais podem gerar resultados imprecisos por causa da forma como números de ponto flutuante funcionam internamente.

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004
```

Para contornar, use `toFixed()` para arredondar o resultado:

```javascript
(0.1 + 0.2).toFixed(2); // "0.30" — retorna uma string
```

## NaN

`NaN` significa "Not a Number". É o resultado de operações matemáticas inválidas.

```javascript
"texto" * 2  // NaN
0 / 0        // NaN
```

Para verificar se um valor é `NaN`, use `Number.isNaN()`:

```javascript
Number.isNaN(NaN);        // true
Number.isNaN("texto");    // false — é string, não NaN
```

## Infinity

Divisão por zero resulta em `Infinity`.

```javascript
console.log(1 / 0);  // Infinity
console.log(-1 / 0); // -Infinity
```

## Métodos úteis

```javascript
const n = 3.14159;

n.toFixed(2);       // "3.14" — arredonda para 2 casas decimais (retorna string)
n.toString();       // "3.14159"

Number.isInteger(5);    // true
Number.isInteger(5.5);  // false

Number.isFinite(Infinity); // false
Number.isFinite(42);       // true
```

## Conversão para número

```javascript
Number("42");     // 42
Number("3.14");   // 3.14
Number("");       // 0
Number("texto");  // NaN
Number(true);     // 1
Number(false);    // 0
```

## Valores máximo e mínimo

```javascript
Number.MAX_SAFE_INTEGER; // 9007199254740991
Number.MIN_SAFE_INTEGER; // -9007199254740991
```

Números além desses limites podem perder precisão.
