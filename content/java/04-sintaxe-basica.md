---
title: "Sintaxe básica"
description: "Os principais pontos sobre a sintaxe do Java"
order: 4
---

# Sintaxe do Java

Java segue algumas regras rígidas de escrita. Entender essas regras evita boa parte dos erros do começo.

## Ponto e vírgula

Toda instrução em Java termina com `;`. Esquecer esse detalhe é um dos erros mais comuns para quem está começando.

```java
int idade = 25;
System.out.println(idade);
```

## Blocos de código com chaves

Diferente do Python, Java usa chaves `{}` para definir blocos de código, e não a indentação. A indentação ainda é importante para a leitura, mas não afeta o funcionamento do programa.

```java
if (idade >= 18) {
  System.out.println("Maior de idade");
}
```

## Case sensitive

Java diferencia maiúsculas de minúsculas. `idade`, `Idade` e `IDADE` são três variáveis diferentes.

```java
int nota = 10;
int Nota = 20;

System.out.println(nota);
System.out.println(Nota);

// Saída:
// 10
// 20
```

## Nome de classes e arquivos

O nome do arquivo precisa ser idêntico ao nome da classe pública dentro dele, incluindo maiúsculas e minúsculas.

```java
// arquivo: Calculadora.java
public class Calculadora {
  // ...
}
```

## Convenções de nomenclatura

Java usa o padrão **camelCase** para variáveis e métodos, e **PascalCase** para classes.

```java
int idadeUsuario = 30;
String nomeCompleto = "Ana Silva";

public class ContaBancaria {
  // ...
}
```
