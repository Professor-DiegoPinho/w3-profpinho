---
title: "SQL UNIQUE"
description: "Como garantir que os valores de uma coluna não se repitam com a constraint UNIQUE"
order: 35
---

# SQL UNIQUE

A constraint `UNIQUE` garante que todos os valores de uma coluna sejam únicos nenhum registro pode ter o mesmo valor que outro na mesma coluna.

## Definindo UNIQUE

```sql
CREATE TABLE clientes (
  id    SERIAL PRIMARY KEY,
  nome  VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  cpf   VARCHAR(14)  UNIQUE
);
```

## O que acontece ao violar

```sql
INSERT INTO clientes (nome, email) VALUES ('Ana Souza', 'ana@email.com');

-- ERRO: email já existe
INSERT INTO clientes (nome, email) VALUES ('Ana Lima', 'ana@email.com');
```

```
ERROR: duplicate key value violates unique constraint "clientes_email_key"
```

## UNIQUE composto

Você pode exigir que a **combinação** de colunas seja única, mesmo que cada coluna individualmente se repita:

```sql
CREATE TABLE matriculas (
  aluno_id  INTEGER NOT NULL,
  curso_id  INTEGER NOT NULL,
  -- Um aluno pode se matricular em vários cursos,
  -- mas não pode ter duas matrículas no mesmo curso
  UNIQUE (aluno_id, curso_id)
);
```

## Nomeando a constraint

```sql
CREATE TABLE clientes (
  id    SERIAL PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  CONSTRAINT uq_clientes_email UNIQUE (email)
);
```

## Adicionando UNIQUE em tabela existente

```sql
ALTER TABLE clientes ADD CONSTRAINT uq_clientes_cpf UNIQUE (cpf);
```

## Removendo UNIQUE

```sql
ALTER TABLE clientes DROP CONSTRAINT uq_clientes_cpf;
```

## UNIQUE vs PRIMARY KEY

| Característica       | UNIQUE          | PRIMARY KEY         |
|----------------------|-----------------|---------------------|
| Aceita NULL?         | Sim (um por vez)| Não                 |
| Quantas por tabela?  | Várias          | Apenas uma          |
| Finalidade           | Unicidade geral | Identificador único |

> Use `UNIQUE` para campos que precisam ser únicos mas não são a chave principal da tabela — como e-mail, CPF, código de produto, número de matrícula.
