---
id: "16e9af4fb8b8"
title: "SQL WHERE"
description: "Como filtrar registros nas consultas com a cláusula WHERE"
order: 4
---

# SQL WHERE

A cláusula `WHERE` filtra os registros retornados por uma consulta. Somente os registros que atendem à condição definida aparecem no resultado.

## Sintaxe

```sql
SELECT coluna1, coluna2
FROM nome_da_tabela
WHERE condição;
```

## Exemplo

Usando a tabela `produtos`:

```sql
SELECT nome, preco FROM produtos WHERE categoria = 'Eletrônicos';
```

| nome     | preco  |
|----------|--------|
| Notebook | 3500   |
| Mouse    | 89.90  |
| Teclado  | 199.90 |

## Operadores de comparação

| Operador      | Significado      | Exemplo                       |
|---------------|------------------|-------------------------------|
| `=`           | Igual a          | `WHERE categoria = 'Móveis'`  |
| `!=` ou `<>` | Diferente de     | `WHERE categoria != 'Móveis'` |
| `>`           | Maior que        | `WHERE preco > 500`           |
| `<`           | Menor que        | `WHERE preco < 100`           |
| `>=`          | Maior ou igual   | `WHERE preco >= 200`          |
| `<=`          | Menor ou igual   | `WHERE estoque <= 20`         |

## Texto vs. números

Texto e datas vão entre aspas simples. Números não:

```sql
WHERE categoria = 'Eletrônicos'  -- texto: aspas simples
WHERE preco > 500                -- número: sem aspas
WHERE data = '2024-03-15'       -- data: aspas simples
```

## WHERE no UPDATE e DELETE

O `WHERE` não é exclusivo do `SELECT`. Ele é igualmente importante em atualizações e remoções:

```sql
UPDATE produtos SET preco = 79.90 WHERE id = 2;
DELETE FROM produtos WHERE estoque = 0;
```

> Sem o `WHERE`, o `UPDATE` e o `DELETE` afetam **todos** os registros da tabela.
