---
title: "SQL PRIMARY KEY"
description: "Como definir a chave primária de uma tabela com a constraint PRIMARY KEY"
order: 36
---

# SQL PRIMARY KEY

A `PRIMARY KEY` identifica cada registro de uma tabela de forma **única e inequívoca**. Ela combina automaticamente `NOT NULL + UNIQUE`. Nenhum valor pode se repetir e nenhum pode ser nulo.

Cada tabela pode ter apenas **uma** chave primária.

## Definindo PRIMARY KEY

```sql
CREATE TABLE produtos (
  id       SERIAL PRIMARY KEY,
  nome     VARCHAR(150) NOT NULL,
  preco    DECIMAL(10, 2)
);
```

O tipo `SERIAL` (PostgreSQL) cria um inteiro que se incrementa automaticamente você não precisa gerenciar o valor do `id` manualmente.

No MySQL, o equivalente é `INT AUTO_INCREMENT`:

```sql
CREATE TABLE produtos (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  nome  VARCHAR(150) NOT NULL
);
```

## PRIMARY KEY composta

Em alguns casos, a chave primária é formada pela combinação de duas ou mais colunas:

```sql
CREATE TABLE itens_pedido (
  pedido_id   INTEGER NOT NULL,
  produto_id  INTEGER NOT NULL,
  quantidade  INTEGER NOT NULL,
  PRIMARY KEY (pedido_id, produto_id)
);
```

Aqui, um produto pode aparecer em vários pedidos e um pedido pode ter vários produtos, mas a combinação `pedido_id + produto_id` precisa ser única.

## Adicionando PRIMARY KEY em tabela existente

```sql
ALTER TABLE produtos ADD PRIMARY KEY (id);
```

## Por que usar SERIAL / AUTO_INCREMENT?

Sem auto-incremento, você precisaria gerenciar os IDs manualmente e qualquer descuido pode causar duplicatas ou conflitos. Com `SERIAL`, o banco garante que cada novo registro receba um ID único automaticamente.

> Escolha valores estáveis como chave primária. IDs numéricos auto-incrementais são a escolha mais comum e segura para a maioria dos casos.
