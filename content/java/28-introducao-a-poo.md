---
title: "Introdução a POO"
description: "O que é Programação Orientada a Objetos e por que Java é construído sobre ela"
order: 28
---

# O que é POO?

Programação Orientada a Objetos, ou POO, é um paradigma de programação baseado na ideia de organizar o código em **objetos**, que representam coisas do mundo real ou conceitos do sistema.

Java foi criado desde sua base como uma linguagem orientada a objetos. Praticamente tudo nele é construído em torno de classes e objetos.

## Classes e objetos

Uma classe é como um molde, uma planta. Um objeto é uma instância concreta criada a partir desse molde.

```java
public class Cachorro {
  String nome;
  String raca;
}

public class Main {
  public static void main(String[] args) {
    Cachorro meuCachorro = new Cachorro();
    meuCachorro.nome = "Rex";
    meuCachorro.raca = "Labrador";

    System.out.println(meuCachorro.nome);
  }
}

// Saída:
// Rex
```

`Cachorro` é a classe, o molde. `meuCachorro` é um objeto, uma instância criada a partir dela.

## Os quatro pilares da POO

A Programação Orientada a Objetos costuma ser resumida em quatro conceitos principais, que veremos com mais detalhes nas próximas aulas:

- **Encapsulamento**: proteger os dados de um objeto, controlando como eles são acessados e modificados;
- **Herança**: permitir que uma classe reaproveite características de outra;
- **Polimorfismo**: permitir que objetos de classes diferentes respondam de formas diferentes ao mesmo comando;
- **Abstração**: esconder detalhes complexos e expor apenas o que é necessário usar.

## Por que usar POO?

Esse modelo ajuda a organizar sistemas grandes, agrupando dados e comportamentos relacionados em um mesmo lugar. Em vez de ter dados soltos e funções separadas trabalhando sobre eles, você tem objetos que já sabem o que são e o que podem fazer.
