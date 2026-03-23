---
title: "SQL Operadores e Funções Numéricas"
description: "Como realizar cálculos e operações matemáticas no SQL"
order: 46
---

# SQL Operadores e Funções Numéricas

O SQL permite fazer cálculos diretamente nas queries tanto com operadores matemáticos simples quanto com funções específicas.

## Operadores aritméticos

| Operador | Operação       | Exemplo           | Resultado |
|----------|----------------|-------------------|-----------|
| `+`      | Adição         | `100 + 50`        | 150       |
| `-`      | Subtração      | `100 - 30`        | 70        |
| `*`      | Multiplicação  | `preco * 1.1`     | +10%      |
| `/`      | Divisão        | `total / 12`      | por mês   |
| `%`      | Módulo (resto) | `10 % 3`          | 1         |

## Exemplos práticos

```sql
-- Preço com 10% de desconto e com 10% de imposto
SELECT
  nome,
  preco,
  ROUND(preco * 0.9, 2)  AS preco_com_desconto,
  ROUND(preco * 1.1, 2)  AS preco_com_imposto,
  preco * estoque        AS valor_em_estoque
FROM produtos;
```

## Funções matemáticas

| Função          | O que faz                              | Exemplo                    |
|-----------------|----------------------------------------|----------------------------|
| `ROUND(x, n)`  | Arredonda para `n` casas decimais      | `ROUND(89.567, 2)` → 89.57 |
| `CEIL(x)`      | Arredonda sempre para cima             | `CEIL(89.1)` → 90          |
| `FLOOR(x)`     | Arredonda sempre para baixo            | `FLOOR(89.9)` → 89         |
| `ABS(x)`       | Valor absoluto (remove o sinal)        | `ABS(-50)` → 50            |
| `POWER(x, n)`  | Potência                               | `POWER(2, 8)` → 256        |
| `SQRT(x)`      | Raiz quadrada                          | `SQRT(144)` → 12           |
| `MOD(x, y)`    | Resto da divisão                       | `MOD(10, 3)` → 1           |

```sql
-- Exemplos aplicados
SELECT
  ROUND(3.14159, 2),   -- 3.14
  CEIL(4.1),           -- 5
  FLOOR(4.9),          -- 4
  ABS(-200),           -- 200
  POWER(2, 10),        -- 1024
  SQRT(225);           -- 15
```

## Divisão inteira e cuidados com zero

Em SQL, dividir dois inteiros pode resultar em divisão inteira (sem casas decimais):

```sql
SELECT 7 / 2;      -- resultado: 3 (não 3.5!)
SELECT 7.0 / 2;    -- resultado: 3.5
SELECT 7 / 2.0;    -- resultado: 3.5
```

Para evitar divisão por zero (que causa erro), use `NULLIF`:

```sql
-- Retorna NULL em vez de erro quando o divisor é 0
SELECT total / NULLIF(quantidade, 0) AS preco_unitario
FROM itens_pedido;
```

## Operadores de comparação e lógicos

Além dos aritméticos, você já conhece os de comparação (`=`, `!=`, `>`, `<`, `>=`, `<=`) e os lógicos (`AND`, `OR`, `NOT`) amplamente usados no `WHERE`.

> Operações matemáticas com `NULL` sempre resultam em `NULL`. Se precisar tratar `NULL` como zero em um cálculo, use `COALESCE(coluna, 0)`.
