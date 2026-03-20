---
title: "SQL Constraints"
description: "O que são constraints e como elas garantem a integridade dos dados"
order: 33
---

# SQL Constraints

Constraints (restrições) são regras aplicadas às colunas de uma tabela para garantir que os dados inseridos sejam **válidos e consistentes**. Elas previnem problemas antes que aconteçam e são fundamentais para manter a integridade do banco de dados.

## Por que usar constraints?

Sem constraints, o banco aceita qualquer coisa:

```sql
-- Sem constraints, isso seria aceito sem reclamar
INSERT INTO clientes (nome, email) VALUES (NULL, NULL);
INSERT INTO clientes (nome, email) VALUES ('Ana', 'email-ja-cadastrado');
```

Com constraints, o banco impede dados incoerentes automaticamente.

## As principais constraints

| Constraint    | O que garante                                    |
|---------------|--------------------------------------------------|
| `NOT NULL`    | O campo não pode ficar em branco                 |
| `UNIQUE`      | Os valores da coluna não podem se repetir        |
| `PRIMARY KEY` | Identifica cada registro de forma única (NOT NULL + UNIQUE) |
| `FOREIGN KEY` | Garante que a referência a outra tabela seja válida |
| `DEFAULT`     | Define um valor padrão quando nenhum é informado |
| `CHECK`       | Valida uma condição antes de salvar              |

## Como definir constraints

Constraints podem ser definidas **inline** (junto com a coluna) ou como **declarações separadas** ao final da criação da tabela:

```sql
CREATE TABLE produtos (
  -- Inline
  id       SERIAL PRIMARY KEY,
  nome     VARCHAR(150) NOT NULL,
  preco    DECIMAL(10, 2) NOT NULL CHECK (preco > 0),
  estoque  INTEGER DEFAULT 0,

  -- Declaração separada (útil para constraints compostas)
  UNIQUE (nome, categoria)
);
```

## Nomeando constraints

O banco gera nomes automáticos para as constraints, mas você pode definir nomes personalizados com `CONSTRAINT`. Isso facilita identificar o problema quando um erro ocorre:

```sql
CREATE TABLE clientes (
  id    SERIAL PRIMARY KEY,
  email VARCHAR(150),
  CONSTRAINT uq_cliente_email UNIQUE (email)
);
```

Quando a constraint for violada, a mensagem de erro citará `uq_cliente_email`, o que é muito mais claro do que um nome gerado automaticamente.

> Nas próximas páginas veremos cada constraint em detalhe, com exemplos de uso e os erros que elas previnem.
