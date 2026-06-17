---
title: "Atributos de classe"
description: "Como funcionam os atributos de instância e os atributos estáticos em Java"
order: 30
---

# Atributos de classe

## Atributos de instância

São os atributos comuns, declarados na classe, mas com um valor próprio para cada objeto criado.

```java
public class Produto {
  String nome;
  double preco;
}

Produto produto1 = new Produto();
produto1.nome = "Caderno";
produto1.preco = 15.90;

Produto produto2 = new Produto();
produto2.nome = "Lápis";
produto2.preco = 2.50;

System.out.println(produto1.preco);
System.out.println(produto2.preco);

// Saída:
// 15.9
// 2.5
```

Cada objeto guarda seu próprio valor para `nome` e `preco`.

## Atributos estáticos

Com a palavra `static`, o atributo passa a pertencer à classe, e não a cada objeto individualmente. Todos os objetos compartilham o mesmo valor.

```java
public class Produto {
  static int totalProdutos = 0;
  String nome;

  Produto(String nome) {
    this.nome = nome;
    totalProdutos++;
  }
}

public class Main {
  public static void main(String[] args) {
    Produto p1 = new Produto("Caderno");
    Produto p2 = new Produto("Lápis");

    System.out.println(Produto.totalProdutos);
  }
}

// Saída:
// 2
```

Atributos estáticos são acessados pelo nome da classe, e não pelo objeto: `Produto.totalProdutos`, e não `p1.totalProdutos`.

## Valores padrão

Quando um atributo não recebe valor inicial, o Java atribui um valor padrão de acordo com o tipo.

```java
public class Exemplo {
  int numero;       // 0
  double decimal;   // 0.0
  boolean ativo;    // false
  String texto;     // null
}
```

## Inicializando atributos diretamente

```java
public class ContaBancaria {
  double saldo = 0.0;
  String titular;
}
```

Atribuir um valor inicial direto na declaração é útil quando esse valor é o mesmo para todos os objetos no início.
