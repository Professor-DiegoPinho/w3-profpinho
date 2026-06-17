---
id: "c2b98f44222f"
title: "Recursão"
description: "Como funciona a recursão em Java"
order: 27
---

# Recursão

Um método recursivo é aquele que chama a si mesmo dentro do próprio corpo. É uma técnica usada para resolver problemas que podem ser divididos em versões menores do mesmo problema.

## Exemplo clássico: fatorial

O fatorial de um número é a multiplicação dele por todos os números menores até 1. Por exemplo, o fatorial de 4 é `4 * 3 * 2 * 1`.

```java
static int fatorial(int n) {
  if (n <= 1) {
    return 1; // caso base
  }
  return n * fatorial(n - 1); // chamada recursiva
}

public static void main(String[] args) {
  System.out.println(fatorial(4));
}

// Saída:
// 24
```

## Caso base

Toda função recursiva precisa de um caso base, uma condição que interrompe as chamadas. Sem ele, o método chamaria a si mesmo indefinidamente, até o programa travar com um erro de `StackOverflowError`.

```java
static int fatorial(int n) {
  if (n <= 1) {
    return 1; // sem isso, a recursão nunca para
  }
  return n * fatorial(n - 1);
}
```

## Como a recursão funciona por dentro

Para `fatorial(4)`, o Java vai chamando o método repetidamente até atingir o caso base, e depois resolve as multiplicações de trás para frente.

```
fatorial(4) = 4 * fatorial(3)
fatorial(3) = 3 * fatorial(2)
fatorial(2) = 2 * fatorial(1)
fatorial(1) = 1 (caso base)

Resultado: 4 * 3 * 2 * 1 = 24
```

## Recursão ou loop?

Quase tudo que é feito com recursão também pode ser feito com loops, e geralmente os loops são mais eficientes em Java. A recursão se torna mais natural em problemas que já são, por definição, divididos em partes menores, como percorrer estruturas em árvore ou calcular sequências matemáticas.
