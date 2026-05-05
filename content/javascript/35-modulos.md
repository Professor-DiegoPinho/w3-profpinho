---
title: "Módulos"
description: "Como organizar o código em módulos usando import e export no JavaScript"
order: 35
---

# Módulos

Módulos permitem dividir o código em arquivos separados e importar apenas o que for necessário em cada parte do projeto. Isso facilita a organização e a reutilização.

## export

Para disponibilizar algo de um arquivo, use `export`.

```javascript
// utils.js

export function somar(a, b) {
  return a + b;
}

export function subtrair(a, b) {
  return a - b;
}

export const PI = 3.14159;
```

## import

Para usar o que foi exportado em outro arquivo:

```javascript
// main.js
import { somar, PI } from "./utils.js";

console.log(somar(2, 3)); // 5
console.log(PI);          // 3.14159
```

## export default

Cada arquivo pode ter um `export default`, que representa o valor principal do módulo.

```javascript
// usuario.js
export default function criarUsuario(nome, email) {
  return { nome, email };
}
```

O import do default não usa chaves e pode receber qualquer nome:

```javascript
import criarUsuario from "./usuario.js";
// ou
import criar from "./usuario.js"; // nome pode ser qualquer um
```

## Misturando default e named exports

```javascript
// api.js
export default class Api { ... }
export const BASE_URL = "https://api.exemplo.com";
export function formatarErro(e) { ... }
```

```javascript
import Api, { BASE_URL, formatarErro } from "./api.js";
```

## Renomeando imports

```javascript
import { somar as add, subtrair as sub } from "./utils.js";

add(2, 3); // 5
```

## Importando tudo de um módulo

```javascript
import * as utils from "./utils.js";

utils.somar(2, 3);    // 5
utils.subtrair(5, 2); // 3
```

## Usando no HTML

Para que o navegador reconheça módulos, a tag `<script>` precisa do atributo `type="module"`.

```html
<script type="module" src="main.js"></script>
```

Com isso, o `import` e `export` funcionam nativamente no navegador sem precisar de ferramentas adicionais.
