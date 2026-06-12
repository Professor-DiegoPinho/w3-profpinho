---
id: "8b3abccc45a8"
title: "Resumo Prático de SQL"
description: "Guia essencial de SQL em português para iniciantes. Conceitos fundamentais com exemplos práticos de banco de dados."
order: 1
---

## 1. Conceitos Básicos e Sintaxe

```sql
-- Comentários em SQL começam com dois hífens (ou /* ... */ para blocos)
-- Cada comando é encerrado com um ponto e vírgula (;)

/* SQL não diferencia maiúsculas de minúsculas para palavras-chave,
   mas é convenção escrevê-las em MAIÚSCULAS para melhor legibilidade */

-- Palavras-chave (case-insensitive)
SELECT, FROM, WHERE, CREATE, INSERT, UPDATE, DELETE

-- Nomes de tabelas e colunas (case-sensitive)
SELECT nome FROM usuarios    -- correto
SELECT NOME FROM usuarios    -- pode não encontrar a coluna
```

## 2. Bancos de Dados

```sql
-- Criar um novo banco de dados
CREATE DATABASE loja_online;

-- Listar todos os bancos de dados disponíveis
SHOW DATABASES;

-- Usar um banco de dados específico
USE loja_online;

-- Deletar um banco de dados (cuidado!)
DROP DATABASE loja_online;

-- Verificar qual banco de dados está em uso
SELECT DATABASE();
```

## 3. Seleções Básicas (SELECT)

```sql
-- Usar banco de dados para os exemplos
USE loja_online;

-- Selecionar todas as colunas de uma tabela
SELECT * FROM produtos;

-- Selecionar apenas colunas específicas
SELECT id, nome, preco FROM produtos;

-- Selecionar com alias (renomear) para melhor legibilidade
SELECT
    id AS produto_id,
    nome AS nome_do_produto,
    preco AS valor_unitario
FROM produtos;

-- Limitar o número de resultados
SELECT * FROM clientes LIMIT 10;

-- Pular linhas e depois limitar (offset)
SELECT * FROM pedidos LIMIT 10 OFFSET 20;
```

## 4. Filtros e Condições (WHERE)

```sql
-- Filtrar linhas por uma condição simples
SELECT * FROM produtos WHERE preco > 100;

-- Múltiplas condições com AND e OR
SELECT * FROM produtos
WHERE categoria = 'eletrônicos' AND preco < 500;

SELECT * FROM clientes
WHERE cidade = 'São Paulo' OR cidade = 'Rio de Janeiro';

-- Operadores de comparação
SELECT * FROM pedidos WHERE data_pedido = '2024-01-15';
SELECT * FROM produtos WHERE estoque >= 50;
SELECT * FROM usuarios WHERE ativo != 0;

-- Padrões com LIKE (wildcards: % para múltiplos caracteres, _ para um)
SELECT * FROM clientes WHERE nome LIKE 'Maria%';       -- Começa com Maria
SELECT * FROM clientes WHERE nome LIKE '%Silva';       -- Termina com Silva
SELECT * FROM produtos WHERE descricao LIKE '%azul%';   -- Contém azul

-- Verificar se está em uma lista
SELECT * FROM produtos WHERE categoria IN ('livros', 'ebooks', 'audiobooks');

-- Verificar valores nulos
SELECT * FROM usuarios WHERE telefone IS NULL;
SELECT * FROM usuarios WHERE data_cancelamento IS NOT NULL;

-- Intervalo de valores
SELECT * FROM vendas WHERE valor BETWEEN 1000 AND 5000;
```

## 5. Agregação e Operadores

```sql
-- Contar linhas
SELECT COUNT(*) FROM pedidos;

-- Contar com condição
SELECT COUNT(*) FROM pedidos WHERE status = 'entregue';

-- Valores únicos (sem duplicatas)
SELECT DISTINCT cidade FROM clientes;
SELECT DISTINCT categoria FROM produtos ORDER BY categoria;

-- Contar valores únicos
SELECT COUNT(DISTINCT categoria) FROM produtos;

-- Operações matemáticas
SELECT SUM(valor) FROM pedidos;                    -- Soma total
SELECT AVG(preco) FROM produtos;                   -- Média
SELECT MAX(data_pedido) FROM pedidos;              -- Valor máximo
SELECT MIN(estoque) FROM produtos;                 -- Valor mínimo

-- Agrupar dados com GROUP BY
SELECT categoria, COUNT(*) as quantidade FROM produtos GROUP BY categoria;

SELECT cidade, SUM(total) as vendas_totais
FROM pedidos
GROUP BY cidade
ORDER BY vendas_totais DESC;

-- Filtrar grupos com HAVING
SELECT
    categoria,
    COUNT(*) as quantidade_produtos,
    AVG(preco) as preco_medio
FROM produtos
GROUP BY categoria
HAVING COUNT(*) > 5;
```

## 6. Ordenação e Seleção Avançada

```sql
-- Ordenar resultados
SELECT * FROM produtos ORDER BY nome;            -- Ascendente (padrão)
SELECT * FROM produtos ORDER BY preco DESC;      -- Descendente
SELECT * FROM produtos ORDER BY categoria ASC, preco DESC;  -- Múltiplas colunas

-- Remover duplicatas
SELECT DISTINCT email FROM usuarios;

-- Operações entre colunas
SELECT
    nome,
    preco,
    estoque,
    preco * estoque as valor_total_estoque
FROM produtos;

-- Concatenação de strings
SELECT CONCAT(primeiro_nome, ' ', sobrenome) as nome_completo FROM usuarios;
SELECT primeiro_nome || ' ' || sobrenome as nome_completo FROM usuarios;  -- PostgreSQL

-- Operações com strings
SELECT UPPER(nome) as nome_maiusculo FROM clientes;
SELECT LENGTH(descricao) as quantidade_caracteres FROM produtos;
```

## 7. Junções (JOINs)

```sql
-- INNER JOIN - apenas registros com correspondência em ambas as tabelas
SELECT
    c.nome,
    p.numero_pedido,
    p.valor
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id;

-- LEFT JOIN - todos os registros da tabela esquerda, mesmo sem correspondência
SELECT
    c.nome,
    COUNT(p.id) as total_pedidos
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nome;

-- RIGHT JOIN - todos os registros da tabela direita
SELECT
    c.nome,
    p.numero_pedido
FROM clientes c
RIGHT JOIN pedidos p ON c.id = p.cliente_id;

-- FULL OUTER JOIN - todos os registros de ambas as tabelas
SELECT
    c.nome,
    p.numero_pedido
FROM clientes c
FULL OUTER JOIN pedidos p ON c.id = p.cliente_id;

-- Múltiplos JOINs
SELECT
    c.nome,
    p.numero_pedido,
    i.nome_produto,
    i.quantidade
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
INNER JOIN itens_pedido i ON p.id = i.pedido_id;
```

## 8. Inserção, Atualização e Exclusão

```sql
-- Inserir uma nova linha
INSERT INTO usuarios (nome, email, data_criacao)
VALUES ('João Santos', 'joao@email.com', '2024-01-15');

-- Inserir múltiplas linhas
INSERT INTO categorias (nome, descricao) VALUES
    ('Eletrônicos', 'Produtos eletrônicos em geral'),
    ('Livros', 'Livros de diversos gêneros');

-- Atualizar dados existentes
UPDATE produtos SET preco = 150 WHERE id = 5;

-- Atualizar múltiplas colunas
UPDATE usuarios
SET data_atualizacao = '2024-01-20', ativo = 1
WHERE email = 'usuarios@example.com';

-- Atualizar com condição
UPDATE pedidos
SET status = 'enviado'
WHERE data_pedido < '2024-01-10' AND status = 'preparando';

-- Deletar registros
DELETE FROM carrinho WHERE session_id = 'abc123';

-- Deletar com condição
DELETE FROM logs WHERE data_criacao < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- Deletar todos os registros de uma tabela (deixando estrutura intacta)
DELETE FROM tabela_temporaria;
```

## 9. Criação e Modificação de Tabelas

```sql
-- Criar uma tabela com tipos de dados e constraints
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT 1
);

-- Criar tabela com chave estrangeira
CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_pedido VARCHAR(50) UNIQUE,
    usuario_id INT NOT NULL,
    valor DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'pendente',
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Adicionar uma nova coluna
ALTER TABLE usuarios ADD COLUMN telefone VARCHAR(20);

-- Modificar tipo de dados de uma coluna
ALTER TABLE usuarios MODIFY COLUMN nome VARCHAR(150);

-- Remover uma coluna
ALTER TABLE usuarios DROP COLUMN telefone;

-- Adicionar uma constraint
ALTER TABLE usuarios ADD CONSTRAINT uq_email UNIQUE (email);

-- Deletar uma tabela (estrutura e dados)
DROP TABLE usuarios;

-- Ver estrutura de uma tabela
DESCRIBE usuarios;
SHOW COLUMNS FROM usuarios;
```

## 10. Conceitos Avançados

```sql
-- Subconsultas (Subqueries)
SELECT nome, preco FROM produtos
WHERE preco > (SELECT AVG(preco) FROM produtos);

-- Subconsulta com IN
SELECT * FROM clientes
WHERE id IN (SELECT cliente_id FROM pedidos WHERE valor > 1000);

-- CASE - Condicional dentro do SELECT
SELECT
    nome,
    preco,
    CASE
        WHEN preco < 50 THEN 'Barato'
        WHEN preco < 200 THEN 'Moderado'
        ELSE 'Caro'
    END as faixa_preco
FROM produtos;

-- UNION - Combinar resultados de múltiplas queries
SELECT nome, 'Cliente' as tipo FROM clientes
UNION
SELECT nome, 'Fornecedor' as tipo FROM fornecedores;

-- VIEW - Consulta salva como tabela virtual
CREATE VIEW clientes_premium AS
SELECT c.* FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id
HAVING SUM(p.valor) > 10000;

-- Usar a view como tabela normal
SELECT * FROM clientes_premium;

-- Transações - garantir integridade dos dados
START TRANSACTION;

UPDATE contas SET saldo = saldo - 100 WHERE id = 1;
UPDATE contas SET saldo = saldo + 100 WHERE id = 2;

COMMIT;  -- Salva as mudanças
-- ROLLBACK;  -- Desfaz as mudanças se algo der errado
```