---
id: "577ad62b433d"
title: "Sintaxe SQL"
description: "As regras básicas que toda query SQL precisa seguir"
order: 2
---

# Sintaxe SQL

Antes de escrever a primeira query, vale entender as regras básicas da linguagem. São poucas e simples.

## Estrutura de uma query

A query SQL mais comum tem essa estrutura:

```sql
SELECT coluna1, coluna2
FROM nome_da_tabela
WHERE condição;
```

- `SELECT` — define quais colunas retornar;
- `FROM` — de qual tabela buscar os dados;
- `WHERE` — filtra os registros (opcional).

## SQL não diferencia maiúsculas de minúsculas

`SELECT`, `select` e `Select` funcionam do mesmo jeito. Mas a convenção amplamente adotada é escrever as **palavras-chave em maiúsculas** e os nomes de tabelas e colunas em minúsculas:

```sql
-- Recomendado
SELECT nome, preco FROM produtos WHERE preco > 100;

-- Funciona, mas foge do padrão
select nome, preco from produtos where preco > 100;
```

## Ponto e vírgula

O `;` indica o fim de uma instrução. Em muitas ferramentas ele é obrigatório. Use sempre para evitar problemas.

## Comentários

```sql
-- Comentário de uma linha

/*
  Comentário de
  múltiplas linhas
*/

SELECT nome FROM produtos; -- seleciona os nomes
```

## Formatação

O SQL ignora espaços extras e quebras de linha. Use isso a seu favor para formatar as queries e facilitar a leitura:

```sql
-- Difícil de ler
SELECT nome,preco,estoque FROM produtos WHERE categoria='Eletrônicos' ORDER BY preco;

-- Muito mais legível
SELECT nome, preco, estoque
FROM produtos
WHERE categoria = 'Eletrônicos'
ORDER BY preco;
```

> Código bem formatado não muda o resultado mas faz toda a diferença para quem vai ler depois (inclusive você mesmo, daqui a algumas semanas).
