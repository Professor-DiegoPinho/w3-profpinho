---
id: "832aa1a83735"
title: "Operadores para buscas - Parte 2"
description: "Aprenda a utilizar operadores de busca em consultas SQL para filtrar e refinar os resultados retornados por uma consulta."
order: 8
---

# Videoaula
{% embed https://www.youtube.com/embed/PdPoQMlfzG4 %}

# Compilado(s)

## Operadores para buscas

Vamos supor que seja necessário busca os alunos que tenham entre 20 e 25 anos. A palavra “entre” em inglês é `BETWEEN` e este também é um operador que podemos usar nas buscas:

```sql
SELECT * 
FROM alunos
WHERE idade BETWEEN 20 and 25; -- equivale a idade >= 20 AND idade <= 25;
```

E este operador também pode ser usado com datas! Como por exemplo, para buscar os registros entre os dias 3 e 10:

```sql
SELECT * 
FROM alunos
WHERE data_registro BETWEEN '2026-04-03' AND '2026-04-10';
```

E quando precisamos fazer buscar por nomes? Se estivermos buscando por exemplo pela aluna com nome “Ana Souza” basta usarmos a cláusula `WHERE`:

```sql
SELECT *
FROM alunos
WHERE nome = 'Ana Souza';
```

Mas e se quisermos todas as alunas chamadas Ana? Ou todos os nomes de alunos e alunas que começam com a letra A? Para resolver isso precisamos do operador de busca por padrão em textos `LIKE`. Ele funciona com o `%` que é um curinga, representando qualquer sequência de caracteres.

Por exemplo, para buscarmos  nomes começando com a letra “A”:

```sql
SELECT * 
FROM alunos
WHERE nome LIKE 'A%';
```

Ou nomes que terminam com “a”:

```sql
SELECT * 
FROM alunos
WHERE nome LIKE '%a';
```

Ou nomes que possuem “al”:

```sql
SELECT * 
FROM alunos
WHERE nome LIKE '%al%';
```

# Exercícios

## Exercício 1: Usando BETWEEN com números

Usando a tabela `alunos` da aula, escreva uma consulta que retorne o `nome` e a `idade` dos alunos com idade **entre 19 e 23 anos** (inclusive).

{% toggle "Ver solução" %}

```sql
SELECT nome, idade FROM alunos
WHERE idade BETWEEN 19 AND 23;
```
{% endtoggle %}

## Exercício 2: Usando BETWEEN com datas

Escreva uma consulta que retorne o `nome` e a `data_registro` dos alunos que foram registrados **entre 2026-04-02 e 2026-04-07** (inclusive).

{% toggle "Ver solução" %}

```sql
SELECT nome, data_registro FROM alunos
WHERE data_registro BETWEEN '2026-04-02' AND '2026-04-07';
```
{% endtoggle %}

## Exercício 3: Usando LIKE — começo e fim

Escreva duas consultas separadas:

- **A)** Retorne todos os alunos cujo nome **começa com a letra "E"**.
- **B)** Retorne todos os alunos cujo nome **termina com "es"**.

{% toggle "Ver solução" %}

**A)**
```sql
SELECT * FROM alunos
WHERE nome LIKE 'E%';
```

**B)**
```sql
SELECT * FROM alunos
WHERE nome LIKE '%es';
```
{% endtoggle %}

## Exercício 4: Usando LIKE — busca no meio do texto

Escreva uma consulta que retorne o `nome` de todos os alunos cujo nome **contém a sequência "an"** em qualquer posição (considere que o banco é case-sensitive).

{% toggle "Ver solução" %}

```sql
SELECT nome FROM alunos
WHERE nome LIKE '%an%';
```
{% endtoggle %}

## Exercício 5: Combinando BETWEEN e LIKE

Escreva uma consulta que retorne o `nome`, a `idade` e a `data_registro` dos alunos que **têm entre 18 e 22 anos** e cujo nome **começa com as letras "A", "B" ou "C"**. Use `OR` para combinar as condições do `LIKE`.

{% toggle "Ver solução" %}

```sql
SELECT nome, idade, data_registro FROM alunos
WHERE idade BETWEEN 18 AND 22
  AND (nome LIKE 'A%' OR nome LIKE 'B%' OR nome LIKE 'C%');
```
{% endtoggle %}

<!-- Links e referências -->

{% links "Links e referências" %}
- [**One Compiler - Postgres**](https://onecompiler.com/postgresql)
- [**Learning Hub - Tutoriais de SQL**](https://hub.diegopinho.com.br/sql/01-introducao-ao-sql)
{% endlinks %}