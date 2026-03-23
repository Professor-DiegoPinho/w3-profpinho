---
title: "SQL ALTER TABLE"
description: "Como modificar a estrutura de uma tabela existente com o ALTER TABLE"
order: 39
---

# SQL ALTER TABLE

O `ALTER TABLE` modifica a estrutura de uma tabela já existente sem perder os dados que já estão nela. É usado para adicionar, remover ou renomear colunas e constraints.

## Adicionar uma coluna

```sql
ALTER TABLE produtos ADD COLUMN descricao TEXT;
ALTER TABLE clientes ADD COLUMN telefone VARCHAR(20);
```

A nova coluna será criada com `NULL` em todos os registros existentes, a menos que você defina um `DEFAULT`.

## Remover uma coluna

```sql
ALTER TABLE produtos DROP COLUMN descricao;
```

> Remover uma coluna apaga permanentemente todos os dados daquela coluna. Não tem desfazer.

## Renomear uma coluna

```sql
ALTER TABLE produtos RENAME COLUMN preco TO valor;
```

## Alterar o tipo de uma coluna

```sql
ALTER TABLE produtos ALTER COLUMN estoque TYPE BIGINT;
```

Só é possível se os dados existentes forem compatíveis com o novo tipo.

## Adicionar e remover constraints

```sql
-- NOT NULL
ALTER TABLE produtos ALTER COLUMN nome SET NOT NULL;
ALTER TABLE produtos ALTER COLUMN nome DROP NOT NULL;

-- DEFAULT
ALTER TABLE pedidos ALTER COLUMN status SET DEFAULT 'pendente';
ALTER TABLE pedidos ALTER COLUMN status DROP DEFAULT;

-- UNIQUE
ALTER TABLE clientes ADD CONSTRAINT uq_email UNIQUE (email);
ALTER TABLE clientes DROP CONSTRAINT uq_email;

-- FOREIGN KEY
ALTER TABLE pedidos
  ADD CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id);
ALTER TABLE pedidos DROP CONSTRAINT fk_cliente;
```

## Renomear a tabela

```sql
ALTER TABLE produtos RENAME TO itens;
```
