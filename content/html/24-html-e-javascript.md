---
id: "a18c8ef44b20"
title: "HTML e JavaScript"
description: "Como adicionar JavaScript em uma página HTML para criar interatividade"
order: 24
---

# Quando a página precisa reagir

HTML estrutura. CSS estiliza. Mas, quando a página precisa fazer algo, normalmente entra o **JavaScript**.

Ele pode mudar texto, responder a cliques, validar informações e muito mais.

## Exemplo simples

```html
<button onclick="document.getElementById('mensagem').innerHTML = 'Olá!'">
  Clique aqui
</button>

<p id="mensagem">Texto original</p>
```

Ao clicar no botão, o conteúdo do parágrafo muda.

## Usando a tag `<script>`

```html
<script>
  alert('Página carregada!');
</script>
```

## Exemplo mais organizado

```html
<button onclick="mostrarMensagem()">Mostrar mensagem</button>

<p id="saida"></p>

<script>
  function mostrarMensagem() {
document.getElementById('saida').innerHTML = 'Agora a página reagiu.';
  }
</script>
```

## O que guardar daqui?

O HTML continua sendo a estrutura. O JavaScript entra para adicionar comportamento.

Quando os dois trabalham juntos, a página deixa de ser só conteúdo parado e passa a responder ao que a pessoa faz.
