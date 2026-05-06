---
title: "Datas"
description: "Como criar e manipular datas em JavaScript com o objeto Date"
order: 24
---

# Datas

O objeto `Date` representa um momento no tempo. Ele armazena a data e hora internamente como o número de milissegundos desde 1º de janeiro de 1970 (Unix Epoch).

## Criando uma data

```javascript
const agora = new Date(); // data e hora atual

const especifica = new Date("2025-06-15");       // a partir de uma string
const comHora = new Date("2025-06-15T10:30:00"); // com hora
const porParametros = new Date(2025, 5, 15);     // ano, mês (0-11), dia
```

> Atenção: no construtor com parâmetros, os meses vão de `0` (janeiro) a `11` (dezembro).

## Obtendo partes da data

```javascript
const d = new Date("2025-06-15T10:30:00");

d.getFullYear();  // 2025
d.getMonth();     // 5 — junho (meses de 0 a 11)
d.getDate();      // 15
d.getDay();       // 0 a 6 — dia da semana (0 = domingo)
d.getHours();     // 10
d.getMinutes();   // 30
d.getSeconds();   // 0
```

## Formatando datas

```javascript
const d = new Date("2025-06-15");

d.toLocaleDateString("pt-BR");          // "15/06/2025"
d.toLocaleTimeString("pt-BR");          // "00:00:00"
d.toLocaleString("pt-BR");             // "15/06/2025, 00:00:00"

d.toISOString(); // "2025-06-15T00:00:00.000Z"
```

## Comparando datas

Datas podem ser comparadas diretamente, pois são convertidas para milissegundos.

```javascript
const d1 = new Date("2025-01-01");
const d2 = new Date("2025-06-01");

d1 < d2; // true
d1 > d2; // false
```

## Diferença entre datas

```javascript
const inicio = new Date("2025-01-01");
const fim = new Date("2025-12-31");

const diffMs = fim - inicio; // diferença em milissegundos
const diffDias = diffMs / (1000 * 60 * 60 * 24);
console.log(Math.round(diffDias)); // 364
```

## Timestamp

```javascript
Date.now(); // milissegundos desde 1970, sem criar um objeto
```

Útil para medir tempo de execução:

```javascript
const inicio = Date.now();
// ... algum código ...
const fim = Date.now();
console.log(`Levou ${fim - inicio}ms`);
```
