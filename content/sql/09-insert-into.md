---
title: "SQL INSERT INTO"
description: "Como inserir novos registros em uma tabela com o comando INSERT INTO"
order: 9
---

# SQL INSERT INTO

O `INSERT INTO` adiciona novos registros a uma tabela.

## Sintaxe

```sql
INSERT INTO nome_da_tabela (coluna1, coluna2, coluna3)
VALUES (valor1, valor2, valor3);
```

## Exemplo

```sql
INSERT INTO produtos (nome, categoria, preco, estoque)
VALUES ('Monitor', 'Eletrônicos', 1200, 30);
```

Os valores devem seguir exatamente a mesma ordem das colunas listadas.

## Tipos de dados e aspas

- **Texto** → entre aspas simples: `'Eletrônicos'`
- **Números** → sem aspas: `1200`, `30`
- **Datas** → aspas simples no formato `YYYY-MM-DD`: `'2024-03-15'`

## Inserindo múltiplos registros

Você pode inserir várias linhas em um único comando:

```sql
INSERT INTO produtos (nome, categoria, preco, estoque)
VALUES
  ('Monitor', 'Eletrônicos', 1200, 30),
  ('Suporte', 'Acessórios', 89, 60),
  ('Webcam', 'Eletrônicos', 249, 45);
```

> Se qualquer uma das linhas tiver erro, **nenhuma** será inserida — o `INSERT` é tratado como uma operação única.

## Omitindo colunas

Você pode omitir colunas que têm valor padrão ou aceitam `NULL`:

```sql
-- "estoque" será NULL ou usará o DEFAULT definido na tabela
INSERT INTO produtos (nome, categoria, preco)
VALUES ('Headset', 'Eletrônicos', 179.90);
```

## Consultando o id gerado

Se a tabela usa `AUTO_INCREMENT` ou `SERIAL` no id, use `RETURNING` (PostgreSQL) para ver o valor gerado:

```sql
INSERT INTO produtos (nome, categoria, preco)
VALUES ('Headset', 'Eletrônicos', 179.90)
RETURNING id;
```
