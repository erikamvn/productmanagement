# Nome do Projeto

prdouct-management-app

Este projeto tem como objetivo criar uma aplicação de lista de produtos com funcionalidades simples de CRUD

## Índice

1. [Instalação](#instalação)
2. [Uso](#uso)
3. [Testes](#testes)
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [Decisões Técnicas](#decisões-técnicas)
   - [1. JSONPlaceholder](#1-jsonplaceholder)
   - [2. Zustand](#2-zustand)
   - [3. Renderização e Estado Global](#3-renderização-e-estado-global)
   - [4. Memoização e useCallback](#4-memoização-e-usecallback)
   - [5. Simplicidade e Legibilidade](#5-simplicidade-e-legibilidade)
   - [6. Arquitetura do Projeto](#6-arquitetura-do-projeto)
   - [7. Jest para Testes (Snapshot Testing)](#7-jest-para-testes-snapshot-testing)

## Instalação

Para instalar o projeto, clone o repositório e instale as dependências:

```bash
git clone https://github.com/usuario/projeto.git
cd projeto
npm install
```

## Uso

Para rodar o projeto localmente, use:

```bash
npm run dev
```

## Testes

Para rodar os testes, execute:

```bash
npm test
```

## Tecnologias Utilizadas

- **React**: Para a construção da interface de usuário.
- **Next.js**: Framework React com funcionalidades de renderização do lado do servidor e suporte a roteamento.
- **TailwindCSS**: Framework para estilização baseada em utilitários.
- **Jest**: Framework para testes.
- **Zustand**: Gerenciamento de estado global.

# Decisões Técnicas

## 1. **JSONPlaceholder**

Foi utilizado o **JSONPlaceholder** como API fictícia para este projeto devido aos seguintes motivos:

- **Simplicidade e Rapidez:** O JSONPlaceholder oferece uma API REST simples e funcional, permitindo testar a aplicação sem a necessidade de configurar um backend real.
- **Simulação de CRUD:** A API permite simular operações básicas de CRUD (Create, Read, Update, Delete), essenciais para a implementação do gerenciamento de produtos.
- **Foco no Desenvolvimento do Frontend:** Com o uso do JSONPlaceholder, é possível concentrar os esforços no desenvolvimento das funcionalidades de exibição de produtos, filtros, ordenação e paginação, sem a necessidade de configurar uma API real.
- **Apoio à Prototipagem e Testes:** A API pública do JSONPlaceholder facilita o processo de prototipagem e testes de interface, oferecendo uma solução rápida e eficiente para alimentar a aplicação com dados.

Essa escolha atende ao propósito do desafio, que é focar no desenvolvimento das funcionalidades principais do frontend, garantindo ao mesmo tempo uma simulação realista das interações com uma API.

## 2. **Zustand**

O **Zustand** foi escolhido para o gerenciamento de estado da aplicação devido às suas características que se alinham bem com os requisitos do projeto:

- **Simplicidade e Leveza:** Zustand oferece uma abordagem minimalista para o gerenciamento de estado, sem a necessidade de configuração complexa ou boilerplate. Isso facilita a manutenção e evolução da aplicação sem sobrecarregar o código com soluções complicadas.
- **Performance:** Zustand utiliza um sistema de atualização eficiente baseado em reatividade, o que reduz o número de renderizações desnecessárias, garantindo um bom desempenho na manipulação de estados, como a lista de produtos, filtros e paginação.
- **Facilidade de Integração com React:** Como o Zustand é totalmente compatível com React, ele oferece uma integração simples e direta com a aplicação, permitindo o gerenciamento de estados locais e globais de forma intuitiva e sem grandes esforços.
- **Escalabilidade:** Embora seja leve, o Zustand oferece recursos adequados para gerenciar estados mais complexos conforme a aplicação cresce, sem a necessidade de migração para soluções mais pesadas.

## 3. **Renderização e Estado Global**

O projeto não usa **SSR** (getServerSideProps) porque este é um CRUD de produtos, onde os dados não mudam constantemente e não são sensíveis.

Em vez disso, utiliza **CSR (Client-Side Rendering)** com Zustand para gerenciar o estado global dos produtos, permitindo que a aplicação busque os produtos apenas uma vez e armazene localmente, reduzindo chamadas desnecessárias à API e melhorando a performance.

### **Por que não usar SSR, neste caso?**

- 🚀 **Melhor performance:** Evita carregar os produtos no servidor a cada requisição.
- 📦 **Evita sobrecarga na API:** Como os produtos não mudam constantemente, podemos armazená-los no estado global.
- 🔄 **Experiência mais fluida:** Paginação, busca e ordenação ocorrem no frontend, sem precisar recarregar a página.

Se os produtos fossem altamente dinâmicos (por exemplo, preços de mercado atualizados em tempo real), poderíamos considerar SSR para garantir que os dados estivessem sempre atualizados.

## 4. **Memoização e useCallback**

O projeto não aplica essas otimizações neste momento, pois consiste em ser um CRUD simples e não há evidências de que a renderização de dados ou funções repetidas esteja impactando a performance de forma significativa. Em cenários onde a quantidade de dados ou componentes pode crescer substancialmente, essas otimizações poderiam ser avaliadas, mas neste caso, o foco foi entregar uma solução clara e de fácil manutenção, o que é essencial em um teste técnico.

## 5. **Simplicidade e Legibilidade**

A escolha de não aplicar otimizações que envolvem memoização foi feita para preservar a simplicidade do código. Em muitos testes técnicos, é mais importante demonstrar clareza e capacidade de entregar uma solução funcional, especialmente quando as otimizações podem agregar complexidade sem necessidade imediata.

## 6. **Arquitetura do Projeto**

### **Arquitetura de Estado Centralizado**

A utilização do **Zustand** para gerenciamento de estado permite que o estado global da aplicação seja gerido de maneira eficiente, sem a complexidade dos hooks do Redux ou do Context API. Isso é ideal para uma aplicação simples, pois:

- **Fluxo Simples:** Com Zustand, não há necessidade de um fluxo complexo para gerenciar estados.
- **Escalabilidade no Gerenciamento de Estado:** Mesmo com a simplicidade, o Zustand permite lidar com estados globais e complexos à medida que a aplicação cresce.

## 7. **Jest para Testes (Snapshot Testing)**

O **Jest** foi escolhido como framework de testes, com foco em **Snapshot Testing**, pela sua simplicidade, eficiência e integração fácil. É uma biblioteca amplamente utilizada, com configuração simples e recursos poderosos, tornando a implementação de testes de snapshot rápida e intuitiva.
