---
title: "Lógica Booleana - Parte 2"
description: "Aprofunde o uso de not e expressões booleanas para inverter condições e escrever validações com semântica clara."
order: 8
---

- Os operadores lógicos nos permitem combinar diferentes comparações dentro de uma mesma condição. Vimos dois deles: o `and` e o `or`.
    
    
    | Operador | Como funciona |
    | --- | --- |
    | and (E lógico) | Retorna true se ambas as condições forem verdadeiras. |
    | or (OU lógico) | Retorna true se pelo menos uma das condições for verdadeira. |
- Entretanto, existe um terceiro operador lógico que funciona um pouco diferente dos demais: o `not`.
- O `not` é o operador lógico de negação. Na prática, significa que ele inverte os valores booleanos, ou seja:
    
    ```python
    not True #False
    not False #True
    ```
    
- **Mas em que cenário seria utilizar este operador?**
- Se pensarmos em uma analogia, o `not` é como se fosse interruptor que inverte a luz: se está aceso (True), apaga (False); se está apagado, acende. Ele é útil sempre que quisermos testar se algo não aconteceu, não está presente ou não é verdadeiro.
- Vamos aplicar esta ideia em um programa que controla o acesso a uma sala de estudos. para acessar esta sala, é necessário: ter uma carteirinha, estar no horário e não ter sido banido. Vamos representar isso em variáveis:
    
    ```python
    tem_carteirinha = True
    esta_em_horario = False
    foi_banido = False
    ```
    
- Podemos usar os operadores lógicos para montar a condição que verifica estes itens:
    
    ```python
    tem_carteirinha = True
    esta_em_horario = False
    foi_banido = False
    
    if (tem_carteirinha and esta_em_horario) and not foi_banido:
        print("Acesso liberado à sala de estudos.")
    else:
        print("Acesso negado.")
    ```
    
- Note que semanticamente, falar que ele não pode ter sido banido fica muito bem representado com a verificação `not foi_banido`.
- Este é o segredo do uso do `not`!
- Para dar outro exemplo, vamos recuperar o código da aula anterior:
    
    ```python
    idade = int(input("Idade: "))
    altura = float(input("Altura: "))
    
    if idade >= 14 and altura >= 1.60:
      print("Entrada liberada.")
    else:
      print("Entrada proibida.")
    ```
    
- Podemos melhorar este código dando semântica para as comparações:
    
    ```python
    idade = int(input("Idade: "))
    altura = float(input("Altura: "))
    
    requisitos_atendidos = idade >= 14 and altura >= 1.60
    
    if requisitos_atendidos == True:
      print("Entrada liberada.")
    else:
      print("Entrada proibida.")
    ```
    
- Dentro do if uma comparação com valor Booleano é redundante, podemos simplesmente tirar:
    
    ```python
    idade = int(input("Idade: "))
    altura = float(input("Altura: "))
    
    requisitos_atendidos = idade >= 14 and altura >= 1.60
    
    if requisitos_atendidos:
      print("Entrada liberada.")
    else:
      print("Entrada proibida.")
    ```
    
- Agora podemos mudar um pouco a lógica deste código usando o operador `not`:
    
    ```python
    idade = int(input("Idade: "))
    altura = float(input("Altura: "))
    
    requisitos_atendidos = idade >= 14 and altura >= 1.60
    
    if not requisitos_atendidos:
      print("Entrada proibida.")
    else:
      print("Entrada liberada.")
    ```
    
- Em resumo:
    
    
    | Operador | Como funciona |
    | --- | --- |
    | and (E lógico) | Retorna true se ambas as condições forem verdadeiras. |
    | or (OU lógico) | Retorna true se pelo menos uma das condições for verdadeira. |
    | not (NÃO lógico) | Inverte o valor lógico de uma expressão. |

# 🧩 Exercícios

## Exercício 1: Sem convite não entra

O código abaixo valida se uma pessoa possui o convite para uma determinada festa:

```python
convite = input("Você tem convite? (sim/não): ")

if convite == "sim":
  print("Pode entrar!")
else:
   print("Entrada proibida.")
```

Refatore este código invertendo a condição usando o operador `not`.

{% toggle "Ver solução" %}

```python
convite = input("Você tem convite? (sim/não): ")

if not (convite == "sim"):
  print("Entrada proibida.")
else:
  print("Pode entrar!")
```

{% endtoggle %}

## Exercício 2: Porta Trancada

Um sistema de segurança precisa verificar se uma porta está fechada.

- A porta tem dois estados possíveis: aberta (`True`) ou fechada (`False`);
- O alarme deve disparar se a porta não estiver fechada;
- Use o operador lógico `not` para resolver.

Por exemplo:

```python
A porta está fechada? (sim/não) # não
⚠️ Alarme disparado!

A porta está fechada? (sim/não) # sim
Tudo certo, a porta está trancada.
```

{% toggle "Ver solução" %}

```java
porta_fechada = input("A porta está fechada? (sim/não) ")
if not (porta_fechada == "sim"):
    print("⚠️  Alarme disparado!")
else:
    print("Tudo certo, a porta está trancada.")
```

{% endtoggle %}

## Exercício 3: Pode assistir ao filme?

Crie um programa que pergunta ao usuário: "Você está com sono?". Se o usuário não estiver com sono ele pode assistir ao filme, caso contrário não.

Por exemplo:

```python
Você está com sono? (sim/não): não
Você pode assistir ao filme!
```

{% toggle "Ver solução" %}

```python
sono = input("Você está com sono? (sim/não): ")
esta_com_sono = (sono == "sim")
if not esta_com_sono:
	print("Você pode assistir ao filme!")
else:
	print("Vá descansar primeiro!")
```

{% endtoggle %}

{% links "Links da aula" %}
- [**Programiz - Online Python Compiler**](https://www.programiz.com/python-programming/online-compiler/)
- [**Learning Hub - Prof. Diego Pinho: Python - Operadores Lógicos**](https://www.notion.so/Aula-08-L-gica-Booleana-Parte-2-1ca5b3c6f6d580e3bd28d70490296f13?pvs=21)
{% endlinks %}