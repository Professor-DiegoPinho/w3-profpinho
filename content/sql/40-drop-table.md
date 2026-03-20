---
title: "SQL DROP TABLE"
description: "Como remover uma tabela do banco de dados com o DROP TABLE"
order: 40
---

# SQL DROP TABLE

O `DROP TABLE` remove uma tabela do banco de dados **permanentemente** — apaga a estrutura e todos os dados que ela contém.

## Sintaxe

```sql
DROP TABLE nome_da_tabela;
```

## Com verificação de existência

Para evitar erro caso a tabela não exista:

```sql
DROP TABLE IF EXISTS produtos;
```

## Removendo múltiplas tabelas de uma vez

```sql
DROP TABLE IF EXISTS itens_pedido, pedidos, clientes;
```

> Quando há foreign keys entre tabelas, você precisa remover primeiro as tabelas dependentes (ou usar `CASCADE`).

## DROP TABLE CASCADE

Remove a tabela e automaticamente apaga também as constraints que referenciam ela:

```sql
DROP TABLE clientes CASCADE;
```

Use com cuidado — isso pode impactar outras tabelas que dependem da que está sendo removida.

## DROP TABLE vs TRUNCATE vs DELETE

| Comando        | Remove dados? | Remove a tabela? | Usa WHERE? |
|----------------|---------------|------------------|------------|
| `DELETE`       | Sim           | Não              | Sim        |
| `TRUNCATE`     | Sim (tudo)    | Não              | Não        |
| `DROP TABLE`   | Sim (tudo)    | **Sim**          | Não        |

```sql
DELETE FROM produtos WHERE estoque = 0;    -- remove registros específicos
TRUNCATE TABLE produtos;                   -- esvazia a tabela (mantém estrutura)
DROP TABLE produtos;                       -- apaga a tabela inteira
```

> `DROP TABLE` é irreversível. Sempre verifique duas vezes antes de executar, especialmente em ambiente de produção. Ter um backup recente é fundamental.
