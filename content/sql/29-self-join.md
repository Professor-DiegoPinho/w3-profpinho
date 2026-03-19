---
title: "SQL Self Join"
description: "Como unir uma tabela com ela mesma para encontrar relações internas"
order: 29
---

# SQL Self Join

Um Self Join é quando você une **uma tabela com ela mesma**. Parece estranho à primeira vista, mas é muito útil quando os registros de uma tabela se relacionam entre si.

## Quando usar?

O exemplo clássico é uma tabela de funcionários onde cada funcionário tem um campo `gerente_id` que aponta para outro funcionário da mesma tabela:

**Tabela `funcionarios`:**

| id | nome         | cargo    | gerente_id |
|----|--------------|----------|------------|
| 1  | Carlos Silva | Diretor  | NULL       |
| 2  | Ana Souza    | Gerente  | 1          |
| 3  | Pedro Lima   | Analista | 2          |
| 4  | Carla Mendes | Analista | 2          |

## Sintaxe

Como a mesma tabela é usada duas vezes, os **aliases são obrigatórios**:

```sql
SELECT a.nome AS funcionario, b.nome AS gerente
FROM funcionarios AS a
INNER JOIN funcionarios AS b ON a.gerente_id = b.id;
```

```
funcionario   | gerente
--------------+--------------
Ana Souza     | Carlos Silva
Pedro Lima    | Ana Souza
Carla Mendes  | Ana Souza
```

Carlos Silva não aparece porque o `gerente_id` dele é `NULL` — sem par no `INNER JOIN`.

## Incluindo quem não tem gerente

Use `LEFT JOIN` para incluir registros sem correspondência:

```sql
SELECT a.nome AS funcionario, b.nome AS gerente
FROM funcionarios AS a
LEFT JOIN funcionarios AS b ON a.gerente_id = b.id;
```

```
funcionario   | gerente
--------------+--------------
Carlos Silva  | NULL
Ana Souza     | Carlos Silva
Pedro Lima    | Ana Souza
Carla Mendes  | Ana Souza
```

## Outros casos de uso

O Self Join aparece sempre que uma tabela tem relacionamentos internos:

- Categorias e subcategorias;
- Produtos com produto "pai";
- Hierarquias organizacionais;
- Redes de referência (quem indicou quem).

> O Self Join não tem uma sintaxe especial — é apenas um JOIN normal onde as duas tabelas são a mesma. A chave é usar aliases diferentes para distingui-las.
