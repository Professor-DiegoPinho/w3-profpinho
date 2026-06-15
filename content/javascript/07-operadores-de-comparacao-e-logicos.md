---
id: "149d66414453"
title: "Operadores de Comparação e Lógicos"
description: "Como comparar valores e combinar condições em JavaScript"
order: 7
---

# Operadores de Comparação e Lógicos

## Comparação

Retornam `true` ou `false`.

```javascript
5 == "5"   // true  — igual em valor (compara só o valor, ignora o tipo)
5 === "5"  // false — igual em valor E tipo
5 != "5"   // false
5 !== "5"  // true

10 > 5     // true
10 < 5     // false
10 >= 10   // true
10 <= 9    // false
```

### == vs ===

Prefira sempre o `===`. O `==` faz conversão de tipo antes de comparar, o que pode gerar resultados inesperados.

```javascript
0 == false   // true  — perigoso
0 === false  // false — correto
```

## Lógicos

Combinam condições booleanas.

```javascript
// && (E): verdadeiro somente se os dois lados forem verdadeiros
true && true   // true
true && false  // false

// || (OU): verdadeiro se pelo menos um lado for verdadeiro
true || false  // true
false || false // false

// ! (NÃO): inverte o valor
!true   // false
!false  // true
```

## Uso em condicionais

```javascript
let idade = 20;
let temCadastro = true;

if (idade >= 18 && temCadastro) {
  console.log("Acesso liberado");
}

if (idade < 18 || !temCadastro) {
  console.log("Acesso negado");
}
```

## Operador ternário

Uma forma compacta de escrever um `if/else` simples.

```javascript
// condição ? valor se verdadeiro : valor se falso
let status = idade >= 18 ? "maior de idade" : "menor de idade";
console.log(status); // "maior de idade"
```
