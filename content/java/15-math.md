---
id: "064243b7448b"
title: "Math"
description: "Como usar a classe Math do Java para operações matemáticas"
order: 15
---

# A classe Math

Java oferece a classe `Math`, com métodos prontos para operações matemáticas comuns. Não é preciso criar um objeto, os métodos são chamados diretamente pela classe.

## Valor máximo e mínimo

```java
System.out.println(Math.max(10, 25)); // 25
System.out.println(Math.min(10, 25)); // 10
```

## Potência e raiz quadrada

```java
System.out.println(Math.pow(2, 4));  // 16.0, 2 elevado a 4
System.out.println(Math.sqrt(25));   // 5.0, raiz quadrada
```

## Arredondamento

```java
System.out.println(Math.round(4.5));  // 5
System.out.println(Math.ceil(4.1));   // 5.0, sempre arredonda para cima
System.out.println(Math.floor(4.9));  // 4.0, sempre arredonda para baixo
```

## Valor absoluto

```java
System.out.println(Math.abs(-10)); // 10
```

## Números aleatórios

```java
double aleatorio = Math.random(); // número entre 0.0 (incluso) e 1.0 (exclusivo)

System.out.println(aleatorio);
```

Para gerar um inteiro aleatório dentro de um intervalo:

```java
int min = 1;
int max = 10;

int numero = (int) (Math.random() * (max - min + 1)) + min;
System.out.println(numero);
```

## Constantes

```java
System.out.println(Math.PI); // 3.141592653589793
System.out.println(Math.E);  // 2.718281828459045
```
