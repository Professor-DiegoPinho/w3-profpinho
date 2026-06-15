---
id: "a9ef6adc0a7f"
title: "SQL INNER JOIN"
description: "Como retornar apenas os registros com correspondência nas duas tabelas"
order: 25
---

# SQL INNER JOIN

O `INNER JOIN` é o tipo mais comum de JOIN. Ele retorna apenas os registros que têm **correspondência nas duas tabelas**. Se um registro não tem par na outra tabela, ele fica de fora do resultado.

## Sintaxe

```sql
SELECT colunas
FROM tabela_a AS a
INNER JOIN tabela_b AS b ON a.coluna = b.coluna;
```

## Exemplo

Listando pedidos com o nome do cliente:

```sql
SELECT p.id AS pedido, c.nome AS cliente, p.total
FROM pedidos AS p
INNER JOIN clientes AS c ON p.cliente_id = c.id;
```

```
pedido | cliente    | total
-------+------------+--------
1      | Ana Souza  | 3500
2      | Ana Souza  | 179.80
3      | Pedro Lima | 199.90
4      | João Costa | 850
5      | Carla Mendes | 840
```

Clientes que nunca fizeram pedidos não aparecem. Pedidos sem cliente associado também não.

## Combinando com WHERE

```sql
-- Pedidos concluídos com o nome do cliente
SELECT c.nome, p.total
FROM pedidos AS p
INNER JOIN clientes AS c ON p.cliente_id = c.id
WHERE p.status = 'concluido'
ORDER BY p.total DESC;
```

## JOIN com três tabelas

Basta encadear mais um `INNER JOIN`:

```sql
SELECT c.nome AS cliente, pr.nome AS produto, p.quantidade
FROM pedidos AS p
INNER JOIN clientes AS c ON p.cliente_id = c.id
INNER JOIN produtos AS pr ON p.produto_id = pr.id;
```

Cada `JOIN` adiciona uma nova tabela, conectada pelas chaves em comum.

> A palavra `INNER` é opcional. `JOIN` sozinho já é um `INNER JOIN` por padrão. Mas incluí-la deixa a intenção mais explícita.
