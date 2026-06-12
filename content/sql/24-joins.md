---
id: "ace5034e2831"
title: "SQL Joins"
description: "Como combinar dados de múltiplas tabelas em uma única consulta"
order: 24
---

# SQL Joins

Os dados em bancos relacionais raramente ficam todos em uma única tabela. Informações de clientes ficam em `clientes`, pedidos ficam em `pedidos`, produtos ficam em `produtos`. Os JOINs são o que permitem **combinar** esses dados em uma única consulta.

## O conceito

Imagine que você quer saber o nome do cliente que fez cada pedido. Esses dados estão em tabelas diferentes, mas conectados pelo `cliente_id`:

**Tabela `clientes`:**

| id | nome       |
|----|------------|
| 1  | Ana Souza  |
| 2  | Pedro Lima |

**Tabela `pedidos`:**

| id | cliente_id | total  |
|----|------------|--------|
| 1  | 1          | 3500   |
| 2  | 1          | 179.80 |
| 3  | 2          | 199.90 |

O JOIN conecta as duas tabelas pela coluna em comum:

```sql
SELECT clientes.nome, pedidos.total
FROM clientes
INNER JOIN pedidos ON clientes.id = pedidos.cliente_id;
```

```
nome       | total
-----------+--------
Ana Souza  | 3500
Ana Souza  | 179.80
Pedro Lima | 199.90
```

## Os tipos de JOIN

| Tipo              | Retorna                                                          |
|-------------------|------------------------------------------------------------------|
| `INNER JOIN`      | Apenas registros com correspondência nas **duas** tabelas        |
| `LEFT JOIN`       | Todos da esquerda + correspondências da direita (NULL se faltar) |
| `RIGHT JOIN`      | Todos da direita + correspondências da esquerda (NULL se faltar) |
| `FULL OUTER JOIN` | Todos os registros das duas tabelas                              |

## Alias em JOINs

Use sempre aliases para deixar o código mais limpo:

```sql
SELECT c.nome, p.total
FROM clientes AS c
INNER JOIN pedidos AS p ON c.id = p.cliente_id;
```

> Quando duas tabelas têm colunas com o mesmo nome (como `id`), qualifique sempre com o nome ou alias da tabela para evitar ambiguidade.
