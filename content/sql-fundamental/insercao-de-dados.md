---
title: "Inserção de dados"
description: "Aprenda a inserir dados em tabelas de um banco de dados relacional utilizando SQL."
order: 3
---

# Videoaula
{% embed https://www.youtube.com/embed/JOl6hGkq43Q %}

# Compilado(s)

## Inserção de dados

Assim como saco vazio não para em pé, tabelas sem dados também não fazem sentido. Para inserir dados em uma tabela, precisamos apenas definir:

- qual será a tabela;
- quais os campos da tabela serão preenchidos;
- e seus respectivos dados.

Para aprender como montar um comando de inserção, vamos resgatar a nossa tabelinha de alunos e adicionar um aluno novo:

```sql
CREATE TABLE alunos (
	nome TEXT,
	idade INTEGER
);

INSERT INTO alunos (nome, idade)
VALUES ('Lucas', 31);
```

A ordem das colunas no comando faz uma baita diferença. Podemos escolher quais queremos preencher assim como a sua ordem, mas é importante respeitar esta ordem no restante do comando SQL. Olha o que acontece quando tentamos mudar a ordem das colunas sem alterar os valores:

```sql
CREATE TABLE alunos (
	nome TEXT,
	idade INTEGER
);

INSERT INTO alunos (idade, nome)
VALUES ('Lucas', 31);

-- psql:commands.sql:7: ERROR:  invalid input syntax for type integer: "Lucas"
-- LINE 2: VALUES ('Lucas', 31);
```

Também temos problema se o número de colunas não bater com a quantidade de valores:

```sql
CREATE TABLE alunos (
	nome TEXT,
	idade INTEGER
);

INSERT INTO alunos (nome)
VALUES ('Lucas', 31);

-- psql:commands.sql:7: ERROR:  INSERT has more expressions than target columns
-- LINE 2: VALUES ('Lucas', 31);
```

Mas agora imaginando que fizemos tudo corretamente, como fazer para inserir todos os alunos? Precisamos inserir um a um? Não necessariamente.

A verdade é que o comando o `INSERT` nos permite inserir várias linhas simultaneamente:

```sql
CREATE TABLE alunos (
	nome TEXT,
	idade INTEGER
);

INSERT INTO alunos (nome, idade)
VALUES 
	('Lucas', 31),
	('Ana', 32),
	('Marcos', 33),
	('Elaine', 34);
```

O banco está confirmando que os dados estão sendo inseridos, mas não podemos vê-los. Como fazer para ver a tabela preenchida? 

Vou te mostrar um comando que vai nos ajudar a fazer isso mas só vamos explorá-lo melhor mais para frente.

```sql
SELECT * FROM alunos;

  nome  | idade 
--------+-------
 Lucas  |    31
 Ana    |    32
 Marcos |    33
 Elaine |    34
(4 rows)
```

Mas antes de terminarmos precisamos falar de algo importante. Sabe como nas planilhas cada registro pode ser identificado por uma linha específica? No SQL precisamos fazer algo parecido para garantir que cada registro possa ser identificado de forma única.

Para fazer isso, o mais comum é criar uma coluna `id` que pode ser um número inteiro. Seria como fazer algo assim:

```sql
CREATE TABLE alunos (
	id INTEGER,
	nome TEXT,
	idade INTEGER
);

INSERT INTO alunos (id, nome, idade)
VALUES 
	(1, 'Lucas', 31),
	(2, 'Ana', 32),
	(3, 'Marcos', 33),
	(4, 'Elaine', 34);
```

Mas nas planilhas os números das linhas são contados automaticamente. Não precisamos ficar controlando isso. Nos bancos de dados, para nos tirar esse esforço podemos usar o tipo `SERIAL`.

```sql
CREATE TABLE alunos (
	id SERIAL,
	nome TEXT,
	idade INTEGER
);

INSERT INTO alunos (nome, idade)
VALUES 
	('Lucas', 31),
	('Ana', 32),
	('Marcos', 33),
	('Elaine', 34);
```

Perfeito! Conseguimos inserir os dados na tabela, mas e se…

- sem querer adicionarmos dois alunos iguais?
- colocarmos a idade com um valor negativo?

Para garantir que problemas deste tipo não aconteçam, veremos como lidar com restrições na próxima aula.
    
# Exercícios

## Exercício 1: Inserindo o primeiro registro

Crie a tabela `produtos` com as colunas `id` (SERIAL), `nome` (TEXT) e `preco` (NUMERIC(10,2)). Em seguida, insira um produto chamado `"Caderno"` com preço `12.90`.

{% toggle "Ver solução" %}

```sql
CREATE TABLE produtos (
  id    SERIAL,
  nome  TEXT,
  preco NUMERIC(10,2)
);

INSERT INTO produtos (nome, preco)
VALUES ('Caderno', 12.90);
```
{% endtoggle %}

## Exercício 2: Inserindo múltiplos registros

Usando a tabela `produtos` do exercício anterior, insira os seguintes produtos em um único comando `INSERT`:

| nome | preco |
| --- | --- |
| Caneta | 2.50 |
| Borracha | 1.80 |
| Régua | 3.40 |
| Lápis | 1.20 |

{% toggle "Ver solução" %}

```sql
INSERT INTO produtos (nome, preco)
VALUES
  ('Caneta',  2.50),
  ('Borracha', 1.80),
  ('Régua',   3.40),
  ('Lápis',   1.20);
```
{% endtoggle %}

## Exercício 3: Identificando erros de inserção

Os comandos abaixo contêm erros. Identifique o problema em cada um deles e corrija.

**Comando A:**
```sql
CREATE TABLE clientes (
  id   SERIAL,
  nome TEXT,
  idade INTEGER
);

INSERT INTO clientes (nome, idade)
VALUES ('Maria', 28, 'extra');
```

**Comando B:**
```sql
INSERT INTO clientes (idade, nome)
VALUES ('João', 35);
```

{% toggle "Ver solução" %}

**Comando A** — o `VALUES` tem 3 valores mas apenas 2 colunas foram declaradas. Correto:
```sql
INSERT INTO clientes (nome, idade)
VALUES ('Maria', 28);
```

**Comando B** — a ordem das colunas está invertida: `idade` é `INTEGER` mas `'João'` é texto. Correto:
```sql
INSERT INTO clientes (nome, idade)
VALUES ('João', 35);
```
{% endtoggle %}

## Exercício 4: Tabela de funcionários completa

Crie a tabela `funcionarios` com as colunas abaixo e insira 3 registros de sua escolha:

- `id` — identificador automático
- `nome` — texto livre
- `cargo` — texto fixo de 3 caracteres (ex: "DEV", "RH")
- `salario` — número com 2 casas decimais
- `ativo` — verdadeiro ou falso

{% toggle "Ver solução" %}

```sql
CREATE TABLE funcionarios (
  id      SERIAL,
  nome    TEXT,
  cargo   CHAR(3),
  salario NUMERIC(10,2),
  ativo   BOOLEAN
);

INSERT INTO funcionarios (nome, cargo, salario, ativo)
VALUES
  ('Ana',    'DEV', 7500.00, true),
  ('Bruno',  'RH',  4800.00, true),
  ('Carla',  'DEV', 8200.00, false);
```
{% endtoggle %}

<!-- Links e referências -->

{% links "Links e referências" %}
- [**One Compiler - Postgres**](https://onecompiler.com/postgresql)
- [**Learning Hub - Tutoriais de SQL**](https://hub.diegopinho.com.br/sql/01-introducao-ao-sql)
{% endlinks %}