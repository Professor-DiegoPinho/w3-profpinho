---
id: "0cbc2e8266a6"
title: "Formulários HTML"
description: "Como criar formulários e entender seus principais elementos e atributos"
order: 34
---

# Coletando dados da pessoa usuária

Formulário é a parte da página usada para enviar informações: cadastro, login, busca, contato e por aí vai.

Em HTML, tudo começa com a tag `<form>`.

## Exemplo básico

```html
<form>
  <label for="nome">Nome:</label>
  <input type="text" id="nome" name="nome">

  <button type="submit">Enviar</button>
</form>
```

## Elementos comuns

- `<label>` identifica o campo;
- `<input>` recebe informação;
- `<button>` executa a ação;
- `<textarea>` recebe texto maior;
- `<select>` cria lista de opções.

## Exemplo com mais elementos

```html
<form>
  <label for="mensagem">Mensagem:</label>
  <textarea id="mensagem" name="mensagem"></textarea>

  <label for="curso">Curso:</label>
  <select id="curso" name="curso">
<option>HTML</option>
<option>CSS</option>
  </select>
</form>
```

## Atributos importantes da tag `<form>`

- `action` define para onde os dados vão;
- `method` define como eles serão enviados.

```html
<form action="/cadastro" method="post">
  ...
</form>
```

## O ponto principal

Formulário em HTML monta a estrutura da coleta de dados. O envio e o processamento normalmente dependem de outras partes do sistema.

Ou seja: o formulário abre a conversa. Alguém do backend precisa responder depois.
