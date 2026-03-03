---
title: "Lógica Booleana"
description: "Combine condições com and e or para criar validações mais completas e regras de acesso em programas Python."
order: 7
---

- Comparações resultam em valores booleanos, ou seja, em `True` ou `False`.
- **Mas o que acontece quando temos comparações com múltiplos fatores?**
- Por exemplo, vamos supor que estamos administrando um parque de diversões e que, para entrar em um determinado brinquedo, é necessário:
    - Ter pelo menos 14 anos de idade;
    - Ter pelo menos 1.60m de altura.
- Aplicando o que já conhecemos até agora, podemos fazer este código da seguinte maneira:
    
    ```python
    idade = int(input("Idade: "))
    altura = float(input("Altura: "))
    
    if idade >= 14:
    	if altura >= 1.60:
    		print("Entrada liberada.")
    	else:
    		print("Entrada proibida.")
    else:
    	print("Entrada proibida.")
    ```
    
- Isso funciona, mas torna o código mais difícil de entender e de dar manutenção…
- Para melhorar este código, podemos usar os operadores lógicos. Com eles, podemos combinar duas ou mais condições em um único resultado. Olha só:
    
    ```python
    idade = int(input("Idade: "))
    altura = float(input("Altura: "))
    
    if idade >= 14 and altura >= 1.60:
      print("Entrada liberada.")
    else:
      print("Entrada proibida.")
    ```
    
- Note que a palavra and “une” as duas condições, de forma que o resultado será verdadeiro somente se todas as outras também forem verdadeiras (`True`). Caso qualquer uma destas condições seja falsa, todo o conjunto será falso (`False`).
- Legal, né?
- Poderiamos flexibilizar esta regra usando o operador `or`. Neste operador, se qualquer uma das condições for verdadeira, o conjunto todo também é.
    
    ```python
    idade = int(input("Idade: "))
    altura = float(input("Altura: "))
    
    if idade >= 14 or altura >= 1.60:
      print("Entrada liberada.")
    else:
      print("Entrada proibida.")
    ```
    
- Além do `and` e do `or`, existe o operador `not`. Mas falaremos dele em outra aula.
- Em resumo:
    
    
    | Operador | Como funciona |
    | --- | --- |
    | and (E lógico) | Retorna true se ambas as condições forem verdadeiras. |
    | or (OU lógico) | Retorna true se pelo menos uma das condições for verdadeira. |
    | not (NÃO lógico) | Inverte o valor lógico de uma expressão. |
    
    ```python
    10 < 14 and 14 > 10 # true, pq ambas comparações são verdadeiras
    10 > 14 and 14 > 10 # false, pq a primeira comparação é falsa
    
    10 < 14 or 14 < 10 # true, pq a primeira comparação é verdadeira
    10 < 14 or 14 > 10 # true, pq ambas são verdadeiras
    10 > 14 or 14 < 10 # false, pq ambas são falsas
    
    not 10 < 14 # false, pq inverte
    not 10 > 14 # true, pq inverte
    ```
    

# 🧩 Exercícios

## Exercício 1: Autorização negada meu parceiro

Escreva um programa que simula o sistema de autenticação de um sistema. O usuário irá inserir o `username` e o `password`. Seu sistema deverá verificar se as informações inseridas batem com os dados abaixo:

```jsx
username: admin
password: senhasegura
```

Caso a informação inserida esteja correta, exibir a mensagem: `“Acesso concedido.”`. Caso contrário: `“Sei quem é você não, sai fora!”`

Exemplo:

```python
Insira o username: # joao
Insira o password: # senhasegura

Sei quem é você não, sai fora!
```

{% toggle "Ver solução" %}

```python
username = input("Insira o username: ")
password = input("Insira a password: ")

if username == "admin" and password == "senhasegura":
    print("Acesso concedido.")
else:
    print("Sei quem é você não, sai fora!")
```

{% endtoggle %}

## Exercício 2: Posso ver sua documentação?

Escreva um programa que cadastre a documentação do usuário. Existem duas opções de documento que são aceitas no sistema:

- RG;
- CPF.

O sistema deve perguntas pelas duas e o usuário deve preencher as que quiser. Para as que ele quiser ignorar, ele simplesmente vai apertar `enter`. O usuário tem que preencher, necessariamente, PELO MENOS um dos documentos.

Exemplo:

```python
# Exemplo 1: Somente CPF
Digite o seu RG: # vazio
Digite o seu CPF: 1328309

Documentação cadastrada com sucesso!

# Exemplo 2: Nenhum documento
Digite o seu RG: # vazio
Digite o seu CPF: # vazio

Preencha o RG ou CPF!
```

{% toggle "Ver solução" %}

```python
rg = input("Digite o seu RG: ")
cpf = input("Digite o seu CPF: ")

if rg != "" or cpf != "":
  print("Documentação cadastrada com sucesso!")
else:
  print("Preencha o RG ou CPF")
```

{% endtoggle %}

## Exercício 3: Pode dirigir ou não?

Uma escola de trânsito quer saber se uma pessoa pode participar das aulas práticas de direção.

As regras são:

- Idade ≥ 18;
- Possui documento de identificação (RG ou CNH).

Mas se a pessoa ainda não tem documento, ela pode fazer a aula apenas se estiver acompanhada de um responsável. Com base nestas informações, peça ao usuário a idade, se ela tem documento e se está acompanhado de um responsável; e diga se ela pode participar ou não.

Por exemplo:

```python
Idade: # 17
Documento (sim/não): # não
Acompanhado (sim/não): # sim

Resultado: Pode participar.
```

{% toggle "Ver solução" %}

```python
idade = int(input("Idade: "))
documento = input("Possui documento? (sim/nao): ")
acompanhado = input("Está acompanhado de um responsável? (sim/nao): ")

tem_documento = (documento == "sim")
esta_acompanhado = (acompanhado == "sim")

if idade >= 18 and (tem_documento or esta_acompanhado):
	print("Pode participar.")
else:
	print("Não pode participar.")
```

{% endtoggle %}

{% links "Links da aula" %}
- [**Programiz - Online Python Compiler**](https://www.programiz.com/python-programming/online-compiler/)
- [**Learning Hub - Prof. Diego Pinho: Python - Condicionais avançadas**](https://hub.diegopinho.com.br/python/condicionais-avancadas)
- [**Learning Hub - Prof. Diego Pinho: Python - Operadores Lógicos**](https://www.notion.so/Aula-08-L-gica-Booleana-Parte-2-1ca5b3c6f6d580e3bd28d70490296f13?pvs=21)
{% endlinks %}