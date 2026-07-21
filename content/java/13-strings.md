---
id: "93551bbefbad"
title: "Strings"
description: "Como trabalhar com texto em Java"
order: 13
---

# Strings em Java

Strings representam texto e são criadas sempre entre aspas duplas.

```java
String nome = "Ana Silva";
System.out.println(nome);
```

## Concatenação

```java
String primeiroNome = "Ana";
String sobrenome = "Silva";

String nomeCompleto = primeiroNome + " " + sobrenome;
System.out.println(nomeCompleto);

// Saída:
// Ana Silva
```

## Strings são imutáveis

Uma vez criada, uma String não pode ser alterada. Operações que parecem modificar uma String, na verdade, criam uma nova.

```java
String texto = "Java";
texto.toUpperCase(); // não altera "texto"

texto = texto.toUpperCase(); // agora sim, reatribuído
System.out.println(texto);

// Saída:
// JAVA
```

## Acessando caracteres

```java
String palavra = "Java";

System.out.println(palavra.charAt(0)); // J
System.out.println(palavra.length());  // 4
```

## Comparando Strings

```java
String a = "Java";
String b = "java";

System.out.println(a.equals(b));           // false, diferencia maiúsculas
System.out.println(a.equalsIgnoreCase(b)); // true, ignora maiúsculas
```

## Texto em múltiplas linhas

A partir do Java 13, é possível usar text blocks com três aspas duplas.

```java
String texto = """
    Linha 1
    Linha 2
    Linha 3
    """;

System.out.println(texto);
```

{% links "Links da aula" %}
- [**Java Docs - String**](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)
{% endlinks %}
