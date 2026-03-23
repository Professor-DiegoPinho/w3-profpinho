---
title: "SQL Indexes"
description: "Como usar índices para acelerar consultas no banco de dados"
order: 41
---

# SQL Indexes

Um índice é uma estrutura de dados auxiliar que o banco cria para acelerar a busca de registros. Funciona como o índice de um livro. Ao invés de ler página por página, você vai direto ao que precisa.

## Por que usar índices?

Sem índice, o banco precisa varrer a tabela inteira para encontrar os registros que atendem à condição do `WHERE`. Em tabelas grandes, isso é lento. Com um índice na coluna certa, a busca é muito mais rápida.

## Criando um índice

```sql
-- Índice simples em uma coluna
CREATE INDEX idx_produtos_categoria ON produtos (categoria);

-- Índice em múltiplas colunas
CREATE INDEX idx_pedidos_cliente_status ON pedidos (cliente_id, status);
```

Por convenção, o nome do índice começa com `idx_` seguido do nome da tabela e da coluna.

## Quando o índice é usado automaticamente

O banco decide sozinho quando usar o índice. Ele costuma ser aplicado quando:

```sql
-- Filtros no WHERE
SELECT * FROM produtos WHERE categoria = 'Eletrônicos';

-- Condições em JOINs
SELECT * FROM pedidos AS p
INNER JOIN clientes AS c ON p.cliente_id = c.id;

-- Ordenação com ORDER BY
SELECT * FROM produtos ORDER BY categoria;
```

## Índice único

Além de acelerar as buscas, um índice único impede valores duplicados. Funciona de forma parecida com a constraint `UNIQUE`:

```sql
CREATE UNIQUE INDEX idx_clientes_email ON clientes (email);
```

## Verificando os índices existentes (PostgreSQL)

```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'produtos';
```

## Removendo um índice

```sql
DROP INDEX idx_produtos_categoria;
DROP INDEX IF EXISTS idx_produtos_categoria;
```

## Cuidados com índices

Índices **aceleram leituras**, mas **têm custo em escritas**. Cada `INSERT`, `UPDATE` e `DELETE` precisa atualizar também os índices da tabela. Por isso:

- Não indexe tudo indiscriminadamente;
- Priorize colunas usadas frequentemente em `WHERE`, `JOIN` e `ORDER BY`;
- Colunas com poucos valores distintos (como `ativo = true/false`) raramente se beneficiam de índice.

> Primary Keys e colunas com `UNIQUE` já criam índices automaticamente, ou seja, você não precisa criá-los manualmente nesses casos.
