---
id: "fe5876fc0caf"
title: "Banco de dados, Tabelas e SQL"
description: "Crie a sua primeira tabela em um banco de dados relacional utilizando o SQL, a linguagem de consulta mais utilizada para bancos de dados relacionais."
order: 2
---

# Videoaula
{% embed https://www.youtube.com/embed/EBl1av9frh0 %}

# Compilado(s)

Existem diferentes bancos de dados relacionais no mercado. Para citar alguns: MySQL, SQL Server, Oracle, e assim por diante. Para nosso estudos, usaremos o [**PostgreSQL**](https://www.postgresql.org/). O Postgres é o banco de dados de código aberto mais utilizado do mundo, tanto pela comunidade quanto por empresas de tecnologia.

A forma ideal de usá-lo seria instalando no computador, mas nós não faremos isso. Para ganharmos tempo, usaremos a plataforma do [**OneCompiler**](https://onecompiler.com/postgresql). Nesta plataforma, podemos usar o banco de dados como um serviço na nuvem e rodar tudo diretamente pelo navegador. Será ótimo para os nossos estudos.

Todo banco de dados relacional, seja o Postgres ou qualquer um dos outros citados anteriormente, são estruturados por tabelas. As tabelas, por sua vez, são muito parecidas com as planilhas que já usamos no dia a dia. Ambas são compostas por linhas e colunas.

Vamos pegar esta planilha que representa alguns alunos de uma escola, por exemplo:

| **nome** | **idade** |
| --- | --- |
| Ana | 15 |
| Bruno | 16 |
| Carla | 14 |
| Diego | 15 |
| Elaine | 16 |

Como podemos construir isso dentro do banco de dados? 🤔

Para fazer isso precisamos de uma linguagem especial para dar comandos ao banco de dados. Neste caso, precisamos da linguagem SQL. Para construir uma tabela usando SQL precisamos definir antes:

- o nome da tabela;
- o nome das colunas e seus respectivos tipos.

Uma vez estabelecido isso, podemos fazer:

```sql
CREATE TABLE alunos (
	nome TEXT,
	idade INTEGER
);
```

Ao fazer isso, nossa tabela está pronta.

Mas aí você pode estar se perguntando: _“de onde saíram esse `TEXT` e `INTEGER`?”_

A verdade é que cada banco de dados possui seus próprios tipos de dados, usados para representar diferentes tipos de informação. O Postgres tem vários deles, mas vou te apresentar alguns dos principais usando o exemplo de uma tabela de alunos:

```sql
CREATE TABLE alunos (
  nome               TEXT,          -- texto livre
  turma              CHAR(2),       -- texto fixo (ex: "A1", "B2")
  idade              INTEGER,       -- número inteiro
  nota_final         NUMERIC(4,2),  -- número com casas decimais
  matriculado        BOOLEAN,       -- true/false
  data_nascimento    DATE,          -- data
  horario_entrada    TIME,          -- horário
  ultima_atualizacao TIMESTAMP      -- data e hora
);
```

Resolvemos a primeira parte do problema que é criar a tabela. Mas como inserir dados nela?

Bom, é isso o que aprenderemos na próxima aula 😉
    
# Exercícios

## Exercício 1: A primeira tabela a gente nunca esquece

Crie uma tabela chamada `funcionarios` com as seguintes colunas:
- `nome` (texto livre)
- `departamento` (texto fixo de 3 caracteres, ex: "RH", "FIN", "TEC")
- `salario` (número com 2 casas decimais)
- `data_contratacao` (data)
- `ativo` (booleano)

{% toggle "Ver solução" %}

```sql
CREATE TABLE funcionarios (
  nome              TEXT,
  departamento      CHAR(3),
  salario           NUMERIC(10,2),
  data_contratacao  DATE,
  ativo             BOOLEAN
);
```
{% endtoggle %}

## Exercício 2: Escolhendo tipos de dados corretos

Para cada coluna abaixo, escolha o tipo de dado mais apropriado dentre as opções: INT, VARCHAR, TEXT, DATE, DECIMAL, BOOLEAN.

- email - endereço de email do cliente
- data_nascimento - data de nascimento
- ativo - indica se o registro está ativo ou não
- salario - salário de um funcionário
- comentarios - comentários longos sobre um pedido
- quantidade - quantidade de itens

{% toggle "Ver solução" %}

```sql
email - VARCHAR(255)
data_nascimento - DATE
ativo - BOOLEAN
salario - DECIMAL(10,2)
comentarios - TEXT
quantidade - INT
```
{% endtoggle %}

## Exercício 3: Identificando erros

O comando SQL abaixo contém erros. Identifique-os e corrija:

```sql
CREATE TABLE clientes (
  id INTEGER
  nome VARCHAR(200)
  telefone VARCHAR(15),
  endereco TEXT
  ativo BOOLEAN
)
```

{% toggle "Ver solução" %}
- Falta vírgula após id INTEGER
- Falta vírgula após nome VARCHAR(200)
- Falta vírgula após endereco TEXT
- Falta ponto e vírgula no final do comando
{% endtoggle %}


<!--  -->

{% links "Links e referências" %}
- [**One Compiler - Postgres**](https://onecompiler.com/postgresql)
- [**Learning Hub - Tutoriais de SQL**](https://hub.diegopinho.com.br/sql/01-introducao-ao-sql)
{% endlinks %}