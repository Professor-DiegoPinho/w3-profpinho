---
id: "344b4a8f0f9f"
title: "Operadores de comparação"
description: "Os operadores de comparação em Java"
order: 11
---

# Operadores de comparação

Comparam dois valores e retornam um resultado `boolean`: `true` ou `false`.

```java
int a = 10;
int b = 7;

System.out.println(a == b); // false, igual a
System.out.println(a != b); // true, diferente de
System.out.println(a > b);  // true, maior que
System.out.println(a < b);  // false, menor que
System.out.println(a >= b); // true, maior ou igual a
System.out.println(a <= b); // false, menor ou igual a
```

## Atenção ao comparar Strings

Diferente dos tipos primitivos, comparar objetos do tipo `String` com `==` pode gerar resultados inesperados, porque o `==` compara se são o mesmo objeto na memória, e não se o conteúdo é igual.

```java
String a = new String("Java");
String b = new String("Java");

System.out.println(a == b); // false, objetos diferentes
System.out.println(a.equals(b)); // true, mesmo conteúdo
```

Para comparar o conteúdo de duas Strings, use sempre o método `.equals()`.

```java
String nome = "Ana";

if (nome.equals("Ana")) {
  System.out.println("Nomes iguais");
}
```
