---
title: "Números"
description: "Inteiros, floats e números complexos em Python"
order: 8
---

# Inteiros (int)

Números sem parte decimal:

```python
x = 10
y = -5
z = 1000000

print(type(x))  # <class 'int'>
```

Python não tem limite de tamanho para inteiros.

# Ponto flutuante (float)

Números com casas decimais:

```python
x = 3.14
y = -2.5
z = 0.1

print(type(x))  # <class 'float'>
```

**Nota:** use ponto (`.`), não vírgula.

## Notação científica

Use `e` para números muito grandes ou pequenos:

```python
x = 1e2      # 1 × 10² = 100.0
y = 35e3     # 35 × 10³ = 35000.0
z = 2E-4     # 2 × 10⁻⁴ = 0.0002

print(x, y, z)
```

# Números complexos (complex)

Números com parte real e imaginária (usa `j` em vez de `i`):

```python
x = 3 + 5j
y = 2j
z = 1 - 2j

print(type(x))  # <class 'complex'>
print(x.real)   # 3.0
print(x.imag)   # 5.0
```

# Verificando o tipo

Use `type()` para saber que tipo é:

```python
print(type(10))        # <class 'int'>
print(type(10.5))      # <class 'float'>
print(type(10 + 5j))   # <class 'complex'>
```

# Convertendo tipos

Use `int()`, `float()` para converter:

```python
x = 10.9
print(int(x))          # 10 (perde a parte decimal)

y = 5
print(float(y))        # 5.0

z = "42"
print(int(z))          # 42
```

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
