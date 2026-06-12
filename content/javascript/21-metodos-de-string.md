---
id: "09f090e6581f"
title: "Métodos de String"
description: "Os principais métodos para manipular e consultar strings em JavaScript"
order: 21
---

# Métodos de String

## Maiúsculas e minúsculas

```javascript
const texto = "JavaScript é incrível";

texto.toUpperCase(); // "JAVASCRIPT É INCRÍVEL"
texto.toLowerCase(); // "javascript é incrível"
```

## Busca dentro da string

```javascript
texto.includes("incrível");  // true
texto.startsWith("Java");    // true
texto.endsWith("vel");       // true

texto.indexOf("é");          // 11 — posição da primeira ocorrência
texto.indexOf("Python");     // -1 — não encontrado
```

## Extração de partes

```javascript
const frase = "Aprender JavaScript";

frase.slice(9);       // "JavaScript" — do índice 9 até o fim
frase.slice(0, 8);    // "Aprender" — do índice 0 ao 7
frase.slice(-10);     // "JavaScript" — os últimos 10 caracteres
```

## Substituição

```javascript
const msg = "Olá, mundo!";

msg.replace("mundo", "Ana");       // "Olá, Ana!" — substitui a primeira ocorrência
msg.replaceAll("o", "0");          // "Olá, mund0!" — substitui todas
```

## Remoção de espaços

```javascript
const entrada = "   nome do usuário   ";

entrada.trim();        // "nome do usuário" — remove dos dois lados
entrada.trimStart();   // "nome do usuário   "
entrada.trimEnd();     // "   nome do usuário"
```

Muito usado ao processar entradas de formulários.

## Divisão e junção

```javascript
const csv = "Ana,Pedro,Maria";
const nomes = csv.split(",");
console.log(nomes); // ["Ana", "Pedro", "Maria"]

nomes.join(" - "); // "Ana - Pedro - Maria"
```

## Repetição e preenchimento

```javascript
"ha".repeat(3);           // "hahaha"

"5".padStart(3, "0");     // "005" — preenche à esquerda até ter 3 caracteres
"5".padEnd(3, "0");       // "500" — preenche à direita
```

## Convertendo número para string e vice-versa

```javascript
String(42);       // "42"
(42).toString();  // "42"

Number("3.14");   // 3.14
parseInt("10px"); // 10 — extrai o número inteiro do início
parseFloat("3.5kg"); // 3.5
```
