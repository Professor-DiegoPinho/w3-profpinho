---
id: "7601aec44b00"
title: "SQL DEFAULT"
description: "Como definir valores padrão para colunas com a constraint DEFAULT"
order: 38
---

# SQL DEFAULT

A constraint `DEFAULT` define um valor padrão para uma coluna. Quando um registro é inserido sem informar aquela coluna, o banco preenche automaticamente com o valor definido.

## Definindo DEFAULT

```sql
CREATE TABLE pedidos (
  id         SERIAL PRIMARY KEY,
  status     VARCHAR(20)    DEFAULT 'pendente',
  criado_em  TIMESTAMP      DEFAULT NOW(),
  ativo      BOOLEAN        DEFAULT TRUE,
  desconto   DECIMAL(5, 2)  DEFAULT 0
);
```

## Como funciona na prática

```sql
-- Inserindo sem informar as colunas com DEFAULT
INSERT INTO pedidos (total) VALUES (350.00);

-- O registro será criado com:
-- status    = 'pendente'
-- criado_em = data/hora atual
-- ativo     = true
-- desconto  = 0
```

## Valores dinâmicos como DEFAULT

Além de valores fixos, você pode usar funções como valor padrão:

```sql
criado_em  TIMESTAMP DEFAULT NOW()       -- data e hora atual
atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
uuid_col   UUID      DEFAULT gen_random_uuid()  -- PostgreSQL
```

## Adicionando DEFAULT em tabela existente

```sql
ALTER TABLE produtos ALTER COLUMN estoque SET DEFAULT 0;
```

## Removendo DEFAULT

```sql
ALTER TABLE produtos ALTER COLUMN estoque DROP DEFAULT;
```

## DEFAULT vs NOT NULL

As duas trabalham bem juntas:

```sql
status VARCHAR(20) NOT NULL DEFAULT 'pendente'
```

Isso garante que `status` nunca seja `NULL` (obrigatoriedade) e que tenha o valor `'pendente'` quando não informado (conveniência).

> `DEFAULT` é especialmente útil para campos de auditoria como `criado_em`, `atualizado_em` e `ativo` — que quase sempre têm um valor padrão sensato.
