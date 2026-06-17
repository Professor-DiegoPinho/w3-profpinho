---
title: "Datas"
description: "Como trabalhar com datas em Java usando a API java.time"
order: 41
---

# Datas em Java

A forma moderna de trabalhar com datas em Java é através do pacote `java.time`, disponível desde o Java 8.

## LocalDate: apenas a data

```java
import java.time.LocalDate;

LocalDate hoje = LocalDate.now();
System.out.println(hoje);

LocalDate dataEspecifica = LocalDate.of(2025, 6, 15);
System.out.println(dataEspecifica);

// Saída:
// 2026-06-16
// 2025-06-15
```

## LocalTime: apenas a hora

```java
import java.time.LocalTime;

LocalTime agora = LocalTime.now();
System.out.println(agora);

LocalTime horaEspecifica = LocalTime.of(14, 30);
System.out.println(horaEspecifica);
```

## LocalDateTime: data e hora juntas

```java
import java.time.LocalDateTime;

LocalDateTime agora = LocalDateTime.now();
System.out.println(agora);
```

## Extraindo partes de uma data

```java
LocalDate data = LocalDate.of(2025, 6, 15);

System.out.println(data.getYear());       // 2025
System.out.println(data.getMonthValue()); // 6
System.out.println(data.getDayOfMonth()); // 15
System.out.println(data.getDayOfWeek());  // SUNDAY
```

## Adicionando e subtraindo

```java
LocalDate data = LocalDate.of(2025, 6, 15);

LocalDate proximaSemana = data.plusDays(7);
LocalDate mesPassado = data.minusMonths(1);

System.out.println(proximaSemana);
System.out.println(mesPassado);

// Saída:
// 2025-06-22
// 2025-05-15
```

## Comparando datas

```java
LocalDate data1 = LocalDate.of(2025, 1, 1);
LocalDate data2 = LocalDate.of(2025, 6, 1);

System.out.println(data1.isBefore(data2)); // true
System.out.println(data1.isAfter(data2));  // false
```

## Formatando datas

```java
import java.time.format.DateTimeFormatter;

LocalDate data = LocalDate.of(2025, 6, 15);
DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/yyyy");

System.out.println(data.format(formato));

// Saída:
// 15/06/2025
```
