---
id: "9759ea6257b4"
title: "Métodos de String"
description: "Os principais métodos para manipular Strings em Java"
order: 14
---

# Métodos de String

## Maiúsculas e minúsculas

```java
String texto = "Java é incrível";

System.out.println(texto.toUpperCase()); // JAVA É INCRÍVEL
System.out.println(texto.toLowerCase()); // java é incrível
```

## Removendo espaços

```java
String entrada = "   nome do usuário   ";
System.out.println(entrada.trim());

// Saída:
// nome do usuário
```

## Buscando dentro da String

```java
String texto = "Java é uma linguagem popular";

System.out.println(texto.contains("popular"));   // true
System.out.println(texto.startsWith("Java"));     // true
System.out.println(texto.endsWith("popular"));    // true
System.out.println(texto.indexOf("é"));           // 5
```

## Extraindo partes

```java
String frase = "Aprendendo Java";

System.out.println(frase.substring(11));     // Java
System.out.println(frase.substring(0, 10));   // Aprendendo
```

## Substituindo

```java
String mensagem = "Olá, mundo!";
System.out.println(mensagem.replace("mundo", "Java"));

// Saída:
// Olá, Java!
```

## Dividindo em partes

```java
String csv = "Ana,Pedro,Maria";
String[] nomes = csv.split(",");

for (String nome : nomes) {
  System.out.println(nome);
}

// Saída:
// Ana
// Pedro
// Maria
```

## Verificando se está vazia

```java
String texto = "";

System.out.println(texto.isEmpty());  // true
System.out.println(texto.isBlank());  // true, também considera espaços em branco
```

## Formatando Strings

```java
String nome = "Ana";
int idade = 25;

String mensagem = String.format("Meu nome é %s e tenho %d anos.", nome, idade);
System.out.println(mensagem);

// Saída:
// Meu nome é Ana e tenho 25 anos.
```

`%s` representa texto, `%d` representa números inteiros e `%.2f` formata números decimais com duas casas.
