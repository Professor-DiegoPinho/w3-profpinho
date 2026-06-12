---
id: "50b07ca56ded"
title: "Funções agregadoras"
description: "Aprenda a utilizar funções agregadoras no SQL para resumir e analisar dados."
order: 10
---

# Videoaula
{% embed https://www.youtube.com/embed/RJy0kVNvAYQ %}

# Compilado(s)

## Funções agregadoras
Aprendemos a fazer consultas complexas em nossas tabelas, mas nem sempre o objetivo será consultar algo, mas sim, resumir informações sobre esses dados. Pensando na tabela de alunos que construimos nas últimas aulas, podemos pensar:

- quantos alunos existem na tabela?
- qual é a maior idade cadastrada?
- qual é a menor?
- qual é a média de idade da turma?
- qual é a soma das idades?

É exatamente para isso que servem as **funções agregadoras**. As funções agregadoras analisam um conjunto de linhas e retornam um único valor como resultado.

### COUNT

Vamos começar pela primeira pergunta: *"quantos alunos existem na tabela?”*. Para respondê-la podemos usar a função `COUNT`. Ela serve exatamente para contar registros, como no script abaixo:

```sql
SELECT COUNT(*) FROM alunos;

 count
-------
    10
```

Aqui, o `*` significa que estamos contando todas as linhas retornadas pela consulta. Também podemos dar um nome melhor para a coluna de resultado usando `AS`:

```sql
SELECT COUNT(*) AS total_alunos
FROM alunos;

 total_alunos
--------------
           10
```

### MAX e MIN

Para descobrir o menor e maior valor presentes em uma determinada coluna de uma tabela, podemos usar as funções `MAX` e `MIN`, respectivamente. Vimos como buscar a maior e menor idades fazendo consultas com as cláusulas `ORDER BY` e o `LIMIT`, mas com essas funções o trabalho fica muito mais simples.

```sql
SELECT 
	max(idade) as maior_idade, 
	min(idade) as menor_idade
FROM alunos;

 maior_idade | menor_idade 
-------------+-------------
          26 |          17
(1 row)
```

Vale ressaltar que aqui temos uma diferença clara em relação ao que estávamos fazendo anteriormente com as cláusulas de controle e organização. Neste caso, não estamos interessados em saber quem são os alunos, mas sim, os valores presentes na tabela de `idade`. Logo, uma estratégia não substitui a outra, tudo depende do que você está buscando. 

### AVG

Temos alunos mais velhos, outros mais novos… mas qual será a média da idade deles? Para responder a esta pergunta, precisamos olhar novamente para a coluna de `idade`. Assim como fizemos com as funções MAX e MIN, podemos usar a função AVG de forma semelhante para conseguir obter esse valor.

```sql
SELECT 
	AVG(idade) as idade_media
FROM alunos;

     idade_media     
---------------------
 21.5000000000000000
(1 row)
```

### SUM

Por fim, mas não menos relevante, também temos a função `SUM` que nos retorna a soma dos valores da coluna selecionada. Se por curiosidade quisermos saber qual é a soma das idades dos alunos, basta aplicar a função.

```sql
SELECT 
	SUM(idade) as soma_idades
FROM alunos;

 soma_idades 
-------------
         215
(1 row)
```

Você deve ter notado que essas funções são muito úteis para gerar resumos, indicadores e análises rápidas. Além disso, as funções agregadoras como `SUM`, `AVG`, `MAX` e `MIN` normalmente são usadas com colunas numéricas, como foi o caso da idade. Já o `COUNT` é mais flexível, pois pode ser usado para contar registros da consulta.

# Exercícios

## Exercício 1: Contando registros

Usando a tabela `alunos` da aula, escreva uma consulta que retorne o **total de alunos** cadastrados na tabela. Renomeie a coluna do resultado para `total_alunos`.

{% toggle "Ver solução" %}

```sql
SELECT COUNT(*) AS total_alunos
FROM alunos;
```
{% endtoggle %}

## Exercício 2: Contando com filtro

Escreva uma consulta que retorne quantos alunos estão **matriculados** (`matriculado = TRUE`). Renomeie a coluna do resultado para `total_matriculados`.

{% toggle "Ver solução" %}

```sql
SELECT COUNT(*) AS total_matriculados
FROM alunos
WHERE matriculado = TRUE;
```
{% endtoggle %}

## Exercício 3: Maior e menor valor

Escreva uma consulta que retorne, em uma única consulta, a **maior** e a **menor** idade cadastradas na tabela. Renomeie as colunas para `maior_idade` e `menor_idade`.

{% toggle "Ver solução" %}

```sql
SELECT
  MAX(idade) AS maior_idade,
  MIN(idade) AS menor_idade
FROM alunos;
```
{% endtoggle %}

## Exercício 4: Média de idade

Escreva uma consulta que retorne a **média de idade** dos alunos que estão matriculados. Renomeie a coluna do resultado para `media_idade_matriculados`.

{% toggle "Ver solução" %}

```sql
SELECT AVG(idade) AS media_idade_matriculados
FROM alunos
WHERE matriculado = TRUE;
```
{% endtoggle %}

## Exercício 5: Soma com filtro

Escreva uma consulta que retorne a **soma das idades** dos alunos que **não estão matriculados** (`matriculado = FALSE`). Renomeie a coluna do resultado para `soma_idades_nao_matriculados`.

{% toggle "Ver solução" %}

```sql
SELECT SUM(idade) AS soma_idades_nao_matriculados
FROM alunos
WHERE matriculado = FALSE;
```
{% endtoggle %}

## Exercício 6: Combinando funções agregadoras

Escreva uma consulta que retorne, em uma única consulta, as seguintes informações sobre **todos os alunos**: total de alunos, média de idade, maior idade e menor idade. Use `AS` para nomear cada coluna de forma clara.

{% toggle "Ver solução" %}

```sql
SELECT
  COUNT(*) AS total_alunos,
  AVG(idade) AS media_idade,
  MAX(idade) AS maior_idade,
  MIN(idade) AS menor_idade
FROM alunos;
```
{% endtoggle %}

<!-- Links e referências -->

{% links "Links e referências" %}
- [**One Compiler - Postgres**](https://onecompiler.com/postgresql)
- [**Learning Hub - Tutoriais de SQL**](https://hub.diegopinho.com.br/sql/01-introducao-ao-sql)
{% endlinks %}