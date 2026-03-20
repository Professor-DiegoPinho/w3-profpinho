---
title: "SQL CREATE TABLE"
description: "Como criar tabelas e definir tipos de dados no SQL"
order: 32
---

# SQL CREATE TABLE

O `CREATE TABLE` cria uma nova tabela no banco de dados, definindo suas colunas e os tipos de dado de cada uma.

## Sintaxe

```sql
CREATE TABLE nome_da_tabela (
  coluna1 TIPO_DE_DADO [restrições],
  coluna2 TIPO_DE_DADO [restrições],
  ...
);
```

## Exemplo completo

```sql
CREATE TABLE produtos (
  id        SERIAL PRIMARY KEY,
  nome      VARCHAR(150) NOT NULL,
  categoria VARCHAR(100),
  preco     DECIMAL(10, 2) NOT NULL,
  estoque   INTEGER DEFAULT 0,
  ativo     BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMP DEFAULT NOW()
);
```

## Tipos de dados mais comuns

| Tipo              | Uso                                              |
|-------------------|--------------------------------------------------|
| `INTEGER` / `INT` | Números inteiros                                 |
| `SERIAL`          | Inteiro auto-incremental (ideal para `id`)       |
| `DECIMAL(p, s)`   | Número com casas decimais. ex: `DECIMAL(10, 2)` |
| `VARCHAR(n)`      | Texto com limite de `n` caracteres               |
| `TEXT`            | Texto longo sem limite definido                  |
| `BOOLEAN`         | Verdadeiro ou falso                              |
| `DATE`            | Data no formato `YYYY-MM-DD`                     |
| `TIMESTAMP`       | Data e hora                                      |

## Constraints na criação

```sql
CREATE TABLE clientes (
  id     SERIAL PRIMARY KEY,
  nome   VARCHAR(100) NOT NULL,
  email  VARCHAR(150) UNIQUE NOT NULL,
  idade  INTEGER CHECK (idade >= 18),
  pais   VARCHAR(50) DEFAULT 'Brasil'
);
```

| Constraint      | Função                                       |
|-----------------|----------------------------------------------|
| `NOT NULL`      | O campo não pode ficar em branco             |
| `UNIQUE`        | Os valores não podem se repetir              |
| `PRIMARY KEY`   | Identifica o registro de forma única         |
| `CHECK`         | Valida uma condição antes de salvar          |
| `DEFAULT`       | Define um valor padrão quando omitido        |
| `REFERENCES`    | Cria uma chave estrangeira                   |

## Verificando a tabela criada

```sql
SELECT * FROM produtos;
```

Se a tabela estiver vazia, o resultado não terá linhas, mas as colunas aparecerão, confirmando que a criação foi bem-sucedida.

> Evite nomes de tabelas e colunas com acentos ou espaços. Prefira underscore: `data_nascimento`, `nome_completo`.
