---
title: "SQL Aliases"
description: "Como criar apelidos para colunas e tabelas com o AS"
order: 16
---

# SQL Aliases

Aliases são apelidos temporários que você pode dar a colunas ou tabelas dentro de uma query. Eles não alteram nada no banco e existem apenas durante a execução da consulta.

## Alias em coluna

```sql
SELECT nome AS produto, preco AS valor FROM produtos;
```

| produto  | valor  |
|----------|--------|
| Notebook | 3500   |
| Mouse    | 89.90  |

A palavra `AS` é opcional. Você pode escrever `nome produto`, mas usá-la deixa o código mais legível.

## Alias com espaços

Se o alias tiver espaço, use aspas duplas (PostgreSQL) ou simples (MySQL):

```sql
SELECT nome AS "Nome do Produto", preco AS "Preço (R$)" FROM produtos;
```

## Alias em expressões

Muito útil para nomear o resultado de cálculos ou funções:

```sql
SELECT
  nome,
  preco,
  preco * 0.9 AS preco_com_desconto,
  estoque * preco AS valor_em_estoque
FROM produtos;
```

## Alias em tabelas

Especialmente útil em queries com JOIN para encurtar o código:

```sql
-- Sem alias: verboso
SELECT produtos.nome, pedidos.total
FROM produtos INNER JOIN pedidos ON produtos.id = pedidos.produto_id;

-- Com alias: muito mais limpo
SELECT p.nome, pe.total
FROM produtos AS p
INNER JOIN pedidos AS pe ON p.id = pe.produto_id;
```

## Alias não pode ser usado no WHERE

O alias de coluna não funciona no `WHERE` porque este é avaliado antes do `SELECT`:

```sql
-- ERRO: o banco ainda não conhece "desconto" no WHERE
SELECT preco * 0.9 AS desconto FROM produtos WHERE desconto < 100;

-- CORRETO: repita a expressão no WHERE
SELECT preco * 0.9 AS desconto FROM produtos WHERE preco * 0.9 < 100;
```

> O alias pode ser usado no `ORDER BY`, pois este é avaliado depois do `SELECT`.
