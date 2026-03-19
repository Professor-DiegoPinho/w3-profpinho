---
title: "SQL Valores NULL"
description: "O que é NULL no SQL e como lidar com campos sem valor"
order: 10
---

# SQL Valores NULL

`NULL` representa a **ausência de valor** em um campo — não é zero, não é string vazia. É simplesmente a falta de informação.

## Como surgem valores NULL?

Um campo fica `NULL` quando:
- Um registro foi inserido sem preencher aquela coluna;
- A coluna foi definida como opcional na criação da tabela.

## IS NULL e IS NOT NULL

Você **não pode** usar `=` para comparar com `NULL`. Isso não funciona:

```sql
-- ERRADO — não retorna nada
SELECT * FROM clientes WHERE telefone = NULL;
```

Use `IS NULL` e `IS NOT NULL`:

```sql
-- Clientes sem telefone cadastrado
SELECT nome FROM clientes WHERE telefone IS NULL;

-- Clientes com telefone cadastrado
SELECT nome FROM clientes WHERE telefone IS NOT NULL;
```

## NULL em cálculos

Qualquer operação matemática com `NULL` resulta em `NULL`:

```sql
SELECT 100 + NULL;  -- resultado: NULL
SELECT NULL * 5;    -- resultado: NULL
```

## NULL em funções de agregação

As funções como `COUNT`, `SUM` e `AVG` **ignoram valores `NULL`** automaticamente:

```sql
-- COUNT(*) conta todas as linhas
-- COUNT(telefone) ignora as linhas com telefone NULL
SELECT COUNT(*), COUNT(telefone) FROM clientes;
```

## COALESCE — valor padrão quando NULL

A função `COALESCE` retorna o primeiro valor não nulo da lista:

```sql
SELECT nome, COALESCE(telefone, 'Não informado') AS telefone
FROM clientes;
```

| nome       | telefone         |
|------------|------------------|
| Ana Souza  | (11) 99999-0001  |
| Pedro Lima | Não informado    |

> `NULL` é um dos conceitos mais importantes — e mais mal compreendidos — do SQL. Lembre-se: comparações com `NULL` sempre usam `IS NULL` ou `IS NOT NULL`, nunca `=`.
