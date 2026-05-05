---
title: "Break e Continue"
description: "Como interromper ou pular iterações em loops com break e continue"
order: 12
---

# Break e Continue

## break

Interrompe o loop imediatamente, independentemente da condição.

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
}
// 0, 1, 2, 3, 4
```

O loop termina quando `i` chega em 5, antes de completar as 10 iterações.

## continue

Pula a iteração atual e vai para a próxima, sem encerrar o loop.

```javascript
for (let i = 0; i < 6; i++) {
  if (i === 3) {
    continue;
  }
  console.log(i);
}
// 0, 1, 2, 4, 5
```

O número 3 é pulado, mas o loop continua normalmente.

## Exemplo prático

```javascript
const numeros = [1, -2, 5, -8, 3, -1];
const positivos = [];

for (const num of numeros) {
  if (num < 0) continue; // ignora negativos

  positivos.push(num);
}

console.log(positivos); // [1, 5, 3]
```

## Quando usar

`break` é útil quando você encontrou o que procurava e não precisa continuar o loop. `continue` é útil para pular itens que não atendem a um critério sem precisar aninhar todo o bloco dentro de um `if`.
