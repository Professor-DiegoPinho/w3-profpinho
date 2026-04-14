---
title: "Constraints"
description: "Aprenda a utilizar restrições em tabelas de um banco de dados relacional utilizando SQL."
order: 4
---

# Videoaula
{% embed https://www.youtube.com/embed/Z5OdP_74Iz0 %}

# Compilado(s)

# 📚 Compilado

## Constraints (Restrições)

Aprendemos como criar tabelas e inserir valores dentro delas. Mas como garantir que isso não vire uma bagunça?

Precisamos de regras! E no mundo dos bancos de dados relacionais chamamos essas regras de **constraints**. Constraints (restrições) são regras aplicadas às colunas de uma tabela para garantir a integridade dos dados. Elas impedem que dados inválidos sejam inseridos no banco.

Existem várias constraints, mas abordaremos as principais:

### PRIMARY KEY (PK)

Uma chave primária é o que define qual coluna da tabela será usada para identificar, de forma única, os registros dela entre si. Já entramos no consenso de que o `id` serve pra isso, mas sem a restrição essa regra pode ser violada. Veja:

```sql
CREATE TABLE alunos (
	id SERIAL,
	nome TEXT,
	idade INTEGER
);

INSERT INTO alunos (id, nome, idade)
VALUES (1, 'Maria Fernanda', 21);

INSERT INTO alunos (id, nome, idade)
VALUES (1, 'Marcos Luiz', 22);

-- vai funcionar! :(
```

Por isso é importante definir a constraint de `PRIMARY KEY` sempre:

```sql
CREATE TABLE alunos (
	id SERIAL PRIMARY KEY,
	nome TEXT,
	idade INTEGER
);

INSERT INTO alunos (id, nome, idade)
VALUES (1, 'Maria Fernanda', 21);

-- não vai funcionar!
INSERT INTO alunos (id, nome, idade)
VALUES (1, 'Marcos Luiz', 22);
```

### UNIQUE

Podemos (e devemos) usar o `id` como identificador único de cada linha da tabela, no entanto, nem sempre isso é o suficiente. Em algumas situações, vamos ter outras colunas da tabela que desejamos que tenham valores únicos, além do `id`. Por exemplo, em uma tabela de usuários, você não vai querer que dois deles tenham o mesmo `email` ou `cpf`, vai?

Para essas situações, podemos usar a constraint `UNIQUE`. Com ela, garantimos que uma tabela nunca terá dois registros iguais para uma determinada coluna. Para nosso exemplo, restringir para que nenhum sanduíche tenha nome repetido:

```sql
CREATE TABLE alunos (
	id SERIAL PRIMARY KEY,
	nome TEXT,
	idade INTEGER,
	cpf TEXT UNIQUE,
);

INSERT INTO alunos (nome, idade, cpf)
VALUES ('Maria Fernanda', 21, '129210219');

-- não vai funcionar!
INSERT INTO alunos (nome, idade)
VALUES ('Marcos Luiz', 22, '129210219');
```

### NOT NULL

No comando de `INSERT` vimos que podemos inserir quais as colunas da tabela devem ser preenchidas com os seus respectivos valores. Mas o que acontece se tiramos ou esquecemos uma das colunas? Não acontece nada! O registro é feito mas a coluna fica com o valor `NULL`, ou seja, nulo.

```sql
CREATE TABLE alunos (
	id SERIAL PRIMARY KEY,
	nome TEXT,
	idade INTEGER,
	cpf TEXT UNIQUE
);

-- aluna sem nome!
INSERT INTO alunos (idade, cpf)
VALUES (21, '129210219');
```

Para garantir que isso não aconteça, basta usarmos a constraint `NOT NULL`!

```sql
CREATE TABLE alunos (
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	idade INTEGER,
	cpf TEXT UNIQUE
);

-- vai dar erro!
INSERT INTO alunos (idade, cpf)
VALUES (21, '129210219');

-- psql:commands.sql:11: ERROR:  null value in column "nome" of relation "alunos" violates not-null constraint
-- DETAIL:  Failing row contains (1, null, 21, 129210219).
```

### CHECK

Quando estamos lidando com valores numéricos, por exemplo, podemos aproveitar a estrutura do SQL para fazer validações. No caso dos alunos, não faz sentido permitir um aluno na qual a idade seja negativa, por exemplo.

Então podemos aplicar a constraint `CHECK`:

```sql
CREATE TABLE alunos (
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	idade INTEGER CHECK (idade > 0),
	cpf TEXT UNIQUE
);
```

Agora ao tentarmos fazer uma entrada inválida, recebermos um erro:

```sql
CREATE TABLE alunos (
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	idade INTEGER CHECK (idade > 0),
	cpf TEXT UNIQUE
);

-- vai dar erro!
INSERT INTO alunos (nome, idade, cpf)
VALUES ('Maria Fernanda', 0, '129210219');

-- psql:commands.sql:11: ERROR:  new row for relation "alunos" violates check constraint "alunos_idade_check"
-- DETAIL:  Failing row contains (1, Maria Fernanda, 0, 129210219).
```

### DEFAULT

Em muito casos, temos valores padrões que devem ser assumidos caso o usuário não diga o contrário. Nós poderíamos ter uma coluna chamada `matriculado` que por padrão é registrada como `true`.

```sql
CREATE TABLE alunos (
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	idade INTEGER CHECK (idade > 0),
	cpf TEXT UNIQUE NOT NULL,
	matriculado BOOLEAN DEFAULT TRUE
);
```

Com o `DEFAULT`, essa coluna não precisa ser informada no comando de `INSERT`, a não ser que a ideia seja realmente trocar o valor:

```sql
CREATE TABLE alunos (
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	idade INTEGER CHECK (idade > 0),
	cpf TEXT UNIQUE NOT NULL,
	matriculado BOOLEAN DEFAULT TRUE
);

INSERT INTO alunos (nome, idade, cpf)
VALUES ('Maria Fernanda', 21, '129210219');

SELECT * FROM alunos;

id |      nome      | idade |    cpf    | matriculado 
----+----------------+-------+-----------+-------------
  1 | Maria Fernanda |    21 | 129210219 | t
(1 row)
```

Isso pode ser muito útil para registrarmos datas! Veja:

```sql
CREATE TABLE alunos (
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	idade INTEGER CHECK (idade > 0),
	cpf TEXT UNIQUE NOT NULL,
	matriculado BOOLEAN DEFAULT TRUE,
	data_registro DATE DEFAULT NOW()
);

INSERT INTO alunos (nome, idade, cpf)
VALUES ('Maria Fernanda', 21, '129210219');

SELECT * FROM alunos;

 id |      nome      | idade |    cpf    | matriculado | data_registro 
----+----------------+-------+-----------+-------------+---------------
  1 | Maria Fernanda |    21 | 129210219 | t           | 2026-04-08
(1 row)
```
    
# Exercícios

## Exercício 1: Aplicando PRIMARY KEY

Crie a tabela `professores` com as colunas `id` (identificador automático e chave primária), `nome` (texto livre) e `disciplina` (texto livre). Em seguida, tente inserir dois professores com o mesmo `id` e observe o que acontece.

{% toggle "Ver solução" %}

```sql
CREATE TABLE professores (
  id         SERIAL PRIMARY KEY,
  nome       TEXT,
  disciplina TEXT
);

INSERT INTO professores (id, nome, disciplina)
VALUES (1, 'Carlos', 'Matemática');

-- vai dar erro! PRIMARY KEY não permite ids duplicados
INSERT INTO professores (id, nome, disciplina)
VALUES (1, 'Fernanda', 'Português');
```
{% endtoggle %}

## Exercício 2: Garantindo unicidade com UNIQUE

Crie a tabela `usuarios` com `id` (PK automática), `nome` (texto) e `email` (texto único e obrigatório). Insira dois usuários com emails diferentes e depois tente inserir um terceiro com um email já existente.

{% toggle "Ver solução" %}

```sql
CREATE TABLE usuarios (
  id    SERIAL PRIMARY KEY,
  nome  TEXT,
  email TEXT UNIQUE NOT NULL
);

INSERT INTO usuarios (nome, email)
VALUES ('Ana', 'ana@email.com');

INSERT INTO usuarios (nome, email)
VALUES ('Bruno', 'bruno@email.com');

-- vai dar erro! email duplicado
INSERT INTO usuarios (nome, email)
VALUES ('Outro', 'ana@email.com');
```
{% endtoggle %}

## Exercício 3: Impedindo valores nulos

Crie a tabela `produtos` com `id` (PK automática), `nome` (texto obrigatório) e `preco` (NUMERIC com 2 casas decimais, obrigatório). Tente inserir um produto sem informar o nome e observe o erro.

{% toggle "Ver solução" %}

```sql
CREATE TABLE produtos (
  id    SERIAL PRIMARY KEY,
  nome  TEXT NOT NULL,
  preco NUMERIC(10,2) NOT NULL
);

-- vai dar erro! nome é NOT NULL
INSERT INTO produtos (preco)
VALUES (19.90);
```
{% endtoggle %}

## Exercício 4: Validando dados com CHECK

Crie a tabela `funcionarios` com `id` (PK automática), `nome` (texto obrigatório), `salario` (NUMERIC com 2 casas decimais) com a restrição de que o salário deve ser maior que zero. Tente inserir um funcionário com salário negativo.

{% toggle "Ver solução" %}

```sql
CREATE TABLE funcionarios (
  id      SERIAL PRIMARY KEY,
  nome    TEXT NOT NULL,
  salario NUMERIC(10,2) CHECK (salario > 0)
);

-- válido
INSERT INTO funcionarios (nome, salario)
VALUES ('Lucas', 4500.00);

-- vai dar erro! salário inválido
INSERT INTO funcionarios (nome, salario)
VALUES ('Pedro', -100.00);
```
{% endtoggle %}

## Exercício 5: Combinando todas as constraints

Crie a tabela `clientes` completa com as seguintes regras:

- `id` — chave primária automática
- `nome` — obrigatório
- `cpf` — único e obrigatório
- `idade` — deve ser maior que 0
- `ativo` — padrão `true`
- `data_cadastro` — data com padrão igual à data atual (`NOW()`)

Insira dois clientes sem informar `ativo` nem `data_cadastro` e use `SELECT * FROM clientes;` para confirmar os valores padrão.

{% toggle "Ver solução" %}

```sql
CREATE TABLE clientes (
  id            SERIAL PRIMARY KEY,
  nome          TEXT NOT NULL,
  cpf           TEXT UNIQUE NOT NULL,
  idade         INTEGER CHECK (idade > 0),
  ativo         BOOLEAN DEFAULT TRUE,
  data_cadastro DATE DEFAULT NOW()
);

INSERT INTO clientes (nome, cpf, idade)
VALUES ('Maria', '111.222.333-44', 30);

INSERT INTO clientes (nome, cpf, idade)
VALUES ('João', '555.666.777-88', 25);

SELECT * FROM clientes;
```
{% endtoggle %}

<!-- Links e referências -->

{% links "Links e referências" %}
- [**One Compiler - Postgres**](https://onecompiler.com/postgresql)
- [**Learning Hub - Tutoriais de SQL**](https://hub.diegopinho.com.br/sql/01-introducao-ao-sql)
{% endlinks %}