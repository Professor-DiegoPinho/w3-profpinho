---
id: "007643d62093"
title: "Exceções"
description: "Como lidar com erros em Java usando try, catch e finally"
order: 44
---

# Exceções

Uma exceção é um erro que ocorre durante a execução do programa. Java oferece uma estrutura para capturar e tratar esses erros de forma controlada, evitando que o programa seja interrompido de forma abrupta.

```java
try {
  int resultado = 10 / 0;
} catch (ArithmeticException e) {
  System.out.println("Erro: divisão por zero");
}

// Saída:
// Erro: divisão por zero
```

O código dentro do `try` é executado normalmente. Se um erro ocorrer, a execução pula direto para o bloco `catch` correspondente.

## Múltiplos catch

É possível tratar tipos diferentes de exceção separadamente.

```java
try {
  int[] numeros = {1, 2, 3};
  System.out.println(numeros[5]);
} catch (ArrayIndexOutOfBoundsException e) {
  System.out.println("Índice fora do limite do array");
} catch (Exception e) {
  System.out.println("Outro erro: " + e.getMessage());
}

// Saída:
// Índice fora do limite do array
```

`Exception` é a classe genérica de erro, então um `catch` para ela captura qualquer exceção não tratada anteriormente. Por isso, ela deve vir sempre por último.

## finally

O bloco `finally` é executado sempre, com ou sem erro. Costuma ser usado para liberar recursos.

```java
try {
  System.out.println("Tentando...");
  int resultado = 10 / 0;
} catch (ArithmeticException e) {
  System.out.println("Erro capturado");
} finally {
  System.out.println("Isso sempre executa");
}

// Saída:
// Tentando...
// Erro capturado
// Isso sempre executa
```

## Lançando exceções manualmente

A palavra `throw` permite lançar uma exceção propositalmente.

```java
static void verificarIdade(int idade) {
  if (idade < 0) {
    throw new IllegalArgumentException("Idade não pode ser negativa");
  }
  System.out.println("Idade válida: " + idade);
}

public static void main(String[] args) {
  try {
    verificarIdade(-5);
  } catch (IllegalArgumentException e) {
    System.out.println("Erro: " + e.getMessage());
  }
}

// Saída:
// Erro: Idade não pode ser negativa
```

## Exceções checked e unchecked

Java diferencia dois tipos de exceção. As **checked**, como `IOException`, precisam ser tratadas ou declaradas obrigatoriamente. As **unchecked**, como `ArithmeticException` e `NullPointerException`, não exigem tratamento obrigatório do compilador, mas é uma boa prática tratá-las quando há risco de ocorrerem.
