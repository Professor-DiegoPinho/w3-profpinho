---
title: "Variáveis"
description: "O que são as variáveis e como o Python as utiliza"
order: 6
---

Na lição anterior, você já viu variáveis sendo usadas rapidamente, mas ainda de forma superficial. Agora vamos entender o que elas são, por que existem e como o Python as utiliza.

## O que são variáveis

Você lembra dos problemas de matemática da escola que tinham algo como `x = 10`? Lá, o x representava um valor que podia mudar dependendo do problema e geralmente o objetivo era descobrir qual era esse valor. Mas não precisa se assustar, na programação é bem mais simples!

Aqui, a lógica é parecida, mas invertida: somos nós que damos o valor para o x! Em vez de resolver uma equação para descobrir o valor de x, a gente escolhe o valor dele e contamos qual é esse valor pro computador: "x deve valer 10".

Essas variáveis funcionam como rótulos que damos a informações para poder usá-las e modificá-las mais tarde. Ou seja, quando criamos uma variável, estamos guardando um valor nela e dando um nome a ela para poder "chamá-la" quando precisarmos.

E claro, não precisamos nos limitar a `x`, `y` ou `z`. Podemos usar nomes mais significativos, como `idade`, `nome` ou `profissao`, para deixar o código mais fácil de entender.

```python
nome = "Diego"
idade = 30
profissao = "professor"

print(nome)
print(idade)
print(profissao)

# Saída:
# Diego
# 30
# professor
```

O Python cria uma variável no momento em que ela recebe um valor e não é preciso declarar o tipo como em algumas linguagens. O Python descobre o tipo da variável sozinho quando recebe o valor que deve ser guardado nela.

Os valores das variáveis também podem ser alterados e até mudar de tipo, já que a tipagem é dinâmica no Python. Veja o exemplo abaixo:

```python
x = 30         # o tipo da variável x é int
x = "Diego"    # agora mudamos o valor guardado em x e o tipo passa a ser str

print(x)

# Saída:
# Diego
```

Isso acontece porque o Python tem **tipagem dinâmica**, o que significa que o tipo da variável pode mudar ao longo do código, dependendo do valor atribuído.

## Atribuindo valores às variáveis de formas diferentes

Às vezes, pode ser útil definir múltiplas variáveis de uma só vez para deixar o código mais limpo e evitar repetições desnecessárias.

Você pode criar várias variáveis ao mesmo tempo:

```python
x, y, z = "Gato", "Cachorro", "Coelho"
print(x, y, z)

# Saída:
# Gato Cachorro Coelho
```

Ou atribuir o mesmo valor a várias delas:

```python
x = y = z = "Gato"
print(x, y, z)

# Saída:
# Gato Gato Gato
```

---

Agora você já entende o que são variáveis, como criá-las e alterar seus valores.

Esses conceitos são a base de quase tudo que você vai fazer em Python, então experimente mudar valores, testar conversões e brincar com diferentes tipos. É assim que o aprendizado realmente acontece!
