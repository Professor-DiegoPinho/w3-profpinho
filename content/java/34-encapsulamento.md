---
title: "Encapsulamento"
description: "O que é encapsulamento e como aplicá-lo em Java com getters e setters"
order: 34
---

# Encapsulamento

Encapsulamento é o princípio de proteger os dados internos de um objeto, controlando como eles podem ser acessados e modificados de fora da classe.

Na prática, em Java, isso costuma significar: deixar os atributos `private` e criar métodos públicos para ler e alterar esses valores.

## Getters e setters

```java
public class Pessoa {
  private String nome;
  private int idade;

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public int getIdade() {
    return idade;
  }

  public void setIdade(int idade) {
    if (idade >= 0) {
      this.idade = idade;
    }
  }
}
```

- **getter**: método que retorna o valor de um atributo;
- **setter**: método que altera o valor de um atributo.

```java
public class Main {
  public static void main(String[] args) {
    Pessoa pessoa = new Pessoa();

    pessoa.setNome("Ana");
    pessoa.setIdade(30);

    System.out.println(pessoa.getNome());
    System.out.println(pessoa.getIdade());
  }
}

// Saída:
// Ana
// 30
```

## A vantagem de usar setters com validação

Como o setter é um método, é possível adicionar regras antes de alterar o valor.

```java
public void setIdade(int idade) {
  if (idade >= 0) {
    this.idade = idade;
  } else {
    System.out.println("Idade inválida");
  }
}

public static void main(String[] args) {
  Pessoa pessoa = new Pessoa();
  pessoa.setIdade(-5);

  System.out.println(pessoa.getIdade());
}

// Saída:
// Idade inválida
// 0
```

Se o atributo fosse `public`, qualquer parte do código poderia atribuir um valor inválido diretamente, sem nenhuma validação.

## Resumo

Encapsular significa esconder os detalhes internos de implementação e expor apenas o necessário, através de uma interface controlada de métodos públicos.
