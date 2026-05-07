---
title: "Operadores aritméticos"
description: "Os operadores aritméticos em Python"
order: 13
---

Depois de conhecer os operadores de forma geral, é hora de olhar mais de perto para os **operadores aritméticos**. Eles são usados para realizar operações matemáticas com valores numéricos, como somar, subtrair e dividir.

Esses operadores aparecem em praticamente todo tipo de programa, seja para calcular notas, fazer conversões, ou criar regras que envolvem números. Vamos ver cada um deles com calma.

## Operadores básicos

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

## Números `float` e precisão dos cálculos

Antes de vermos os operadores em ação, vale entender um detalhe importante sobre os números decimais em Python, os que são do tipo `float`.

Em vez de usar o sistema decimal (base 10), como nós humanos fazemos, o computador representa tudo usando apenas 0 e 1, que chamamos de base 2 ou sistema binário.

O problema é que algumas frações simples para nós, como 0.1 ou 0.2, não têm uma representação exata em binário, do mesmo modo que 1/3 não tem uma representação decimal exata (0.3333...). Por isso, o computador guarda aproximações, e essas aproximações fazem algumas operações produzirem pequenas diferenças em relação ao valor esperado.

Por exemplo:

```python
soma = 0.1 + 0.2
print(soma)

# Saída:
# 0.30000000000000004
```

Mesmo que pareça um erro, isso é normal em praticamente todas as linguagens de programação e é importante saber que pode acontecer, especialmente em comparações de igualdade:

```python
print(0.1 + 0.2 == 0.3)

# Saída:
# False
```

Para lidar com esse tipo de situação, usamos funções que tratam arredondamentos, como `round()`:

```python
soma = 0.1 + 0.2
soma_arredondada = round(soma, 2)    #arredonda com 2 casas decimais

print(soma_arredondada)

# Saída:
# 0.3
```

Essa estratégia garante resultados mais previsíveis e evita surpresas em cálculos com números decimais.

## Adição (`+`)

O operador de adição soma dois ou mais valores:

```python
soma = 2 + 3
print(soma)

# Saída:
# 5
```

Também pode ser usado para **concatenar strings**, como vimos na lição **"Formatação de strings"**.

```python
concatenacao = "Olá," + "mundo"
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

Na escola, costumamos usar os símbolos `x` ou `.` para representar a multiplicação, mas em Python (e em muitas linguagens de programação) usamos o asterisco `*` para isso. Usamos o operador de multiplicação para repetir valores:

```python
multiplicacao = 2 * 3
print(multiplicacao)

# Saída:
# 6
```

Assim como o `+`, ele também pode ser usado com strings. Ele repete um texto várias vezes:

```python
texto_repetido = "Olá" * 3
print(texto_repetido)

# Saída:
# OláOláOlá
```

## Exponenciação (`**`)

O operador `**` é usado para calcular **potências**, ou seja, elevar um número a outro. Na escola, é comum vermos potências representadas como 3² ou 2³. O número que aparecia pequeno indicava a quantidade de vezes pela qual o número maior deveria ser multiplicado por ele mesmo. Em Python, esse número passa a aparecer depois do operador:

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

A divisão normal (`/`) divide um número pelo outro e retorna sempre um resultado do tipo `float`, mesmo quando o valor é inteiro. Isso significa que, se houver casas decimais, elas aparecem depois do ponto. Se não houver, um zero é acrescentado depois do ponto.

```python
uma_divisao = 8 / 4
outra_divisao = 7 / 4

print(uma_divisao)
print(outra_divisao)

# Saída:
# 2.0
# 1.75
```

### Divisão inteira (`//`)

Já a divisão inteira (`//`) funciona como o caso lá do início da escola, em que não dava mais para dividir o resto mesmo se ele não fosse zero. Em vez de colocar casas decimais e continuar a conta, ela mostra só a parte inteira da divisão:

```python
divisao_inteira = 5 // 2
print(divisao_inteira)

# Saída:
# 2         # a parte decimal (.5) é descartada
```

Esse comportamento é muito útil quando queremos apenas a parte inteira do resultado.

### Módulo (`%`)

Ainda pensando em quando a gente dividia os números sem colocar casas decimais, relembramos que muitas vezes **sobrava um resto**. O módulo é uma forma de sabermos qual é esse resto da divisão:

```python
modulo = 5 % 2
print(modulo)

# Saída:
# 1
```

Ele é bastante usado, por exemplo, para saber se um número é par ou ímpar. Ao dividir um número por 2, se o resto for 0, ele é par, se o resto for 1, ele é ímpar.

Podemos aplicar a mesma lógica para descobrir se um número é **divisível por outro**: basta verificar se o resto da divisão é 0. Se for, o número é divisível.

---

Algumas dessas operações que acabamos de ver também aparecem em forma de **funções** em Python. Elas são parte do que chamamos de **Métodos** e permitem ir além dos cálculos diretos, oferecendo formas adicionais de trabalhar com números e resultados.

Veremos mais sobre Métodos em breve, mas por enquanto você já tem tudo o que precisa para fazer a maioria dos cálculos que encontrará neste estágio do seu aprendizado.
