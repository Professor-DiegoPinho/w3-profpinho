---
title: "Comentários"
description: "Como escrever comentários em Java"
order: 5
---

# Comentários em Java

Comentários são trechos de texto ignorados pelo compilador. Servem para explicar o código e deixá-lo mais fácil de entender.

## Comentário de uma linha

Usa `//`. Tudo que vem depois dele, na mesma linha, é ignorado.

```java
// Isso é um comentário
int idade = 25; // Também pode ficar ao lado de um comando
```

## Comentário de múltiplas linhas

Usa `/*` para abrir e `*/` para fechar. Tudo entre os dois é ignorado, mesmo ocupando várias linhas.

```java
/*
Este é um comentário
que ocupa
várias linhas
*/
int idade = 25;
```

## Comentário de documentação

Java também possui um formato especial de comentário, usado para gerar documentação automática com a ferramenta `javadoc`. Ele começa com `/**`.

```java
/**
 * Calcula a soma de dois números.
 * @param a primeiro número
 * @param b segundo número
 * @return a soma entre eles
 */
public int somar(int a, int b) {
  return a + b;
}
```

Esse formato é bastante usado em bibliotecas e projetos maiores, onde a documentação do código precisa ser gerada automaticamente.
