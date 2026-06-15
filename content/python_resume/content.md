---
id: "de8d2f870edc"
title: "Resumo Prático de Python"
description: "Guia essencial de Python em português para iniciantes. Conceitos fundamentais com exemplos práticos do dia a dia."
order: 1
---

## 1. Operadores e Tipos Básicos

```python
# Comentários começam com #

# Operações com números
10 + 5      # => 15
20 - 8      # => 12
4 * 3       # => 12
15 / 3      # => 5.0
17 // 5     # => 3 (divisão inteira)
17 % 5      # => 2 (resto)
2 ** 8      # => 256 (potência)

# Booleanos
True   # Verdadeiro
False  # Falso

# Lógica
not True        # => False
True and False  # => False
True or False   # => True

# Comparações
5 == 5      # => True
10 != 8     # => True
3 < 10      # => True
5 <= 5      # => True
2 < 3 < 4   # Encadeamento elegante

# Strings com aspas duplas ou simples
mensagem = "Olá, Python!"
outro = 'Bem-vindo'

# Concatenação
mensagem + " " + outro  # => "Olá, Python! Bem-vindo"

# Comprimento
len(mensagem)  # => 13

# Acessar caracteres
mensagem[0]     # => 'O'
mensagem[-1]    # => '!'

# F-strings (interpolação)
nome = "Python"
versao = 3.11
f"{nome} {versao}"  # => "Python 3.11"

# None para valor ausente
valor = None
valor is None  # => True
```

## 2. Variáveis e Saída

```python
# Exibir na tela
print("Bem-vindo ao Python!")
print(25, "anos", 1.75, "metro")

# Receber entrada do usuário
nome = input("Qual seu nome? ")
idade = input("Quantos anos? ")

# Atribuição simples (sem tipos declarados)
quantidade = 10
taxa = 0.15
ativo = True
```

## 3. Coleções

```python
# Listas - coleções ordenadas e mutáveis
frutos = ["maçã", "banana", "laranja"]
numeros = [1, 2, 3, 4, 5]
mistos = [10, "texto", 3.14, True]

# Adicionar e remover
frutos.append("uva")          # ["maçã", "banana", "laranja", "uva"]
frutos.remove("banana")       # Remove por valor
ultimo = frutos.pop()         # Remove o último

# Acessar elementos
frutos[0]      # "maçã" (primeiro)
frutos[-1]     # "laranja" (último)
frutos[1:3]    # Fatiamento

# Verificações
len(frutos)                           # 2
"maçã" in frutos                      # True
frutos.extend(["abacaxi", "manga"])   # Adiciona vários


# Tuplas - coleções imutáveis
coordenadas = (10, 20)
rgb = (255, 128, 0)

# Acesso e desempacotamento
x, y = coordenadas         # x=10, y=20
r, g, b = rgb              # Desempacota valores

# Não pode modificar: "rgb[0] = 200" gera erro
# Mas pode converter para lista se precisar
rgb_lista = list(rgb)


# Dicionários - pares chave-valor
pessoa = {"nome": "Ana", "idade": 28, "cidade": "São Paulo"}
preco_produtos = {"notebook": 3000, "mouse": 50, "teclado": 200}

# Acessar valores
pessoa["nome"]              # "Ana"
pessoa.get("telefone")      # None
pessoa.get("telefone", "N/A")  # "N/A" (com padrão)

# Adicionar e modificar
pessoa["profissao"] = "Engenheira"
pessoa.update({"idade": 29})  # Atualiza

# Listar chaves e valores
list(preco_produtos.keys())      # ["notebook", "mouse", "teclado"]
list(preco_produtos.values())    # [3000, 50, 200]

# Remover
del preco_produtos["mouse"]
"nome" in pessoa  # True


# Conjuntos - valores únicos, sem ordem
tags = {"python", "programacao", "iniciante"}
numeros_pares = {2, 4, 6, 8}

# Adicionar
tags.add("tutorial")

# Operações
grupo1 = {1, 2, 3, 4}
grupo2 = {3, 4, 5, 6}

grupo1 & grupo2      # Interseção: {3, 4}
grupo1 | grupo2      # União: {1, 2, 3, 4, 5, 6}
grupo1 - grupo2      # Diferença: {1, 2}

# Verificação
"python" in tags     # True
len(tags)            # 4
```

## 4. Controle de Fluxo

```python
# Condicional if/elif/else
temperatura = 32

if temperatura > 35:
    print("Muito quente!")
elif temperatura < 15:
    print("Muito frio!")
else:
    print("Temperatura agradável")

# Laço for
palavras = ["Python", "é", "incrível"]
for palavra in palavras:
    print(palavra)

# Com range
for i in range(5):           # 0, 1, 2, 3, 4
    print(i * 2)

for i in range(1, 11, 2):    # 1, 3, 5, 7, 9
    print(i)

# Com índice usando enumerate
frutos = ["maçã", "banana", "cereja"]
for idx, fruto in enumerate(frutos):
    print(f"{idx}: {fruto}")

# Laço while
contador = 0
while contador < 3:
    print("Contando:", contador)
    contador += 1

# Tratamento de exceções
try:
    numero = int(input("Digite um número: "))
    resultado = 10 / numero
    print(f"Resultado: {resultado}")
except ValueError:
    print("Entrada inválida!")
except ZeroDivisionError:
    print("Não pode dividir por zero!")

# Trabalhar com arquivos
with open("dados.txt", "w") as arquivo:
    arquivo.write("Primeira linha\n")
    arquivo.write("Segunda linha")

with open("dados.txt", "r") as arquivo:
    for linha in arquivo:
        print(linha.strip())
```

## 5. Funções

```python
# Definição básica
def saudacao(nome):
    return f"Olá, {nome}!"

# Chamada
saudacao("Maria")  # Retorna "Olá, Maria!"

# Argumentos com valores padrão
def criar_perfil(nome, idade=18):
    return {"nome": nome, "idade": idade}

criar_perfil("João")              # Usa idade padrão
criar_perfil("Ana", idade=25)     # Sobrescreve padrão

# Argumentos variáveis
def somar_multiplos(*numeros):
    total = 0
    for num in numeros:
        total += num
    return total

somar_multiplos(1, 2, 3)      # 6
somar_multiplos(10, 20, 30)    # 60

# Argumentos nomeados variáveis
def filtrar(**opcoes):
    return opcoes

filtrar(status="ativo", idade=25)  # {"status": "ativo", "idade": 25}

# Retornar múltiplos valores
def obter_dados():
    return "João", 30, "São Paulo"

nome, idade, cidade = obter_dados()

# Escopo de variáveis
contador_global = 0

def incrementar():
    global contador_global
    contador_global += 1
    return contador_global

# Funções aninhadas (closures)
def multiplicador(fator):
    def multiplica(numero):
        return numero * fator
    return multiplica

mult_3 = multiplicador(3)
mult_3(5)   # 15

# Funções lambda (anônimas)
quadrado = lambda x: x ** 2
quadrado(4)  # 16

# List comprehension
quadrados = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]
pares = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]

# Dict comprehension
indice = {x: x**2 for x in range(4)}  # {0: 0, 1: 1, 2: 4, 3: 9}
```

## 6. Módulos

```python
# Importar módulo inteiro
import math

math.sqrt(25)       # 5.0
math.pi             # 3.14159...
math.ceil(3.2)      # 4

# Importar funções específicas
from datetime import datetime
from random import randint

agora = datetime.now()
numero = randint(1, 100)

# Importar com apelido
import json as j
dados = j.dumps({"nome": "Pedro"})
```


## 7. Classes

```python
# Definição de uma classe
class Pessoa:
    """Representa uma pessoa com nome e idade"""
    
    # Atributo de classe (compartilhado por todas as instâncias)
    especie = "Homo sapiens"
    
    # Inicializador
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade
    
    # Método de instância
    def apresentar(self):
        return f"Olá, meu nome é {self.nome}"
    
    def fazer_aniversario(self):
        self.idade += 1
        return f"{self.nome} agora tem {self.idade} anos"
    
    # Também pode retornar uma representação em string
    def __str__(self):
        return f"Pessoa({self.nome}, {self.idade} anos)"


# Uso da classe
if __name__ == "__main__":
    # Criar instâncias
    p1 = Pessoa("Carlos", 30)
    p2 = Pessoa("Fernanda", 28)
    
    print(p1.apresentar())           # "Olá, meu nome é Carlos"
    print(p1.fazer_aniversario())    # "Carlos agora tem 31 anos"
    print(str(p2))                   # "Pessoa(Fernanda, 28 anos)"


# Herança

# Uma classe pode herdar de outra
class Veiculo:
    """Classe base para veículos"""
    
    def __init__(self, marca, cor):
        self.marca = marca
        self.cor = cor
    
    def info(self):
        return f"{self.marca} {self.cor}"


class Carro(Veiculo):
    """Especialização de Veículo"""
    
    def __init__(self, marca, cor, portas):
        super().__init__(marca, cor)  # Chama init da classe mãe
        self.portas = portas
    
    def info(self):
        msg_base = super().info()
        return f"{msg_base} - {self.portas} portas"


class Moto(Veiculo):
    def __init__(self, marca, cor, cilindrada):
        super().__init__(marca, cor)
        self.cilindrada = cilindrada


if __name__ == "__main__":
    carro = Carro("Toyota", "Preto", 4)
    moto = Moto("Honda", "Vermelha", 500)
    
    print(carro.info())           # "Toyota Preto - 4 portas"
    print(isinstance(carro, Veiculo))  # True

# Herança Múltipla

# Uma classe pode herdar de múltiplas classes
class Animal:
    def fazer_som(self):
        return "Som genérico"


class Terrestre:
    def caminhar(self):
        return "Caminhando..."


class Cachorro(Animal, Terrestre):
    """Classe que herda de duas classes"""
    
    def fazer_som(self):
        return "Au au!"
    
    def buscar(self):
        return "Buscando a bolinha..."


if __name__ == "__main__":
    dog = Cachorro()
    
    print(dog.fazer_som())    # "Au au!"
    print(dog.caminhar())     # "Caminhando..."
    print(dog.buscar())       # "Buscando a bolinha..."
```

## 8. Conceitos Avançados

``` python
# Geradores - economia de memória
def contar_ate(n):
    """Gera números de 1 até n"""
    i = 1
    while i <= n:
        yield i
        i += 1

# Não carrega tudo na memória, apenas o próximo valor
for numero in contar_ate(5):
    print(numero)  # 1, 2, 3, 4, 5

# Generator comprehension
numeros_quadrados = (x**2 for x in range(5))
print(next(numeros_quadrados))  # 0
print(next(numeros_quadrados))  # 1


# Decoradores - modificam o comportamento de funções
def contar_chamadas(funcao):
    """Decorator que conta quantas vezes a função é chamada"""
    contagem = 0
    
    def wrapper(*args, **kwargs):
        nonlocal contagem
        contagem += 1
        print(f"Função chamada {contagem} vez(es)")
        return funcao(*args, **kwargs)
    
    return wrapper

@contar_chamadas
def saudar(nome):
    return f"Olá, {nome}!"

saudar("Pedro")    # Função chamada 1 vez(es) => "Olá, Pedro!"
saudar("Ana")      # Função chamada 2 vez(es) => "Olá, Ana!"


# Decorador com parâmetros
def repetir(vezes):
    """Executa função múltiplas vezes"""
    def decorador(funcao):
        def wrapper(*args, **kwargs):
            resultados = []
            for _ in range(vezes):
                resultados.append(funcao(*args, **kwargs))
            return resultados
        return wrapper
    return decorador

@repetir(3)
def cumprimentar():
    return "Oi!"

cumprimentar()  # ["Oi!", "Oi!", "Oi!"]
```
