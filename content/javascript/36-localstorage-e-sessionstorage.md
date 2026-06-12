---
id: "1143be3e57a8"
title: "LocalStorage e SessionStorage"
description: "Como salvar e recuperar dados no navegador com localStorage e sessionStorage"
order: 36
---

# LocalStorage e SessionStorage

O navegador oferece duas formas de armazenar dados no dispositivo do usuário, sem precisar de servidor.

- **localStorage**: os dados persistem mesmo após fechar o navegador;
- **sessionStorage**: os dados são apagados ao fechar a aba.

A API dos dois é idêntica.

## Salvando dados

```javascript
localStorage.setItem("nome", "Ana");
localStorage.setItem("tema", "escuro");
```

## Recuperando dados

```javascript
const nome = localStorage.getItem("nome");
console.log(nome); // "Ana"

const inexistente = localStorage.getItem("chave-que-nao-existe");
console.log(inexistente); // null
```

## Removendo dados

```javascript
localStorage.removeItem("tema");  // remove uma chave
localStorage.clear();             // remove tudo
```

## Armazenando objetos

O localStorage só armazena strings. Para salvar objetos ou arrays, converta com `JSON.stringify` e `JSON.parse`.

```javascript
const usuario = { nome: "Ana", preferencias: { tema: "escuro" } };

// Salvar
localStorage.setItem("usuario", JSON.stringify(usuario));

// Recuperar
const dados = JSON.parse(localStorage.getItem("usuario"));
console.log(dados.nome); // "Ana"
```

## SessionStorage

Funciona exatamente igual, mas os dados são apagados quando a aba é fechada.

```javascript
sessionStorage.setItem("paginaAtual", "checkout");
sessionStorage.getItem("paginaAtual"); // "checkout"
sessionStorage.removeItem("paginaAtual");
```

## Quando usar cada um

| | localStorage | sessionStorage |
|---|---|---|
| Dados persistem ao fechar o navegador | Sim | Não |
| Dados persistem ao recarregar a página | Sim | Sim |
| Compartilhado entre abas | Sim | Não |

Use `localStorage` para preferências do usuário, tema, idioma e dados que devem ser lembrados entre sessões. Use `sessionStorage` para dados temporários como o estado de um formulário de múltiplas etapas.

> Os dados ficam salvos no dispositivo do usuário e são acessíveis via JavaScript. Nunca armazene informações sensíveis como senhas ou tokens de autenticação no localStorage.
