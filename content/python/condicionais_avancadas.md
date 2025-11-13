---
title: "Condicionais avançadas"
description: "Aprofunde o uso das estruturas condicionais em Python."
order: 19
---

# Condicionais avançadas

No artigo anterior, aprendemos o básico sobre estruturas condicionais com o `if`, `elif` e `else`. Aqui, vamos nos aprofundar ainda mais nesse assunto e aprimorar o raciocínio por trás das decisões no código.

## O operador `and` e condições aninhadas

Às vezes, uma decisão depende de outra. Para saber se uma pessoa pode dirigir no Brasil, por exemplo, precisamos verificar duas coisas: se ela tem pelo menos 18 anos e se já possui carteira de motorista. Existem diferentes maneiras de representar isso no código.

Você pode usar o operador `and`:

```python
idade = 25
tem_carteira = True

if idade >= 18 and tem_carteira == True:
    print('Pode dirigir')
elif idade >= 18 and tem_carteira == False:
    print('Precisa tirar a carteira')
else:
    print('Ainda não tem idade para dirigir')

# Saída:
# Pode dirigir
```

Uma alternativa seria usar o aninhamento de um `if` dentro de outro `if`.Isso evita repetições desnecessárias. Primeiro verificamos se a pessoa tem idade para dirigir e só se essa condição for verdadeira que conferimos se ela possui carteira:

```python
idade = 15
tem_carteira = False

if idade >= 18:
    if tem_carteira:
        print('Pode dirigir')
    else:
        print('Precisa tirar a carteira')
else:
    print('Ainda não tem idade para dirigir')

# Saída:
# Ainda não tem idade para dirigir
```

Se a idade for menor que 18, o código já segue para o `else`, pois não faz sentido verificar a parte da carteira. Uma pessoa menor de idade não poderia dirigir mesmo se tivesse a carteira e a carteira só pode ser tirada por quem já tem 18 anos ou mais.

## Versões compactas

Para situações bem simples, o Python permite formas reduzidas das condicionais.

### `if` em uma linha

Se um if tiver apenas uma instrução, você pode colocá-lo na mesma linha do comando que será executado quando a condição for verdadeira:

```python
idade = 18
if idade >= 18: print('Pode entrar')

# Saída:
# Pode entrar
```

Funciona, mas use com cuidado. A legibilidade do código sempre vem primeiro. Se estiver ficando confuso com tudo em uma só linha, é melhor criar o bloco e indentar o que vem dentro dele.

### Expressão condicional (o "ternário" do Python)

Quando você quer **escolher um valor** com base em uma condição, pode usar a expressão:

```python
valor_se_verdadeiro if condicao else valor_se_falso
```

Por exemplo:

```python
idade = 20
print('adulto' if idade >= 18 else 'menor de idade')

# Saída:
# adulto
```

No exemplo acima, se `idade >= 18` for verdadeira, imprimimos 'adulto'. Caso contrário, imprimimos 'menor de idade'.

### Atribuindo valores com if/else em uma linha

O formato reduzido também serve para decidir rapidamente qual valor guardar na variável:

```python
a = 10
b = 20
bigger = a if a > b else b

print('Bigger is', bigger)

# Saída:
# Bigger is 20
```

Esse padrão é comum em situações em que você quer decidir rapidamente entre dois valores sem escrever um bloco if completo.

> Importante: As versões compactas são excelentes em casos mais curtos e simples. Mas para lógicas mais complexas ou com muitos passos, prefira o `if` normal com blocos em múltiplas linhas. Na programação, a legibilidade e o fácil entendimento costumam ser mais importantes que a concisão.

## Usando variáveis booleanas e valores truthy/falsy

Vimos o quanto os operadores lógicos e de comparação são úteis aqui, mas você não precisa comparar tudo o tempo todo. Se já tiver uma variável booleana, pode usá-la diretamente no `if`.

Na vida real, você diria: "Se tenho ingresso, eu entro", em vez de: "Se tenho ingresso é igual a verdadeiro, eu entro". No código, vale a mesma lógica, ou seja, `if condicao` equivale a `if condicao == True`:

```python
tem_ingresso = True

if tem_ingresso:
    print('Pode entrar no evento!')

# Saída:
# Pode entrar no evento!
```

Isso também vale para valores _truthy_ e _falsy_. Lembra que usamos a função `input()` para pedir pro usuário digitar um valor que vamos guardar em uma variável? Veja o que acontece aqui quando o usuário não digita nenhum nome e só aperta a teclar `Enter`:

```python
nome = input('Insira seu nome de usuário: ')      # o usuário não digita nada
print(nome)                                       # nome é uma string vazia ('')

if nome:
    print(f'Olá, {nome}!')
else:
    print('Nome não pode ser vazio.')

# Saída:
#
# Nome não pode ser vazio.
```

Como nenhum valor é inserido pelo usuário e o `input()` sempre retorna valores do tipo string, uma _string_ vazia é atribuída à variável `nome`.

Vimos em artigos anteriores que _strings_ vazias são _falsy_, ou seja, consideradas como `False`. Dessa forma, quando o Python avaliar o `if nome`, essa condição terá o resultado `False`. Com isso, o código entra não entra no bloco do `if`, ele entra no `else` e diz: "Nome não pode ser vazio."

---

Você está percebendo como as peças que estamos aprendendo estão se encaixando? Esse último código que vimos acima combina tantos conceitos!

Ele usa o que aprendemos sobre variáveis, _strings_ e formatação delas, tipo booleano, _truthy_ e _falsy_, operadores de atribuição e de comparação, e as próprias estruturas condicionais. 

O mais empolgante é que estamos só no começo. Cada novo conceito abre portas para criar coisas ainda mais interessantes. Continue evoluindo: o que você pode construir daqui pra frente não tem limite!
