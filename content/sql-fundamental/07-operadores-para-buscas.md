---
id: "927fd3c2ef63"
title: "Operadores para buscas"
description: "Aprenda a utilizar operadores de busca em consultas SQL para filtrar e refinar os resultados retornados por uma consulta."
order: 7
---

# Videoaula
{% embed https://www.youtube.com/embed/k2PQahk1C40 %}

# Compilado(s)

## Operadores para buscas

Aprendemos como fazer consultas nas tabelas do nosso banco utilizando o comando `SELECT`. No entanto, uma das grandes capacidades do SQL é conseguir criar consultas bem específicas usando alguns operadores especiais.

Para entender como podemos fazer buscas mais específicas no SQL, partiremos da mesma base de dados da aula anterior:

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

A partir desta base, vamos imaginar que precisamos buscar todos os alunos matriculados que são maiores de idade. Neste cenário, temos duas condições que precisam ser verdadeiras simultaneamente:

- idade ≥ 18;
- matriculado = TRUE.

Para combinar duas ou mais condições que precisam ser verdadeiras simultaneamente, podemos usar o operador lógico `AND`. Se apenas uma das condições for verdadeira, o registro não aparece.

```sql
SELECT * FROM alunos
WHERE matriculado = TRUE AND idade >= 18;
```

Agora quando queremos ser mais flexíveis, podemos usar o operador lógico `OR`. Como por exemplo, ao solicitar alunos que não estão matriculados ou são menores de idade:

```sql
SELECT * FROM alunos
WHERE matriculado = FALSE OR idade < 18;
```

Seguindo esta mesma linha temos o operador lógico `NOT`. O `NOT` serve para negar uma condição. Podemos usá-lo para escrever as consultas de forma diferente, por exemplo:

```sql
SELECT * FROM alunos
WHERE idade < 18

-- pode ser reescrito como

SELECT * FROM alunos
WHERE NOT idade >= 18
```

# Exercícios

## Exercício 1: Usando AND

Usando a tabela `alunos` da aula, escreva uma consulta que retorne o `nome` e a `idade` de todos os alunos que estão **matriculados** e têm **menos de 22 anos**.

{% toggle "Ver solução" %}

```sql
SELECT nome, idade FROM alunos
WHERE matriculado = TRUE AND idade < 22;
```
{% endtoggle %}

## Exercício 2: Usando OR

Escreva uma consulta que retorne o `nome` e a `data_registro` dos alunos que foram registrados **antes de 2026-04-03** ou que **não estão matriculados**.

{% toggle "Ver solução" %}

```sql
SELECT nome, data_registro FROM alunos
WHERE data_registro < '2026-04-03' OR matriculado = FALSE;
```
{% endtoggle %}

## Exercício 3: Usando NOT

Os dois comandos abaixo produzem o mesmo resultado? Explique e, em seguida, escreva uma terceira forma equivalente usando `NOT`.

```sql
-- Comando A
SELECT * FROM alunos
WHERE matriculado = FALSE;

-- Comando B
SELECT * FROM alunos
WHERE NOT matriculado = TRUE;
```

{% toggle "Ver solução" %}

**Sim**, ambos produzem o mesmo resultado — os dois filtram os alunos que **não estão matriculados**. O `NOT` nega a condição que o segue.

**Terceira forma equivalente:**
```sql
SELECT * FROM alunos
WHERE NOT matriculado;
```
{% endtoggle %}

## Exercício 4: Combinando AND, OR e NOT

Escreva uma consulta que retorne o `nome` e a `idade` dos alunos que **estão matriculados** e têm **idade entre 20 e 24 anos** (inclusive), mas **excluindo** quem tem exatamente 22 anos.

{% toggle "Ver solução" %}

```sql
SELECT nome, idade FROM alunos
WHERE matriculado = TRUE AND idade >= 20 AND idade <= 24 AND NOT idade = 22;
```
{% endtoggle %}

## Exercício 5: Identificando erros lógicos

Analise a consulta abaixo. Ela deveria retornar os alunos **não matriculados com mais de 20 anos**, mas está retornando resultados incorretos. Identifique o problema e corrija.

```sql
SELECT * FROM alunos
WHERE NOT matriculado = TRUE OR idade > 20;
```

{% toggle "Ver solução" %}

**Problema:** o operador `OR` faz com que a condição seja satisfeita se **qualquer uma** delas for verdadeira. Assim, qualquer aluno com mais de 20 anos aparece no resultado, independente de estar matriculado ou não.

**Correção:**
```sql
SELECT * FROM alunos
WHERE NOT matriculado = TRUE AND idade > 20;
```
{% endtoggle %}

<!-- Links e referências -->

{% links "Links e referências" %}
- [**One Compiler - Postgres**](https://onecompiler.com/postgresql)
- [**Learning Hub - Tutoriais de SQL**](https://hub.diegopinho.com.br/sql/01-introducao-ao-sql)
{% endlinks %}