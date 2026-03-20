---
title: "Relacionamentos entre tabelas"
description: "Como conectar tabelas com chaves primárias e estrangeiras"
order: 31
---

# Relacionamentos entre tabelas

Em bancos relacionais, os dados são organizados em tabelas menores e conectadas, o que evita redundância e mantém a consistência. A conexão entre elas é feita através de **chaves**.

## Chave Primária (PRIMARY KEY)

Identifica cada registro de forma única. Combina `NOT NULL + UNIQUE`:

```sql
CREATE TABLE clientes (
  id    SERIAL PRIMARY KEY,
  nome  VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL
);
```

## Chave Estrangeira (FOREIGN KEY)

Cria um vínculo entre duas tabelas, garantindo que só existam referências válidas:

```sql
CREATE TABLE pedidos (
  id          SERIAL PRIMARY KEY,
  cliente_id  INTEGER REFERENCES clientes(id),
  total       DECIMAL(10, 2),
  status      VARCHAR(20)
);
```

Com isso, o banco impede a inserção de um pedido com um `cliente_id` que não existe.

## Tipos de relacionamentos

### Um para muitos (1:N) — o mais comum

Um cliente pode ter muitos pedidos. Cada pedido pertence a um único cliente:

```sql
-- cliente_id conecta as duas tabelas
INSERT INTO pedidos (cliente_id, total, status) VALUES (1, 3500, 'concluido');
INSERT INTO pedidos (cliente_id, total, status) VALUES (1, 179.80, 'concluido');
```

### Um para um (1:1)

Um registro de uma tabela se relaciona com exatamente um registro de outra. Útil para separar dados sensíveis ou raramente acessados:

```sql
CREATE TABLE clientes_detalhes (
  cliente_id    INTEGER UNIQUE REFERENCES clientes(id),
  cpf           VARCHAR(14) UNIQUE NOT NULL,
  data_nascimento DATE
);
```

### Muitos para muitos (N:M)

Um pedido pode ter vários produtos, e um produto pode estar em vários pedidos. Resolve-se com uma **tabela intermediária**:

```sql
CREATE TABLE itens_pedido (
  pedido_id   INTEGER REFERENCES pedidos(id) ON DELETE CASCADE,
  produto_id  INTEGER REFERENCES produtos(id),
  quantidade  INTEGER NOT NULL,
  PRIMARY KEY (pedido_id, produto_id)
);
```

## Comportamento ao deletar — ON DELETE

| Opção         | O que acontece quando o registro pai é deletado |
|---------------|------------------------------------------------|
| `RESTRICT`    | Impede a deleção (padrão)                      |
| `CASCADE`     | Deleta também os registros dependentes          |
| `SET NULL`    | Define a chave estrangeira como NULL            |
| `SET DEFAULT` | Define o valor padrão na chave estrangeira      |

```sql
-- Se o pedido for deletado, os itens do pedido também são deletados
FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE
```
