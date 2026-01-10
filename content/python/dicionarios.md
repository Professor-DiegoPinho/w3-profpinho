---
title: "Dicionários"
description: "Como funcionam os dicionários em Python"
order: 30
---

Depois de trabalhar com listas e tuplas, você já sabe como guardar vários valores juntos. Mas conforme seus programas crescem, surge um desafio comum: **como acessar rapidamente as informações certas sem depender da posição de cada item?**

Imagine uma lista com centenas de elementos. Para encontrar algo, você teria que lembrar o índice exato ou percorrer todos os valores. Conforme a quantidade de informações for crescendo, isso vai ficando cada vez mais inviável.

Os **dicionários** resolvem esse problema trazendo um jeito mais natural, legível e prático de organizar dados. Eles permitem acessar informações por seu nome e não sua posição.

## O que é um dicionário?

Nas coleções que vimos até agora, guardamos apenas valores isolados, sem um "rótulo" que indique o que cada elemento representa. Mas no mundo real, dados raramente são apenas valores avulsos. Eles têm significado e uma lista como esta poderia ser difícil de interpretar:

```python
professor = ["Carolina", "Ciência da Computação", "Python", 4]
```

Apesar de não ter certeza, podemos até intuir que Carolina é o nome da professora, mas e as demais informações? Os valores `"Ciência da Computação"`, `"Python"` e `4` não são claros o suficiente para sabermos o que eles representam.

Já um dicionário deixa tudo explícito! Ele armazena informações no formato **chave: valor**.

Cada chave funciona como uma etiqueta que identifica um dado específico, então você sabe exatamente o que quer dizer cada valor:

```python
professor = {
  "nome": "Carolina",
  "formação": "Ciência da Computação",
  "ensina": "Python",
  "anos de experiência": 4
}
```

O `nome` da professora é Carolina, ela tem `formação` em Ciência da Computação, a disciplina que ela `ensina` é Python e ela tem 4 `anos de experiência`. Assim fica muito mais fácil, não é?

Para além do seu formato, dicionários são coleções:

- **Ordenadas**: a partir do Python 3.7, a ordem de inserção no dicionário é mantida. Antes da versão 3.7, dicionários não garantiam que a ordem de inserção seria mantida, então a sequência em que os itens eram exibidos podia variar.
- **Mutável**: você pode alterar, adicionar ou remover itens a qualquer momento.
- **Chaves únicas**: se uma chave for repetida, o valor mais recente substitui o anterior. Não podem existir 2 ou mais chaves com o mesmo nome.

> Fique de olho! Se você estiver usando uma versão desatualizada ou for trabalhar em projetos antigos, também chamados de projetos legados, lembre-se que os dicionários **não eram ordenados** antes da versão 3.7 do Python. Tratá-los como ordenados pode causar problemas nesse caso!

### Tipos de chaves e valores permitidos

Quando dizemos acima que um dicionário é mutável, queremos dizer que você pode adicionar, mudar ou remover os pares chave-valor que ele guarda.

Porém, suas **chaves** precisam ser **imutáveis**. Isso garante que elas permaneçam constantes e possam ser usadas para identificar valores de forma confiável.

Se elas pudessem mudar depois de criadas, seria como trocar o rótulo de uma caixa sem avisar as pessoas que a utilizam: elas tentariam buscar um valor usando o nome antigo e não encontrariam nada. Na prática, isso deixaria o acesso aos dados imprevisível e faria você "perder" informações que ainda estão lá, mas não podem mais ser encontradas pela chave ter mudado.

Para que isso não aconteçam, podem ser usados como chaves:

- _strings_
- números (`int`, `float` e até `complex`)
- booleanos
- `None`
- conjuntos imutáveis (`frozenset`)
- tuplas, contanto que todos os seus elementos também sejam imutáveis
- intervalos (`range`)

Não podem ser usados como chaves:

- listas
- tuplas que contenham elementos mutáveis
- conjuntos mutáveis (`set`)
- dicionários

Já os **valores** que cada chave guarda podem ser de qualquer tipo, não há restrição.

> Apesar de ser possível, na prática é raro utilizarmos booleanos, `None`, tuplas e conjuntos imutáveis (`frozenset`) como chaves dos nossos dicionários. Na maioria dos casos, vamos utilizar apenas `str` e `int` mesmo.

### Chaves duplicadas sobrescrevem valores

Lembra que nos conjuntos não podemos ter valores repetidos? Nos dicionários, podemos ter valores iguais, mas **não podemos ter chaves repetidas**.

Se isso acontece, apenas o último valor guardado nas chaves de mesmo nome é mantido. É como se você estivesse atribuindo um novo valor à chave que já existe:

```python
professor = {
  "nome": "Carolina",
  "anos de experiência": 4,
  "anos de experiência": 2
}

print(professor)

# Saída:
# {'nome': 'Carolina', 'anos de experiência': 2}
```

Como só pode existir uma chave chamada `anos de experiência` dentro do dicionário `professor`, o valor `4` foi descartado e `2`, a informação mais recente, ficou guardada nela.

## Como acessar valores

A grande vantagem do dicionário é acessar valores de forma direta, **usando a chave em vez do índice** da informação:

```python
animal = {
  "nome": "Pantera",
  "especie": "Gato",
  "nascimento": 2024,
  "castrado": True
}

print(animal["especie"])

# Saída:
# Gato
```

Dessa forma, você não precisa se preocupar em lembrar a posição de um dado na coleção nem corre risco de confundir os índices no seu programa. Basta saber o nome da chave para acessar o valor que ela guarda.

> Atenção: Mesmo sendo ordenados, o **acesso** aos valores que o dicionário guarda é feito **pelas chaves** que ele contém, e **não por índices** numéricos. Se você tentar acessar um valor usando `professor[0]` ou `animal[2]`, você vai receber um erro.

### Usando o `get()`

Além do formato `dicionario[chave]`, também podemos acessar valores usando a função `get()`:

```python
animal = {
  "nome": "Pantera",
  "especie": "Gato",
  "nascimento": 2024,
  "castrado": True
}

print(animal.get("especie"))

# Saída:
# Gato
```

A vantagem é que o `get()` é mais seguro para acessar as chaves de um dicionário, pois **não gera erro** se a chave não existir. O código apenas retorna o valor `None`.

Quando acessamos com os colchetes (`[]`), o Python gera um erro imediatamente se a chave não existir:

```python
animal = {"especie": "Gato", "nascimento": 2024}

print(animal.get("cor"))
print(animal["cor"])

# Saída:
# None

# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#     print(animal["cor"])
#           ~~~~~^^^^^^^^^
# KeyError: 'cor'
```

Por isso, o `get()` é especialmente útil quando não temos certeza se a chave existe. Com ele, evitamos que o programa seja interrompido por um erro caso ela não exista.

## Como saber se uma chave existe

Para fazer validações e evitar o erro que falamos sobre aqui em cima, podemos verificar se uma chave está no dicionário usando o operador `in`, que já vimos quando estudamos _strings_ e conjuntos:

```python
animal = {"especie": "Gato", "nascimento": 2024}

if "nascimento" in animal:
  print("A chave 'nascimento' existe!")
else:
  print("A chave 'nascimento' não existe!")

# Saída:
# A chave 'nascimento' existe!
```

Isso é muito útil antes de acessar chaves que podem não existir e para tratar casos em que queremos fazer algo diferente quando elas não existem.

## Dicionários aninhados

Dicionários podem conter outros dicionários e isso é muito comum na programação!

Eles representam estruturas mais **completas** e **organizadas**, sendo utilizados em dados vindos de APIs, configurações de sistemas e informações em formato JSON, que veremos mais a frente.

Olhe como funciona:

```python
familia = {
  "mãe": {
    "nome": "Maria",
    "ano": 1998
  },
  "pai": {
    "nome": "Paulo",
    "ano": 1999
  },
  "filho": {
    "nome": "Lucas",
    "ano": 2021
  }
}
```

Você também pode criar cada parte separadamente:

```python
mae = {"nome": "Maria", "ano": 1998}
pai = {"nome": "Paulo", "ano": 1999}
filho = {"nome": "Lucas", "ano": 2021}

familia = {
  "mãe": mae,
  "pai": pai,
  "filho": filho
}
```

### Acessando dados dentro de dicionários aninhados

Para acessar valores em estruturas mais profundas, percorremos as chaves passo a passo:

```python
print(familia["pai"]["nome"])

# Saída:
# Paulo
```

Aqui, entramos no dicionário `familia`, acessamos primeiro a chave `pai` e depois a chave `nome` dentro dela. Assim encontramos o nome do pai dessa família: Paulo.

---

Agora que você já entende o que são dicionários, como funcionam e como acessar seus valores, podemos avançar para a próxima etapa: aprender a manipulá-los nos nossos códigos.
