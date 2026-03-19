---
title: "SQL AVG"
description: "Como calcular a média de valores numéricos com a função AVG"
order: 20
---

# SQL AVG

A função `AVG` calcula a **média aritmética** dos valores de uma coluna numérica.

## Sintaxe

```sql
SELECT AVG(coluna) FROM nome_da_tabela;
```

## Exemplo

```sql
-- Preço médio de todos os produtos
SELECT AVG(preco) AS preco_medio FROM produtos;
```

```
preco_medio
------------------
1011.760000000000
```

O banco geralmente retorna muitas casas decimais. Use `ROUND` para arredondar:

```sql
SELECT ROUND(AVG(preco), 2) AS preco_medio FROM produtos;
```

```
preco_medio
-----------
1011.76
```

## AVG com WHERE

```sql
-- Preço médio apenas dos produtos de Eletrônicos
SELECT ROUND(AVG(preco), 2) AS media_eletronicos
FROM produtos
WHERE categoria = 'Eletrônicos';
```

## Funções de arredondamento

| Função         | Comportamento                         |
|----------------|---------------------------------------|
| `ROUND(x, n)` | Arredonda para `n` casas decimais     |
| `CEIL(x)`     | Arredonda sempre para cima            |
| `FLOOR(x)`    | Arredonda sempre para baixo           |

## NULL é ignorado

Se uma coluna tem valores `NULL`, eles não entram nem no numerador nem no denominador:

- Preços: 100, 200, NULL, 300
- Média: (100 + 200 + 300) / 3 = **200** — o NULL não é contado como zero

> Se precisar tratar `NULL` como zero no cálculo, use `COALESCE(coluna, 0)` antes de calcular a média.
