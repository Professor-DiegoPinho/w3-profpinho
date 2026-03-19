---
title: "SQL ORDER BY"
description: "Como ordenar os resultados de uma consulta de forma crescente ou decrescente"
order: 8
---

# SQL ORDER BY

Por padrão, o SQL não garante nenhuma ordem específica nos resultados. A cláusula `ORDER BY` define como os dados serão ordenados.

## Sintaxe

```sql
SELECT coluna1, coluna2
FROM nome_da_tabela
ORDER BY coluna [ASC|DESC];
```

- `ASC` — crescente (A→Z, menor→maior). É o padrão — pode ser omitido;
- `DESC` — decrescente (Z→A, maior→menor).

## Exemplos

```sql
-- Produtos do mais barato para o mais caro
SELECT nome, preco FROM produtos ORDER BY preco ASC;

-- Produtos do mais caro para o mais barato
SELECT nome, preco FROM produtos ORDER BY preco DESC;

-- Produtos em ordem alfabética
SELECT nome FROM produtos ORDER BY nome;
```

## Ordenando por múltiplas colunas

A ordenação é aplicada na sequência definida:

```sql
-- Primeiro por categoria (A→Z), depois por preço (maior→menor)
SELECT nome, categoria, preco
FROM produtos
ORDER BY categoria ASC, preco DESC;
```

## NULL no ORDER BY

Valores `NULL` são tratados como os maiores possíveis no PostgreSQL:

- Em `ASC`: NULLs aparecem **por último**;
- Em `DESC`: NULLs aparecem **por primeiro**.

Para controlar explicitamente:

```sql
ORDER BY preco ASC NULLS FIRST;
ORDER BY preco DESC NULLS LAST;
```

## Posição na query

O `ORDER BY` vem depois do `WHERE` e antes do `LIMIT`:

```sql
SELECT nome, preco
FROM produtos
WHERE categoria = 'Eletrônicos'
ORDER BY preco DESC
LIMIT 3;
```
