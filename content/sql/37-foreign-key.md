---
title: "SQL FOREIGN KEY"
description: "Como criar relacionamentos entre tabelas com a constraint FOREIGN KEY"
order: 37
---

# SQL FOREIGN KEY

A `FOREIGN KEY` (chave estrangeira) cria um vínculo entre duas tabelas. Ela garante que o valor de uma coluna exista na tabela referenciada — impedindo referências inválidas.

## Definindo FOREIGN KEY

```sql
CREATE TABLE pedidos (
  id          SERIAL PRIMARY KEY,
  cliente_id  INTEGER NOT NULL REFERENCES clientes(id),
  total       DECIMAL(10, 2),
  status      VARCHAR(20)
);
```

Com isso, o banco impede a inserção de um pedido com um `cliente_id` que não existe na tabela `clientes`.

## O que acontece ao violar

```sql
-- ERRO: cliente com id=999 não existe
INSERT INTO pedidos (cliente_id, total) VALUES (999, 350.00);
```

```
ERROR: insert or update on table "pedidos" violates foreign key constraint
DETAIL: Key (cliente_id)=(999) is not present in table "clientes".
```

## Sintaxe com nome personalizado

```sql
CREATE TABLE pedidos (
  id         SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  CONSTRAINT fk_pedidos_cliente
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
```

Nomear a constraint facilita identificar o erro quando ele ocorrer.

## Comportamento ao deletar — ON DELETE

O que acontece com os pedidos quando o cliente é deletado?

```sql
-- Impede a deleção do cliente enquanto houver pedidos (padrão)
REFERENCES clientes(id) ON DELETE RESTRICT

-- Deleta os pedidos junto com o cliente
REFERENCES clientes(id) ON DELETE CASCADE

-- Define NULL no pedido quando o cliente é deletado
REFERENCES clientes(id) ON DELETE SET NULL
```

## Adicionando FOREIGN KEY em tabela existente

```sql
ALTER TABLE pedidos
ADD CONSTRAINT fk_pedidos_cliente
FOREIGN KEY (cliente_id) REFERENCES clientes(id);
```

## Removendo FOREIGN KEY

```sql
ALTER TABLE pedidos DROP CONSTRAINT fk_pedidos_cliente;
```

> A `FOREIGN KEY` é o mecanismo que torna o banco verdadeiramente "relacional". Sem ela, nada impede que seus dados fiquem inconsistentes entre tabelas.
