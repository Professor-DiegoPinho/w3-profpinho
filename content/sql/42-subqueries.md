---
title: "SQL Subconsultas"
description: "Como usar queries dentro de queries para resolver problemas mais complexos"
order: 42
---

# SQL Subconsultas

Uma subconsulta (ou subquery) é uma query SQL dentro de outra query. O resultado da query interna é usado pela query externa.

## Subquery no WHERE

O uso mais comum — o resultado da query interna vira um valor de comparação:

```sql
-- Produtos com preço acima da média
SELECT nome, preco
FROM produtos
WHERE preco > (SELECT AVG(preco) FROM produtos);
```

A query interna `(SELECT AVG(preco) FROM produtos)` é executada primeiro e retorna um número. Esse número é então usado pelo `WHERE` externo.

## Subquery com IN

```sql
-- Clientes que fizeram pelo menos um pedido concluído
SELECT nome FROM clientes
WHERE id IN (
  SELECT DISTINCT cliente_id FROM pedidos WHERE status = 'concluido'
);
```

## Subquery no SELECT

```sql
-- Cada produto com seu preço e a média geral
SELECT
  nome,
  preco,
  (SELECT ROUND(AVG(preco), 2) FROM produtos) AS media_geral
FROM produtos;
```

## Subquery no FROM

Você pode tratar o resultado de uma query como se fosse uma tabela:

```sql
SELECT categoria, total
FROM (
  SELECT categoria, COUNT(*) AS total
  FROM produtos
  GROUP BY categoria
) AS resumo
WHERE total > 1;
```

> Quando usar subquery no `FROM`, sempre dê um alias para ela (no caso, `resumo`).

## Subquery vs JOIN

Em muitos casos você pode resolver o mesmo problema com subquery ou JOIN. JOINs costumam ser mais eficientes em tabelas grandes. Subqueries podem ser mais legíveis em cenários simples.

```sql
-- Com subquery
SELECT nome FROM clientes
WHERE id IN (SELECT cliente_id FROM pedidos);

-- Com JOIN (equivalente)
SELECT DISTINCT c.nome
FROM clientes AS c
INNER JOIN pedidos AS p ON c.id = p.cliente_id;
```
