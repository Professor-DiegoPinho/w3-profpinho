---
id: "c545a928dfb5"
title: "Loop: for"
description: "Como usar o loop for em Java"
order: 20
---

# Loop for em Java

```java
for (int i = 0; i < 5; i++) {
  System.out.println(i);
}

// Saída:
// 0
// 1
// 2
// 3
// 4
```

A estrutura tem três partes separadas por `;`:

- **inicialização**: `int i = 0`, cria e define o valor inicial do contador;
- **condição**: `i < 5`, enquanto for verdadeira, o loop continua;
- **incremento**: `i++`, executado ao final de cada repetição.

## Percorrendo um array

```java
String[] frutas = {"maçã", "banana", "laranja"};

for (int i = 0; i < frutas.length; i++) {
  System.out.println(frutas[i]);
}

// Saída:
// maçã
// banana
// laranja
```

## for-each

Uma forma mais simples de percorrer arrays e coleções quando você não precisa do índice.

```java
String[] frutas = {"maçã", "banana", "laranja"};

for (String fruta : frutas) {
  System.out.println(fruta);
}

// Saída:
// maçã
// banana
// laranja
```

A leitura é: "para cada `fruta` dentro de `frutas`, execute o bloco".

## Contagem decrescente

```java
for (int i = 5; i > 0; i--) {
  System.out.println(i);
}

// Saída:
// 5
// 4
// 3
// 2
// 1
```
