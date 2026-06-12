---
id: "ba3afa426b21"
title: "SQL BETWEEN"
description: "Como filtrar valores dentro de um intervalo com o operador BETWEEN"
order: 15
---

# SQL BETWEEN

O operador `BETWEEN` filtra registros cujo valor está dentro de um intervalo. Ele é **inclusivo** nos dois extremos, ou seja, os valores dos limites também entram no resultado.

## Sintaxe

```sql
SELECT coluna1, coluna2
FROM nome_da_tabela
WHERE coluna BETWEEN valor_inicial AND valor_final;
```

## Exemplo com números

```sql
-- Produtos com preço entre 100 e 500 (inclusive)
SELECT nome, preco FROM produtos
WHERE preco BETWEEN 100 AND 500;
```

| nome    | preco  |
|---------|--------|
| Teclado | 199.90 |
| Cadeira | 420    |

## Exemplo com datas

```sql
-- Pedidos feitos no primeiro trimestre de 2024
SELECT id, total FROM pedidos
WHERE data_pedido BETWEEN '2024-01-01' AND '2024-03-31';
```

## NOT BETWEEN

Para buscar valores **fora** do intervalo:

```sql
-- Produtos com preço abaixo de 100 ou acima de 500
SELECT nome, preco FROM produtos
WHERE preco NOT BETWEEN 100 AND 500;
```

## BETWEEN vs operadores de comparação

As duas formas são equivalentes. Use a que deixar o código mais legível:

```sql
-- Com BETWEEN
WHERE preco BETWEEN 100 AND 500

-- Com operadores de comparação
WHERE preco >= 100 AND preco <= 500
```

> Com datas, o `BETWEEN` é especialmente útil para definir períodos como semanas, meses ou trimestres de forma clara e concisa.
