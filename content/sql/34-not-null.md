---
title: "SQL NOT NULL"
description: "Como garantir que uma coluna sempre tenha valor com a constraint NOT NULL"
order: 34
---

# SQL NOT NULL

A constraint `NOT NULL` impede que uma coluna aceite valores nulos. Use em campos que são obrigatórios para o registro fazer sentido.

## Definindo NOT NULL

```sql
CREATE TABLE clientes (
  id    SERIAL PRIMARY KEY,
  nome  VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  telefone VARCHAR(20)   -- opcional: aceita NULL
);
```

## O que acontece ao violar

```sql
-- ERRO: nome não pode ser NULL
INSERT INTO clientes (nome, email) VALUES (NULL, 'ana@email.com');
```

```
ERROR: null value in column "nome" violates not-null constraint
```

## Adicionando NOT NULL em tabela existente

```sql
ALTER TABLE clientes ALTER COLUMN email SET NOT NULL;
```

## Removendo NOT NULL

```sql
ALTER TABLE clientes ALTER COLUMN email DROP NOT NULL;
```

## NOT NULL vs DEFAULT

As duas constraints são complementares:

- `NOT NULL` — o campo precisa ter um valor, mas você deve informá-lo;
- `DEFAULT` — se não informar, o banco preenche automaticamente com o valor padrão.

Combinando as duas:

```sql
CREATE TABLE pedidos (
  id      SERIAL PRIMARY KEY,
  status  VARCHAR(20) NOT NULL DEFAULT 'pendente',
  total   DECIMAL(10, 2) NOT NULL
);
```

Aqui, `status` não pode ser nulo e já tem um valor padrão caso não seja informado. `total` também não pode ser nulo, mas não tem padrão — você é obrigado a informar.

> Defina `NOT NULL` em todas as colunas que fazem parte da identidade ou das regras de negócio do registro. Campos verdadeiramente opcionais podem ficar sem a constraint.
