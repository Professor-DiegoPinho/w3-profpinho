---
id: "09e8a3971725"
title: "Callbacks"
description: "O que são callbacks e como usar funções como argumentos em JavaScript"
order: 29
---

# Callbacks

Um callback é uma função passada como argumento para outra função, para ser executada em algum momento posterior.

```javascript
function executar(callback) {
  console.log("Antes");
  callback();
  console.log("Depois");
}

executar(function() {
  console.log("Sou o callback!");
});

// "Antes"
// "Sou o callback!"
// "Depois"
```

## Callbacks já são usados o tempo todo

Sempre que você usa `addEventListener` ou métodos de array como `forEach` e `map`, está passando callbacks.

```javascript
// callback em addEventListener
botao.addEventListener("click", function() {
  console.log("clicou");
});

// callback em forEach
const numeros = [1, 2, 3];
numeros.forEach(function(n) {
  console.log(n);
});

// com arrow function
numeros.forEach(n => console.log(n));
```

## Callbacks assíncronos

Callbacks também são usados para lidar com operações que levam tempo, como temporizadores e requisições.

```javascript
setTimeout(function() {
  console.log("Executou após 2 segundos");
}, 2000);

console.log("Isso aparece antes!");
// "Isso aparece antes!"
// "Executou após 2 segundos"
```

O `setTimeout` agenda a execução do callback após um tempo, sem bloquear o restante do código.

## O problema do callback hell

Quando callbacks dependem de outros callbacks, o código começa a se aninhar de forma difícil de ler.

```javascript
buscarUsuario(id, function(usuario) {
  buscarPedidos(usuario, function(pedidos) {
    buscarDetalhes(pedidos[0], function(detalhes) {
      console.log(detalhes); // três níveis de aninhamento
    });
  });
});
```

Esse padrão é chamado de **callback hell**. Para resolver isso, o JavaScript moderno usa Promises e async/await.
