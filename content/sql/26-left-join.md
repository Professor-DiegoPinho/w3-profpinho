---
title: "SQL LEFT JOIN"
description: "Como trazer todos os registros da tabela da esquerda, mesmo sem correspondência"
order: 26
---

# SQL LEFT JOIN

O `LEFT JOIN` retorna **todos os registros da tabela da esquerda** (a do `FROM`), mais os correspondentes da tabela da direita. Onde não há correspondência, as colunas da direita vêm como `NULL`.

## Sintaxe

```sql
SELECT colunas
FROM tabela_esquerda AS e
LEFT JOIN tabela_direita AS d ON e.coluna = d.coluna;
```

## Exemplo

Listando todos os clientes e seus pedidos, inclusive quem nunca pediu nada:

```sql
SELECT c.nome, p.id AS pedido_id, p.total
FROM clientes AS c
LEFT JOIN pedidos AS p ON c.id = p.cliente_id;
```

```
nome          | pedido_id | total
--------------+-----------+--------
Ana Souza     | 1         | 3500
Ana Souza     | 2         | 179.80
Pedro Lima    | 3         | 199.90
João Costa    | 4         | 850
Carla Mendes  | 5         | 840
```

Se houvesse um cliente sem nenhum pedido, ele apareceria com `NULL` nas colunas de pedido.

## Encontrar quem não tem correspondência

O padrão mais usado com `LEFT JOIN`: identificar registros sem par na outra tabela:

```sql
-- Clientes que nunca fizeram nenhum pedido
SELECT c.nome
FROM clientes AS c
LEFT JOIN pedidos AS p ON c.id = p.cliente_id
WHERE p.id IS NULL;
```

## Contando mesmo quem tem zero

```sql
-- Todos os clientes e quantos pedidos cada um tem (incluindo zero)
SELECT c.nome, COUNT(p.id) AS total_pedidos
FROM clientes AS c
LEFT JOIN pedidos AS p ON c.id = p.cliente_id
GROUP BY c.id, c.nome
ORDER BY total_pedidos DESC;
```

Com `INNER JOIN`, clientes sem pedidos desapareceriam do resultado. Com `LEFT JOIN`, eles aparecem com `total_pedidos = 0`.

> O `LEFT JOIN` é o segundo tipo mais usado, logo após o `INNER JOIN`. Sempre que precisar garantir que todos os registros de uma tabela apareçam no resultado, independentemente de ter par na outra, ele é a escolha certa.
