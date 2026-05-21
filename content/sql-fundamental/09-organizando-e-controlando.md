---
title: "Organizando e controlando os resultados"
description: "Aprenda a organizar e controlar os resultados das suas consultas SQL utilizando operadores ORDER BY, LIMIT e OFFSET."
order: 9
---

# Videoaula
{% embed https://www.youtube.com/embed/LX0IvfAL8Iw %}

# Compilado(s)

## Organizando e controlando os resultados
Aprendemos a filtrar os dados com a cláusula `WHERE` e com operadores como `AND`, `OR`, `NOT`, `BETWEEN` e `LIKE`. No entanto, em consultas reais, normalmente não basta apenas encontrar os registros. Também é muito comum precisar:

- ordenar os resultados;
- mostrar apenas os primeiros registros;
- pular alguns registros;
- combinar tudo isso em uma mesma consulta.

Para isso, vamos conhecer agora os comandos `ORDER BY`, `LIMIT` e `OFFSET`.

Quando fazemos um `SELECT`, o banco de dados não garante que os resultados virão em uma ordem específica, a menos que deixemos isso explícito. É justamente para isso que serve o `ORDER BY`. Ele permite ordenar os resultados com base em uma ou mais colunas.

Por exemplo, para ordenar por idade:

```sql
SELECT * 
FROM alunos
ORDER BY idade;
```

A ordem crescente é o comportamento padrão, mas podemos escrever isso explicitamente com `DESC`:

```sql
SELECT * 
FROM alunos
ORDER BY idade DESC;
```

O mesmo princípio vale para textos e datas! Mas calma que não termina por aí. Em alguns casos, queremos definir uma segunda regra de ordenação. Imagine que queremos ordenar primeiro por matriculado e, dentro de cada grupo, por nome:

```sql
SELECT *
FROM alunos
ORDER BY matriculado DESC, nome ASC;
```

### LIMIT

Mesmo usando a cláusula `WHERE` e os operadores lógicos, às vezes uma consulta retorna muitos registros, mas queremos visualizar apenas os primeiros. Para isso usamos `LIMIT`.

Por exemplo, podemos usar o `LIMIT` para descobrir quais foram os três últimos alunos registrados. Para isso, basta fazermos:

```sql
SELECT nome, data_registro 
FROM alunos
WHERE matriculado = TRUE
ORDER BY data_registro DESC
LIMIT 3;

       nome        | data_registro 
-------------------+---------------
 Isabela Fernandes | 2026-04-09
 Henrique Alves    | 2026-04-08
 Gabriela Rocha    | 2026-04-07
(3 rows)
```

Ou então retornar apenas o aluno ou aluna mais velho(a):

```sql
SELECT nome, idade
FROM alunos
ORDER BY idade DESC
LIMIT 1;

    nome    | idade 
------------+-------
 João Pedro |    26
(1 row)
```

### OFFSET

O `OFFSET` serve para ignorar uma certa quantidade de linhas antes de começar a exibir o resultado. Em outras palavras, ele basicamente faz com que o SQL “pule” alguns registros.

Por exemplo, podemos descobrir quais são os três alunos mais velhos e fazer um ranqueamento dos demais em outra consulta:

```sql
-- top 3
SELECT nome, idade 
FROM alunos
ORDER BY idade DESC
LIMIT 3;

       nome        | idade 
-------------------+-------
 João Pedro        |    26
 Diogo Martins     |    25
 Isabela Fernandes |    24
(3 rows)
```

```sql
-- ignorando os três primeiros
SELECT nome, idade 
FROM alunos
ORDER BY idade DESC
OFFSET 3;

      nome      | idade 
----------------+-------
 Henrique Alves |    23
 Eduarda Silva  |    22
 Bruno Lima     |    21
 Felipe Costa   |    20
 Carla Mendes   |    19
 Ana Souza      |    18
 Gabriela Rocha |    17
(7 rows)
```

A combinação de LIMIT + OFFSET é muito usada **paginação**. Esta é a técnica que usamos quando precisamos dividir o conteúdo de uma consulta em “páginas” (bem parecido com o que o Google faz com os resultados das buscas).

# Exercícios

## Exercício 1: Ordenando por coluna numérica

Usando a tabela `alunos` da aula, escreva uma consulta que retorne o `nome` e a `idade` de todos os alunos ordenados pela **idade de forma crescente** (do mais novo ao mais velho).

{% toggle "Ver solução" %}

```sql
SELECT nome, idade FROM alunos
ORDER BY idade ASC;
```
{% endtoggle %}

## Exercício 2: Ordenando por coluna de texto

Escreva uma consulta que retorne o `nome` de todos os alunos ordenados em **ordem alfabética decrescente** (de Z a A).

{% toggle "Ver solução" %}

```sql
SELECT nome FROM alunos
ORDER BY nome DESC;
```
{% endtoggle %}

## Exercício 3: Ordenação com múltiplas colunas

Escreva uma consulta que retorne o `nome`, a `idade` e o campo `matriculado` de todos os alunos, ordenados primeiro pelos **matriculados** (os matriculados primeiro) e, dentro de cada grupo, pelo **nome em ordem alfabética crescente**.

{% toggle "Ver solução" %}

```sql
SELECT nome, idade, matriculado FROM alunos
ORDER BY matriculado DESC, nome ASC;
```
{% endtoggle %}

## Exercício 4: Usando LIMIT

Escreva uma consulta que retorne o `nome` e a `data_registro` dos **5 alunos registrados mais recentemente**, ou seja, com as datas de registro mais novas.

{% toggle "Ver solução" %}

```sql
SELECT nome, data_registro FROM alunos
ORDER BY data_registro DESC
LIMIT 5;
```
{% endtoggle %}

## Exercício 5: Combinando ORDER BY e LIMIT

Escreva uma consulta que retorne apenas o `nome` e a `idade` do **aluno mais novo** (o de menor idade) da tabela.

{% toggle "Ver solução" %}

```sql
SELECT nome, idade FROM alunos
ORDER BY idade ASC
LIMIT 1;
```
{% endtoggle %}

## Exercício 6: Usando OFFSET

Escreva uma consulta que retorne o `nome` e a `idade` de todos os alunos ordenados por idade de forma decrescente, **ignorando os 5 primeiros resultados** (ou seja, pulando os 5 mais velhos).

{% toggle "Ver solução" %}

```sql
SELECT nome, idade FROM alunos
ORDER BY idade DESC
OFFSET 5;
```
{% endtoggle %}

## Exercício 7: Paginação com LIMIT e OFFSET

Imagine que você quer exibir os alunos em páginas de **3 registros por página**, ordenados por nome em ordem alfabética. Escreva duas consultas separadas:

- **Página 1:** os 3 primeiros alunos.
- **Página 2:** os próximos 3 alunos.

{% toggle "Ver solução" %}
```sql
-- página 1
SELECT nome FROM alunos
ORDER BY nome ASC
LIMIT 3 OFFSET 0;

-- página 2
SELECT nome FROM alunos
ORDER BY nome ASC
LIMIT 3 OFFSET 3;
```
{% endtoggle %}

<!-- Links e referências -->

{% links "Links e referências" %}
- [**One Compiler - Postgres**](https://onecompiler.com/postgresql)
- [**Learning Hub - Tutoriais de SQL**](https://hub.diegopinho.com.br/sql/01-introducao-ao-sql)
{% endlinks %}