# BMI-Calculator
Este projeto é uma API para calcular o Índice de Massa Corporal (IMC) e armazenar os resultados em um banco de dados MySQL. A aplicação é containerizada utilizando Docker e Docker Compose, permitindo fácil implantação e gerenciamento.

Funcionalidades
Calcular o IMC com base em peso e altura fornecidos.
Classificar o resultado do IMC em categorias (abaixo do peso, peso normal, sobrepeso, obesidade).
Armazenar os resultados no banco de dados.
Consultar todos os resultados ou buscar por um ID específico.
Atualizar informações existentes com base no ID.
Deletar um registro de imc especifico

## Tecnologias Utilizadas

* Node.js: Back-end da aplicação.
* Express: Framework para criação de rotas.
* MySQL: Banco de dados para armazenar os resultados.
* Docker: Containerização da aplicação e banco de dados.
* Docker Compose: Orquestração dos contêineres.

## Pré-requisitos

* Node.js (se executar fora do Docker).
* Docker.
* Docker Compose.

## Instalação e Execução

Clone o Repositório

git clone <URL_DO_REPOSITORIO>

cd BMI-Calculator

## Configuração do Ambiente

Configure o arquivo .env passando os valores das seguintes variáveis:

DB_HOST=db

DB_USER=bmi_calculator

DB_PASSWORD=12345678

DB_NAME=testdb

DB_PORT=3306

API_PORT=3000

Obs: Escolha os valores da melhor forma que desejar

## Construir e Iniciar os Contêineres

`docker-compose up --build`

## Acessar a API 

Acesse a API em: http://localhost:3000

## Rotas da API

### 1. Calcular e Salvar IMC


POST /api/imc

{
"nome": "João",
"altura": 1.75,
"peso": 70
}

### 2. Listar Todos os Registros

   GET /api/imc

### 3. Buscar Registro por ID

   GET /api/imc/:id

### 4. Atualizar Registro

   PUT /api/imc/:id

### 5. deleter Registro

   GET /api/imcDelete/:id