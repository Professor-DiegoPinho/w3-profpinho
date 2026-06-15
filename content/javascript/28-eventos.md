---
id: "841e00d4a3ab"
title: "Eventos"
description: "O que são eventos no JavaScript e como reagir a interações do usuário"
order: 28
---

# Eventos

Eventos são ações que acontecem na página: um clique, uma tecla pressionada, o mouse passando sobre um elemento, um formulário sendo enviado. O JavaScript reage a esses eventos executando funções.

## Eventos inline (evite)

```html
<button onclick="alert('Clicou!')">Clique</button>
```

Funciona, mas mistura HTML e JavaScript. Evite no dia a dia.

## Propriedade de evento no elemento

```javascript
const botao = document.querySelector("button");

botao.onclick = function() {
  console.log("Clicou!");
};
```

Simples, mas permite apenas um handler por evento. O próximo `onclick` sobrescreve o anterior.

## addEventListener (recomendado)

```javascript
botao.addEventListener("click", function() {
  console.log("Clicou!");
});
```

É a forma mais recomendada. Permite adicionar múltiplos listeners no mesmo evento e oferece mais controle.

## Eventos comuns

```javascript
// Mouse
elemento.addEventListener("click", handler);
elemento.addEventListener("dblclick", handler);
elemento.addEventListener("mouseover", handler); // mouse entrou
elemento.addEventListener("mouseout", handler);  // mouse saiu

// Teclado
document.addEventListener("keydown", handler);   // tecla pressionada
document.addEventListener("keyup", handler);     // tecla solta

// Formulário
input.addEventListener("input", handler);    // a cada digitação
input.addEventListener("change", handler);   // ao sair do campo
form.addEventListener("submit", handler);    // ao enviar

// Página
window.addEventListener("load", handler);    // página totalmente carregada
window.addEventListener("resize", handler);  // janela redimensionada
window.addEventListener("scroll", handler);  // página rolada
```

## O objeto event

Todo handler recebe um objeto com informações sobre o evento.

```javascript
document.addEventListener("keydown", function(event) {
  console.log(event.key); // tecla pressionada, ex: "Enter", "a"
});

botao.addEventListener("click", function(event) {
  console.log(event.target); // o elemento que foi clicado
});
```

## preventDefault

Cancela o comportamento padrão do navegador para aquele evento.

```javascript
const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // impede o recarregamento da página
  // agora você pode processar o formulário com JavaScript
});
```
