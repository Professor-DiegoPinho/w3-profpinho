---
title: "Classes e objetos"
description: "Como criar classes e instanciar objetos em Java"
order: 29
---

# Classes e objetos

## Criando uma classe

```java
public class Carro {
  String modelo;
  String cor;
  int ano;
}
```

A classe `Carro` define quais informações um carro tem, mas ainda não representa um carro específico.

## Criando um objeto

Para criar um objeto a partir de uma classe, usamos a palavra `new`.

```java
public class Main {
  public static void main(String[] args) {
    Carro meuCarro = new Carro();

    meuCarro.modelo = "Civic";
    meuCarro.cor = "Preto";
    meuCarro.ano = 2024;

    System.out.println(meuCarro.modelo);
    System.out.println(meuCarro.cor);
    System.out.println(meuCarro.ano);
  }
}

// Saída:
// Civic
// Preto
// 2024
```

## Vários objetos da mesma classe

Cada objeto criado é independente, mesmo vindo da mesma classe.

```java
Carro carro1 = new Carro();
carro1.modelo = "Civic";

Carro carro2 = new Carro();
carro2.modelo = "Corolla";

System.out.println(carro1.modelo);
System.out.println(carro2.modelo);

// Saída:
// Civic
// Corolla
```

## Adicionando comportamentos

Além de atributos, uma classe também pode ter métodos, que representam ações que o objeto pode realizar.

```java
public class Carro {
  String modelo;
  int velocidade = 0;

  void acelerar() {
    velocidade += 10;
  }
}

public class Main {
  public static void main(String[] args) {
    Carro carro = new Carro();
    carro.acelerar();
    carro.acelerar();

    System.out.println(carro.velocidade);
  }
}

// Saída:
// 20
```
