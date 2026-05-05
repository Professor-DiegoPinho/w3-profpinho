---
title: "Switch"
description: "Como usar o switch para comparar um valor com múltiplas opções"
order: 9
---

# Switch

O `switch` compara um valor com várias opções e executa o bloco correspondente. É uma alternativa mais legível ao `if/else if` quando se testa o mesmo valor contra muitos casos.

```javascript
let dia = 3;

switch (dia) {
  case 1:
    console.log("Segunda-feira");
    break;
  case 2:
    console.log("Terça-feira");
    break;
  case 3:
    console.log("Quarta-feira");
    break;
  default:
    console.log("Outro dia");
}
```

## O break

O `break` encerra o `switch` após executar o caso correspondente. Sem ele, o JavaScript continua executando os casos seguintes mesmo que não correspondam ao valor, comportamento chamado de **fall-through**.

```javascript
let cor = "azul";

switch (cor) {
  case "vermelho":
    console.log("Pare");
    break;
  case "amarelo":
    console.log("Atenção");
    break;
  case "azul":
  case "verde":
    console.log("Pode seguir"); // executado para azul e verde
    break;
  default:
    console.log("Cor desconhecida");
}
```

No exemplo acima, `azul` e `verde` compartilham o mesmo bloco, o que é um uso intencional do fall-through.

## O default

O `default` funciona como o `else`: é executado quando nenhum caso corresponde ao valor. É opcional, mas recomendado.

## switch vs if/else

Use `switch` quando você estiver comparando uma mesma variável com vários valores fixos. Para condições mais complexas com intervalos ou múltiplas variáveis, o `if/else` é mais adequado.
