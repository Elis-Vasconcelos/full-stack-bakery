# Controle de Vendas e Fila de Padaria

## Descrição

Este é o projeto colaborativo de **controle de vendas** e **fila de clientes** de uma padaria. O objetivo desta atividade é criar uma aplicação **full stack** para gerenciar as vendas de pães e a fila de clientes que aguardam atendimento. A aplicação deve ser capaz de adicionar e remover clientes da fila, controlar a quantidade de pães vendidos e manter um histórico dos pedidos.

A aplicação será desenvolvida com **NextJS** para o front-end e **ExpressJS** para o back-end, utilizando **Typescript** em ambas as partes. O banco de dados será gerido utilizando **Prisma ORM** e **SQLite** como banco de dados relacional.

## Tecnologias Utilizadas

- **Front-end:**
  - **Typescript**
  - **React**
  - **NextJS**
- **Back-end:**
  - **Typescript**
  - **ExpressJS**
  - **Prisma ORM**
  - **Banco de Dados Relacional (SQLite)**
- **Outras Tecnologias (Opcional):**
  - **Docker** (para subir os serviços de back-end e front-end localmente)

## Funcionalidades Implementadas

### Requisitos Obrigatórios

- **Adicionar Pessoa à Fila:** Ao adicionar uma pessoa à fila, incrementa-se o contador de "Pessoas na Fila", o contador de "Pães Vendidos" e a "Entrada".
- **Remover Pessoa da Fila:** Ao remover uma pessoa da fila, decrementa-se apenas o contador de "Pessoas na Fila".
- **Responsividade:** A aplicação será responsiva, garantindo uma boa experiência de uso em dispositivos móveis, tablets e desktops.

### Requisitos Opcionais

- **Docker:** Utilização de **Docker** para criar containers e subir tanto o back-end quanto o front-end localmente.
- **Editar Pedidos na Fila:** A funcionalidade de editar pedidos na fila será implementada, incrementando os contadores de "Pães Vendidos" e "Entrada".
- **Tela de Histórico de Pedidos:** Uma tela para exibir os pedidos que já saíram da fila será adicionada, com possibilidade de customização do design.

## Design

O design da aplicação foi especificado no **Figma** e pode ser acessado através do seguinte link:

[Design no Figma](https://www.figma.com/design/j8n0tlrXRZEk9R7IYUThs1/La-Padarie?node-id=2027-5&t=BG2t6UHN6Xm853K4-0)

## Aplicação em funcionamento

A aplicação pode ser visualizada diretamente em [**LinkedIn - Visualizar o site em funcionamento**](https://www.linkedin.com/posts/mikelly-correia-75b85a203_ol%C3%A1-pessoal-gostaria-de-compartilhar-activity-7208165518682296321-oLf3?utm_source=share&utm_medium=member_desktop).

## Estrutura do Projeto

- **client/**: Contém o código do front-end, desenvolvido com **NextJS** e **React**.
- **server/**: Contém o código do back-end, desenvolvido com **ExpressJS** e **Prisma ORM**.
- **database/**: Contém a configuração do banco de dados SQLite e as migrações do Prisma.
- **docker-compose.yml**: Arquivo para configurar e subir os containers Docker para os serviços de back-end e front-end.

