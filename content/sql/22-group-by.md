---
title: "SQL GROUP BY"
description: "Como agrupar registros e calcular estatísticas por categoria com GROUP BY"
order: 22
---

# SQL GROUP BY

O `GROUP BY` divide os registros em grupos com base nos valores de uma coluna, e permite aplicar funções agregadoras a cada grupo separadamente.

## Sintaxe

```sql
SELECT coluna, FUNCAO(outra_coluna)
FROM nome_da_tabela
GROUP BY coluna;
```

## Exemplo

Quantos produtos existem em cada categoria?

```sql
SELECT categoria, COUNT(*) AS total_produtos
FROM produtos
GROUP BY categoria;
```

```
categoria    | total_produtos
-------------+---------------
Eletrônicos  | 3
Móveis       | 2
```

## Múltiplas funções no mesmo GROUP BY

```sql
SELECT
  categoria,
  COUNT(*) AS total,
  ROUND(AVG(preco), 2) AS preco_medio,
  MIN(preco) AS mais_barato,
  MAX(preco) AS mais_caro
FROM produtos
GROUP BY categoria;
```

## Agrupando por múltiplas colunas

```sql
-- Pedidos agrupados por status e por cliente
SELECT cliente_id, status, COUNT(*) AS total
FROM pedidos
GROUP BY cliente_id, status
ORDER BY cliente_id;
```

## A regra fundamental

Toda coluna no `SELECT` que **não** estiver dentro de uma função agregadora **deve** estar no `GROUP BY`:

```sql
-- ERRADO — "nome" não está no GROUP BY nem é uma agregação
SELECT nome, categoria, COUNT(*)
FROM produtos
GROUP BY categoria;

-- CORRETO
SELECT categoria, COUNT(*)
FROM produtos
GROUP BY categoria;
```

## Combinando com WHERE

O `WHERE` filtra os registros **antes** do agrupamento:

```sql
-- Contagem de produtos por categoria, apenas os com estoque > 20
SELECT categoria, COUNT(*) AS total
FROM produtos
WHERE estoque > 20
GROUP BY categoria;
```

## Ordem de execução das cláusulas

1. `FROM`
2. `WHERE`
3. `GROUP BY`
4. `HAVING`
5. `SELECT`
6. `ORDER BY`
7. `LIMIT`
