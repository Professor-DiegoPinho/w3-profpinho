---
id: "438442a55414"
title: "Entrada do usuário"
description: "Como ler dados digitados pelo usuário em Java com a classe Scanner"
order: 40
---

# Entrada do usuário com Scanner

A classe `Scanner` permite ler dados digitados pelo usuário no terminal. Ela faz parte do pacote `java.util`, então é preciso importá-la.

```java
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    System.out.println("Qual é o seu nome?");
    String nome = scanner.nextLine();

    System.out.println("Olá, " + nome + "!");
  }
}
```

## Lendo diferentes tipos de dados

```java
Scanner scanner = new Scanner(System.in);

System.out.println("Digite sua idade:");
int idade = scanner.nextInt();

System.out.println("Digite sua altura:");
double altura = scanner.nextDouble();

System.out.println("Idade: " + idade);
System.out.println("Altura: " + altura);
```

- `nextLine()`: lê uma linha completa de texto;
- `nextInt()`: lê um número inteiro;
- `nextDouble()`: lê um número decimal;
- `next()`: lê uma única palavra, até o próximo espaço.

## Cuidado ao misturar nextInt() e nextLine()

Um problema comum é misturar `nextInt()` com `nextLine()` na sequência. O `nextInt()` não consome a quebra de linha deixada após o número digitado, o que pode fazer o `nextLine()` seguinte capturar uma linha vazia.

```java
Scanner scanner = new Scanner(System.in);

System.out.println("Digite sua idade:");
int idade = scanner.nextInt();

scanner.nextLine(); // consome a quebra de linha pendente

System.out.println("Digite seu nome:");
String nome = scanner.nextLine();

System.out.println(nome + " tem " + idade + " anos.");
```

## Fechando o Scanner

Depois de terminar de usar, é uma boa prática fechar o `Scanner` para liberar o recurso.

```java
scanner.close();
```
