---
title: "Enums"
description: "Como criar e usar enums em Java"
order: 39
---

# Enums

Um enum é um tipo especial usado para representar um conjunto fixo de valores possíveis, como dias da semana, status de um pedido ou direções de um mapa.

```java
public enum DiaDaSemana {
  SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO, DOMINGO
}
```

## Usando um enum

```java
public class Main {
  public static void main(String[] args) {
    DiaDaSemana hoje = DiaDaSemana.QUARTA;

    System.out.println(hoje);

    if (hoje == DiaDaSemana.SABADO || hoje == DiaDaSemana.DOMINGO) {
      System.out.println("Fim de semana!");
    } else {
      System.out.println("Dia de semana");
    }
  }
}

// Saída:
// QUARTA
// Dia de semana
```

## Enum com switch

Enums combinam muito bem com `switch`, já que representam um conjunto fechado de opções.

```java
DiaDaSemana hoje = DiaDaSemana.SABADO;

switch (hoje) {
  case SABADO:
  case DOMINGO:
    System.out.println("Fim de semana!");
    break;
  default:
    System.out.println("Dia de semana");
}

// Saída:
// Fim de semana!
```

## Por que usar enum em vez de String?

```java
// Sem enum, qualquer texto poderia ser usado, mesmo errado:
String status = "pendente";
status = "pendnte"; // erro de digitação que o compilador não detecta

// Com enum, apenas valores válidos são aceitos:
public enum Status {
  PENDENTE, APROVADO, REJEITADO
}

Status status = Status.PENDENTE;
status = Status.PENDNTE; // erro de compilação, esse valor não existe
```

O enum garante que apenas valores válidos sejam usados, e o próprio compilador identifica erros de digitação antes do programa rodar.

## Enums com atributos

Um enum também pode ter atributos e métodos, funcionando de forma parecida com uma classe.

```java
public enum DiaDaSemana {
  SEGUNDA("Dia produtivo"),
  SABADO("Dia de descanso");

  private final String descricao;

  DiaDaSemana(String descricao) {
    this.descricao = descricao;
  }

  public String getDescricao() {
    return descricao;
  }
}

public class Main {
  public static void main(String[] args) {
    System.out.println(DiaDaSemana.SABADO.getDescricao());
  }
}

// Saída:
// Dia de descanso
```
