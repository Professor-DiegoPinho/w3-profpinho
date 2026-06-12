---
id: "0e1289e0aa60"
title: "Async/Await"
description: "Como usar async e await para escrever código assíncrono de forma síncrona e legível"
order: 31
---

# Async/Await

`async` e `await` são uma sintaxe para trabalhar com Promises de forma mais legível, como se o código fosse síncrono.

## async

A palavra `async` antes de uma função faz ela retornar sempre uma Promise.

```javascript
async function saudar() {
  return "Olá!";
}

saudar().then(msg => console.log(msg)); // "Olá!"
```

## await

O `await` pausa a execução da função até que a Promise seja resolvida. Só pode ser usado dentro de funções `async`.

```javascript
async function buscarDados() {
  const dados = await fetch("https://api.exemplo.com/dados");
  const json = await dados.json();
  console.log(json);
}
```

O código parece síncrono, mas não bloqueia o resto da aplicação.

## Comparação com .then()

```javascript
// Com .then()
buscarUsuario(id)
  .then(usuario => buscarPedidos(usuario))
  .then(pedidos => console.log(pedidos))
  .catch(erro => console.error(erro));

// Com async/await
async function carregar() {
  const usuario = await buscarUsuario(id);
  const pedidos = await buscarPedidos(usuario);
  console.log(pedidos);
}
```

O mesmo fluxo, mas bem mais legível.

## Tratando erros com try/catch

```javascript
async function carregar() {
  try {
    const usuario = await buscarUsuario(id);
    const pedidos = await buscarPedidos(usuario);
    console.log(pedidos);
  } catch (erro) {
    console.error("Algo deu errado:", erro);
  }
}
```

## Executando em paralelo

Usar `await` em sequência faz cada operação esperar a anterior. Para executar em paralelo, use `Promise.all`:

```javascript
async function carregar() {
  // Sequencial: lento
  const usuarios = await buscarUsuarios();
  const produtos = await buscarProdutos();

  // Paralelo: mais rápido
  const [usuarios, produtos] = await Promise.all([
    buscarUsuarios(),
    buscarProdutos()
  ]);
}
```
