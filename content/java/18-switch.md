---
id: "d8292d1c2691"
title: "Switch"
description: "Como usar a estrutura switch em Java"
order: 18
---

# Switch em Java

O `switch` compara um valor com várias opções e executa o bloco correspondente. É uma alternativa ao `if/else if` quando há muitos casos para o mesmo valor.

```java
int dia = 3;

switch (dia) {
  case 1:
    System.out.println("Segunda-feira");
    break;
  case 2:
    System.out.println("Terça-feira");
    break;
  case 3:
    System.out.println("Quarta-feira");
    break;
  default:
    System.out.println("Outro dia");
}

// Saída:
// Quarta-feira
```

## O break

O `break` encerra o `switch` após o caso correspondente. Sem ele, a execução continua passando pelos casos seguintes, mesmo que não correspondam ao valor, comportamento chamado de fall-through.

```java
int nota = 2;

switch (nota) {
  case 1:
  case 2:
    System.out.println("Insuficiente");
    break;
  case 3:
    System.out.println("Regular");
    break;
}

// Saída:
// Insuficiente
```

Aqui, os casos `1` e `2` compartilham o mesmo bloco de propósito, um uso comum do fall-through.

## Switch como expressão

A partir do Java 14, o `switch` pode ser usado como expressão, retornando um valor diretamente com a seta `->`. Esse formato não precisa de `break`.

```java
int dia = 3;

String nomeDia = switch (dia) {
  case 1 -> "Segunda-feira";
  case 2 -> "Terça-feira";
  case 3 -> "Quarta-feira";
  default -> "Outro dia";
};

System.out.println(nomeDia);

// Saída:
// Quarta-feira
```

Esse formato evita o erro comum de esquecer o `break` e deixa o código mais direto.
