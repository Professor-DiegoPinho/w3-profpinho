---
id: "5cc335529ae1"
title: "Fetch API"
description: "Como fazer requisições HTTP com a Fetch API para buscar e enviar dados"
order: 32
---

# Fetch API

A Fetch API é a forma moderna de fazer requisições HTTP com JavaScript. Ela retorna uma Promise e é usada para buscar dados de APIs, enviar formulários e comunicar com servidores.

## GET — buscando dados

```javascript
fetch("https://api.exemplo.com/usuarios")
  .then(response => response.json())
  .then(dados => console.log(dados))
  .catch(erro => console.error(erro));
```

Com async/await:

```javascript
async function buscarUsuarios() {
  const response = await fetch("https://api.exemplo.com/usuarios");
  const dados = await response.json();
  console.log(dados);
}
```

O processo tem duas etapas: primeiro você recebe a resposta (`response`), depois converte o corpo para o formato desejado com `.json()`.

## Verificando se a resposta foi bem-sucedida

`fetch` não rejeita a Promise em respostas de erro como 404 ou 500. Você precisa verificar manualmente.

```javascript
async function buscar(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ${response.status}`);
  }

  return response.json();
}
```

`response.ok` é `true` quando o status está entre 200 e 299.

## POST — enviando dados

```javascript
async function criarUsuario(dados) {
  const response = await fetch("https://api.exemplo.com/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  });

  return response.json();
}

criarUsuario({ nome: "Ana", email: "ana@email.com" });
```

## Outros métodos HTTP

A mesma estrutura serve para `PUT`, `PATCH` e `DELETE`:

```javascript
await fetch(`https://api.exemplo.com/usuarios/${id}`, {
  method: "DELETE"
});
```

{% links "Links da aula" %}
- [**MDN - Fetch API**](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
{% endlinks %}
