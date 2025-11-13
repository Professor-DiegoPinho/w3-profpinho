---
title: "Formatação de strings"
description: "Como deixar nossos textos como queremos"
order: 10
---

# Formatação de strings

Você já aprendeu o que são as strings e como usá-las para representar textos. Agora, vamos descobrir como formatar e exibir strings de diferentes maneiras.

## Caracteres de escape em _strings_

No artigo anterior, você viu que se quiser usar o mesmo tipo de aspas tanto em volta quanto dentro da sua string, você vai receber uma mensagem de erro. Mas existe uma alternativa para isso!

O problema de usar o mesmo tipo de aspas era que o Python não conseguia entender que uma estava dentro da outra — ele interpretava que o primeiro par de aspas se fechava e o segundo se abria bem depois, deixando uma ou mais palavras soltas fora das _strings_, no espaço entre os dois pares de aspas.

Mas olha só: existe uma forma simples de avisar o interpretador que ele não deve ler dessa forma. Isso pode ser feito com o que chamamos de caractere de escape (`\`).

Funciona assim:

```python
print("Ele disse: \"Python é incrível!\"")

# Saída:
# Ele disse: "Python é incrível!"
```

Ele indica pro interpretador que o caractere que vem depois dele não deve ser interpretado como um comando da linguagem, mas sim exibido literalmente como escrevemos.

Com isso, no exemplo acima, as aspas, que normalmente indicariam para o Python que uma _string_ começou e terminou, passam a ser lidas só como aspas dentro do texto da string.

Para além do uso com as aspas, seja como (`\"`) ou (`\'`), há outros casos em que o caractere de escape pode ser muito útil em nossas strings. Ele pode servir para quebrar linhas dentro do texto (`\n`), acrescentar um espaço de tabulação (`\t`) como quando usamos o Tab do nosso teclado e para termos a própria barra invertida, também chamada de contrabarra (`\\`), dentro da nossa string.

Veja alguns exemplos:

```python
print('Primeira linha\nSegunda linha')
print('Texto com\ttabulação')
print('Caminho: C:\\Users\\Diego')

# Saída:
# Primeira linha
# Segunda linha
# Texto com    tabulação
# Caminho: C:\Users\Diego
```

## Imprimindo múltiplas variáveis

Nem sempre queremos mostrar o valor de uma só variável. Em algumas situações, vamos precisar exibir múltiplas variáveis ao mesmo tempo. É aí que entram outras formas de usar o `print()` para combinar diferentes valores na mesma linha.

É possível fazer isso separando as variáveis por vírgulas dentro do `print()`:

```python
x = 'Python'
y = 'é'
z = 'incrível'

print(x, y, z)

# Saída:
# Python é incrível
```

Outra opção é usar o operador `+` para juntar _strings_. Chamamos isso de concatenação.

```python
x = 'Python'
y = 'é'
z = 'incrível'

print(x + y + z)

# Saída:
# Pythonéincrível
```

Mas repare que no texto de saída acima, as palavras ficaram grudadas.

Diferente das vírgulas, o operador `+` une o texto exatamente como estão, sem adicionar espaços entre as palavras. Por isso, precisamos acrescentar um espaço no final das _strings_ que queremos que fiquem separadas da _string_ seguinte que será impressa.

Observe a diferença:

```python
x = 'Python '   # acrescentamos um espaço depois da palavra
y = 'é '        # acrescentamos um espaço depois da palavra
z = 'incrível'

print(x + y + z)

# Saída:
# Python é incrível
```

E atenção: o operador `+` só funciona para unir _strings_ com outras _strings_. Se você tentar unir uma _string_ com um valor numérico, por exemplo, vai dar errado:

```python
x = 7
y = 'Belo'

print(x + y)

# Saída:
# Traceback (most recent call last):
#   File '<python-input-7>', line 1, in <module>
#     print(x + y)
#           ~~^~~
# TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

Se você quiser juntar tipos diferentes de dados em uma string, separe as variáveis por vírgulas:

```python
x = 7
y = 'Belo'
print(x, y)

# Saída:
# 7 Belo
```

Mas como vimos acima, as vírgulas adicionam automaticamente um espaço entre cada item impresso. Caso você queira exibir números e textos juntos, sem esse espaço extra, você pode usar o _casting_ que vimos antes para converter o número para o tipo _string_ e concatenar tudo com o operador `+`:

```python
x = 7         # aqui, o 7 é do tipo int
y = 'Belo'

x = str(x)    # convertemos o 7 do tipo int para o '7' do tipo str

print(x + y)  # concatenamos as strings '7' e 'Belo'

# Saída:
# 7Belo       # a string é impressa como '7Belo', sem espaço
```

Resumindo, o `print()` permite exibir múltiplas variáveis de uma só vez, e podemos fazer isso de duas formas:

- Com vírgulas (`,`): une os valores automaticamente com um espaço entre eles e imprime várias de tipos diferentes juntas.
- Com o operador de concatenação (`+`): une as strings exatamente como estão — se quiser espaços, eles precisam ser incluídos manualmente dentro das strings. Não funciona para unir strings com outros tipos de dados.

## Repetindo _strings_

O operador de concatenação `+` não é o único que usa símbolos da matemática com _strings._ Além dele, o Python também permite usar o operador de multiplicação `*` e o resultado é bem interessante!

Com ele, podemos repetir uma _string_ quantas vezes quisermos, como se estivéssemos mesmo multiplicando aquele texto:

```python
print('Python ' * 3)

# Saída:
# Python Python Python
```

Esse recurso é útil quando queremos criar separadores, padrões ou mensagens repetidas no terminal.

```python
print('=' * 16)
print('TABELA DE PONTOS')
print('=' * 16)

# Saída:
# ================
# TABELA DE PONTOS
# ================
```

Mas fique de olho: só é possível usar esse operador com _strings_ e números do tipo `int`!

## F-strings

Depois de conhecer os operadores `+` e `*`, é hora de ver uma forma ainda mais poderosa de formatar strings!

Apesar de funcionarem bem, as formas de unir strings com strings ou outros tipos de dados que vimos até agora são trabalhosas. Elas têm várias regras e exigem bastante cuidado para chegarmos no resultado que queremos.

Seria legal se desse para só escrever nossos textos e inserir as variáveis direto nele, sem se preocupar com vírgulas ou concatenação, certo? A boa notícia é que é possível fazer isso!

Antes da versão 3.6 do Python, você podia usar o método `format()`. Não precisa se preocupar agora em entender o que é um método, tá bom?

Você só precisa saber que ele funciona como uma função, ou seja, de forma parecida com o `print()` e o `input()`. Uma diferença é que aqui, ele aparece no final da frase ou da variável que contém a frase e um ponto é usado para unir a função e o texto.

Cada par de chave corresponde à variável que aparece dentro dos parênteses da função format e com ela, podemos acrescentar diferentes tipos de dados em nossa string:

```python
nome = 'Ana'
idade = 25
print('Meu nome é {} e tenho {} anos.'.format(nome, idade))

# Saída:
# Meu nome é Ana e tenho 25 anos.
```

Apesar de funcionar bem, esse formato é mais longo e menos intuitivo. Nem sempre fica tão claro qual variável aparece em qual {}, por exemplo.

Por isso, o uso do `format()` é recomendado apenas para manutenção de códigos antigos.

Se você estiver começando um código do zero usando uma versão do Python a partir da 3.6, o ideal é usar as f-strings.

Basta colocar a letra f antes das aspas que iniciam sua string. Depois, você acrescenta um par de chaves (`{}`) para cada variável ou expressão que for usar. Dentro do par de chaves, vem o nome da variável ou a expressão.

Observe:

```python
nome = 'Ana'
idade = 30
print(f'Meu nome é {nome} e tenho {idade} anos.')

# Saída:
# Meu nome é Ana e tenho 30 anos.
```

Assim, você sempre sabe qual variável está aparecendo em qual parte do texto.

Podemos também realizar operações dentro das chaves:

```python
preco = 50
print(f'O dobro do preço é {preco * 2} reais')

# Saída:
# O dobro do preço é 100 reais
```

### Formatando números

As f-strings não só permitem usar valores numéricos diretamente na _string_, mas também controlar como eles aparecem. Para mostrar um número com duas casas decimais, por exemplo, usamos o `:.2f`:

```python
preco = 59
print(f'O preço é {preco:.2f} reais')

# Saída:
# O preço é 59.00 reais
```

Ele indica que duas casas decimais devem ser exibidas depois da parte inteira do valor guardado na variável `preco`. Caso seja um número com mais de 2 casas decimais, ele vai arredondar o número seguindo a seguinte tática:

- Se o dígito seguinte for maior que 5 → arredonda pra cima.
- Se for menor que 5 → arredonda pra baixo.
- Se for exatamente 5 → vai para o número par mais próximo.

``` python
print(f"{1.234:.2f}")  # 1.23  → arredondou para baixo
print(f"{1.236:.2f}")  # 1.24  → arredondou para cima
print(f"{1.245:.2f}")  # 1.24  → 0.245 está mais próximo de 0.24 (maior) do que de 0.22 (menor)
```

Caso o valor tenha menos de 2 casas decimais, zeros serão acrescentados para que existam 2 casas.

### Espaçamento e alinhamento

Por fim, também é possível ajustar o alinhamento do texto diretamente dentro das chaves:

```python
print(f'{"A":6}Python')   # adiciona
print(f'{"A":<6}Python')  # < alinha o A à esquerda
print(f'{"A":>6}Python')  # > alinha o A à direita
print(f'{"A":^6}Python')  # ^ centraliza o A
print(f'{"Estudo":6}Python')  # "Estudo" ocupa 6 espaços

# Saída:
# A     Python
# A     Python
#      APython
#   A   Python
# EstudoPython
```

O número dentro das chaves indica a largura mínima do campo. Assim, como "A" ocupa apenas 1 dos 6 espaços que o `{:6}` reserva para esse valor, cinco espaços ficam vazios ao redor dele e podemos alinhar o "A" nesse espaço com os símbolos `<`, `^` e `>`. No caso da palavra "Estudo", ela sozinha ocupa os 6 espaços reservados, então não sobram espaços em branco.
