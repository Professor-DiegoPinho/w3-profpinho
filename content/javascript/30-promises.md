---
title: "Promises"
description: "Como usar Promises para lidar com operações assíncronas de forma mais organizada"
order: 30
---

# Promises

Uma Promise representa o resultado de uma operação assíncrona que ainda não concluiu. Ela pode estar em um de três estados:

- **pending**: ainda em execução;
- **fulfilled**: concluída com sucesso;
- **rejected**: concluída com erro.

## Criando uma Promise

```javascript
const promessa = new Promise(function(resolve, reject) {
  const sucesso = true;

  if (sucesso) {
    resolve("Deu certo!");
  } else {
    reject("Algo falhou.");
  }
});
```

## Consumindo com .then() e .catch()

```javascript
promessa
  .then(function(resultado) {
    console.log(resultado); // "Deu certo!"
  })
  .catch(function(erro) {
    console.log(erro); // "Algo falhou."
  })
  .finally(function() {
    console.log("Executou independente do resultado");
  });
```

- `.then()`: executado quando a Promise é resolvida com sucesso;
- `.catch()`: executado quando a Promise é rejeitada;
- `.finally()`: executado sempre, com ou sem erro.

## Encadeando Promises

O retorno de um `.then()` pode ser outra Promise, permitindo encadear operações.

```javascript
buscarUsuario(id)
  .then(usuario => buscarPedidos(usuario))
  .then(pedidos => buscarDetalhes(pedidos[0]))
  .then(detalhes => console.log(detalhes))
  .catch(erro => console.error(erro));
```

Muito mais legível que o callback hell.

## Promise.all()

Executa várias Promises ao mesmo tempo e aguarda todas terminarem.

```javascript
Promise.all([buscarUsuarios(), buscarProdutos(), buscarCategorias()])
  .then(([usuarios, produtos, categorias]) => {
    console.log(usuarios, produtos, categorias);
  })
  .catch(erro => console.error(erro));
```

Se qualquer uma rejeitar, o `.catch()` é chamado imediatamente.

## Promise.allSettled()

Igual ao `Promise.all()`, mas aguarda todas terminarem independente de sucesso ou erro.

```javascript
Promise.allSettled([p1, p2, p3])
  .then(resultados => {
    resultados.forEach(r => console.log(r.status, r.value || r.reason));
  });
```
