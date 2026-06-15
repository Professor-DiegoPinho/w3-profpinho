---
id: "8d51be0a6b99"
title: "Introdução ao JavaScript"
description: "O que é JavaScript, para que serve e como ele se encaixa no desenvolvimento web"
order: 1
---

# O que é JavaScript?

JavaScript é a linguagem de programação da web. Enquanto o HTML estrutura o conteúdo e o CSS cuida da aparência, o JavaScript é responsável pelo **comportamento**: o que acontece quando o usuário clica em um botão, preenche um formulário ou interage com qualquer elemento da página.

De forma simples:

- **HTML** estrutura o conteúdo;
- **CSS** estiliza;
- **JavaScript** adiciona comportamento.

## O que dá para fazer com JavaScript?

No navegador, o JavaScript é capaz de:

- mostrar ou esconder elementos na tela;
- validar formulários antes de enviar;
- buscar dados de um servidor sem recarregar a página;
- criar animações e interações visuais;
- responder a cliques, teclas pressionadas e movimentos do mouse.

## Um exemplo simples

```html
<!DOCTYPE html>
<html>
  <body>
    <h1 id="titulo">Olá!</h1>
    <button onclick="mudarTexto()">Clique aqui</button>

    <script>
      function mudarTexto() {
        document.getElementById("titulo").textContent = "Você clicou!";
      }
    </script>
  </body>
</html>
```

Quando o botão é clicado, a função `mudarTexto()` é executada e o texto do título muda na tela. Isso é JavaScript em ação: reagindo a uma interação do usuário e alterando a página em tempo real.

## JavaScript no dia a dia

Toda página web moderna usa JavaScript. Redes sociais, plataformas de streaming, formulários, dashboards e sistemas de busca dependem da linguagem em algum nível.

Mesmo em projetos com frameworks como React, Vue ou Angular, o JavaScript está por baixo de tudo. Aprender a linguagem antes de qualquer framework é o caminho mais sólido.

> **Curiosidade:** o JavaScript também roda fora do navegador. Com o Node.js, é possível usar a mesma linguagem para criar servidores e APIs. Mas esse não é o foco aqui: vamos trabalhar com JavaScript puro no contexto web.
