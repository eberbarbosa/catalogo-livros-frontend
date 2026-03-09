📚 Catálogo de Livros — Frontend

Interface web desenvolvida em React para consumo da API do projeto Catálogo de Livros.

O objetivo do projeto é construir uma aplicação Full Stack, onde o frontend se comunica com uma API REST desenvolvida em Spring Boot.

🖥️ Demonstração da Aplicação

A aplicação permite visualizar os livros cadastrados no sistema através de uma interface simples e moderna.

Exemplo de exibição:

📚 Catálogo de Livros

Dom Casmurro
Autor: Machado de Assis
Preço: R$ 39.90

Clean Code
Autor: Robert C. Martin
Preço: R$ 120.00
🏗 Arquitetura do Sistema

Este projeto faz parte de um sistema dividido em duas aplicações:

Frontend (React)
       ↓ HTTP / JSON
Backend (Spring Boot API)
       ↓
Banco de Dados (MySQL)

Fluxo da requisição:

Usuário → React → API REST → Banco de Dados → Resposta JSON → React
🚀 Tecnologias Utilizadas

Frontend:

React

Vite

JavaScript

Axios

CSS

Ferramentas de desenvolvimento:

Git

Node.js

npm

📦 Estrutura do Projeto
catalogo-livros-frontend
│
├── src
│   ├── components
│   │
│   ├── pages
│   │
│   ├── services
│   │
│   ├── styles
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public
│
├── package.json
│
└── README.md
🔌 Integração com API

A aplicação consome a API REST do projeto backend:

GET http://localhost:8080/livros

Resposta esperada:

[
  {
    "id": 1,
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "preco": 39.90
  }
]
⚙️ Como Executar o Projeto
1️⃣ Clonar o repositório
git clone https://github.com/SEU-USUARIO/catalogo-livros-frontend.git
2️⃣ Entrar no diretório do projeto
cd catalogo-livros-frontend
3️⃣ Instalar dependências
npm install
4️⃣ Executar a aplicação
npm run dev

A aplicação estará disponível em:

http://localhost:5173
🧠 Projeto Backend

Este frontend consome a API desenvolvida em:

catalogo-livros-api

Tecnologias utilizadas no backend:

Java

Spring Boot

Spring Data JPA

MySQL

Swagger

📊 Roadmap do Projeto

Funcionalidades planejadas:

 Estrutura inicial do frontend

 Integração com API

 Listagem de livros

 Cadastro de livros

 Edição de livros

 Exclusão de livros

 Interface responsiva

📚 Objetivo do Projeto

Este projeto foi desenvolvido com foco em:

aprendizado de React

integração Frontend + Backend

boas práticas de desenvolvimento Full Stack

construção de portfólio profissional

👨‍💻 Autor

Projeto desenvolvido por Eber Barbosa.

⭐ Contribuição

Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.
