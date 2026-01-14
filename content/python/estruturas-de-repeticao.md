---
title: "Estruturas de repetição"
description: "As estruturas de repetição em Python"
order: 36
---

Quando começamos a programar, rapidamente percebemos um padrão muito comum: **precisamos repetir ações**.

Isso acontece o tempo todo! Podemos querer mostrar vários números na tela, percorrer uma lista de nomes, realizar várias somas ou analisar letra por letra de um texto.

Se fôssemos resolver tudo isso copiando e colando código, nossos programas ficariam longos, confusos e difíceis de manter.

Um exemplo seria mostrar uma contagem de 0 a 5:

```python
print(0)
print(1)
print(2)
print(3)
print(4)
print(5)
```

Esse código funciona, mas apresenta vários problemas:

- Não escala: se fossem 100 números, seriam 100 linhas;
- É difícil de manter e alterar: teríamos bastante trabalho para alterar os números impressos;
- Não expressa claramente a ideia de repetição.

É exatamente esse tipo de situação que justifica o uso do que chamamos de **estruturas de repetição**, **laços de repetição** ou **_loops_**.

## O que é uma estrutura de repetição?

Uma estrutura de repetição é um recurso que permite **executar o mesmo bloco de código várias vezes**, seguindo alguma regra.

Em vez de escrever o mesmo comando repetidamente, você descreve:

- **o que deve ser repetido**;
- **quantas vezes** ou **até quando** essa repetição deve acontecer.

Isso deixa o código mais curto, legível, fácil de manter e expressivo em relação à sua finalidade.

## Loops em Python

O Python possui **duas estruturas de repetição**:

- o `for`
- o `while`

Cada uma existe para resolver **tipos diferentes de problema**, embora ambas sirvam para repetir código.

> Aqui, não vamos entrar em muitos detalhes sobre elas. A ideia é apenas entender **que essas estruturas existem**. Nos próximos artigos, cada estrutura será explorada com calma. Então, não se preocupe em entender tudo agora.

### O loop `for`

O `for` é usado quando você quer repetir um bloco de código **percorrendo algo**. Esse "algo" pode ser:

- um _range_;
- uma lista;
- uma _string_;
- qualquer outro iterável.

O formato básico dele em Python é o seguinte:

```python
for elemento in iteravel:
    # bloco de código a ser repetido
```

Você pode ler como: para cada elemento que existe em `iteravel`, faça a seguinte ação.

Em geral, o `for` é escolhido quando a repetição é **bem definida**. Ele funciona dizendo o que será feito **para cada item ou valor existente**.

### O loop `while`

O `while` funciona de forma diferente. Ele repete um bloco de código **enquanto uma condição for verdadeira**. Ou seja, o foco não está em percorrer uma sequência, mas sim em continuar executando algo **até que uma situação mude**.

O formato básico dele é o seguinte:

```python
condicao = True

while condicao:
    # bloco de código a ser repetido
```

Você pode ler como: enquanto a condição for verdadeira, execute o seguinte bloco de código.

É muito comum usar essa estrutura quando não sabemos exatamente quantas repetições vão acontecer, apenas **quando elas devem parar**. Mas ela também pode ser usada nos casos em que o `for` funciona.

## Importância dos _loops_

Estruturas de repetição estão em praticamente **todo programa real** e são fundamentais para o seu funcionamento.

Sem loops, boa parte do código que vemos no dia a dia simplesmente não existiria de forma prática. Eles estão presentes em praticamente tudo:

- Processam listas de dados;
- Automatizam tarefas repetitivas;
- Permitem a validação de informações;
- Repetem tentativas até uma condição ser satisfeita;
- Trabalham com arquivos, textos ou outros dados em escala.

Entender loops não é apenas aprender uma sintaxe nova, é **aprender a pensar em repetição, padrões e fluxo de execução**. Esse é um passo essencial para aprimorar o raciocínio por trás das decisões no código.

---

As estruturas de repetição são uma das bases da programação. Elas permitem que você escreva códigos mais curtos, claros e poderosos. Nas próximas lições, vamos explorar cada uma dessas estruturas com mais profundidade.
