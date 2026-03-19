---
title: "SQL MIN e MAX"
description: "Como encontrar o menor e o maior valor de uma coluna com MIN e MAX"
order: 21
---

# SQL MIN e MAX

`MIN` retorna o **menor valor** e `MAX` retorna o **maior valor** de uma coluna. Funcionam com números, datas e texto.

## Sintaxe

```sql
SELECT MIN(coluna) FROM nome_da_tabela;
SELECT MAX(coluna) FROM nome_da_tabela;
```

## Exemplo com números

```sql
SELECT
  MIN(preco) AS produto_mais_barato,
  MAX(preco) AS produto_mais_caro
FROM produtos;
```

```
produto_mais_barato | produto_mais_caro
--------------------+-----------------
89.90               | 3500
```

## Exemplo com datas

```sql
SELECT
  MIN(data_pedido) AS primeiro_pedido,
  MAX(data_pedido) AS ultimo_pedido
FROM pedidos;
```

## Exemplo com texto

Com texto, `MIN` e `MAX` usam ordem alfabética:

```sql
SELECT MIN(nome), MAX(nome) FROM produtos;
```

```
min      | max
---------+---------
Cadeira  | Teclado
```

## Combinando múltiplas funções

É comum usar várias funções agregadoras juntas em uma única consulta:

```sql
SELECT
  COUNT(*) AS total,
  ROUND(AVG(preco), 2) AS media,
  MIN(preco) AS mais_barato,
  MAX(preco) AS mais_caro,
  SUM(preco * estoque) AS valor_em_estoque
FROM produtos;
```

```
total | media   | mais_barato | mais_caro | valor_em_estoque
------+---------+-------------+-----------+-----------------
5     | 1011.76 | 89.90       | 3500      | 76274.50
```

> Assim como as demais funções agregadoras, `MIN` e `MAX` ignoram valores `NULL`.
