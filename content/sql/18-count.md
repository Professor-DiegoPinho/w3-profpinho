---
title: "SQL COUNT"
description: "Como contar registros em uma tabela com a função COUNT"
order: 18
---

# SQL COUNT

A função `COUNT` conta o número de linhas que atendem a um critério. É provavelmente a função agregadora mais usada no dia a dia.

## Sintaxe

```sql
SELECT COUNT(*) FROM nome_da_tabela;
```

## COUNT(*) vs COUNT(coluna)

A diferença importa quando existem valores `NULL` na tabela:

```sql
-- Conta TODAS as linhas, incluindo as com NULL
SELECT COUNT(*) AS total_clientes FROM clientes;

-- Conta apenas linhas onde "telefone" não é NULL
SELECT COUNT(telefone) AS clientes_com_telefone FROM clientes;
```

Se a tabela tem 4 clientes mas 2 sem telefone:

```
total_clientes | clientes_com_telefone
---------------+----------------------
4              | 2
```

## COUNT com WHERE

```sql
-- Quantos produtos custam mais de 200?
SELECT COUNT(*) AS total
FROM produtos
WHERE preco > 200;
```

## COUNT com DISTINCT

Conta apenas os **valores únicos**:

```sql
-- Quantas categorias diferentes existem?
SELECT COUNT(DISTINCT categoria) AS total_categorias FROM produtos;
```

## Usando alias

Sempre nomeie o resultado com `AS` — sem ele, a coluna vem com o nome genérico `count`:

```sql
SELECT COUNT(*) AS total_pedidos FROM pedidos;
SELECT COUNT(*) AS pedidos_pendentes FROM pedidos WHERE status = 'pendente';
```

> Funções agregadoras como `COUNT` não podem ser usadas diretamente no `WHERE`. Para filtrar com base em resultados agregados, use `HAVING` — que veremos mais adiante.
