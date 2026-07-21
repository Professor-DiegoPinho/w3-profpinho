---
id: "f3c89f393e9a"
title: "Loop: while e do-while"
description: "Como usar while e do-while para repetir código em Java"
order: 19
---

# Loop while e do-while

## while

Repete um bloco de código enquanto a condição for verdadeira. A condição é verificada antes de cada execução.

```java
int contador = 0;

while (contador < 5) {
  System.out.println(contador);
  contador++;
}

// Saída:
// 0
// 1
// 2
// 3
// 4
```

Se a condição já for falsa no início, o bloco nunca é executado.

## do-while

Parecido com o `while`, mas a condição é verificada depois da execução. Isso garante que o bloco rode pelo menos uma vez.

```java
int numero = 10;

do {
  System.out.println(numero);
  numero++;
} while (numero < 5);

// Saída:
// 10
```

Mesmo a condição sendo falsa desde o início, o bloco executa uma vez antes de verificar.

## Cuidado com loops infinitos

Se a condição nunca se tornar falsa, o loop nunca termina.

```java
// Evite isso:
while (true) {
  System.out.println("infinito");
}
```

Sempre garanta que algo dentro do loop faça a condição se tornar falsa em algum momento.
