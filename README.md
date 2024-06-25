
# Projeto de Desenvolvimento Web - Sistema de Gerenciamento de Produtos e Usuários

Este é um projeto desenvolvido para a disciplina de Desenvolvimento Web da faculdade. O objetivo do projeto é criar um sistema de gerenciamento de produtos e usuários utilizando React para o frontend e uma API Flask para o backend. 

## Funcionalidades

- **Autenticação de Usuários**: Login e registro de usuários com verificação de permissões administrativas.
- **Gerenciamento de Produtos**: Adição, edição e exclusão de produtos.
- **Gerenciamento de Usuários**: Adição, edição e exclusão de usuários.
- **Carrinho de Compras**: Adição de produtos ao carrinho de compras.

## Tecnologias Utilizadas

- **Frontend**: React, Material-UI, Redux
- **Backend**: Flask
- **API**: Axios para comunicação com a API
- **Gerenciamento de Estado**: Redux no carrinho de compras.

## Instalação e Execução

### Pré-requisitos

- Node.js
- NPM ou Yarn
- Python (para o backend)
- Flask e suas dependências

### Configuração do Frontend

1. Clone o repositório
   ```bash
   git clone <URL do repositório>
   ```
2. Navegue até o diretório do frontend
   ```bash
   cd frontend
   ```
3. Instale as dependências
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento
   ```bash
   npm start
   ```

### Configuração do Projeto

- **API**: Certifique-se de que a instância do Axios esteja configurada corretamente no arquivo `src/api/api.js` para apontar para o endpoint da sua API Flask.

### Uso

1. **Login**: Utilize o modal de login para acessar o sistema.
2. **Gerenciamento de Produtos**: Após logar, navegue até o painel de administração para adicionar, editar ou excluir produtos.
3. **Gerenciamento de Usuários**: Acesse a administração de usuários para gerenciar as informações dos usuários registrados.

---

Este projeto foi desenvolvido como parte da disciplina de Desenvolvimento Web, visando aplicar os conceitos aprendidos em sala de aula na construção de uma aplicação web completa, incluindo frontend, backend e integração com uma API RESTful.
