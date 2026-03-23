---
title: "SQL SELECT"
description: "Como consultar dados de uma tabela com o comando SELECT"
order: 3
---

# SQL SELECT

O `SELECT` é o comando mais usado no SQL. Com ele você define **o que** buscar e **de onde**.

## Sintaxe

```sql
SELECT coluna1, coluna2 FROM nome_da_tabela;
```

## Selecionando colunas específicas

Considere a tabela `produtos`:

| id | nome     | categoria   | preco  | estoque |
|----|----------|-------------|--------|---------|
| 1  | Notebook | Eletrônicos | 3500   | 10      |
| 2  | Mouse    | Eletrônicos | 89.90  | 150     |
| 3  | Teclado  | Eletrônicos | 199.90 | 75      |
| 4  | Mesa     | Móveis      | 850    | 20      |

```sql
SELECT nome, preco FROM produtos;
```

Resultado:

| nome     | preco  |
|----------|--------|
| Notebook | 3500   |
| Mouse    | 89.90  |
| Teclado  | 199.90 |
| Mesa     | 850    |

## Selecionando todas as colunas

Use `*` para retornar todas as colunas de uma vez:

```sql
SELECT * FROM produtos;
```

> O `SELECT *` é ótimo para exploração rápida, mas evite usá-lo em produção. Ele traz mais dados do que o necessário e pode impactar a performance.

## Alias com AS

O `AS` cria um apelido para a coluna **apenas no resultado** — a tabela não é alterada:

```sql
SELECT nome AS produto, preco AS valor FROM produtos;
```

| produto  | valor  |
|----------|--------|
| Notebook | 3500   |
| Mouse    | 89.90  |

## Expressões no SELECT

Você pode incluir cálculos diretamente:

```sql
SELECT nome, preco, preco * 1.1 AS preco_com_imposto FROM produtos;
```

## SELECT DISTINCT

Remove valores duplicados do resultado:

```sql
SELECT DISTINCT categoria FROM produtos;
```

| categoria   |
|-------------|
| Eletrônicos |
| Móveis      |

Com múltiplas colunas, o `DISTINCT` considera a combinação de todas elas e não apenas cada coluna individualmente.
