---
title: "Resumo Prático de TypeScript"
description: "Guia essencial de TypeScript em português para iniciantes. Conceitos fundamentais com exemplos práticos de tipagem em JavaScript."
order: 1
---

## 1. Tipos Básicos

```typescript
// Booleano
let isDone: boolean = false;
let isActive: boolean = true;

// Números (inteiros e decimais)
let decimal: number = 42;
let floating: number = 3.14;
let big: number = 1_000_000;  // underscores para legibilidade

// Strings
let name: string = "João Silva";
let greeting: string = `Olá, ${name}!`;  // template string

// Arrays
let numbers: number[] = [1, 2, 3, 4];
let fruits: Array<string> = ["maçã", "banana", "laranja"];
let mixed: (string | number)[] = [1, "dois", 3];

// Any (qualquer tipo - use com moderação)
let notSure: any = 4;
notSure = "talvez uma string";  // permitido
notSure = false;  // permitido

// Tipo unknown (mais seguro que any)
let input: unknown = "texto";
if (typeof input === "string") {
  console.log(input.toUpperCase());  // seguro aqui
}
```

## 2. Variáveis e Inferência de Tipo

```typescript
// TypeScript infere o tipo automaticamente
let numero = 42;        // tipo number inferido
let texto = "Hello";    // tipo string inferido
let ativo = true;       // tipo boolean inferido

// Constantes com const
const PI = 3.14159;
const MAX_USUARIOS = 100;

// let vs const
let contador = 0;
contador = 5;  // permitido (let pode ser reatribuído)

const nome = "Maria";
// nome = "Ana";  // erro! const não pode ser reatribuído

// Union types (múltiplos tipos possíveis)
let resultado: string | number;
resultado = "sucesso";  // ok
resultado = 200;        // ok

// Literal types (valores específicos)
let status: "ativo" | "inativo" | "pendente";
status = "ativo";       // ok
// status = "cancelado";  // erro!
```

## 3. Funções

```typescript
// Função com tipos de parâmetro e retorno
function somar(a: number, b: number): number {
  return a + b;
}

somar(5, 3);      // => 8
// somar("5", 3)  // erro: tipos incorretos

// Funções com valores padrão
function saudar(nome: string, greeting: string = "Olá"): string {
  return `${greeting}, ${nome}!`;
}

saudar("Pedro");              // => "Olá, Pedro!"
saudar("Ana", "Bem-vindo");   // => "Bem-vindo, Ana!"

// Arrow functions com tipos
const multiplicar = (x: number, y: number): number => x * y;
multiplicar(4, 5);  // => 20

// Funções com parâmetros opcionais
function descrever(pessoa: string, idade?: number): string {
  if (idade !== undefined) {
    return `${pessoa} tem ${idade} anos`;
  }
  return `${pessoa} é uma pessoa`;
}

descrever("Carlos");        // => "Carlos é uma pessoa"
descrever("Ana", 28);       // => "Ana tem 28 anos"

// Rest parameters (parâmetros variáveis)
function somarMultiplos(...numeros: number[]): number {
  return numeros.reduce((sum, n) => sum + n, 0);
}

somarMultiplos(1, 2, 3);      // => 6
somarMultiplos(10, 20, 30);   // => 60
```

## 4. Objetos e Interfaces

```typescript
// Tipagem de objetos simples
let pessoa: { nome: string; idade: number; ativo: boolean } = {
  nome: "João",
  idade: 30,
  ativo: true
};

// Interfaces (melhor forma para definir estruturas)
interface Produto {
  id: number;
  nome: string;
  preco: number;
  desconto?: number;  // propriedade opcional
}

const notebook: Produto = {
  id: 1,
  nome: "Notebook Dell",
  preco: 3000
};

const mouse: Produto = {
  id: 2,
  nome: "Mouse Logitech",
  preco: 150,
  desconto: 20
};

// Interfaces com métodos
interface Automovel {
  marca: string;
  modelo: string;
  acelerar(): void;
  frear(): void;
}

const moto: Automovel = {
  marca: "Honda",
  modelo: "CB 500",
  acelerar() {
    console.log("Acelerando!");
  },
  frear() {
    console.log("Freando!");
  }
};

moto.acelerar();  // => "Acelerando!"
```

## 5. Arrays e Coleções

```typescript
// Arrays com tipos
let numeros: number[] = [1, 2, 3, 4, 5];
let nomes: string[] = ["João", "Maria", "Pedro"];

// Acessar elementos
console.log(numeros[0]);       // => 1
console.log(nomes[nomes.length - 1]);  // => "Pedro"

// Métodos de array
numeros.push(6);               // adiciona ao final
numeros.pop();                 // remove do final
numeros.shift();               // remove do início
numeros.unshift(0);            // adiciona no início

// Transformar arrays
const pares = numeros.filter(n => n % 2 === 0);
const dobrados = numeros.map(n => n * 2);
const soma = numeros.reduce((acc, n) => acc + n, 0);

// Tuplas (arrays com tipos específicos em cada posição)
let tupla: [string, number, boolean] = ["texto", 42, true];
tupla[0];  // string
tupla[1];  // number
tupla[2];  // boolean

// Enumerações
enum Cor {
  Vermelho = "vermelho",
  Verde = "verde",
  Azul = "azul"
}

let minhaCorFavorita: Cor = Cor.Azul;
console.log(minhaCorFavorita);  // => "azul"
```

## 6. Classes

```typescript
// Definição de classe
class Animal {
  // Propriedades com tipos
  nome: string;
  idade: number;
  
  // Construtor
  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }
  
  // Método
  fazerSom(): void {
    console.log(`${this.nome} faz um som`);
  }
  
  // Método com retorno
  apresentar(): string {
    return `${this.nome} tem ${this.idade} anos`;
  }
}

// Usar a classe
const gato = new Animal("Mimi", 3);
console.log(gato.apresentar());  // => "Mimi tem 3 anos"

// Herança
class Cachorro extends Animal {
  raca: string;
  
  constructor(nome: string, idade: number, raca: string) {
    super(nome, idade);  // chama construtor da classe pai
    this.raca = raca;
  }
  
  // Sobrescrever método
  fazerSom(): void {
    console.log(`${this.nome} faz: Au au!`);
  }
  
  buscar(): void {
    console.log(`${this.nome} buscou a bolinha!`);
  }
}

const rex = new Cachorro("Rex", 5, "Labrador");
rex.fazerSom();     // => "Rex faz: Au au!"
rex.buscar();        // => "Rex buscou a bolinha!"

// Modificadores de acesso
class Pessoa {
  nome: string;           // público por padrão
  private email: string;  // apenas na classe
  protected cpf: string;  // classe + subclasses
  readonly id: number;    // não pode mudar após criação
  
  constructor(nome: string, email: string, cpf: string, id: number) {
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.id = id;
  }
}
```

## 7. Genéricos

```typescript
// Funções genéricas
function primeiro<T>(arr: T[]): T {
  return arr[0];
}

primeiro([1, 2, 3]);           // tipo number inferido
primeiro(["a", "b", "c"]);     // tipo string inferido

// Classes genéricas
class Caixa<T> {
  conteudo: T;
  
  constructor(valor: T) {
    this.conteudo = valor;
  }
  
  obter(): T {
    return this.conteudo;
  }
}

const caixaNumero = new Caixa<number>(42);
const caixaTexto = new Caixa<string>("Hello");

console.log(caixaNumero.obter());  // => 42
console.log(caixaTexto.obter());   // => "Hello"

// Constraints (restrições de tipo)
function obterComprimento<T extends { length: number }>(obj: T): number {
  return obj.length;
}

obterComprimento("teste");       // => 5 (string tem length)
obterComprimento([1, 2, 3]);     // => 3 (array tem length)
// obterComprimento(42);  // erro! number não tem length
```

## 8. Type Alias vs Interface

```typescript
// Type Alias (usando type)
type Coordenada = {
  x: number;
  y: number;
};

type ModoTema = "claro" | "escuro";

const ponto: Coordenada = { x: 10, y: 20 };
let tema: ModoTema = "claro";

// Interface (usando interface)
interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface Desenvolvedor extends Usuario {
  linguagens: string[];
}

const dev: Desenvolvedor = {
  id: 1,
  nome: "João",
  email: "joao@email.com",
  linguagens: ["TypeScript", "React"]
};

// Diferença principal: interfaces podem ser estendidas, types não (facilmente)
// Interfaces são melhores para estruturas, types para tipos mais complexos
```

## 9. Tratamento de Erros

```typescript
// Try-catch com tipos
try {
  const resultado = JSON.parse('inválido');
} catch (erro) {
  if (erro instanceof SyntaxError) {
    console.log("Erro de sintaxe JSON:", erro.message);
  } else {
    console.log("Erro desconhecido:", erro);
  }
}

// Type guard
function processar(valor: string | number): void {
  if (typeof valor === "string") {
    console.log(valor.toUpperCase());  // métodos de string
  } else {
    console.log(valor * 2);            // operações numéricas
  }
}

processar("hello");   // => "HELLO"
processar(21);        // => 42

// Optional chaining (?.)
interface Config {
  database?: {
    host?: string;
    port?: number;
  };
}

const config: Config = {};
console.log(config.database?.host);  // => undefined (sem erro)

// Nullish coalescing (??)
const valorPadrao = null;
const resultado = valorPadrao ?? "padrão";  // => "padrão"
```

## 10. Módulos

```typescript
// Arquivo: matematica.ts
export function somar(a: number, b: number): number {
  return a + b;
}

export function subtrair(a: number, b: number): number {
  return a - b;
}

export const PI = 3.14159;

// Arquivo: main.ts
import { somar, subtrair, PI } from "./matematica";

console.log(somar(5, 3));      // => 8
console.log(subtrair(10, 4));  // => 6
console.log(PI);               // => 3.14159

// Importar com alias
import { somar as adicionar } from "./matematica";
console.log(adicionar(2, 3));  // => 5

// Exportação padrão
// Arquivo: utilitarios.ts
export default function saudacao(nome: string): string {
  return `Olá, ${nome}!`;
}

// Arquivo: app.ts
import saudacao from "./utilitarios";
console.log(saudacao("Maria"));  // => "Olá, Maria!"
```