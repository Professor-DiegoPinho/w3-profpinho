---
title: "SQL Funções de String"
description: "Como manipular texto com as principais funções de string do SQL"
order: 43
---

# SQL Funções de String

O SQL oferece várias funções para manipular texto diretamente nas consultas. Veja as mais usadas.

## UPPER e LOWER — maiúsculas e minúsculas

```sql
SELECT UPPER(nome) AS nome_maiusculo FROM clientes;
SELECT LOWER(email) AS email_minusculo FROM clientes;
```

```
nome_maiusculo
--------------
ANA SOUZA
PEDRO LIMA
```

Muito útil para comparações sem distinção de maiúsculas:

```sql
SELECT * FROM clientes WHERE LOWER(nome) = 'ana souza';
```

## LENGTH — tamanho do texto

```sql
SELECT nome, LENGTH(nome) AS tamanho FROM clientes;
```

| nome       | tamanho |
|------------|---------|
| Ana Souza  | 9       |
| Pedro Lima | 10      |

## TRIM, LTRIM e RTRIM — removendo espaços

```sql
SELECT TRIM('  olá mundo  ');    -- 'olá mundo'
SELECT LTRIM('  olá mundo  ');   -- 'olá mundo  '  (remove só à esquerda)
SELECT RTRIM('  olá mundo  ');   -- '  olá mundo'  (remove só à direita)
```

## SUBSTRING — trecho do texto

```sql
-- A partir da posição 1, pega 3 caracteres
SELECT SUBSTRING(nome, 1, 3) AS iniciais FROM clientes;
```

| iniciais |
|----------|
| Ana      |
| Ped      |

## REPLACE — substituindo texto

```sql
SELECT REPLACE(nome, 'Souza', 'Santos') FROM clientes;
-- 'Ana Souza' vira 'Ana Santos'
```

## CONCAT — concatenando texto

```sql
SELECT CONCAT(nome, ' - ', cidade) AS identificacao FROM clientes;
```

| identificacao            |
|--------------------------|
| Ana Souza - São Paulo    |
| Pedro Lima - Lisboa      |

No PostgreSQL você também pode usar o operador `||`:

```sql
SELECT nome || ' - ' || cidade AS identificacao FROM clientes;
```

> A maioria dessas funções pode ser usada no `SELECT`, no `WHERE` e no `ORDER BY`.
