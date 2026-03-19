---
title: "SQL DELETE"
description: "Como remover registros de uma tabela com segurança usando o DELETE"
order: 12
---

# SQL DELETE

O `DELETE` remove registros de uma tabela. É simples — e exatamente por isso exige atenção redobrada.

## Sintaxe

```sql
DELETE FROM nome_da_tabela WHERE condição;
```

## Exemplo

```sql
-- Remove apenas o produto com id = 5
DELETE FROM produtos WHERE id = 5;
```

Quando possível, use o `id` no `WHERE` para garantir que apenas o registro correto seja removido.

## ⚠️ DELETE sem WHERE

Sem o `WHERE`, **todos os registros** da tabela são apagados — mas a estrutura da tabela permanece intacta:

```sql
-- PERIGO: apaga TODOS os registros
DELETE FROM produtos;
```

> Antes de executar um `DELETE`, rode um `SELECT` com a mesma condição para confirmar o que será removido.

## DELETE vs TRUNCATE vs DROP

| Comando      | O que faz                                                   |
|--------------|-------------------------------------------------------------|
| `DELETE`     | Remove registros específicos (com ou sem `WHERE`)           |
| `TRUNCATE`   | Remove **todos** os registros rapidamente, mantém a tabela  |
| `DROP TABLE` | Remove a tabela inteira — estrutura e dados                 |

```sql
TRUNCATE TABLE produtos;    -- esvazia a tabela
DROP TABLE produtos;        -- apaga a tabela permanentemente
```

## Soft delete — alternativa ao DELETE real

Muitos sistemas preferem "marcar" o registro como inativo em vez de apagá-lo de verdade, preservando o histórico:

```sql
-- Em vez de deletar, marca como inativo
UPDATE produtos SET ativo = FALSE WHERE id = 5;

-- Consultas filtram apenas os ativos
SELECT * FROM produtos WHERE ativo = TRUE;
```

Essa técnica é chamada de **exclusão lógica** e é muito usada em sistemas que precisam de auditoria ou histórico de dados.
