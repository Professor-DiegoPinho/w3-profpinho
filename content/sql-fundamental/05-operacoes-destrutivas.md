---
id: "502ddb1f6d16"
title: "Operações destrutivas"
description: "Aprenda a atualizar e deletar dados em tabelas de um banco de dados relacional utilizando SQL."
order: 5
---

# Videoaula
{% embed https://www.youtube.com/embed/2zUUuwh6Oj0 %}

# Compilado(s)

## Atualização de dados (UPDATE)

Não é porque um dado foi inserido na tabela que significa que ele nunca mais será modificado. Erros acontecem, as eventualmente coisas mudam e precisamos ter a capacidade de manter os dados sempre atualizados.

O SQL nos oferece um comando que nos possibilita realizar alterações nos dados que já foram registrados na tabela. Este comando é o `UPDATE`.  Assim como no  `INSERT`, precisamos discriminar qual é a tabela, quais as colunas que desejamos alterar e seus respectivos valores. Ou seja, não é necessário alterar todos os valores de um registro, podemos facilmente escolher quais desejamos alterar.

Vamos imaginar nossa tabela de alunos com alguns registros:

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

Ops, cometemos um erro! O aluno `Diogo Martins` na verdade deveria ter o nome de `Diego Martins`.  Para que este registro não fique com erro, vamos usar o comando de `UPDATE` para arrumá-lo:

```sql
UPDATE alunos SET nome = 'Diego Martins';
```

O comando acima parece correto e teoricamente ele está. No entanto, da forma como está agora, este comando tem um poder altamente destrutivo 💥.

Como não descriminamos qual é o registro específico que ele deve alterar, o banco de dados irá alterar TODOS os registros da tabela. Ou seja, agora todo mundo tem o mesmo nome!

```sql
id |     nome      | idade |     cpf     | matriculado | data_registro 
----+---------------+-------+-------------+-------------+---------------
  1 | Diego Martins |    18 | 12345678901 | t           | 2026-04-01
  2 | Diego Martins |    21 | 23456789012 | t           | 2026-04-02
  3 | Diego Martins |    19 | 34567890123 | f           | 2026-04-03
  4 | Diego Martins |    25 | 45678901234 | t           | 2026-04-04
  5 | Diego Martins |    22 | 56789012345 | t           | 2026-04-05
  6 | Diego Martins |    20 | 67890123456 | f           | 2026-04-06
  7 | Diego Martins |    17 | 78901234567 | t           | 2026-04-07
  8 | Diego Martins |    23 | 89012345678 | t           | 2026-04-08
  9 | Diego Martins |    24 | 90123456789 | t           | 2026-04-09
 10 | Diego Martins |    26 | 01234567890 | f           | 2026-04-10
(10 rows)
```

É por isso que precisamos usar sempre a cláusula `WHERE`. Esta cláusula nos permite especificar quais registros devem ser alterados com base em um ou mais critérios. Neste exemplo, podemos usar o próprio nome errado como critério de busca:

```sql
UPDATE alunos 
SET nome = 'Diego Martins'
WHERE nome = 'Diogo Martins';
```

Este código funciona, mas sempre que quisermos alterar somente um único registro, o melhor caminho é usar o `id` como critério, pois sendo uma chave primária (PK) isso significa que com certeza ninguém mais atenderá a este critério:

```sql
UPDATE alunos
SET nome = 'Diego Martins'
WHERE id = 4;
```

Mas caso a gente descubra que além do nome também erramos a idade, veja como é possível alterar os dois valores simultaneamente:

```sql
UPDATE alunos
SET 
	nome = 'Diego Martins'
	idade = 33
WHERE id = 4;
```

E lembrando que uma vez que o registro foi alterado, já era.

## Remoção de elementos

O que acontece, por exemplo, quando deletamos uma tarefa do nosso aplicativo? Ou quando removemos um item da nossa lista de compras? Jogamos na lixeira determinado item? 

Em muitas situações, desejaremos remover dados das nossas tabelas: seja para ganhar mais espaço, performance ou mesmo só pra “organizar a casa”. O SQL também oferece um comando para isso, o `DELETE`. Mas assim como no `UPDATE`, é preciso ter muita calma e sutileza ao usá-lo, pois é um comando ALTAMENTE destrutivo.

Vamos imaginar que uma das nossas alunas se formou e não precisa estar mais na tabela. Poderíamos pensar no comando desta forma:

```sql
DELETE from alunos WHERE id = 1;
```

Notou a importância dos ids (e valores com a constraint unique) para operações como essa? Isso nos garante que não mexeremos onde não devemos. Da mesma forma que no `UPDATE`, se executarmos:

```sql
DELETE FROM alunos;
```

Todos os registros da tabela serão removidos. Geralmente não vamos querer fazer isso, mas se por acaso realmente seu objetivo é deletar tudo, existe um comando mais adequado:

```sql
TRUNCATE TABLE alunos;
```

E se o objetivo for exterminar a tabela da face da Terra, podemos usar este comando:

```sql
DROP TABLE alunos;
```

A diferença aqui é que o `TRUNCATE` é um comando de remoção de registros em lote mais eficaz que o `DELETE` enquanto o `DROP TABLE` remove todos os elementos além da própria tabela. Ou seja, se quisermos usá-la novamente é preciso recriá-la.
    
# Exercícios

## Exercício 1: Corrigindo um registro com UPDATE

Considere a tabela `alunos` criada e populada conforme o exemplo da aula. Percebeu-se que a aluna `Gabriela Rocha` teve a idade registrada errada — a idade correta é `18`. Escreva o `UPDATE` adequado para corrigir apenas o registro dela.

{% toggle "Ver solução" %}

```sql
UPDATE alunos
SET idade = 18
WHERE id = 7;
```
{% endtoggle %}

## Exercício 2: Atualizando múltiplos campos

Descobriu-se que o aluno `João Pedro` está com o nome e a situação de matrícula incorretos. O nome correto é `"João Pedro Alves"` e ele na verdade está matriculado. Escreva um único `UPDATE` que corrija os dois campos ao mesmo tempo.

{% toggle "Ver solução" %}

```sql
UPDATE alunos
SET
	nome = 'João Pedro Alves',
	matriculado = TRUE
WHERE id = 10;
```
{% endtoggle %}

## Exercício 3: O perigo do UPDATE sem WHERE

Analise o comando abaixo e explique o que aconteceria se ele fosse executado na tabela `alunos`. Em seguida, reescreva-o de forma segura para cancelar a matrícula somente do aluno com `id = 6`.

```sql
UPDATE alunos SET matriculado = FALSE;
```

{% toggle "Ver solução" %}

**Problema:** sem a cláusula `WHERE`, o comando atualiza **todos** os registros da tabela. Todos os alunos teriam `matriculado` alterado para `FALSE`.

**Comando correto:**
```sql
UPDATE alunos
SET matriculado = FALSE
WHERE id = 6;
```
{% endtoggle %}

## Exercício 4: Removendo registros com DELETE

Execute os passos a seguir em ordem:

1. Delete o aluno com `id = 1` da tabela.
2. Delete todos os alunos que **não estão matriculados** (`matriculado = FALSE`).

{% toggle "Ver solução" %}

```sql
-- Passo 1
DELETE FROM alunos
WHERE id = 1;

-- Passo 2
DELETE FROM alunos
WHERE matriculado = FALSE;
```
{% endtoggle %}

## Exercício 5: DELETE, TRUNCATE e DROP — qual usar?

Leia os três cenários abaixo e escreva o comando SQL mais adequado para cada um:

- **Cenário A:** você quer remover somente os alunos com `idade < 18` da tabela.
- **Cenário B:** o sistema vai ser reiniciado e você precisa esvaziar a tabela `alunos` rapidamente, mantendo sua estrutura para uso futuro.
- **Cenário C:** o projeto foi encerrado e a tabela `alunos` não é mais necessária — ela deve ser eliminada completamente do banco.

{% toggle "Ver solução" %}

**Cenário A:**
```sql
DELETE FROM alunos
WHERE idade < 18;
```

**Cenário B:**
```sql
TRUNCATE TABLE alunos;
```

**Cenário C:**
```sql
DROP TABLE alunos;
```
{% endtoggle %}

<!-- Links e referências -->

{% links "Links e referências" %}
- [**One Compiler - Postgres**](https://onecompiler.com/postgresql)
- [**Learning Hub - Tutoriais de SQL**](https://hub.diegopinho.com.br/sql/01-introducao-ao-sql)
{% endlinks %}