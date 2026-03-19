---
title: "SQL SUM"
description: "Como somar valores numéricos com a função agregadora SUM"
order: 19
---

# SQL SUM

A função `SUM` retorna a **soma total** dos valores de uma coluna numérica.

## Sintaxe

```sql
SELECT SUM(coluna) FROM nome_da_tabela;
```

## Exemplo

```sql
-- Valor total de todos os pedidos
SELECT SUM(total) AS receita_total FROM pedidos;
```

```
receita_total
--------------
5569.70
```

## SUM com WHERE

```sql
-- Receita apenas dos pedidos concluídos
SELECT SUM(total) AS receita_concluida
FROM pedidos
WHERE status = 'concluido';
```

## SUM com expressões

Você pode somar o resultado de um cálculo:

```sql
-- Valor total em estoque (preço × quantidade disponível)
SELECT SUM(preco * estoque) AS valor_total_estoque FROM produtos;
```

## Combinando com COUNT

```sql
SELECT
  COUNT(*) AS total_pedidos,
  SUM(total) AS receita_total
FROM pedidos
WHERE status = 'concluido';
```

```
total_pedidos | receita_total
--------------+--------------
3             | 4529.80
```

> `SUM` ignora valores `NULL` automaticamente. Se uma linha tiver `NULL` na coluna somada, ela não entra na conta.
