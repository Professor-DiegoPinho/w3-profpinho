---
title: "SQL NOT"
description: "Como negar condições no WHERE com o operador NOT"
order: 7
---

# SQL NOT

O operador `NOT` **inverte** uma condição. Se algo seria verdadeiro, o `NOT` o torna falso — e vice-versa.

## Sintaxe

```sql
SELECT coluna1, coluna2
FROM nome_da_tabela
WHERE NOT condição;
```

## Exemplo

```sql
-- Todos os produtos que NÃO são da categoria Eletrônicos
SELECT nome, categoria
FROM produtos
WHERE NOT categoria = 'Eletrônicos';
```

| nome    | categoria |
|---------|-----------|
| Mesa    | Móveis    |
| Cadeira | Móveis    |

Equivalente a usar `!=`:

```sql
WHERE categoria != 'Eletrônicos'
```

## NOT com outros operadores

O `NOT` funciona bem combinado com `BETWEEN`, `LIKE` e `IN`:

```sql
-- Produtos com preço FORA do intervalo 100–500
SELECT nome, preco FROM produtos
WHERE preco NOT BETWEEN 100 AND 500;

-- Produtos cujo nome NÃO começa com "M"
SELECT nome FROM produtos
WHERE nome NOT LIKE 'M%';

-- Pedidos que NÃO estão nem pendentes nem cancelados
SELECT * FROM pedidos
WHERE status NOT IN ('pendente', 'cancelado');
```

## NOT com expressões compostas

Use parênteses para negar um bloco inteiro de condições:

```sql
-- Produtos que NÃO são (Eletrônicos com preço abaixo de 200)
SELECT nome, categoria, preco
FROM produtos
WHERE NOT (categoria = 'Eletrônicos' AND preco < 200);
```
