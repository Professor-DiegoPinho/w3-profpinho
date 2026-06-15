---
id: "98d26ed8a12d"
title: "Prática com SQL"
description: "Coloque em prática os conhecimentos adquiridos sobre SQL com exercícios práticos e desafiadores."
order: 11
---

# Videoaula
{% embed https://www.youtube.com/embed/5i96fhBlxU8 %}

# Compilado(s)

## Prática com SQL

Uma loja de tecnologia começou a cadastrar seus produtos em um banco de dados. Agora, a equipe quer usar SQL para gerar alguns indicadores simples sobre os produtos cadastrados.

```sql
DROP TABLE IF EXISTS produtos;

CREATE TABLE produtos (
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	categoria TEXT NOT NULL,
	preco NUMERIC(10, 2) CHECK (preco > 0),
	estoque INTEGER CHECK (estoque >= 0),
	ativo BOOLEAN DEFAULT TRUE,
	data_cadastro DATE DEFAULT NOW()
);

INSERT INTO produtos (nome, categoria, preco, estoque, ativo, data_cadastro) VALUES
('Notebook Lenovo', 'Eletrônicos', 3500.00, 8, TRUE, '2026-04-01'),
('Mouse sem fio', 'Acessórios', 89.90, 35, TRUE, '2026-04-02'),
('Teclado mecânico', 'Acessórios', 249.90, 15, TRUE, '2026-04-03'),
('Monitor 24 polegadas', 'Eletrônicos', 899.00, 12, TRUE, '2026-04-04'),
('Cadeira gamer', 'Móveis', 1200.00, 5, TRUE, '2026-04-05'),
('Mesa de escritório', 'Móveis', 750.00, 7, FALSE, '2026-04-06'),
('Headset gamer', 'Acessórios', 199.90, 20, TRUE, '2026-04-07'),
('Webcam Full HD', 'Eletrônicos', 299.90, 18, TRUE, '2026-04-08'),
('Suporte para notebook', 'Acessórios', 120.00, 25, TRUE, '2026-04-09'),
('Impressora multifuncional', 'Eletrônicos', 650.00, 4, FALSE, '2026-04-10'),

('Smartphone Samsung', 'Eletrônicos', 2200.00, 10, TRUE, '2026-04-11'),
('Tablet Android', 'Eletrônicos', 1300.00, 6, TRUE, '2026-04-12'),
('Carregador USB-C', 'Acessórios', 79.90, 40, TRUE, '2026-04-13'),
('Cabo HDMI', 'Acessórios', 45.00, 60, TRUE, '2026-04-14'),
('Hub USB', 'Acessórios', 110.00, 22, TRUE, '2026-04-15'),
('Roteador Wi-Fi', 'Eletrônicos', 350.00, 14, TRUE, '2026-04-16'),
('SSD 1TB', 'Componentes', 499.90, 16, TRUE, '2026-04-17'),
('Memória RAM 16GB', 'Componentes', 320.00, 18, TRUE, '2026-04-18'),
('Placa de vídeo RTX', 'Componentes', 2800.00, 3, TRUE, '2026-04-19'),
('Fonte 650W', 'Componentes', 390.00, 9, TRUE, '2026-04-20'),

('Armário para escritório', 'Móveis', 980.00, 4, TRUE, '2026-04-21'),
('Gaveteiro', 'Móveis', 430.00, 8, TRUE, '2026-04-22'),
('Luminária de mesa', 'Móveis', 150.00, 30, TRUE, '2026-04-23'),
('Microfone USB', 'Acessórios', 280.00, 11, FALSE, '2026-04-24'),
('Caixa de som Bluetooth', 'Eletrônicos', 180.00, 19, TRUE, '2026-04-25');
```

a) Quantos produtos existem cadastrados na tabela?

```sql
SELECT COUNT(*) AS total_produtos
FROM produtos;
-- 25
```

b) Qual é a quantidade total de itens em estoque?

```sql
SELECT SUM(estoque) AS total_estoque
FROM produtos;
-- 419
```

c) Qual é o preço médio dos produtos? *(e arredondar para duas casas decimais)*

```sql
SELECT ROUND(AVG(preco), 2) AS preco_medio_arredondado
FROM produtos;
-- 722.94
```

d) Qual é a soma do estoque considerando apenas produtos ativos?

```sql
SELECT SUM(estoque) AS estoque_produtos_ativos
FROM produtos
WHERE ativo = TRUE;
-- 397
```

e) Qual é o valor total do estoque, considerando `preco * estoque`?

```sql
SELECT SUM(preco * estoque) AS valor_total_estoque
FROM produtos;
-- 158973.60
```

f) Qual é o valor total do estoque apenas dos eletrônicos ativos?

```sql
SELECT SUM(preco * estoque) AS valor_total_estoque_ativos
FROM produtos
WHERE categoria = 'Eletrônicos' AND ativo = TRUE;
-- 148043.60
```