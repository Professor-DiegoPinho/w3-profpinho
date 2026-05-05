---
title: "Condicionais"
description: "Como usar if, else if e else para tomar decisões no JavaScript"
order: 8
---

# Condicionais

Condicionais executam blocos de código dependendo de uma condição ser verdadeira ou falsa.

## if

```javascript
let temperatura = 35;

if (temperatura > 30) {
  console.log("Está calor!");
}
```

O bloco dentro das chaves só é executado se a condição for `true`.

## if / else

```javascript
let hora = 14;

if (hora < 12) {
  console.log("Bom dia!");
} else {
  console.log("Boa tarde!");
}
```

## if / else if / else

Para verificar múltiplas condições em sequência.

```javascript
let nota = 75;

if (nota >= 90) {
  console.log("Aprovado com distinção");
} else if (nota >= 60) {
  console.log("Aprovado");
} else {
  console.log("Reprovado");
}
```

O JavaScript para na primeira condição verdadeira e ignora o restante.

## if sem chaves

Para blocos de uma única linha, as chaves são opcionais. Mas é uma boa prática sempre usá-las para evitar erros.

```javascript
// Funciona, mas evite em equipe
if (nota >= 60) console.log("Aprovado");

// Mais claro e seguro
if (nota >= 60) {
  console.log("Aprovado");
}
```

## Valores falsy e truthy

No JavaScript, condicionais não exigem um booleano explícito. Alguns valores são tratados como `false` automaticamente:

- `false`, `0`, `""`, `null`, `undefined`, `NaN`

Tudo o mais é tratado como `true`.

```javascript
let nome = "";

if (nome) {
  console.log("Nome preenchido");
} else {
  console.log("Nome vazio"); // executado, pois "" é falsy
}
```
