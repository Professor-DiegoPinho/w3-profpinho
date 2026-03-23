---
title: "SQL Funções de Data"
description: "Como trabalhar com datas e horas no SQL"
order: 44
---

# SQL Funções de Data

Datas são tipos de dados com funções próprias no SQL. As funções variam um pouco entre bancos, mas os conceitos são universais.

## Data e hora atual

```sql
SELECT CURRENT_DATE;   -- data de hoje: 2024-03-15
SELECT CURRENT_TIME;   -- hora atual: 14:32:00
SELECT NOW();          -- data e hora: 2024-03-15 14:32:00
```

## EXTRACT: extraindo partes de uma data

```sql
-- Extraindo o ano, mês e dia separadamente
SELECT
  EXTRACT(YEAR  FROM data_pedido) AS ano,
  EXTRACT(MONTH FROM data_pedido) AS mes,
  EXTRACT(DAY   FROM data_pedido) AS dia
FROM pedidos;
```

| ano  | mes | dia |
|------|-----|-----|
| 2024 | 3   | 15  |

```sql
-- Pedidos do mês atual
SELECT * FROM pedidos
WHERE EXTRACT(MONTH FROM data_pedido) = EXTRACT(MONTH FROM CURRENT_DATE)
  AND EXTRACT(YEAR  FROM data_pedido) = EXTRACT(YEAR  FROM CURRENT_DATE);
```

## DATE_TRUNC: truncando a data (PostgreSQL)

Muito útil para agrupar por mês ou por ano:

```sql
-- Total de pedidos por mês
SELECT
  DATE_TRUNC('month', data_pedido) AS mes,
  COUNT(*) AS total,
  SUM(total) AS receita
FROM pedidos
GROUP BY DATE_TRUNC('month', data_pedido)
ORDER BY mes;
```

## AGE: calculando diferença de datas (PostgreSQL)

```sql
-- Há quanto tempo o cliente foi cadastrado
SELECT nome, AGE(NOW(), criado_em) AS tempo_de_cadastro FROM clientes;
```

## INTERVAL: adicionando/subtraindo tempo

```sql
-- Pedidos dos últimos 30 dias
SELECT * FROM pedidos
WHERE data_pedido >= NOW() - INTERVAL '30 days';

-- Data de vencimento: hoje + 7 dias
SELECT CURRENT_DATE + INTERVAL '7 days' AS vencimento;
```

## TO_CHAR: formatando datas como texto (PostgreSQL)

```sql
SELECT TO_CHAR(data_pedido, 'DD/MM/YYYY') AS data_formatada FROM pedidos;
-- Resultado: '15/03/2024'

SELECT TO_CHAR(NOW(), 'Month YYYY') AS periodo;
-- Resultado: 'March 2024'
```

> No MySQL, algumas funções têm nomes diferentes: `YEAR()`, `MONTH()`, `DAY()`, `DATE_FORMAT()`. O conceito é o mesmo, a sintaxe varia.
