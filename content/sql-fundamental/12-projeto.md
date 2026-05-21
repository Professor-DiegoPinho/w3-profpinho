---
title: "Projeto Final"
description: "Coloque em prática tudo que você aprendeu criando e consultando um banco de dados de filmes completo, do zero."
order: 12
---

## Projeto Final: Banco de Dados de Filmes

<!-- # Videoaula
{% embed https://www.youtube.com/embed/ %} -->

### Descrição

Neste projeto você criará um banco de dados para gerenciar o catálogo de filmes de uma pequena plataforma de streaming. A partir de uma tabela bem estruturada e com dados reais, você vai exercitar todos os comandos aprendidos durante o curso: desde a criação da tabela com restrições até consultas complexas com filtros, ordenação, paginação e funções agregadoras.

### Como funciona

- Você criará uma tabela chamada `filmes` com colunas que representam informações reais de um catálogo;
- Em seguida, vai popular essa tabela com pelo menos 10 filmes de gêneros diferentes;
- Com os dados inseridos, vai escrever uma série de consultas para responder perguntas sobre o catálogo;
- Também vai atualizar e remover registros para simular a manutenção do banco de dados;
- Ao final, você terá um script SQL completo que documenta todas as operações do projeto.

### Objetivos do projeto

- Praticar a criação de tabelas com `CREATE TABLE` e o uso de constraints (`PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`);
- Exercitar a inserção de dados com `INSERT INTO`;
- Usar `SELECT` com `WHERE` para filtrar registros por diferentes critérios;
- Aplicar os operadores `AND`, `OR`, `NOT`, `LIKE`, `BETWEEN` e `IN` em consultas reais;
- Controlar e ordenar resultados com `ORDER BY`, `LIMIT` e `OFFSET`;
- Resumir informações com as funções agregadoras `COUNT`, `AVG`, `SUM`, `MIN` e `MAX`;
- Agrupar resultados com `GROUP BY` e filtrar grupos com `HAVING`;
- Realizar operações de manutenção com `UPDATE` e `DELETE`.

### O que você deve fazer

**1. Criação da tabela**

Crie uma tabela chamada `filmes` com as seguintes colunas:

| Coluna         | Tipo          | Restrições                                  |
|----------------|---------------|---------------------------------------------|
| `id`           | `SERIAL`      | `PRIMARY KEY`                               |
| `titulo`       | `VARCHAR(150)` | `NOT NULL`, `UNIQUE`                       |
| `diretor`      | `VARCHAR(100)` | `NOT NULL`                                 |
| `genero`       | `VARCHAR(50)`  | `NOT NULL`                                 |
| `ano`          | `INTEGER`      | `NOT NULL`, `CHECK (ano >= 1888)`          |
| `duracao_min`  | `INTEGER`      | `NOT NULL`, `CHECK (duracao_min > 0)`      |
| `nota`         | `DECIMAL(3,1)` | `CHECK (nota >= 0 AND nota <= 10)`         |
| `disponivel`   | `BOOLEAN`      | `NOT NULL`, `DEFAULT TRUE`                 |

**2. Inserção de dados**

Insira pelo menos 10 filmes de gêneros variados (ação, drama, comédia, ficção científica, terror, etc.). Inclua filmes com notas diferentes, anos diferentes e alguns com `disponivel = FALSE` para simular filmes fora do ar.

**3. Consultas obrigatórias**

Escreva uma consulta para cada item abaixo:

- Listar todos os filmes disponíveis (`disponivel = TRUE`), ordenados por nota de forma decrescente;
- Buscar filmes cujo título contenha uma palavra específica (use `LIKE`);
- Buscar filmes lançados entre 2000 e 2020 (use `BETWEEN`);
- Buscar filmes dos gêneros "Ação" ou "Drama" usando `IN`;
- Listar os 3 filmes com maior nota (use `LIMIT`);
- Buscar filmes com duração superior a 120 minutos que sejam disponíveis (use `AND`);
- Buscar filmes que não sejam do gênero "Terror" (use `NOT`);
- Contar quantos filmes existem por gênero (use `COUNT` com `GROUP BY`);
- Calcular a nota média dos filmes disponíveis (use `AVG` com `WHERE`);
- Exibir o ano do filme mais antigo e do mais recente (use `MIN` e `MAX`);
- Listar os gêneros que possuem mais de 1 filme cadastrado (use `GROUP BY` com `HAVING`);
- Simular uma segunda "página" de resultados exibindo filmes do 4º ao 6º lugar por nota (use `LIMIT` com `OFFSET`).

**4. Atualização e remoção**

- Atualize a nota de um filme específico pelo seu `id`;
- Marque um filme como indisponível (`disponivel = FALSE`) sem deletá-lo;
- Delete um filme pelo seu `id`.

### Requisitos

- A tabela deve ser criada com `DROP TABLE IF EXISTS filmes;` antes do `CREATE TABLE`, garantindo que o script rode sem erros mesmo sendo executado mais de uma vez;
- Todas as constraints definidas no modelo devem estar presentes na tabela;
- O projeto deve ter pelo menos 10 filmes inseridos de pelo menos 3 gêneros diferentes;
- Todas as 12 consultas obrigatórias devem estar no script;
- As operações de `UPDATE` e `DELETE` devem usar `WHERE` com o `id` do registro — nunca sem filtro;
- O script completo deve rodar sem erros no [OneCompiler (PostgreSQL)](https://onecompiler.com/postgresql).

### Dicas

- Comece sempre com o `DROP TABLE IF EXISTS filmes;` seguido do `CREATE TABLE` — assim você pode reexecutar o script inteiro sem precisar limpar o banco manualmente;
- Ao inserir os filmes, varie os gêneros de propósito para que as queries de `GROUP BY` e `HAVING` retornem resultados interessantes;
- Para o `LIKE`, lembre-se que `%` substitui qualquer sequência de caracteres: `LIKE '%guerra%'` encontra qualquer título que contenha a palavra "guerra";
- Para a paginação com `OFFSET`, pense assim: se cada página tem 3 resultados, a segunda página começa no offset 3 (`LIMIT 3 OFFSET 3`);
- O `HAVING` funciona como um `WHERE` para grupos — use-o após o `GROUP BY` para filtrar o resultado da agregação;
- Teste as queries de `UPDATE` e `DELETE` antes com um `SELECT` usando o mesmo `WHERE`, para ter certeza de que está afetando o registro certo.
