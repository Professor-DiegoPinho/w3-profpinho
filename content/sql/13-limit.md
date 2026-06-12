---
id: "cafc2c38f281"
title: "SQL LIMIT"
description: "Como limitar o número de registros retornados e implementar paginação"
order: 13
---

# SQL LIMIT

A cláusula `LIMIT` define o número máximo de registros que a query deve retornar. Essencial quando você trabalha com tabelas grandes ou precisa implementar paginação.

## Sintaxe

```sql
SELECT coluna1, coluna2
FROM nome_da_tabela
LIMIT quantidade;
```

## Exemplos

```sql
-- Apenas os 3 primeiros produtos
SELECT nome, preco FROM produtos LIMIT 3;

-- Os 3 produtos mais caros
SELECT nome, preco FROM produtos
ORDER BY preco DESC
LIMIT 3;
```

| nome     | preco |
|----------|-------|
| Notebook | 3500  |
| Mesa     | 850   |
| Teclado  | 199.90|

> Sempre use `ORDER BY` junto com `LIMIT`. Sem ordenação, o banco não garante quais registros serão retornados. O resultado pode mudar entre execuções.

## LIMIT com OFFSET

`OFFSET` define quantos registros pular antes de começar a retornar. É a base de qualquer paginação:

```sql
-- Pula os 3 primeiros, retorna os próximos 3
SELECT nome, preco FROM produtos
ORDER BY id
LIMIT 3 OFFSET 3;
```

Lógica de paginação com 5 itens por página:

| Página | Query                      |
|--------|----------------------------|
| 1ª     | `LIMIT 5 OFFSET 0`         |
| 2ª     | `LIMIT 5 OFFSET 5`         |
| 3ª     | `LIMIT 5 OFFSET 10`        |

## Compatibilidade

`LIMIT` funciona no PostgreSQL, MySQL e SQLite. No SQL Server o equivalente é `TOP`:

```sql
SELECT TOP 3 nome, preco FROM produtos ORDER BY preco DESC;
```

No Oracle usa-se `FETCH FIRST`:

```sql
SELECT nome, preco FROM produtos ORDER BY preco DESC FETCH FIRST 3 ROWS ONLY;
```
