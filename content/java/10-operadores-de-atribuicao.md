---
title: "Operadores de atribuição"
description: "Os operadores de atribuição em Java"
order: 10
---

# Operadores de atribuição

O operador básico de atribuição é o `=`, usado para guardar um valor em uma variável.

```java
int x = 10;
```

## Operadores compostos

Combinam uma operação matemática com a atribuição, reaproveitando o valor que já existe na variável.

```java
int x = 10;

x += 5;  // x = x + 5, vale 15
x -= 3;  // x = x - 3, vale 12
x *= 2;  // x = x * 2, vale 24
x /= 4;  // x = x / 4, vale 6
x %= 4;  // x = x % 4, vale 2
```

## Exemplo prático

```java
int saldo = 100;

saldo -= 30; // pagamento de uma conta
System.out.println(saldo);

saldo += 50; // depósito
System.out.println(saldo);

// Saída:
// 70
// 120
```

Usar os operadores compostos deixa o código mais curto e evita repetir o nome da variável duas vezes na mesma linha.
