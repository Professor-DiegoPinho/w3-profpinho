---
id: "00f81954da00"
title: "ArrayList"
description: "Como usar ArrayList para criar listas dinâmicas em Java"
order: 42
---

# ArrayList

Vimos que arrays em Java têm tamanho fixo. Quando é preciso uma lista que cresce e diminui dinamicamente, a solução é o `ArrayList`, parte do pacote `java.util`.

```java
import java.util.ArrayList;

ArrayList<String> frutas = new ArrayList<>();

frutas.add("maçã");
frutas.add("banana");
frutas.add("laranja");

System.out.println(frutas);

// Saída:
// [maçã, banana, laranja]
```

O tipo entre `<>` indica que tipo de dado a lista vai guardar. Isso se chama generics, e garante que a lista só aceite valores daquele tipo.

## Acessando itens

```java
System.out.println(frutas.get(0)); // maçã
System.out.println(frutas.get(1)); // banana
```

## Alterando um item

```java
frutas.set(1, "uva");
System.out.println(frutas);

// Saída:
// [maçã, uva, laranja]
```

## Removendo itens

```java
frutas.remove("uva");     // remove pelo valor
frutas.remove(0);          // remove pelo índice

System.out.println(frutas);
```

## Tamanho da lista

```java
System.out.println(frutas.size());
```

## Verificando se um item existe

```java
System.out.println(frutas.contains("laranja"));
```

## Percorrendo um ArrayList

```java
ArrayList<String> frutas = new ArrayList<>();
frutas.add("maçã");
frutas.add("banana");

for (String fruta : frutas) {
  System.out.println(fruta);
}

// Saída:
// maçã
// banana
```

## ArrayList com tipos primitivos

Generics em Java não funcionam com tipos primitivos diretamente. Para usar `int`, `double` ou `boolean` em um `ArrayList`, é preciso usar as classes wrapper correspondentes: `Integer`, `Double` e `Boolean`.

```java
ArrayList<Integer> numeros = new ArrayList<>();
numeros.add(10);
numeros.add(20);

System.out.println(numeros);
```

{% links "Links da aula" %}
- [**Java Docs - ArrayList**](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html)
{% endlinks %}
