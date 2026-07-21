---
id: "da90decca34f"
title: "Arrays"
description: "Como criar e usar arrays em Java"
order: 22
---

# Arrays em Java

Arrays armazenam múltiplos valores do mesmo tipo, em uma estrutura de tamanho fixo.

```java
String[] frutas = {"maçã", "banana", "laranja"};
int[] numeros = {10, 20, 30, 40};
```

## Declarando sem valores iniciais

```java
int[] numeros = new int[5]; // cria um array com 5 posições, todas com valor 0
```

Para tipos numéricos, o valor padrão é `0`. Para `boolean`, é `false`. Para objetos como `String`, é `null`.

## Acessando itens

Cada item tem um índice, começando em `0`.

```java
String[] frutas = {"maçã", "banana", "laranja"};

System.out.println(frutas[0]); // maçã
System.out.println(frutas[1]); // banana
System.out.println(frutas[2]); // laranja
```

## Alterando itens

```java
frutas[1] = "uva";
System.out.println(frutas[1]);

// Saída:
// uva
```

## Tamanho do array

```java
System.out.println(frutas.length);

// Saída:
// 3
```

Diferente de métodos como `.length()` em Strings, em arrays é uma propriedade, sem parênteses.

## Tamanho fixo

Arrays em Java têm tamanho fixo. Depois de criado, não é possível adicionar ou remover posições.

```java
int[] numeros = new int[3];
numeros[0] = 10;
numeros[1] = 20;
numeros[2] = 30;

numeros[3] = 40; // erro em tempo de execução, índice fora do limite
```

Quando você precisa de uma lista que cresce dinamicamente, o ideal é usar um `ArrayList`, que veremos mais adiante.

## Percorrendo um array

```java
int[] numeros = {1, 2, 3, 4, 5};

for (int numero : numeros) {
  System.out.println(numero);
}
```
