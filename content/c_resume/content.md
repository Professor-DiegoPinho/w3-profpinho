---
id: "a3333409f187"
title: "Resumo Prático de C"
description: "Guia essencial de C em português para iniciantes. Conceitos fundamentais com exemplos práticos de programação procedural."
order: 1
---

## 1. Comentários e Estrutura Básica

```c
// Comentários de uma linha começam com //

/*
  Comentários de múltiplas linhas usam barra-asterisco
  e terminam com asterisco-barra
*/

// Incluir bibliotecas padrão
#include <stdio.h>    // entrada/saída
#include <stdlib.h>   // funções gerais
#include <string.h>   // manipulação de strings

// Constantes
#define PI 3.14159
#define MAX 100

// Ponto de entrada do programa
int main() {
    printf("Olá, Mundo!\n");
    return 0;  // 0 significa execução bem-sucedida
}
```

## 2. Tipos de Dados e Variáveis

```c
#include <stdio.h>

int main() {
    // Inteiros
    int numero = 42;               // 32 bits (típico)
    short numero_pequeno = 10;     // 16 bits
    long long numero_grande = 10000000000LL; // 64 bits garantidos (adicione LL)
    
    // Números decimais
    float altura = 1.75f;          // 32 bits (adicione f)
    double pi = 3.14159;           // 64 bits (padrão)
    
    // Caracteres
    char letra = 'A';              // um caractere individual
    char grade = 'B';
    
    // Constantes (não podem ser alteradas)
    const int MAXIMO = 100;
    
    // Imprimindo valores
    printf("Número: %d\n", numero);           // %d para int
    printf("Altura: %.2f\n", altura);         // %.2f para float com 2 casas
    printf("Letra: %c\n", letra);             // %c para char
    printf("Grande: %lld\n", numero_grande);  // %lld para long long
    
    return 0;
}
```

## 3. Entrada e Saída

```c
#include <stdio.h>
#include <string.h>

int main() {
    // Saída simples
    printf("Bem-vindo ao C!\n");
    printf("Sua idade: ");
    
    // Entrada de dados
    int idade;
    scanf("%d", &idade);  // & obtém o endereço da variável
    
    // Limpar o buffer do teclado (boa prática após scanf)
    while (getchar() != '\n');
    
    printf("Você tem %d anos\n", idade);
    
    // Entrada de string
    char nome[50];  // array de caracteres (string)
    printf("Qual é seu nome? ");
    fgets(nome, sizeof(nome), stdin);  // fgets é mais seguro que scanf
    nome[strcspn(nome, "\n")] = 0;     // Remove o 'Enter' (\n) capturado pelo fgets
    
    printf("Olá, %s!\n", nome);  // %s para string
    
    // Exibir resultados formatados
    int numero = 42;
    printf("Número em decimal: %d\n", numero);      // => 42
    printf("Número em hexadecimal: %x\n", numero);  // => 2a
    printf("Número em octal: %o\n", numero);        // => 52
    
    return 0;
}
```

## 4. Operadores

```c
#include <stdio.h>

int main() {
    // Operadores aritméticos
    int a = 10, b = 3;
    
    printf("Soma: %d\n", a + b);           // => 13
    printf("Subtração: %d\n", a - b);      // => 7
    printf("Multiplicação: %d\n", a * b);  // => 30
    printf("Divisão: %d\n", a / b);        // => 3
    printf("Módulo: %d\n", a % b);         // => 1
    
    // Operadores de comparação
    printf("a > b: %d\n", a > b);          // => 1 (verdadeiro)
    printf("a == b: %d\n", a == b);        // => 0 (falso)
    printf("a != b: %d\n", a != b);        // => 1 (verdadeiro)
    printf("a <= 10: %d\n", a <= 10);      // => 1
    
    // Operadores lógicos
    printf("(a > b) && (b > 0): %d\n", (a > b) && (b > 0));  // => 1
    printf("(a < 0) || (b > 0): %d\n", (a < 0) || (b > 0));  // => 1
    printf("!(a < 0): %d\n", !(a < 0));                      // => 1
    
    // Atribuição composta
    int x = 5;
    x += 3;   // x = x + 3 => x = 8
    x -= 2;   // x = x - 2 => x = 6
    x *= 2;   // x = x * 2 => x = 12
    
    // Incremento e decremento
    int contador = 5;
    printf("%d\n", contador++);    // imprime 5, depois incrementa
    printf("%d\n", ++contador);    // incrementa, depois imprime 7
    
    // Operador ternário
    int idade = 20;
    char status = (idade >= 18) ? 'A' : 'M';  // A = adulto, M = menor
    printf("Status: %c\n", status);  // => 'A'
    
    return 0;
}
```

## 5. Estruturas de Controle

```c
#include <stdio.h>

int main() {
    // Condicional if/else
    int temperatura = 28;
    
    if (temperatura > 30) {
        printf("Muito quente!\n");
    } else if (temperatura < 15) {
        printf("Muito frio!\n");
    } else {
        printf("Temperatura agradável\n");  // => será impresso
    }
    
    // Switch
    int dia = 3;
    switch (dia) {
        case 1:
            printf("Segunda-feira\n");
            break;
        case 2:
            printf("Terça-feira\n");
            break;
        case 3:
            printf("Quarta-feira\n");  // => será impresso
            break;
        default:
            printf("Outro dia\n");
    }
    
    // Operador ternário (if em uma linha)
    int numero = 10;
    printf("%s\n", (numero > 5) ? "Maior que 5" : "Menor ou igual a 5");
    // => "Maior que 5"
    
    return 0;
}
```

## 6. Laços de Repetição

```c
#include <stdio.h>

int main() {
    // Loop for
    printf("Loop for:\n");
    for (int i = 0; i < 5; i++) {
        printf("%d ", i);
    }
    printf("\n");  // => 0 1 2 3 4
    
    // Loop while
    printf("Loop while:\n");
    int contador = 0;
    while (contador < 3) {
        printf("Contagem: %d\n", contador);
        contador++;
    }
    // => Contagem: 0
    //    Contagem: 1
    //    Contagem: 2
    
    // Loop do-while (sempre executa pelo menos uma vez)
    printf("Loop do-while:\n");
    int tentativa = 0;
    do {
        printf("Tentativa %d\n", tentativa);
        tentativa++;
    } while (tentativa < 2);
    // => Tentativa 0
    //    Tentativa 1
    
    // Break e continue
    printf("Com break e continue:\n");
    for (int i = 0; i < 10; i++) {
        if (i == 2) {
            continue;  // pula a iteração atual
        }
        if (i == 5) {
            break;     // sai do loop
        }
        printf("%d ", i);
    }
    printf("\n");  // => 0 1 3 4
    
    return 0;
}
```

## 7. Arrays e Strings

```c
#include <stdio.h>
#include <string.h>

int main() {
    // Array de inteiros
    int numeros[5] = {10, 20, 30, 40, 50};
    
    // Acessar elementos
    printf("Primeiro número: %d\n", numeros[0]);  // => 10
    printf("Último número: %d\n", numeros[4]);    // => 50
    
    // Modificar elemento
    numeros[2] = 35;
    printf("Terceiro número agora: %d\n", numeros[2]);  // => 35
    
    // Iterar sobre array
    printf("Todos os números: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", numeros[i]);
    }
    printf("\n");  // => 10 20 35 40 50
    
    // Strings (arrays de caracteres)
    char saudacao[50] = "Olá, Mundo!";
    printf("String: %s\n", saudacao);  // => "Olá, Mundo!"
    printf("Primeiro caractere: %c\n", saudacao[0]);  // => 'O'
    
    // Comprimento da string
    printf("Comprimento: %zu\n", strlen(saudacao));  // => 12
    
    // Concatenar strings
    char nome[30] = "João";
    char sobrenome[30] = "Silva";
    char nome_completo[60];
    strcpy(nome_completo, nome);        // copiar
    strcat(nome_completo, " ");         // concatenar espaço
    strcat(nome_completo, sobrenome);   // concatenar sobrenome
    printf("Nome completo: %s\n", nome_completo);  // => "João Silva"
    
    // Array multidimensional
    int matriz[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    printf("Elemento [0][1]: %d\n", matriz[0][1]);  // => 2
    
    return 0;
}
```

## 8. Funções

```c
#include <stdio.h>
#include <string.h>

// Protótipo de função (declare antes de usar)
int somar(int a, int b);
void saudacao(char *nome);
int multiplicar(int x, int y);
double calcularMedia(double nota1, double nota2, double nota3);
void inverterString(char *str);

int main() {
    // Chamando funções
    printf("Soma: %d\n", somar(5, 3));           // => 8
    printf("Multiplicação: %d\n", multiplicar(4, 5));  // => 20
    
    saudacao("Maria");  // => "Olá, Maria!\n"
    
    return 0;
}

// Função com retorno
int somar(int a, int b) {
    return a + b;
}

// Função sem retorno (void)
void saudacao(char *nome) {
    printf("Olá, %s!\n", nome);
}

// Função com múltiplos parâmetros
int multiplicar(int x, int y) {
    return x * y;
}

// Função que calcula média
double calcularMedia(double nota1, double nota2, double nota3) {
    return (nota1 + nota2 + nota3) / 3;
}

// Função que inverte uma string
void inverterString(char *str) {
    int n = strlen(str);
    for (int i = 0; i < n / 2; i++) {
        char temp = str[i];
        str[i] = str[n - i - 1];
        str[n - i - 1] = temp;
    }
}

/*
// Exemplos de uso das outras funções:

double media = calcularMedia(7.5, 8.0, 8.5);
printf("Média: %.2f\n", media);  // => 8.00

char texto[] = "roma";
inverterString(texto);
printf("Invertido: %s\n", texto);  // => "amor"
*/
```

## 9. Ponteiros e Endereços de Memória

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Variável normal
    int numero = 42;
    
    // Ponteiro (armazena endereço de memória)
    int *ptr = &numero;  // & obtém o endereço
    
    // Acessar endereço
    printf("Endereço: %p\n", (void *)ptr);
    printf("Valor na memória: %d\n", *ptr);  // * acessa o valor
    
    // Modificar valor através do ponteiro
    *ptr = 100;
    printf("Novo valor: %d\n", numero);  // => 100
    
    // Alocar memória dinamicamente
    int *array = malloc(5 * sizeof(int));  // aloca espaço para 5 ints
    
    if (array == NULL) {
        printf("Erro ao alocar memória!\n");
        return 1;
    }
    
    // Usar o array alocado
    for (int i = 0; i < 5; i++) {
        array[i] = i * 10;
        printf("%d ", array[i]);
    }
    printf("\n");  // => 0 10 20 30 40
    
    // Liberar memória (importante!)
    free(array);
    array = NULL;  // boa prática
    
    return 0;
}
```

## 10. Structs (Estruturas)

```c
#include <stdio.h>
#include <string.h>

// Definir uma struct
struct Pessoa {
    char nome[50];
    int idade;
    float altura;
};

// Definir uma struct para retângulo
struct Retangulo {
    int largura;
    int altura;
};

// Função que calcula área
int calcularArea(struct Retangulo r) {
    return r.largura * r.altura;
}

int main() {
    // Criar uma variável do tipo struct
    struct Pessoa pessoa;
    
    // Atribuir valores aos membros
    strcpy(pessoa.nome, "João Silva");
    pessoa.idade = 30;
    pessoa.altura = 1.75;
    
    // Acessar valores
    printf("Nome: %s\n", pessoa.nome);          // => "João Silva"
    printf("Idade: %d anos\n", pessoa.idade);   // => 30 anos
    printf("Altura: %.2f metros\n", pessoa.altura);  // => 1.75 metros
    
    // Inicializar na declaração
    struct Retangulo quad = {10, 5};
    printf("Área do retângulo: %d\n", calcularArea(quad));  // => 50
    
    // Ponteiro para struct
    struct Pessoa *ptr_pessoa = &pessoa;
    
    // Acessar membros através de ponteiro (duas formas)
    printf("Idade (forma 1): %d\n", (*ptr_pessoa).idade);  // => 30
    printf("Idade (forma 2): %d\n", ptr_pessoa->idade);    // => 30
    
    // Array de structs
    struct Pessoa pessoas[3];
    
    strcpy(pessoas[0].nome, "Ana");
    pessoas[0].idade = 25;
    
    strcpy(pessoas[1].nome, "Bruno");
    pessoas[1].idade = 28;
    
    for (int i = 0; i < 2; i++) {
        printf("%s tem %d anos\n", pessoas[i].nome, pessoas[i].idade);
    }
    // => Ana tem 25 anos
    //    Bruno tem 28 anos
    
    return 0;
}
```
