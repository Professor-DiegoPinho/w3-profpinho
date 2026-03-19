---
title: "SQL LIKE"
description: "Como buscar padrões em texto com o operador LIKE"
order: 14
---

# SQL LIKE

O operador `LIKE` busca padrões em colunas de texto. Ele usa dois caracteres especiais chamados **curingas (wildcards)**:

| Curinga | Representa                    |
|---------|-------------------------------|
| `%`     | Zero, um ou mais caracteres   |
| `_`     | Exatamente um caractere       |

## Sintaxe

```sql
SELECT coluna1, coluna2
FROM nome_da_tabela
WHERE coluna LIKE 'padrão';
```

## Exemplos com %

```sql
-- Produtos cujo nome começa com "Note"
SELECT nome FROM produtos WHERE nome LIKE 'Note%';

-- Produtos cujo nome termina com "o"
SELECT nome FROM produtos WHERE nome LIKE '%o';

-- Produtos com "cl" em qualquer posição
SELECT nome FROM produtos WHERE nome LIKE '%cl%';
```

## Exemplos com _

```sql
-- Nomes com exatamente 4 caracteres
SELECT nome FROM produtos WHERE nome LIKE '____';

-- Nomes que começam com "M" e têm 4 letras no total
SELECT nome FROM produtos WHERE nome LIKE 'M___';
-- Encontra: Mesa, Moto, ...
```

## NOT LIKE

```sql
-- Produtos que NÃO contêm "book" no nome
SELECT nome FROM produtos WHERE nome NOT LIKE '%book%';
```

## ILIKE — sem distinção de maiúsculas (PostgreSQL)

No PostgreSQL, `LIKE` é case-sensitive. Use `ILIKE` para ignorar maiúsculas/minúsculas:

```sql
-- Encontra "Notebook", "notebook", "NOTEBOOK"...
SELECT nome FROM produtos WHERE nome ILIKE '%note%';
```

No MySQL, o `LIKE` já é case-insensitive por padrão.

> Padrões com `%` no início (ex: `'%texto'`) podem ser lentos em tabelas grandes, pois o banco precisa varrer todos os registros. Use com critério em tabelas com muitos dados.
