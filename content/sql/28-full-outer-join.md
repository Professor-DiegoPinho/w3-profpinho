---
id: "2a151d439304"
title: "SQL FULL OUTER JOIN"
description: "Como retornar todos os registros de ambas as tabelas com o FULL OUTER JOIN"
order: 28
---

# SQL FULL OUTER JOIN

O `FULL OUTER JOIN` retorna **todos os registros das duas tabelas**. Onde há correspondência, os dados são combinados. Onde não há, as colunas da tabela sem par vêm como `NULL`.

É como fazer um `LEFT JOIN` e um `RIGHT JOIN` ao mesmo tempo.

## Sintaxe

```sql
SELECT colunas
FROM tabela_a AS a
FULL OUTER JOIN tabela_b AS b ON a.coluna = b.coluna;
```

## Exemplo

Imagine um cenário em que alguns clientes não têm pedidos e alguns pedidos têm `cliente_id` inválido (dado inconsistente):

```sql
SELECT c.nome, p.id AS pedido_id, p.total
FROM clientes AS c
FULL OUTER JOIN pedidos AS p ON c.id = p.cliente_id;
```

O resultado trará:
- Clientes com pedidos — dados combinados;
- Clientes **sem** pedidos — `NULL` nas colunas de pedido;
- Pedidos **sem** cliente válido — `NULL` nas colunas de cliente.

## Encontrando o que está faltando nos dois lados

```sql
-- Clientes sem pedido E pedidos sem cliente — tudo de uma vez
SELECT c.nome, p.id AS pedido_id
FROM clientes AS c
FULL OUTER JOIN pedidos AS p ON c.id = p.cliente_id
WHERE c.id IS NULL OR p.id IS NULL;
```

## Compatibilidade

O `FULL OUTER JOIN` funciona no **PostgreSQL** e no **SQL Server**. O MySQL não suporta nativamente — pode ser simulado com `UNION`:

```sql
SELECT c.nome, p.id FROM clientes AS c LEFT JOIN pedidos AS p ON c.id = p.cliente_id
UNION
SELECT c.nome, p.id FROM clientes AS c RIGHT JOIN pedidos AS p ON c.id = p.cliente_id;
```

> Na prática do dia a dia, o `FULL OUTER JOIN` é bem menos frequente que `INNER` e `LEFT JOIN`. Ele brilha em auditorias de dados e análises de inconsistências entre sistemas.
