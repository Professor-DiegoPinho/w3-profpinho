---
id: "e85f6ce9f90a"
title: "Saída de Dados"
description: "As principais formas de exibir informações com JavaScript: console.log, alert e innerHTML"
order: 3
---

# Saída de Dados

JavaScript tem algumas formas de exibir informações. Cada uma serve para um contexto diferente.

## console.log()

Exibe a informação no console do navegador. É a forma mais usada no dia a dia para testar e depurar código.

```javascript
console.log("Olá, mundo!");
console.log(42);
console.log(2 + 2);
```

Para abrir o console: `F12` ou clique direito na página e escolha "Inspecionar", depois vá na aba "Console".

## alert()

Exibe uma caixa de diálogo no navegador com uma mensagem.

```javascript
alert("Bem-vindo!");
```

Útil para demonstrações rápidas, mas interrompe a execução da página. Não é usado em produção.

## innerHTML

Insere conteúdo dentro de um elemento HTML da página.

```html
<p id="resultado"></p>

<script>
  document.getElementById("resultado").innerHTML = "Texto inserido pelo JS!";
</script>
```

É a forma mais usada para exibir informações dinamicamente na interface.

## document.write()

Escreve diretamente no documento HTML.

```javascript
document.write("Olá!");
```

Se chamado depois que a página já carregou, apaga todo o conteúdo existente. Por isso, raramente é usado fora de exemplos didáticos.

## Resumo

| Método | Onde aparece | Uso comum |
|---|---|---|
| `console.log()` | Console do navegador | Depuração e testes |
| `alert()` | Caixa de diálogo | Demonstrações rápidas |
| `innerHTML` | Na página | Atualizar a interface |
| `document.write()` | Na página | Apenas exemplos didáticos |
