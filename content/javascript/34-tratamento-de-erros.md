---
title: "Tratamento de Erros"
description: "Como capturar e tratar erros em JavaScript com try, catch e finally"
order: 34
---

# Tratamento de Erros

Erros acontecem. Uma API pode falhar, um dado pode vir no formato errado, o usuário pode digitar algo inesperado. O JavaScript oferece `try`, `catch` e `finally` para lidar com isso de forma controlada.

## try / catch

O código dentro do `try` é executado normalmente. Se um erro ocorrer, a execução pula para o `catch`.

```javascript
try {
  const resultado = JSON.parse("texto inválido");
} catch (erro) {
  console.error("Erro ao fazer parse:", erro.message);
}
```

Sem o `try/catch`, um erro não tratado interrompe a execução de todo o script.

## finally

O bloco `finally` sempre é executado, com ou sem erro. Útil para liberar recursos ou esconder um indicador de carregamento.

```javascript
async function buscar() {
  mostrarLoading();

  try {
    const dados = await fetch("https://api.exemplo.com/dados");
    return await dados.json();
  } catch (erro) {
    console.error("Falha na requisição:", erro);
  } finally {
    esconderLoading(); // sempre executado
  }
}
```

## O objeto de erro

O parâmetro do `catch` é um objeto com informações sobre o erro.

```javascript
try {
  null.propriedade; // TypeError
} catch (erro) {
  console.log(erro.name);    // "TypeError"
  console.log(erro.message); // "Cannot read properties of null"
}
```

## Lançando erros manualmente

Use `throw` para criar seus próprios erros.

```javascript
function dividir(a, b) {
  if (b === 0) {
    throw new Error("Divisão por zero não é permitida");
  }
  return a / b;
}

try {
  dividir(10, 0);
} catch (erro) {
  console.error(erro.message); // "Divisão por zero não é permitida"
}
```

## Erros comuns

| Tipo | Causa comum |
|---|---|
| `TypeError` | Acessar propriedade de `null` ou `undefined` |
| `ReferenceError` | Usar variável não declarada |
| `SyntaxError` | JSON inválido, código malformado |
| `RangeError` | Valor fora de um intervalo permitido |
