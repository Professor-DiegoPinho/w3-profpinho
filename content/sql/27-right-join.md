---
id: "ef8846b4be00"
title: "SQL RIGHT JOIN"
description: "Como trazer todos os registros da tabela da direita com o RIGHT JOIN"
order: 27
---

# SQL RIGHT JOIN

O `RIGHT JOIN` é o espelho do `LEFT JOIN`. Ele retorna **todos os registros da tabela da direita**, mais os correspondentes da esquerda. Onde não há correspondência, as colunas da esquerda vêm como `NULL`.

## Sintaxe

```sql
SELECT colunas
FROM tabela_esquerda AS e
RIGHT JOIN tabela_direita AS d ON e.coluna = d.coluna;
```

## Exemplo

Listando todos os produtos e os pedidos em que aparecem, inclusive produtos que nunca foram pedidos:

```sql
SELECT pr.nome AS produto, p.id AS pedido_id, p.total
FROM pedidos AS p
RIGHT JOIN produtos AS pr ON p.produto_id = pr.id;
```

```
produto   | pedido_id | total
----------+-----------+--------
Notebook  | 1         | 3500
Mouse     | 2         | 179.80
Teclado   | 3         | 199.90
Mesa      | 4         | 850
Cadeira   | 5         | 840
```

Se houvesse um produto que nunca foi pedido, ele apareceria com `NULL` nas colunas do pedido.

## RIGHT JOIN vs LEFT JOIN

Na prática, qualquer `RIGHT JOIN` pode ser reescrito como `LEFT JOIN` invertendo a ordem das tabelas. As duas queries abaixo são equivalentes:

```sql
-- Com RIGHT JOIN
SELECT pr.nome, p.total
FROM pedidos AS p
RIGHT JOIN produtos AS pr ON p.produto_id = pr.id;

-- Com LEFT JOIN (equivalente, só inverteu a ordem)
SELECT pr.nome, p.total
FROM produtos AS pr
LEFT JOIN pedidos AS p ON pr.id = p.produto_id;
```

> A maioria dos desenvolvedores prefere usar sempre `LEFT JOIN` e ajustar a ordem das tabelas. Isso mantém o padrão consistente no código. O `RIGHT JOIN` é válido, mas é bem menos usado no dia a dia.
