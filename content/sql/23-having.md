---
title: "SQL HAVING"
description: "Como filtrar grupos após a agregação com a cláusula HAVING"
order: 23
---

# SQL HAVING

O `HAVING` filtra **grupos** criados pelo `GROUP BY`. Ele funciona como um `WHERE`, mas é avaliado depois da agregação, o que significa que pode usar funções como `COUNT`, `SUM`, `AVG`, etc.

## Por que não usar WHERE?

O `WHERE` é avaliado **antes** do agrupamento, então não pode referenciar funções agregadoras:

```sql
-- ERRADO: causará erro
SELECT categoria, COUNT(*) FROM produtos
WHERE COUNT(*) > 1
GROUP BY categoria;
```

Use `HAVING` para filtrar após o agrupamento:

```sql
-- CORRETO
SELECT categoria, COUNT(*) AS total
FROM produtos
GROUP BY categoria
HAVING COUNT(*) > 1;
```

## Sintaxe

```sql
SELECT coluna, FUNCAO(outra_coluna)
FROM nome_da_tabela
GROUP BY coluna
HAVING FUNCAO(outra_coluna) condição;
```

## Exemplo

Categorias com preço médio acima de 300:

```sql
SELECT categoria, ROUND(AVG(preco), 2) AS preco_medio
FROM produtos
GROUP BY categoria
HAVING AVG(preco) > 300;
```

```
categoria    | preco_medio
-------------+------------
Eletrônicos  | 1263.27
Móveis       | 635.00
```

## WHERE e HAVING juntos

Os dois podem aparecer na mesma query, cada um no seu momento:

```sql
-- Clientes ativos com mais de 1 pedido concluído
SELECT cliente_id, COUNT(*) AS pedidos_concluidos
FROM pedidos
WHERE status = 'concluido'       -- filtra antes de agrupar
GROUP BY cliente_id
HAVING COUNT(*) > 1;             -- filtra depois de agrupar
```

## WHERE vs HAVING: resumo

| Cláusula | Quando age         | Pode usar funções agregadoras? |
|----------|--------------------|-------------------------------|
| `WHERE`  | Antes do GROUP BY  | Não                           |
| `HAVING` | Depois do GROUP BY | Sim                           |
