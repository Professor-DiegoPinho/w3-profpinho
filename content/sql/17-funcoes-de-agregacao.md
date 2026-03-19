---
title: "SQL Funções de Agregação"
description: "Como resumir dados com as funções COUNT, SUM, AVG, MIN e MAX"
order: 17
---

# SQL Funções de Agregação

Funções de agregação realizam cálculos sobre um **conjunto de registros** e retornam um único valor como resultado. Em vez de trazer linha por linha, elas respondem perguntas como: quantos são? qual é a soma? qual é a média?

As cinco principais são:

| Função  | O que faz                                |
|---------|------------------------------------------|
| `COUNT` | Conta o número de registros              |
| `SUM`   | Soma os valores de uma coluna numérica   |
| `AVG`   | Calcula a média de uma coluna numérica   |
| `MIN`   | Retorna o menor valor da coluna          |
| `MAX`   | Retorna o maior valor da coluna          |

## Exemplo combinando todas

```sql
SELECT
  COUNT(*)                    AS total_produtos,
  SUM(preco * estoque)        AS valor_em_estoque,
  ROUND(AVG(preco), 2)        AS preco_medio,
  MIN(preco)                  AS mais_barato,
  MAX(preco)                  AS mais_caro
FROM produtos;
```

```
total_produtos | valor_em_estoque | preco_medio | mais_barato | mais_caro
---------------+------------------+-------------+-------------+----------
5              | 76274.50         | 1011.76     | 89.90       | 3500
```

Com uma única consulta, você tem um panorama estatístico completo da tabela — muito útil para relatórios e dashboards.

## Regras importantes

**1. Funções de agregação ignoram `NULL`**

Se uma coluna tem valores nulos, eles são simplesmente desconsiderados no cálculo — exceto no `COUNT(*)`, que conta todas as linhas independentemente.

**2. Não misture colunas normais com agregações sem GROUP BY**

```sql
-- ERRADO — o banco não sabe qual "nome" exibir junto com o COUNT
SELECT nome, COUNT(*) FROM produtos;

-- CORRETO — use GROUP BY para agrupar
SELECT categoria, COUNT(*) FROM produtos GROUP BY categoria;
```

**3. Funções de agregação não funcionam no WHERE**

```sql
-- ERRADO
SELECT * FROM produtos WHERE AVG(preco) > 500;

-- CORRETO — use HAVING (para filtrar após o agrupamento)
SELECT categoria, AVG(preco) FROM produtos
GROUP BY categoria
HAVING AVG(preco) > 500;
```

> Nas próximas páginas veremos cada função em detalhe, com exemplos e variações.
