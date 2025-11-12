---
title: "Operadores Aritméticos"
description: "Os operadores aritméticos em Python"
order: 13
---

# Operadores aritméticos

Depois de conhecer os operadores de forma geral, é hora de olhar mais de perto para os **operadores aritméticos**. Eles são usados para realizar operações matemáticas com valores numéricos, como somar, subtrair e dividir.

Esses operadores aparecem em praticamente todo tipo de programa, seja para calcular notas, fazer conversões, ou criar regras de negócio que envolvem números. Vamos ver cada um deles com calma.

## Operadores básicos

Antes de vermos exemplos, vale conhecer quais são os operadores que o Python oferece. Cada um deles será explicado logo a seguir.

O Python possui os seguintes operadores aritméticos:

| Operador | Nome            | Exemplo  |
| -------- | --------------- | -------- |
| `+`      | Adição          | `x + y`  |
| `-`      | Subtração       | `x - y`  |
| `*`      | Multiplicação   | `x * y`  |
| `**`     | Exponenciação   | `x ** y` |
| `/`      | Divisão         | `x / y`  |
| `//`     | Divisão inteira | `x // y` |
| `%`      | Módulo          | `x % y`  |

## Adição (`+`)

O operador de adição soma dois ou mais valores:

```python
soma = 2 + 3
print(soma)

# Saída:
# 5
```

Também pode ser usado para **concatenar strings**, como vimos no artigo **"Formatação de strings"**.

```python
concatenacao = 'Olá,' + 'mundo'
print(concatenacao)

# Saída:
# Olá, mundo
```

## Subtração (`-`)

O operador de subtração é usado para encontrar **a diferença entre dois valores**, ou seja, quanto é um número menos outro:

```python
subtracao = 5 - 2
print(subtracao)

# Saída:
# 3
```

## Multiplicação (`*`)

Usamos o operador de multiplicação para repetir valores. Na escola, costumamos usar os símbolos `x` ou `.` para representar a multiplicação, mas em Python (e em muitas linguagens de programação) usamos o asterisco `*` para isso:

```python
multiplicacao = 2 * 3
print(multiplicacao)

# Saída:
# 6
```

Assim como o `+`, ele também pode ser usado com strings para repetir textos.

```python
texto_repetido = 'Olá' * 3
print(texto_repetido)

# Saída:
# OláOláOlá
```

## Exponenciação (`**`)

O operador `**` é usado para calcular **potências**, ou seja, elevar um número a outro. Na escola, é comum vermos potências representadas como 2² ou 3³. O número que aparecia pequeno indicava a quantidade de vezes pela qual um número deveria ser multiplicado por ele mesmo. Em Python, esse número passa a aparecer depois do operador:

```python
exponenciacao = 2 ** 4     # é o mesmo que 2⁴ (2 elevado a 4)

print(exponenciacao)

# Saída:
# 16
```

## Divisão, divisão inteira e módulo

Agora, vamos falar sobre 3 operadores relacionados à divisão.

Lembra das aulas de matemática em que você desenhava a conta de divisão? No começo, muitas vezes **sobrava um resto**, que era a parte do número que **não dava para dividir**. Depois, você aprendeu que poderia colocar uma vírgula e continuar a conta com **casas decimais**, chegando a um resultado mais preciso.

Os operadores que vamos ver abaixo estão relacionados a esses conceitos.

### Divisão (`/`)

A divisão normal (`/`) divide um número pelo outro e retorna sempre um número do tipo **float**, mesmo quando o resultado é inteiro. Isso significa que, se houver casas decimais, elas aparecem depois do ponto. Se não houver, um zero é acrescentado depois do ponto.

```python
uma_divisao = 8 / 4
outra_divisao = 7 / 4

print(uma_divisao)
print(outra_divisao)

# Saída:
# 2.0
# 1.75
```

## Divisão inteira (`//`)

Já a divisão inteira (`//`) funciona como o caso em que não dava mais para dividir caso o resto não fosse zero. Em vez de colocar casas decimais e continuar a conta, ela mostra só a parte inteira da divisão:

```python
divisao_inteira = 5 // 2     # com casas decimais, seria igual a 2.5
print(divisao_inteira)

# Saída:
# 2         # a parte decimal (.5) é descartada
```

Esse comportamento é muito útil quando queremos apenas a parte inteira do resultado, como em situações de contagem, índices ou iterações.

## Módulo (`%`)

Ainda pensando em quando a gente dividia os números sem colocar casas decimais, relembramos que muitas vezes **sobrava um resto**. O módulo é uma forma de sabermos qual é esse resto da divisão:

```python
modulo = 5 % 2
print(modulo)

# Saída:
# 1
```

Ele é bastante usado, por exemplo, para saber se um número é par ou ímpar. Ao dividir um número por 2, se o resto for 0, ele é par, se o resto for 1, ele é ímpar.

Podemos aplicar a mesma lógica para descobrir se um número é **divisível por outro**: basta verificar se o resto da divisão é 0. Se for, o número é divisível sem sobras.

---

Algumas dessas operações que acabamos de ver também aparecem em forma de **funções** em Python. Elas são chamadas de **métodos** e permitem ir além dos cálculos diretos, oferecendo formas adicionais de trabalhar com números e resultados.

Veremos mais sobre métodos em breve, mas por enquanto você já tem tudo o que precisa para fazer a maioria dos cálculos que encontrará neste estágio do seu aprendizado.
