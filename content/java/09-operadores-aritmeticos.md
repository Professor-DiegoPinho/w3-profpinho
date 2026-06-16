---
title: "Operadores aritméticos"
description: "Os operadores aritméticos em Java"
order: 9
---

# Operadores aritméticos

```java
int a = 10;
int b = 3;

System.out.println(a + b); // 13, soma
System.out.println(a - b); // 7, subtração
System.out.println(a * b); // 30, multiplicação
System.out.println(a / b); // 3, divisão
System.out.println(a % b); // 1, resto da divisão (módulo)
```

## Divisão entre inteiros

Quando os dois operandos são `int`, o resultado da divisão também é `int`, descartando a parte decimal.

```java
int resultado = 7 / 2;
System.out.println(resultado);

// Saída:
// 3
```

Para obter o resultado com decimais, pelo menos um dos valores precisa ser `double`.

```java
double resultado = 7.0 / 2;
System.out.println(resultado);

// Saída:
// 3.5
```

## Incremento e decremento

```java
int x = 5;

x++; // x = x + 1, agora vale 6
x--; // x = x - 1, agora vale 5
```

Existe diferença entre usar antes ou depois da variável:

```java
int x = 5;
System.out.println(x++); // imprime 5, depois incrementa
System.out.println(x);   // 6

int y = 5;
System.out.println(++y); // incrementa antes, imprime 6
```

## Concatenando com o operador +

Quando usado com uma `String`, o operador `+` concatena em vez de somar.

```java
String mensagem = "Idade: " + 25;
System.out.println(mensagem);

// Saída:
// Idade: 25
```
