---
id: "ca9cc94980f3"
title: "Arrays multidimensionais"
description: "Como criar e usar arrays multidimensionais em Java"
order: 23
---

# Arrays multidimensionais

Um array multidimensional é um array de arrays. O caso mais comum é o de duas dimensões, usado para representar tabelas ou matrizes.

```java
int[][] matriz = {
  {1, 2, 3},
  {4, 5, 6},
  {7, 8, 9}
};
```

## Acessando valores

São necessários dois índices: o da linha e o da coluna.

```java
System.out.println(matriz[0][0]); // 1
System.out.println(matriz[1][2]); // 6
System.out.println(matriz[2][1]); // 8
```

## Percorrendo com loops aninhados

```java
int[][] matriz = {
  {1, 2, 3},
  {4, 5, 6}
};

for (int i = 0; i < matriz.length; i++) {
  for (int j = 0; j < matriz[i].length; j++) {
    System.out.print(matriz[i][j] + " ");
  }
  System.out.println();
}

// Saída:
// 1 2 3
// 4 5 6
```

O loop externo percorre cada linha, e o loop interno percorre cada coluna dentro daquela linha.

## Criando sem valores iniciais

```java
int[][] tabuleiro = new int[3][3]; // matriz 3x3, todos os valores iniciam em 0
```

## Arrays com linhas de tamanhos diferentes

Em Java, cada linha de uma matriz pode ter um tamanho diferente, já que cada uma é, na verdade, um array independente.

```java
int[][] irregular = new int[3][];
irregular[0] = new int[]{1, 2};
irregular[1] = new int[]{3, 4, 5};
irregular[2] = new int[]{6};

System.out.println(irregular[1][2]);

// Saída:
// 5
```
