---
title: "Resumo Prático de JavaScript"
description: "Guia essencial de JavaScript em português para iniciantes. Conceitos fundamentais com exemplos práticos de desenvolvimento web."
order: 1
---

## 1. Comentários e Sintaxe Básica

```javascript
// Comentários de uma linha começam com duas barras inclinadas

/* 
  Comentários de múltiplas linhas usam barra-asterisco
  e terminam com asterisco-barra
*/

// Instruções terminam com ponto-e-vírgula (salvo em casos especiais do ASI)
console.log("JavaScript");

// O JavaScript insere ponto-e-vírgula automaticamente, mas é boa prática
// usar explicitamente para evitar comportamentos inesperados
let valor = 42;
```

## 2. Tipos de Dados e Operadores

```javascript
// Números (inteiros e decimais)
42        // inteiro
3.14      // decimal
1.5e2     // notação científica: 150

// Operações aritméticas
10 + 5    // => 15
10 - 3    // => 7
4 * 3     // => 12
20 / 4    // => 5
17 % 5    // => 2 (resto da divisão)
2 ** 3    // => 8 (exponenciação)

// Strings (com aspas simples ou duplas)
"Olá, Mundo!"
'JavaScript é incrível'
`Template string com ${variavel}`  // permite interpolação

// Operações com strings
"Olá" + " " + "Mundo"  // => "Olá Mundo"
"Programming".length   // => 11
"JavaScript"[0]        // => 'J'

// Booleanos
true
false

// Operadores lógicos
!true           // => false
true && false   // => false
true || false   // => true

// Operadores de comparação
5 === 5         // => true (igual em tipo e valor)
5 == "5"        // => true (igual em valor, sem tipo)
5 !== "5"       // => true (diferente)
10 > 5          // => true
10 <= 10        // => true

// Valores especiais
null            // representa ausência intencional de valor
undefined       // representa valor não definido
NaN             // "Not a Number" ("Não é um número" - resultado de operação inválida)
Infinity        // resultado de divisão por zero
```

## 3. Variáveis e Escopo

```javascript
// Variáveis com var (escopo de função - evitar usar)
var nome = "João";
var idade;      // undefined

// Variáveis com let (escopo de bloco - recomendado)
let cidade = "São Paulo";
let salario;

// Constantes com const (não podem ser reatribuídas)
const PI = 3.14159;
const MAX_USUARIOS = 100;

// Operadores de atribuição
let x = 10;
x += 5;         // => 15 (equivalente a x = x + 5)
x -= 3;         // => 12
x *= 2;         // => 24
x /= 4;         // => 6

// Incremento e decremento
let contador = 0;
contador++;     // => 1
contador--;     // => 0
```

## 4. Arrays (Listas)

```javascript
// Criar arrays
let frutas = ["maçã", "banana", "laranja"];
let numeros = [1, 2, 3, 4, 5];
let misto = [10, "texto", true, null];      // pode ter tipos diferentes

// Acessar elementos (começando em 0)
frutas[0]       // => "maçã"
frutas[-1]      // => undefined (usar .length - 1)
frutas.length   // => 3

// Métodos úteis
frutas.push("uva");              // adiciona ao final
frutas.pop();                    // remove do final
frutas.unshift("melancia");      // adiciona no início
frutas.shift();                  // remove do início

// Encontrar elementos
frutas.includes("banana");       // => true
frutas.indexOf("laranja");       // => 1

// Transformar arrays
let dobrados = numeros.map(n => n * 2);     // [2, 4, 6, 8, 10]
let pares = numeros.filter(n => n % 2 === 0);  // [2, 4]
let soma = numeros.reduce((acc, n) => acc + n, 0);  // 15

// Fatiamento (slice não modifica array original)
frutas.slice(0, 2);              // retorna primeiros 2 elementos

// Unir arrays
let array1 = [1, 2];
let array2 = [3, 4];
let unido = [...array1, ...array2];  // [1, 2, 3, 4]
```

## 5. Objetos (Mapa de Chave-Valor)

```javascript
// Criar objetos
let pessoa = {
    nome: "Ana",
    idade: 28,
    ativo: true
};

let carro = {
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2023,
    ligar: function() {
        return "O carro ligou!";
    }
};

// Acessar propriedades
pessoa.nome              // => "Ana"
pessoa["idade"]          // => 28

// Modificar propriedades
pessoa.idade = 29;
pessoa.cidade = "Rio";   // adiciona nova propriedade

// Deletar propriedades
delete pessoa.ativo;

// Verificar se propriedade existe
"nome" in pessoa         // => true
pessoa.hasOwnProperty("idade")  // => true

// Listar todas as chaves
Object.keys(pessoa);     // ["nome", "idade", "cidade"]

// Listar todos os valores
Object.values(pessoa);   // ["Ana", 29, "Rio"]

// Iterar sobre objeto
for (let chave in pessoa) {
    console.log(chave, pessoa[chave]);
}

// Desestruturação
let { nome, idade } = pessoa;  // extrai as propriedades
```

## 6. Controle de Fluxo

```javascript
// Condicional if/else
let temperatura = 25;

if (temperatura > 30) {
    console.log("Muito quente!");
} else if (temperatura < 15) {
    console.log("Muito frio!");
} else {
    console.log("Temperatura agradável");
}

// Operador ternário (condicional em uma linha)
let status = temperatura > 20 ? "quente" : "frio";

// Switch
let diaSemana = 3;
switch (diaSemana) {
    case 1:
        console.log("Segunda");
        break;
    case 2:
        console.log("Terça");
        break;
    default:
        console.log("Outro dia");
}

// Operadores lógicos para valores padrão
let nomePessoa = nomeEntrada || "Visitante";  // usa "Visitante" se nomeEntrada for falso
```

## 7. Laços de Repetição

```javascript
// For clássico
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}

// While
let contador = 0;
while (contador < 3) {
    console.log(contador);
    contador++;
}

// Do-while (sempre executa pelo menos uma vez)
let tentativa = 0;
do {
    console.log("Tentativa:", tentativa);
    tentativa++;
} while (tentativa < 2);

// For-of (iteração sobre valores)
for (let fruta of ["maçã", "banana", "laranja"]) {
    console.log(fruta);
}

// For-in (iteração sobre chaves)
let usuario = { nome: "João", idade: 30 };
for (let prop in usuario) {
    console.log(prop, usuario[prop]);
}

// Array.forEach
["gato", "cachorro", "pássaro"].forEach((animal, index) => {
    console.log(`${index}: ${animal}`);
});
```

## 8. Funções

```javascript
// Declaração de função
function saudar(nome) {
    return `Olá, ${nome}!`;
}
saudar("Maria");  // => "Olá, Maria!"

// Parâmetros com valor padrão
function criarPerfil(nome, idade = 18) {
    return { nome, idade };
}
criarPerfil("João");           // usa idade padrão
criarPerfil("Ana", 25);        // sobrescreve padrão

// Função com múltiplos parâmetros variáveis
function somar(...numeros) {
    return numeros.reduce((acc, n) => acc + n, 0);
}
somar(1, 2, 3);     // => 6
somar(10, 20, 30);  // => 60

// Função anônima (expressão de função)
let quadrado = function(x) {
    return x * x;
};
quadrado(4);        // => 16

// Arrow function (sintaxe moderna)
let dobrar = x => x * 2;
let somatoria = (a, b) => a + b;
let cumprimento = () => "Olá!";

dobrar(5);          // => 10
somatoria(3, 4);    // => 7

// Closures (função dentro de função)
function criarMultiplicador(fator) {
    return function(numero) {
        return numero * fator;
    };
}

let mult3 = criarMultiplicador(3);
mult3(5);            // => 15

// Desestruturação de parâmetros
function exibirUsuario({ nome, idade }) {
    console.log(`${nome} tem ${idade} anos`);
}
exibirUsuario({ nome: "Pedro", idade: 35 });
```

## 9. Objetos e Protótipos

```javascript
// Função construtora (padrão antigo)
function Animal(nome, tipo) {
    this.nome = nome;
    this.tipo = tipo;
}

Animal.prototype.apresentar = function() {
    return `Eu sou um ${this.tipo} chamado ${this.nome}`;
};

let gato = new Animal("Miau", "gato");
gato.apresentar();  // => "Eu sou um gato chamado Miau"

// Classes (sintaxe moderna - recomendada)
class Veiculo {
    constructor(marca, cor) {
        this.marca = marca;
        this.cor = cor;
    }
    
    info() {
        return `${this.marca} ${this.cor}`;
    }
}

class Moto extends Veiculo {
    constructor(marca, cor, cilindrada) {
        super(marca, cor);  // chama construtor da classe mãe
        this.cilindrada = cilindrada;
    }
    
    info() {
        return `${super.info()} - ${this.cilindrada}cc`;
    }
}

let moto = new Moto("Honda", "Vermelha", 560);
moto.info();  // => "Honda Vermelha - 560cc"

// Object.create (criar objeto com prototype específico)
let prototipo = {
    saudar() {
        return `Olá, meu nome é ${this.nome}`;
    }
};

let pessoa = Object.create(prototipo);
pessoa.nome = "Carlos";
pessoa.saudar();  // => "Olá, meu nome é Carlos"

// Métodos úteis de Object
Object.assign(pessoa, { idade: 30 });  // copiar propriedades
Object.keys(pessoa);                   // ["nome", "idade"]
Object.values(pessoa);                 // ["Carlos", 30]
```

## 10. Conceitos Avançados

```javascript
// Tratamento de erros
try {
    let resultado = 10 / 0;
    JSON.parse("inválido");
} catch (erro) {
    console.log("Erro capturado:", erro.message);
} finally {
    console.log("Limpeza executada");
}

// Promises (para operações assíncronas)
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Sucesso!");
    }, 1000);
});

promise.then(resultado => {
    console.log(resultado);  // depois de 1 segundo
});

// Async/await (forma moderna de trabalhar com promises)
async function buscarDados() {
    try {
        let resposta = await fetch("https://api.example.com/dados");
        let dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error("Erro ao buscar:", erro);
    }
}

// Destructuring avançado
let { nome, idade, ...rest } = { nome: "Ana", idade: 25, cidade: "SP", país: "BR" };
// rest => { cidade: "SP", país: "BR" }

// Rest parameters e spread operator
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combinado = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

// Módulos (exportar e importar)
// arquivo: math.js
// export function somar(a, b) { return a + b; }

// outro arquivo:
// import { somar } from './math.js';
// somar(5, 3);  // => 8

// Template literals com tags
function destaque(strings, ...valores) {
    return strings[0] + valores[0].toUpperCase() + strings[1];
}
let palavra = "javascript";
destaque`Eu amo ${palavra}!`;  // => "Eu amo JAVASCRIPT!"
```
