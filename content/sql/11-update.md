---
id: "3ef842c1e9c2"
title: "SQL UPDATE"
description: "Como atualizar dados existentes em uma tabela com o comando UPDATE"
order: 11
---

# SQL UPDATE

O `UPDATE` modifica registros que já existem em uma tabela.

## Sintaxe

```sql
UPDATE nome_da_tabela
SET coluna1 = valor1, coluna2 = valor2
WHERE condição;
```

## Exemplo

```sql
-- Corrigindo o preço do produto com id = 2
UPDATE produtos SET preco = 79.90 WHERE id = 2;
```

## Atualizando múltiplas colunas

Separe as colunas por vírgula no `SET`:

```sql
UPDATE produtos
SET preco = 79.90, estoque = 200
WHERE id = 2;
```

## Atualizando múltiplos registros

O `WHERE` pode atingir mais de uma linha:

```sql
-- Zerar estoque de todos os produtos cancelados
UPDATE produtos SET estoque = 0 WHERE categoria = 'Descontinuado';
```

## ⚠️ UPDATE sem WHERE

Sem a cláusula `WHERE`, **todos os registros** da tabela são atualizados:

```sql
-- PERIGO: atualiza TODOS os produtos
UPDATE produtos SET estoque = 0;
```

Imagine atualizar o preço de um produto e perceber depois que todos os preços da tabela foram alterados. Dependendo da situação, isso pode ser irreversível.

{% toggle "Dica: teste com SELECT antes de atualizar" %}
Antes de executar o `UPDATE`, rode um `SELECT` com a mesma condição:

```sql
-- Veja quais registros serão afetados
SELECT * FROM produtos WHERE id = 2;

-- Só então execute o UPDATE
UPDATE produtos SET preco = 79.90 WHERE id = 2;
```
{% endtoggle %}
