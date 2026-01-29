---
title: "Identidade"
description: "O conceito de identidade em Python"
order: 34
---

Logo nas primeiras lições de Python, aprendemos a usar variáveis para guardar valores. Mas isso é uma simplificação do que acontece. Na verdade, **variáveis não guardam valores diretamente**.

O que elas realmente fazem é guardar **referências para objetos na memória**, ou seja, apontar para um objeto específico que existe em algum lugar do computador.

Se ficou confuso, calma! Talvez você não tenha percebido, mas parte desses conceitos já apareceu quando falamos sobre cópia de coleções e imutabilidade em conjuntos.

Agora, vamos vê-los passo a passo para que tudo fique bem claro.

## A variável não é o objeto e não o contém

Para entender melhor o que realmente são as variáveis, podemos fazer uma analogia. Pense em uma pessoa que se chama Ana Carolina:

- Um nome não é e não contém uma pessoa. Da mesma forma, uma variável não é e não contém um objeto.
- O nome da pessoa é usado para identificá-la e chamá-la no mundo. Da mesma forma, uma variável é usada para identificar e chamar um objeto na memória.

Na analogia:

- Variável equivale a nome
- Apontar equivale a chamar e identificar
- Objeto equivale à pessoa

Então, a variável é um nome que usamos para identificar e chamar um objeto na memória. A variável não é o objeto e não o contém, ela somente aponta para ele.

## Múltiplas variáveis, mesmo objeto

Quando dizemos que duas variáveis **apontam para o mesmo objeto**, estamos dizendo que ambas fazem referência ao mesmo espaço na memória, ou seja, **compartilham a mesma identidade**.

Assim, elas não são duas cópias iguais: é exatamente o mesmo objeto sendo acessado por nomes diferentes.

Ainda na analogia da Ana Carolina, ela pode atender se chamarem por "Ana Carolina", "Ana", "Carolina", "Aninha", "Carol"... Mas todos esses nomes se referem à mesma pessoa: a Ana Carolina.

## Ser igual não é ser o mesmo

Agora pense que a Ana Carolina tem uma irmã gêmea idêntica, a Maria Isabel, que é praticamente sua "cópia". Quando alguém vê a Maria Isabel, pode achar que ela é a Ana Carolina, mas as duas são pessoas diferentes.

Em lições anteriores, usamos o operador de comparação `==` para verificar se dois valores são iguais. Podemos trazer esse conceito pro nosso exemplo:

```python
AnaCarolina = {"nascimento": 2010, "gênero": "feminino"}
MariaIsabel = {"nascimento": 2010, "gênero": "feminino"}

Aninha = AnaCarolina

print(Aninha == AnaCarolina)
print(MariaIsabel == AnaCarolina)

# Saída:
# True
# True
```

Acima, `AnaCarolina` e `MariaIsabel` são criadas em momentos diferentes, então são objetos diferentes na memória. Já `Aninha` é criada como `Aninha = AnaCarolina`, então ela não é um novo objeto, mas sim uma nova referência para o objeto `AnaCarolina`.

Tudo parece estar certo quando verificamos se Aninha seria `==` à Ana Carolina, mas quando fazemos isso com a Maria Isabel, vemos que o resultado também diz que ela seria `==` à Ana Carolina.

Assim como no mundo real seria incorreto dizer que a Maria Isabel é a mesma pessoa que a Ana Carolina apesar dela ser igual à Ana Carolina, na programação isso também não estaria certo.

Por mais que o conteúdo de dois objetos possa ser idêntico, às vezes é importante diferenciá-los em dois níveis diferentes:

- As variáveis `AnaCarolina` e `MariaIsabel` têm o mesmo conteúdo?
- As variáveis `AnaCarolina` e `MariaIsabel` são o mesmo objeto?

O operador `==` responde à primeira pergunta, que confere a **igualdade**, mas não à segunda, que confere a **identidade**.

Ser igual não é a mesma coisa que ser o mesmo objeto e é isso que os **operadores de identidade**, que veremos a seguir, permitem verificar. Eles não olham só se os objetos "se parecem", mas sim se apontam pro mesmo objeto na memória.

> Não desanime! O conceito de identidade pode ser um pouco complexo de início, mas ele vai ficando cada vez mais intuitivo conforme você for estudando.
>
> Se sentir necessidade, dê uma revisada na lição [Iterabilidade e Imutabilidade com Conjuntos](./iterabilidade-e-imutabilidade-em-conjuntos), releia a explicação acima, abra seu editor de código e experimente com o conteúdo.

---

Na próxima lição, você verá o conceito de identidade sendo usado na prática, o que vai dar ainda mais sentido a tudo o que vimos aqui.
