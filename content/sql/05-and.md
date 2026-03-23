---
title: "SQL AND"
description: "Como combinar condições no WHERE exigindo que todas sejam verdadeiras"
order: 5
---

# SQL AND

O operador `AND` combina duas ou mais condições no `WHERE`. Para um registro aparecer no resultado, **todas** as condições precisam ser verdadeiras.

## Sintaxe

```sql
SELECT coluna1, coluna2
FROM nome_da_tabela
WHERE condição1 AND condição2;
```

## Exemplo

```sql
-- Produtos da categoria Eletrônicos com preço abaixo de 200
SELECT nome, categoria, preco
FROM produtos
WHERE categoria = 'Eletrônicos' AND preco < 200;
```

| nome    | categoria   | preco  |
|---------|-------------|--------|
| Mouse   | Eletrônicos | 89.90  |
| Teclado | Eletrônicos | 199.90 |

O Notebook (R$ 3500) e os Móveis não aparecem porque não atendem **ambas** as condições ao mesmo tempo.

## Mais de duas condições

Você pode encadear quantos `AND` precisar:

```sql
SELECT nome FROM produtos
WHERE categoria = 'Eletrônicos'
  AND preco < 200
  AND estoque > 50;
```

## AND com OR — atenção à precedência

O `AND` é avaliado **antes** do `OR`. Use parênteses para garantir a lógica correta:

```sql
-- Sem parênteses: pode não se comportar como esperado
WHERE categoria = 'Móveis' OR preco > 1000 AND estoque > 20

-- Com parênteses: intenção explícita
WHERE (categoria = 'Móveis' OR preco > 1000) AND estoque > 20
```

> Sempre use parênteses ao misturar `AND` e `OR`. O código fica mais claro e você evita bugs silenciosos.
