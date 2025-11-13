---
title: "Coleções"
description: "O que são e por que são diferentes de outros tipos de dados."
order: 21
---

# Coleções
Antes de avançar para novos conteúdos, vamos dar um pequeno passo para trás e entender melhor algo que apareceu várias vezes ao longo dos artigos, mas que ainda não exploramos de verdade: as coleções.

Você já viu que elas existem, conhece o nome delas e aprendeu alguns conceitos básicos, como que elas são _truthy_ quando possuem algum valor e _falsy_ quando estão vazias.

Agora é a hora de entender melhor **o que são coleções**, **por que elas existem** e **como elas são diferentes dos tipos de dados que já estudamos**.

## Por que precisamos de coleções?

Até agora, trabalhamos principalmente com tipos de dados que representam **um único valor**:

* números (`int`, `float`)
* strings (`str`)
* booleanos (`bool`)

Esses tipos funcionam muito bem quando queremos guardar algo isolado, mas na maior parte dos programas, também precisamos lidar com **vários valores ao mesmo tempo**:

* notas de um aluno
* produtos de um carrinho de compras
* nomes de usuários online

Se tentássemos guardar tudo isso em variáveis separadas, rapidamente perderíamos o controle.

Imagine, por exemplo, que você queira guardar as quatro notas que um aluno tirou no ano. Sem coleções, seria preciso criar uma variável para cada nota:

```python
nota1 = 8.5
nota2 = 6.0
nota3 = 9.0
nota4 = 7.5

print(nota1, nota2, nota3, nota4)

# Saída:
# 8.5
# 6.0
# 9.0
# 7.5
```

Com poucos valores já começa a fica confuso. Quanto mais dados houver, pior fica.

No mundo real, você provavelmente ia querer guardar não só uma nota por bimestre desse aluno. Cada matéria diferente teria 4 notas, seriam várias matérias e esses dados seriam armazenados para muitos alunos. Assim, criar uma variável para cada se tornaria inviável.

É aí que entram as coleções. Em vez de lidar com cada valor separadamente, você passa a guardar **vários valores juntos**, dentro de uma única variável e enxergá-los **como um grupo**:

```python
notas = [8.5, 6.0, 9.0, 7.5]
print(notas)

# Saída:
# [8.5, 6.0, 9.0, 7.5]
```

Esse agrupamento muda completamente a forma como trabalhamos com os dados: ele deixa tudo mais organizado e permite manipular informações relacionadas com mais facilidade. Isso abre espaço para operações muito poderosas que vamos aprender neste e nos próximos artigos.

## Como coleções ajudam no código?

Coleções tornam o código mais limpo e permitem resolver problemas que seriam difíceis e nada práticos se usássemos apenas valores isolados. Com elas, podemos:

* **organizar múltiplos valores** em uma estrutura única e clara;
* **acessar todos os valores de uma só vez**, caso queira trabalhar com o grupo inteiro;
* **acessar cada valor individualmente**, quando precisar de algo específico;
* **alterar, adicionar ou remover** informações (dependendo do tipo de coleção);
* **evitar repetição de valores**, quando isso fizer sentido;
* **associar informações**, como "nome" → "Ana".

## As coleções não são todas iguais

Assim como números podem ser inteiros ou decimais, as coleções também têm características próprias, que influenciam a forma como você as utiliza no código.

Cada uma delas responde a perguntas importantes:

* A **ordem** dos itens importa?
* Posso **alterar** os valores depois de criar a coleção?
* Ela permite **valores repetidos**?
* **Como** os itens **são acessados**?
* Qual delas **faz mais sentido** para o meu caso de uso?

É por isso que o Python oferece **quatro tipos principais de coleções**:

* listas (`list`)
* tuplas (`tuple`)
* conjuntos (`set`)
* dicionários (`dict`)

Cada uma resolve um tipo específico de problema e serve a um propósito diferente. Com o tempo, essas escolhas passam a ser naturais no dia a dia do código.

---
Este primeiro artigo é apenas uma visão geral para entender que **coleções são formas de agrupar vários valores de maneira organizada**.

Nos próximos, vamos conhecer cada tipo com calma e aprender quais são suas características, como criar, como acessar valores e como escolher a melhor coleção para cada situação.
