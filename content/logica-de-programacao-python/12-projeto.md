---
title: "Projeto Final"
description: "Pratique listas, menus e condicionais criando um sistema para cadastrar, listar, atualizar e remover participantes de um evento."
order: 13
---

## Projeto Final: Jogo da Forca

### Descrição

Neste projeto você vai criar o clássico jogo da forca no terminal usando Python. O programa sorteia uma palavra secreta de uma lista e o jogador tenta descobri-la letra por letra antes de perder todas as suas seis vidas. É um jogo simples de entender, mas que exige que você combine listas, laços de repetição e condicionais de forma inteligente para funcionar corretamente.

### Como funciona

- O programa sorteia aleatoriamente uma palavra de uma lista de palavras predefinida;
- A palavra é exibida como traços (`_`) representando cada letra oculta;
- A cada rodada, o jogador digita uma letra;
- Se a letra estiver na palavra, ela é revelada em todas as posições onde aparece;
- Se a letra não estiver na palavra, o jogador perde uma vida;
- O jogo termina quando o jogador revela todas as letras ou quando as vidas chegam a zero;
- Ao final, o programa informa se o jogador ganhou ou perdeu e revela a palavra caso ele tenha perdido.

### Objetivos do projeto

- Praticar o uso de listas para representar o estado do jogo (letras reveladas e letras erradas);
- Aplicar o laço `while` para manter o jogo rodando enquanto as condições de vitória ou derrota não forem atingidas;
- Usar o `for` com `range` para percorrer a palavra e comparar cada posição com a letra chutada;
- Exercitar lógica booleana para verificar condições de fim de jogo;
- Trabalhar com `random.choice()` para sortear a palavra secreta.

### O que você deve fazer

- Criar uma lista com pelo menos 10 palavras para o sorteio;
- Usar `random.choice()` para sortear a palavra secreta;
- Criar uma lista de *underscores* (`_`) com o mesmo tamanho da palavra sorteada;
- Implementar o loop principal do jogo com `while`;
- Dentro do loop, usar `for` para verificar se a letra chutada aparece na palavra e atualizar a lista de letras reveladas;
- Exibir a cada rodada: as letras reveladas até o momento, as letras erradas já tentadas e o número de vidas restantes;
- Implementar a condição de vitória: não restar nenhum `_` na lista de letras reveladas;
- Implementar a condição de derrota: vidas chegarem a zero;
- Exibir uma mensagem de vitória ou derrota ao final do jogo;

### Requisitos

- O jogo deve começar com 6 vidas;
- A palavra sorteada deve ser convertida para letras minúsculas antes de comparar com o chute do jogador;
- O programa não deve descontar vida se o jogador chutar uma letra que já foi tentada anteriormente — ele deve avisar e pedir uma nova letra;
- Ao final, independente do resultado, a palavra secreta deve ser revelada;
- O código deve funcionar corretamente para palavras com letras repetidas (ex: `abacaxi`, onde o `a` aparece várias vezes).

### Dicas

- Use `not "_" in letras_reveladas` com o operador `not` (aula 8) para verificar se a palavra foi completamente descoberta;
- Para guardar as letras já tentadas, use uma lista e o método `.append()` — antes de processar o chute, verifique com `letra in ja_tentadas`;
- Lembre-se que `random` já foi apresentado na aula do `while`: basta importar com `import random` no início do código;
- O tamanho da palavra pode ser obtido com `len(palavra)`, o que é útil para criar a lista inicial de underscores com um `for`;
- Teste seu jogo com palavras que tenham letras repetidas para garantir que todas as ocorrências são reveladas corretamente.