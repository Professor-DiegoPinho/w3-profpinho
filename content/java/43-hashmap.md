---
id: "662e89c7855e"
title: "HashMap"
description: "Como usar HashMap para guardar pares chave-valor em Java"
order: 43
---

# HashMap

Um `HashMap` armazena dados em pares de chave e valor, parecido com dicionários em outras linguagens. Faz parte do pacote `java.util`.

```java
import java.util.HashMap;

HashMap<String, Integer> idades = new HashMap<>();

idades.put("Ana", 30);
idades.put("Pedro", 25);
idades.put("Maria", 28);

System.out.println(idades);

// Saída possível:
// {Ana=30, Pedro=25, Maria=28}
```

Os dois tipos entre `<>` representam o tipo da chave e o tipo do valor, nessa ordem.

## Acessando valores

```java
System.out.println(idades.get("Ana"));

// Saída:
// 30
```

Se a chave não existir, `get()` retorna `null`.

```java
System.out.println(idades.get("Carlos"));

// Saída:
// null
```

## Atualizando um valor

```java
idades.put("Ana", 31); // sobrescreve o valor anterior
System.out.println(idades.get("Ana"));

// Saída:
// 31
```

## Verificando se uma chave existe

```java
System.out.println(idades.containsKey("Ana"));    // true
System.out.println(idades.containsKey("Carlos")); // false
```

## Removendo um item

```java
idades.remove("Pedro");
System.out.println(idades);
```

## Tamanho do HashMap

```java
System.out.println(idades.size());
```

## Percorrendo um HashMap

```java
for (String nome : idades.keySet()) {
  System.out.println(nome + ": " + idades.get(nome));
}
```

Outra forma, percorrendo chave e valor ao mesmo tempo:

```java
for (var entrada : idades.entrySet()) {
  System.out.println(entrada.getKey() + ": " + entrada.getValue());
}

// Saída possível:
// Ana: 31
// Maria: 28
```

## getOrDefault

Retorna o valor da chave se ela existir, ou um valor padrão caso contrário, evitando o risco de receber `null`.

```java
int idade = idades.getOrDefault("Carlos", 0);
System.out.println(idade);

// Saída:
// 0
```
