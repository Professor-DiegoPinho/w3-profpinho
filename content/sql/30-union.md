---
title: "SQL UNION"
description: "Como combinar o resultado de duas ou mais queries com o UNION"
order: 30
---

# SQL UNION

O `UNION` combina o resultado de **duas ou mais queries** em um único conjunto de dados. Ao contrário dos JOINs — que combinam colunas — o `UNION` combina **linhas**.

## Sintaxe

```sql
SELECT coluna1, coluna2 FROM tabela_a
UNION
SELECT coluna1, coluna2 FROM tabela_b;
```

## Regras

Para o `UNION` funcionar:
1. As duas queries devem retornar o **mesmo número de colunas**;
2. As colunas correspondentes devem ter **tipos compatíveis**;
3. Os nomes das colunas no resultado vêm da **primeira query**.

## Exemplo

Combinando listas de clientes de duas tabelas diferentes:

```sql
SELECT nome, cidade FROM clientes_brasil
UNION
SELECT nome, cidade FROM clientes_exterior;
```

O `UNION` remove automaticamente as **linhas duplicadas** do resultado.

## UNION ALL — mantendo duplicatas

Se quiser preservar todas as linhas, inclusive as repetidas, use `UNION ALL`:

```sql
SELECT nome FROM clientes_brasil
UNION ALL
SELECT nome FROM clientes_exterior;
```

> `UNION ALL` é mais rápido que `UNION`, pois não precisa verificar e remover duplicatas. Use-o sempre que souber que não há duplicatas ou quando precisar delas.

## ORDER BY com UNION

Coloque o `ORDER BY` apenas no **final**, depois do último `SELECT`:

```sql
SELECT nome, cidade FROM clientes_brasil
UNION
SELECT nome, cidade FROM clientes_exterior
ORDER BY nome ASC;
```

## Caso de uso comum

`UNION` é muito usado para consolidar dados de períodos, regiões ou sistemas diferentes em uma única visão:

```sql
-- Relatório consolidado de vendas de dois sistemas legados
SELECT data, valor, 'Sistema A' AS origem FROM vendas_sistema_a
UNION ALL
SELECT data, valor, 'Sistema B' AS origem FROM vendas_sistema_b
ORDER BY data;
```
