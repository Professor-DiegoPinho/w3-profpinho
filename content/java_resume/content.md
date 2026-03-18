---
title: "Resumo Prático de Java"
description: "Guia essencial de Java em português para iniciantes. Conceitos fundamentais com exemplos práticos de programação orientada a objetos."
order: 1
---

## 1. Comentários e Estrutura Básica

```java
// Comentários de uma linha começam com duas barras inclinadas

/*
  Comentários de múltiplas linhas usam barra-asterisco
  e terminam com asterisco-barra
*/

/**
 * Comentários JavaDoc descrevem classes, métodos e atributos.
 * São usados para gerar documentação automática.
 */

// Importação de classe específica
import java.util.ArrayList;

// Importação de todas as classes de um pacote
import java.security.*;

// Cada arquivo .java contém uma classe pública com o mesmo nome do arquivo
public class OlaMundo {
    // O método main é o ponto de entrada do programa
    public static void main(String[] args) {
        System.out.println("Olá, Mundo!");
        System.out.print("Sem quebra");  // sem quebra de linha
        System.out.println(" de linha!");
    }
}
```

## 2. Tipos de Dados e Variáveis

```java
public class TiposDados {
    public static void main(String[] args) {
        // Byte - inteiro de 8 bits (-128 até 127)
        byte idade = 25;
        
        // Short - inteiro de 16 bits (-32,768 até 32,767)
        short populacao = 10000;
        
        // Integer - inteiro de 32 bits (padrão para números inteiros)
        int salario = 50000;
        
        // Long - inteiro de 64 bits (use 'L' no final)
        long populacaoMundial = 8000000000L;
        
        // Float - número em ponto flutuante de 32 bits (use 'f' no final)
        float altura = 1.75f;
        
        // Double - número em ponto flutuante de 64 bits (padrão)
        double pi = 3.14159;
        
        // Boolean - verdadeiro ou falso
        boolean ativo = true;
        boolean inativo = false;
        
        // Character - um caractere Unicode de 16 bits
        char letra = 'A';
        
        // String - sequência de caracteres
        String nome = "João Silva";
        
        // Final - torna a variável imutável (constante)
        final int VELOCIDADE_LUZ = 299792458;
        
        // Concatenação de strings
        String mensagem = nome + " tem " + idade + " anos";
        System.out.println(mensagem);
    }
}
```

## 3. Operadores e Expressões

```java
public class Operadores {
    public static void main(String[] args) {
        // Operadores aritméticos
        int a = 10, b = 3;
        
        System.out.println("Adição: " + (a + b));        // => 13
        System.out.println("Subtração: " + (a - b));     // => 7
        System.out.println("Multiplicação: " + (a * b)); // => 30
        System.out.println("Divisão: " + (a / b));       // => 3 (inteira)
        System.out.println("Módulo: " + (a % b));        // => 1
        System.out.println("Potência: " + Math.pow(a, 2)); // => 100.0
        
        // Operadores de comparação
        System.out.println("10 == 10: " + (10 == 10));   // => true
        System.out.println("10 != 5: " + (10 != 5));     // => true
        System.out.println("10 > 5: " + (10 > 5));       // => true
        System.out.println("10 <= 10: " + (10 <= 10));   // => true
        
        // Operadores lógicos
        System.out.println("true && false: " + (true && false)); // => false
        System.out.println("true || false: " + (true || false)); // => true
        System.out.println("!true: " + (!true));                 // => false
        
        // Operador ternário (condicional em uma linha)
        int numero = 10;
        String resultado = (numero > 5) ? "Maior que 5" : "Menor ou igual a 5";
        System.out.println(resultado); // => "Maior que 5"
        
        // Incremento e decremento
        int contador = 5;
        System.out.println(contador++);  // imprime 5, depois incrementa
        System.out.println(++contador);  // incrementa, depois imprime 7
        System.out.println(contador--);  // imprime 7, depois decrementa
        System.out.println(--contador);  // decrementa, depois imprime 5
    }
}
```

## 4. Arrays e Coleções

```java
import java.util.ArrayList;

public class ArraysEColecoes {
    public static void main(String[] args) {
        // Array de tipo primitivo (tamanho fixo)
        int[] numeros = new int[5];
        numeros[0] = 10;
        numeros[1] = 20;
        
        // Array inicializado com valores
        String[] frutas = {"maçã", "banana", "laranja"};
        
        // Acessar elementos
        System.out.println("Primeira fruta: " + frutas[0]); // => "maçã"
        System.out.println("Tamanho do array: " + frutas.length); // => 3
        
        // Iterar sobre array
        for (int i = 0; i < frutas.length; i++) {
            System.out.println(frutas[i]);
        }
        
        // For-each (mais simples)
        for (String fruta : frutas) {
            System.out.println(fruta);
        }
        
        // ArrayList - array dinâmico (tamanho variável)
        ArrayList<String> cores = new ArrayList<>();
        cores.add("vermelho");
        cores.add("azul");
        cores.add("verde");
        
        // Acessar elemento
        System.out.println("Primeira cor: " + cores.get(0)); // => "vermelho"
        
        // Remover elemento
        cores.remove(1);
        
        // Tamanho
        System.out.println("Quantidade de cores: " + cores.size());
        
        // Iterar sobre ArrayList
        for (String cor : cores) {
            System.out.println(cor);
        }
    }
}
```

## 5. Estruturas de Controle

```java
public class EstruturasControle {
    public static void main(String[] args) {
        // Condicional if/else
        int idade = 18;
        
        if (idade >= 18) {
            System.out.println("Você é maior de idade");
        } else if (idade >= 13) {
            System.out.println("Você é adolescente");
        } else {
            System.out.println("Você é criança");
        }
        
        // Switch
        int dia = 3;
        String nomeDia;
        
        switch (dia) {
            case 1:
                nomeDia = "Segunda";
                break;
            case 2:
                nomeDia = "Terça";
                break;
            case 3:
                nomeDia = "Quarta";
                break;
            default:
                nomeDia = "Outro dia";
        }
        System.out.println("Dia: " + nomeDia);
        
        // Loop while
        int contador = 0;
        while (contador < 3) {
            System.out.println("Contador: " + contador);
            contador++;
        }
        
        // Loop do-while (sempre executa pelo menos uma vez)
        int i = 0;
        do {
            System.out.println("i = " + i);
            i++;
        } while (i < 2);
        
        // Loop for
        for (int j = 0; j < 5; j++) {
            System.out.println("j = " + j);
        }
    }
}
```

## 6. Métodos

```java
public class Metodos {
    
    // Método simples sem parâmetros
    public static void saudacao() {
        System.out.println("Olá!");
    }
    
    // Método com parâmetros
    public static void saudar(String nome) {
        System.out.println("Olá, " + nome + "!");
    }
    
    // Método com retorno
    public static int somar(int a, int b) {
        return a + b;
    }
    
    // Método com múltiplos parâmetros
    public static double calcularMedia(double nota1, double nota2, double nota3) {
        return (nota1 + nota2 + nota3) / 3;
    }
    
    // Método com parâmetros variáveis (varargs)
    public static int somarMultiplos(int... numeros) {
        int total = 0;
        for (int num : numeros) {
            total += num;
        }
        return total;
    }
    
    // Método void (sem retorno)
    public static void imprimirSequencia(int inicio, int fim) {
        for (int i = inicio; i <= fim; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        saudacao();                              // => "Olá!"
        saudar("Maria");                         // => "Olá, Maria!"
        System.out.println(somar(5, 3));         // => 8
        System.out.println(somarMultiplos(1, 2, 3, 4, 5)); // => 15
    }
}
```

## 7. Classes e Objetos

```java
public class Veiculo {
    // Atributos (propriedades)
    private String marca;
    private String modelo;
    private int ano;
    protected int velocidade;  // acessível em subclasses
    public String cor;         // acessível em qualquer lugar
    
    // Construtor padrão (sem parâmetros)
    public Veiculo() {
        this.marca = "Genérico";
        this.modelo = "Modelo X";
        this.ano = 2020;
        this.velocidade = 0;
        this.cor = "Branco";
    }
    
    // Construtor com parâmetros
    public Veiculo(String marca, String modelo, int ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.velocidade = 0;
    }
    
    // Getters (métodos para obter valores)
    public String getMarca() {
        return marca;
    }
    
    public int getAno() {
        return ano;
    }
    
    // Setters (métodos para definir valores)
    public void setMarca(String marca) {
        this.marca = marca;
    }
    
    public void setAno(int ano) {
        if (ano > 1900) {
            this.ano = ano;
        }
    }
    
    // Método de instância
    public void acelerar(int incremento) {
        velocidade += incremento;
        System.out.println("Velocidade agora é: " + velocidade + " km/h");
    }
    
    // Método sobrescrito (override)
    @Override
    public String toString() {
        return marca + " " + modelo + " (" + ano + ")";
    }
    
    public static void main(String[] args) {
        // Criar instância (objeto)
        Veiculo carro = new Veiculo("Toyota", "Corolla", 2022);
        
        System.out.println(carro);      // => "Toyota Corolla (2022)"
        System.out.println(carro.getMarca()); // => "Toyota"
        
        carro.acelerar(50);  // => "Velocidade agora é: 50 km/h"
        carro.acelerar(30);  // => "Velocidade agora é: 80 km/h"
    }
}
```

## 8. Herança e Polimorfismo

```java
// Classe pai (superclasse)
public class Animal {
    protected String nome;
    
    public Animal(String nome) {
        this.nome = nome;
    }
    
    public void fazerSom() {
        System.out.println("Som genérico de animal");
    }
    
    public void comer() {
        System.out.println(nome + " está comendo");
    }
}

// Classe filha (subclasse)
public class Cachorro extends Animal {
    
    public Cachorro(String nome) {
        super(nome);  // chama construtor da classe pai
    }
    
    // Sobrescrita de método (override)
    @Override
    public void fazerSom() {
        System.out.println(nome + " faz: Au au!");
    }
    
    // Método específico da classe Cachorro
    public void buscar() {
        System.out.println(nome + " buscou a bolinha!");
    }
}

// Outra classe filha
public class Gato extends Animal {
    
    public Gato(String nome) {
        super(nome);
    }
    
    @Override
    public void fazerSom() {
        System.out.println(nome + " faz: Miau!");
    }
}

public class TesteHeranca {
    public static void main(String[] args) {
        // Polimorfismo - referência de tipo pai aponta para objeto do tipo filho
        Animal cachorro = new Cachorro("Rex");
        Animal gato = new Gato("Garfield");
        
        cachorro.fazerSom();  // => "Rex faz: Au au!"
        gato.fazerSom();      // => "Garfield faz: Miau!"
        
        // Casting de volta para tipo específico
        if (cachorro instanceof Cachorro) {
            Cachorro c = (Cachorro) cachorro;
            c.buscar();  // => "Rex buscou a bolinha!"
        }
    }
}
```

## 9. Interface e Classes Abstratas

```java
// Interfaces - contratos que devem ser implementados
public interface Academico {
    void estudar();
    void fazerProva();
}

public interface Profissional {
    void trabalhar();
}

// Classe abstrata - pode ter métodos concretos e abstratos, e não pode ser instanciada
public abstract class SerVivo {
    protected String nome;
    
    public SerVivo(String nome) {
        this.nome = nome;
    }
    
    // Método abstrato - deve obrigatoriamente ser implementado nas subclasses
    public abstract void respirar();
    
    // Método concreto - já tem implementação e pode ser usado ou sobrescrito
    public void apresentar() {
        System.out.println("Olá, meu nome é " + nome);
    }
}

// Uma classe pode estender apenas uma classe (abstrata ou não), mas implementar várias interfaces
public class Pessoa extends SerVivo implements Academico, Profissional {
    
    public Pessoa(String nome) {
        super(nome);
    }
    
    @Override
    public void respirar() {
        System.out.println(nome + " está respirando fundo.");
    }
    
    @Override
    public void estudar() {
        System.out.println(nome + " está estudando programação em Java.");
    }
    
    @Override
    public void fazerProva() {
        System.out.println(nome + " está fazendo a prova de certificação.");
    }
    
    @Override
    public void trabalhar() {
        System.out.println(nome + " está desenvolvendo software na empresa.");
    }
}

public class TesteInterface {
    public static void main(String[] args) {
        Pessoa maria = new Pessoa("Maria");
        maria.apresentar();  // => "Olá, meu nome é Maria"
        maria.respirar();    // => "Maria está respirando fundo."
        maria.estudar();     // => "Maria está estudando programação em Java."
        maria.trabalhar();   // => "Maria está desenvolvendo software na empresa."
    }
}
```

## 10. Enum e Conversão de Tipos

```java
// Enum - tipo que contém constantes predefinidas (sem uso de acentos ou cedilha)
public enum DiaDaSemana {
    SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO, DOMINGO
}

public enum Estacao {
    PRIMAVERA("março a maio"),
    VERAO("junho a agosto"),
    OUTONO("setembro a novembro"),
    INVERNO("dezembro a fevereiro");
    
    private String periodo;
    
    Estacao(String periodo) {
        this.periodo = periodo;
    }
    
    public String getPeriodo() {
        return periodo;
    }
}

public class TesteEnum {
    public static void main(String[] args) {
        // Usando Enum DiaDaSemana
        DiaDaSemana hoje = DiaDaSemana.QUINTA;
        
        switch (hoje) {
            case SEGUNDA:
                System.out.println("Que a semana comece!");
                break;
            case SEXTA:
                System.out.println("Chegou o fim de semana!");
                break;
            case SABADO:
            case DOMINGO:
                System.out.println("É fim de semana!");
                break;
            default:
                System.out.println("Dia comum de trabalho/estudo.");
        }
        
        // Usar Enum com atributos
        Estacao estacao = Estacao.VERAO;
        System.out.println("Estação: " + estacao);
        System.out.println("Período: " + estacao.getPeriodo());
        
        // Conversão de tipos (Parse e String.valueOf)
        String numero = "123";
        int num = Integer.parseInt(numero);  // String para int
        System.out.println("Número inteiro: " + num);
        
        int valor = 456;
        String texto = String.valueOf(valor);  // int para String
        System.out.println("Texto: " + texto);
        
        // Casting explícito (narrowing) - pode haver perda de dados (casas decimais)
        double decimal = 3.14;
        int inteiro = (int) decimal;  
        System.out.println("Inteiro: " + inteiro);  // => 3
        
        // Conversão automática (widening) - sem perda de dados
        int x = 100;
        double y = x;  // int cabe com folga dentro de um double
        System.out.println("y = " + y);  // => 100.0
    }
}
```