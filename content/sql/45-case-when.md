---
title: "SQL CASE WHEN"
description: "Como adicionar lógica condicional nas queries com CASE WHEN"
order: 45
---

# SQL CASE WHEN

O `CASE WHEN` é a forma do SQL de escrever lógica condicional, equivalente ao `if/else` de outras linguagens. Ele avalia condições em sequência e retorna o valor correspondente à primeira condição verdadeira.

## Sintaxe

```sql
CASE
  WHEN condição1 THEN resultado1
  WHEN condição2 THEN resultado2
  ELSE resultado_padrão
END
```

## Exemplo — classificando por faixa de preço

```sql
SELECT
  nome,
  preco,
  CASE
    WHEN preco < 100  THEN 'Barato'
    WHEN preco < 500  THEN 'Médio'
    WHEN preco < 2000 THEN 'Caro'
    ELSE 'Premium'
  END AS faixa_de_preco
FROM produtos;
```

| nome     | preco  | faixa_de_preco |
|----------|--------|----------------|
| Notebook | 3500   | Premium        |
| Mouse    | 89.90  | Barato         |
| Teclado  | 199.90 | Médio          |
| Mesa     | 850    | Caro           |

## CASE simples — comparando um valor fixo

Quando você compara a mesma coluna com vários valores:

```sql
SELECT
  id,
  status,
  CASE status
    WHEN 'concluido'  THEN 'Finalizado'
    WHEN 'pendente'   THEN 'Aguardando'
    WHEN 'cancelado'  THEN 'Cancelado'
    ELSE 'Desconhecido'
  END AS status_descricao
FROM pedidos;
```

## CASE no ORDER BY

Útil para criar ordenações personalizadas:

```sql
SELECT nome, status FROM pedidos
ORDER BY
  CASE status
    WHEN 'pendente'  THEN 1
    WHEN 'concluido' THEN 2
    WHEN 'cancelado' THEN 3
  END;
```

## CASE com GROUP BY

```sql
-- Contagem de produtos por faixa de preço
SELECT
  CASE
    WHEN preco < 100  THEN 'Barato'
    WHEN preco < 500  THEN 'Médio'
    ELSE 'Caro'
  END AS faixa,
  COUNT(*) AS total
FROM produtos
GROUP BY
  CASE
    WHEN preco < 100  THEN 'Barato'
    WHEN preco < 500  THEN 'Médio'
    ELSE 'Caro'
  END;
```

> O `CASE` sempre precisa ser encerrado com `END`. Esquecer o `END` é um dos erros mais comuns — fique de olho!
