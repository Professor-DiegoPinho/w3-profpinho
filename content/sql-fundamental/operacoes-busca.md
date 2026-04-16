---
title: "Operações de busca"
description: "Aprenda a buscar e filtrar dados em tabelas de um banco de dados relacional utilizando SQL."
order: 6
---

# Videoaula
{% embed https://www.youtube.com/embed/My3JfJYmlpk %}

# Compilado(s)

## Operações de busca com o SELECT

Para buscar os registros de uma tabela, usamos o `SELECT`. Sua sintaxe é relativamente simples e já o usamos algumas vezes para verificar se as operações que estudamos anteriormente estavam funcionando:

```sql
SELECT * FROM nome_da_tabela;
```

O asterisco neste comando representa “todas as colunas”. Ou seja, ao executar o código acima, estaremos buscando por todos os registros da tabela com todas as as colunas inclusas. Como neste exemplo:

```sql
CREATE TABLE alunos (
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	idade INTEGER CHECK (idade > 0),
	cpf TEXT UNIQUE NOT NULL,
	matriculado BOOLEAN DEFAULT TRUE,
	data_registro DATE DEFAULT NOW()
);

INSERT INTO alunos (nome, idade, cpf, matriculado, data_registro) VALUES
('Ana Souza', 18, '12345678901', TRUE, '2026-04-01'),
('Bruno Lima', 21, '23456789012', TRUE, '2026-04-02'),
('Carla Mendes', 19, '34567890123', FALSE, '2026-04-03'),
('Diogo Martins', 25, '45678901234', TRUE, '2026-04-04'),
('Eduarda Silva', 22, '56789012345', TRUE, '2026-04-05'),
('Felipe Costa', 20, '67890123456', FALSE, '2026-04-06'),
('Gabriela Rocha', 17, '78901234567', TRUE, '2026-04-07'),
('Henrique Alves', 23, '89012345678', TRUE, '2026-04-08'),
('Isabela Fernandes', 24, '90123456789', TRUE, '2026-04-09'),
('João Pedro', 26, '01234567890', FALSE, '2026-04-10');
```

Se executarmos o `SELECT` com asterisco teremos como resultado:

```sql
 id |       nome        | idade |     cpf     | matriculado | data_registro 
----+-------------------+-------+-------------+-------------+---------------
  1 | Ana Souza         |    18 | 12345678901 | t           | 2026-04-01
  2 | Bruno Lima        |    21 | 23456789012 | t           | 2026-04-02
  3 | Carla Mendes      |    19 | 34567890123 | f           | 2026-04-03
  4 | Diogo Martins     |    25 | 45678901234 | t           | 2026-04-04
  5 | Eduarda Silva     |    22 | 56789012345 | t           | 2026-04-05
  6 | Felipe Costa      |    20 | 67890123456 | f           | 2026-04-06
  7 | Gabriela Rocha    |    17 | 78901234567 | t           | 2026-04-07
  8 | Henrique Alves    |    23 | 89012345678 | t           | 2026-04-08
  9 | Isabela Fernandes |    24 | 90123456789 | t           | 2026-04-09
 10 | João Pedro        |    26 | 01234567890 | f           | 2026-04-10
(10 rows)
```

Mas a verdade é que nem sempre vamos querer olhar para todas as colunas da tabela. Para alterar este comportamento é bem simples, basta alterar o `*` pelo nome das colunas que desejamos. Por exemplo, vamos selecionar apenas `nome`, `idade` e `cpf` dos alunos e alunas:

```sql
SELECT nome, idade, cpf FROM alunos;

       nome        | idade |     cpf     
-------------------+-------+-------------
 Ana Souza         |    18 | 12345678901
 Bruno Lima        |    21 | 23456789012
 Carla Mendes      |    19 | 34567890123
 Diogo Martins     |    25 | 45678901234
 Eduarda Silva     |    22 | 56789012345
 Felipe Costa      |    20 | 67890123456
 Gabriela Rocha    |    17 | 78901234567
 Henrique Alves    |    23 | 89012345678
 Isabela Fernandes |    24 | 90123456789
 João Pedro        |    26 | 01234567890
(10 rows)
```

E aqui há um detalhe importante: a ordem das colunas faz diferença no resultado. Se invertermos a ordem das colunas no comando ela será refletida no resultado:

```sql
SELECT cpf, idade, nome FROM alunos;

     cpf     | idade |       nome        
-------------+-------+-------------------
 12345678901 |    18 | Ana Souza
 23456789012 |    21 | Bruno Lima
 34567890123 |    19 | Carla Mendes
 45678901234 |    25 | Diogo Martins
 56789012345 |    22 | Eduarda Silva
 67890123456 |    20 | Felipe Costa
 78901234567 |    17 | Gabriela Rocha
 89012345678 |    23 | Henrique Alves
 90123456789 |    24 | Isabela Fernandes
 01234567890 |    26 | João Pedro
(10 rows)
```

Além disso, também podemos alterar o nome das colunas no resultado da consulta. Por exemplo, podemos alterar de `nome` para `nome_aluno` facilmente usando a cláusula `AS`:

```sql
SELECT nome as nome_aluno FROM alunos;

    nome_aluno     
-------------------
 Ana Souza
 Bruno Lima
 Carla Mendes
 Diogo Martins
 Eduarda Silva
 Felipe Costa
 Gabriela Rocha
 Henrique Alves
 Isabela Fernandes
 João Pedro
(10 rows)
```

Podemos escrever um nome composto sem usar o `_`, mas precisaremos seguir a mesma regra de nomenclatura das colunas no comando `CREATE TABLE`. Ou seja, usando aspas. Por exemplo:

```sql
SELECT nome as "nome do aluno" FROM alunos;
```

Por fim, mas não menos importante, o comando `SELECT` também pode ser combinado com a cláusula `WHERE` para filtrar as linhas que serão retornadas. Como no exemplo abaixo, onde queremos trazer na busca alunos(as) que estão matriculados(as):

```sql
SELECT nome FROM alunos
WHERE matriculado = TRUE;

       nome        
-------------------
 Ana Souza
 Bruno Lima
 Diogo Martins
 Eduarda Silva
 Gabriela Rocha
 Henrique Alves
 Isabela Fernandes
(7 rows)
```

Note que aqui fizemos as duas coisas: omitimos colunas ao mesmo tempo em que filtramos os resultados! Unindo o útil ao agradável :).

## Eliminando duplicados com o distict

Muitas vezes os dados presentes em uma tabela se repetirão no decorrer dos registros. Tome como exemplo o dado de gênero da pessoa. Se considerarmos apenas gênero feminino e sexo masculino, esses valores vão se repetir várias vezes entre os estudantes:

```sql
CREATE TABLE alunos (
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	idade INTEGER CHECK (idade > 0),
	genero CHAR(1) CHECK (genero IN ('F', 'M'))
);

INSERT INTO alunos (nome, idade, genero) 
VALUES
	('Ana Souza', 18, 'F'),
	('Bruno Lima', 21, 'M'),
	('Carla Mendes', 19, 'F'),
	('Diogo Martins', 25, 'M'),
	('Eduarda Silva', 22, 'F'),
	('Felipe Costa', 20, 'M'),
	('Gabriela Rocha', 17, 'F'),
	('Henrique Alves', 23, 'M'),
	('Isabela Fernandes', 24, 'F'),
	('João Pedro', 26, 'M');

SELECT nome, genero FROM alunos;

       nome        | sexo 
-------------------+------
 Ana Souza         | F
 Bruno Lima        | M
 Carla Mendes      | F
 Diogo Martins     | M
 Eduarda Silva     | F
 Felipe Costa      | M
 Gabriela Rocha    | F
 Henrique Alves    | M
 Isabela Fernandes | F
 João Pedro        | M
(10 rows)
```

Agora vamos imaginar que tornamos esse dado mais inclusivo, permitindo que os usuários possam escrever (ao invés de selecionar) a opção na qual as deixam mais a vontade (ou mesmo não informar):

```sql
CREATE TABLE alunos (
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	idade INTEGER CHECK (idade > 0),
	genero TEXT
);

INSERT INTO alunos (nome, idade, genero) 
VALUES
	('Ana Souza', 18, 'Feminino'),
	('Bruno Lima', 21, 'Não binário'),
	('Carla Mendes', 19, 'F'),
	('Diogo Martins', 25, 'Outro'),
	('Eduarda Silva', 22, 'Mulher'),
	('Felipe Costa', 20, 'Prefiro não informar'),
	('Gabriela Rocha', 17, 'F'),
	('Henrique Alves', 23, 'Masculino'),
	('Isabela Fernandes', 24, 'Não binário'),
	('João Pedro', 26, 'Homem');
```

Dada esta nova liberdade uma nova pergunta pode surgir: quantos gêneros diferentes existem cadastrados no sistema?

Para descobrir isso, primeiramente precisaremos ocultar todas as colunas fora a de `genero`:

```sql
SELECT genero FROM alunos;

	        genero        
----------------------
 Feminino
 Não binário
 F
 Outro
 Mulher
 Prefiro não informar
 F
 Masculino
 Não binário
 Homem
```

Isso nos ajuda, mas há resultados repetidos que atrapalham na clareza dos dados. Neste caso podemos usar o `SELECT DISTINCT`. Olhe a diferença:

```sql
SELECT DISTINCT genero FROM alunos;

        genero        
----------------------
 Outro
 Prefiro não informar
 Masculino
 Não binário
 Feminino
 F
 Homem
 Melhor
```

O comando `DISTINCT` remove as duplicatas e retorna somente os valores diferentes encontrados na coluna especificada. O mesmo valeria para números, nomes e assim por diante.
    
# Exercícios

## Exercício 1: Selecionando colunas específicas

Usando a tabela `alunos` da aula (com as colunas `id`, `nome`, `idade`, `cpf`, `matriculado` e `data_registro`), escreva um `SELECT` que retorne **apenas** o `nome` e a `data_registro` de todos os alunos.

{% toggle "Ver solução" %}

```sql
SELECT nome, data_registro FROM alunos;
```
{% endtoggle %}

## Exercício 2: Filtrando com WHERE

Usando a mesma tabela `alunos`, escreva uma consulta que retorne o `nome` e a `idade` apenas dos alunos que **estão matriculados** (`matriculado = TRUE`) e têm **mais de 20 anos**.

{% toggle "Ver solução" %}

```sql
SELECT nome, idade FROM alunos
WHERE matriculado = TRUE AND idade > 20;
```
{% endtoggle %}

## Exercício 3: Renomeando colunas com AS

Escreva um `SELECT` que retorne as colunas `nome` e `idade` da tabela `alunos`, mas exibindo-as com os apelidos `"nome do aluno"` e `"anos de idade"` respectivamente.

{% toggle "Ver solução" %}

```sql
SELECT 
	nome AS "nome do aluno",
	idade AS "anos de idade"
FROM alunos;
```
{% endtoggle %}

## Exercício 4: Eliminando duplicatas com DISTINCT

Considere a tabela `alunos` com a coluna `genero` (TEXT) livre, onde os alunos podem escrever qualquer valor. Escreva uma consulta que retorne **apenas os valores únicos** de `genero` cadastrados, sem repetições.

{% toggle "Ver solução" %}

```sql
SELECT DISTINCT genero FROM alunos;
```
{% endtoggle %}

## Exercício 5: Combinando tudo

Usando a tabela `alunos` original da aula (com `matriculado` e `data_registro`), escreva uma única consulta que:

1. Retorne apenas as colunas `nome` e `idade`.
2. Renomeie `nome` para `nome_aluno` e `idade` para `anos`.
3. Filtre apenas os alunos **não matriculados** (`matriculado = FALSE`).

{% toggle "Ver solução" %}

```sql
SELECT 
	nome AS nome_aluno,
	idade AS anos
FROM alunos
WHERE matriculado = FALSE;
```
{% endtoggle %}

<!-- Links e referências -->

{% links "Links e referências" %}
- [**One Compiler - Postgres**](https://onecompiler.com/postgresql)
- [**Learning Hub - Tutoriais de SQL**](https://hub.diegopinho.com.br/sql/01-introducao-ao-sql)
{% endlinks %}