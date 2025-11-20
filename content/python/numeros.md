---
title: "Números"
description: "Os tipos numéricos no Python"
order: 8
---

# Números

Os números estão por trás de quase tudo que o computador faz, mesmo quando não percebemos. Pense em qualquer programa: jogos, planilhas, apps de previsão do tempo… Todos têm algo em comum: usam números para funcionar.

Na lição sobre "Tipos de dados", vimos que o Python possui três tipos numéricos: inteiros (`int`), de ponto flutuante (`float`) e complexos (`complex`).

Agora, vamos entender melhor cada um deles, mas antes de seguir, vale um aviso rápido. Aqui aparecem alguns conceitos da matemática. Eles podem parecer difíceis, mas não precisa se preocupar! O Python lida com números de forma bem intuitiva e com os exemplos você vai perceber que é muito mais simples do que parece.

## Inteiros (`int`)

Os inteiros representam números **sem parte decimal**, podendo ser positivos ou negativos:

```python
x = 1
y = 35656222554887711
z = -3255522

print(type(x))
print(type(y))
print(type(z))

# Saída:
# <class 'int'>
# <class 'int'>
# <class 'int'>
```

O mais interessante: eles não têm limite de tamanho no Python! Você pode trabalhar com números gigantes se quiser.

## Ponto flutuante (`float`)

Os números de ponto flutuante, ou _floats_, são aqueles que **possuem casas decimais**. Eles também podem ser positivos ou negativos:

```python
x = 3.14159
y = 1.0
z = -35.59

print(type(x))
print(type(y))
print(type(z))

# Saída:
# <class 'float'>
# <class 'float'>
# <class 'float'>
```

> Atenção: em português usamos a vírgula para separar as casas decimais da parte inteira do número. Já em Python (e em praticamente todas as linguagens de programação), esse separador é o **ponto**.

### Formato científico com `float`

Em Python, a letra (`e`) ou (`E`) representa **números em notação científica**, um formato usado para escrever números muito grandes ou muito pequenos. O número que aparece antes do `e` é elevado à quantidade de potências de 10 que aparece logo depois dele.

Veja como funciona:

```python
x = 1e2      # = 1 × 10²
y = 35e3     # = 35 × 10³
z = 2E10    # = 2 × 10¹⁰

print(x)
print(y)
print(z)

# Saída:
# 100.0
# 35000.0
# 20000000000.0
```

> Mesmo quando um número que possui essa letra pareça ser inteiro, ele sempre é do tipo _float_ em Python, pois seu resultado sempre será um número com ponto flutuante.

Se esse conteúdo é novo para você e ficou um pouco confuso, não se preocupe! Por enquanto, não é necessário entender a fundo. O mais importante é você saber que a letra `e` (ou `E`) pode aparecer entre números nos códigos e que o tipo do dado não deixa de ser numérico por conta disso. Na dúvida, use sempre a função `type()` para conferir o tipo da variável.

### Números complexos (`complex`)

O Python também trabalha com números **complexos**, que têm uma parte real e uma parte imaginária.

Vamos recapitular um pouco as aulas de matemática: talvez você se lembre de quando apareciam expressões como `2 + 3i`, que envolviam um número comum (a parte real) e uma parte com o símbolo `i`, chamada de parte imaginária.

Esse tipo de número é usado para representar situações em que a matemática tradicional não dá conta, como quando tentamos tirar a raiz quadrada de um número negativo. Eles também aparecem em diversas áreas técnicas, como nas engenharias elétrica, eletrônica e mecânica, além da física e da computação gráfica.

Em Python, usamos a letra `j` no lugar do `i` para indicar a parte imaginária:

```python
x = 3 + 5j   # 3 é a parte real, 5j é a parte imaginária
y = 5j       # 0 é a parte real, 5j é a parte imaginária
z = -5j      # 0 é a parte real, -5j é a parte imaginária

print(type(x))
print(type(y))
print(type(z))

# Saída:
# <class 'complex'>
# <class 'complex'>
# <class 'complex'>
```

De novo, não se preocupe em entender tudo agora. Saber que o tipo `complex` existe em Python e como ele aparece é o mais importante no momento.

## Convertendo tipos numéricos

Em Python, a maioria das conversões entre tipos é feita de forma automática, mas às vezes precisamos converter manualmente.

As funções para converter valores para cada tipo numérico são:

- `int()` → converte para número inteiro
- `float()` → converte para número com ponto flutuante
- `complex()` → converte para número complexo

Veja alguns exemplos:

```python
x = 1    # int
y = 2.8  # float
z = 1j   # complex

# Convertendo de int para float
a = float(x)
# Convertendo de float para int
b = int(y)
# Convertendo de int para complex
c = complex(x)

print(a)
print(b)
print(c)

# Saída:
# 1.0
# 2
# (1+0j)
```

Você também pode criar um número complexo com a função `complex()` informando qual é a **parte real** e qual é a **parte imaginária** dele:

```python
z = complex(3, 4)
print(z)

# Saída
# (3+4j)
```

> Importante: não é possível converter um número complexo em outro tipo numérico (como `int` ou `float`).

### Conversão entre números e strings

Assim como em outros tipos de dados, também podemos converter **números para strings** e vice-versa.

```python
idade = 25
texto = str(idade)

print(texto)
print(type(texto))

# Saída:
# 25
# <class 'str'>
```

E também podemos transformar textos em números, desde que o conteúdo da _string_ represente um número válido:

```python
numero_str = "42"
numero_int = int(numero_str)
numero_float = float(numero_str)

print(numero_int)
print(numero_float)

# Saída:
# 42
# 42.0
```

Se o texto contiver algo que não é um número (como letras ou símbolos), não será possível converter de _string_ para o formato numérico e você vai receber uma mensagem de erro. Lembrando que as letras `e` e `j` aparecem como parte de números `float` e `complex`, respectivamente, então podem ser convertidas de _string_ para esses formatos também.

## Gerando números aleatórios

Em algumas situações, precisamos de números aleatórios como para fazer sorteios ou quando jogamos dados. O Python possui o módulo embutido `random`, que oferece várias funções para gerar números aleatórios.

O exemplo mais simples é o `randrange()`, que retorna um número dentro de um intervalo:

```python
import random

print(random.randrange(1, 10))
print(random.randrange(1, 10))
print(random.randrange(1, 10))

# Saída:
# Um número aleatório entre 1 e 9
# Um número aleatório entre 1 e 9
# Um número aleatório entre 1 e 9
```

> O último número nunca é incluído no resultado do randrange(). Já o número que indica o início do intervalo é uma opção que pode ser sorteada. Então, se 1 é escolhido como início e 10 como final (`random.randrange(1, 10)`), os possíveis resultados são 1, 2, 3, 4, 5, 6, 7, 8 e 9.

Mais adiante, quando aprendermos sobre **Módulos**, você vai entender melhor como o `import` funciona. Por enquanto, basta saber que ele permite usar funcionalidades extras que não estão disponíveis diretamente no Python.
