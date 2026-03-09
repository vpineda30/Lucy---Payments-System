# Payments System with TypeScript 💳

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)

Um sistema de gestão de pagamentos robusto e estritamente tipado, desenvolvido com TypeScript para garantir segurança de dados e escalabilidade. Esta aplicação implementa fluxos de transações financeiras entre usuários comuns e lojistas, com validações de saldo e autenticação.

## 🚀 Funcionalidades Principais

* **Gestão de Transações:** Registro e consulta de pagamentos realizados.
* **Controle de Usuários:** Cadastro, login, atualização e remoção de contas.
* **Segurança:** Proteção de rotas sensíveis via JWT (JSON Web Token).
* **Arquitetura Modular:** Organização clara entre módulos de pagamentos e usuários utilizando o padrão Controller/Service.

## 🛠️ Tecnologias Utilizadas

* **TypeScript:** Linguagem principal para tipagem estática e segurança de código.
* **Node.js & Express:** Ambiente de execução e framework para a construção da API.
* **Middlewares Customizados:** Validação de autenticação em tempo real (AuthMiddleware).

## 🔧 Instalação e Execução

1. **Clone o repositório:**
   git clone [https://github.com/vpineda30/Payments-System-with-Typescript.git](https://github.com/vpineda30/Payments-System-with-Typescript.git)
   cd Payments-System-with-Typescript

2. **Instale as dependências:** npm install

3. **Inicie o servidor em modo de desenvolvimento:** npm start

## 📖 Guia de Endpoints da API
Abaixo estão detalhadas as rotas implementadas no sistema. As rotas que exigem o envio do token no header da requisição estão sinalizadas como [Autenticado].

### 💳 Módulo de Pagamentos (modules/payments)
  **Listar Transações**

    Rota: GET /get-transactions
    Segurança: [Autenticado]
    Descrição: Recupera o histórico completo de movimentações financeiras do usuário autenticado.

  **Nova Transação**

    Rota: POST /new-transaction
    Segurança: [Autenticado]
    Descrição: Inicia e processa um novo pagamento entre contas, validando permissões de pagador e recebedor.

### 👤 Módulo de Usuários (modules/users)
  **Criar Conta**

    Rota: POST /create-user
    Segurança: Aberto (Público)
    Descrição: Registra um novo perfil (usuário comum ou lojista) na plataforma.

  **Login**

    Rota: POST /login
    Segurança: Aberto (Público)
    Descrição: Valida as credenciais, autentica o usuário e gera o token de acesso.

  **Listar Usuários**

    Rota: GET /get-users
    Segurança: [Autenticado]
    Descrição: Retorna a listagem de usuários cadastrados no sistema.

  **Atualizar Cadastro**

    Rota: PUT /update-user/:id
    Segurança: [Autenticado]
    Descrição: Modifica os dados de um usuário existente. É necessário enviar o ID via parâmetro de URL.

  **Remover Conta**

    Rota: DELETE /delete-user/:id
    Segurança: [Autenticado]
    Descrição: Exclui permanentemente o registro de um usuário do banco de dados.

## 📂 Estrutura do Projeto

### O projeto utiliza uma estrutura modular para facilitar a manutenção e separação de conceitos:

    src/modules/payments: 
        Contém as rotas, adaptadores (controllers) e lógica de transações.
        
    src/modules/users: 
        Gerencia o ciclo de vida dos usuários, middlewares de autenticação e controllers de acesso.
        
    src/shared:
        Recursos compartilhados entre os módulos da aplicação (ex: index.ts, utilitários).

## 💡 Observações Técnicas

* **Formato de Dados:** Todas as requisições POST, PUT e DELETE esperam ou retornam dados no formato JSON.
* **Parâmetros de URL:** Nas rotas de update e delete, substitua :id pelo identificador real do usuário (ex: /update-user/123).
* **Middlewares:** O authMiddleware presente nos arquivos de rotas garante que apenas o dono da conta ou administradores realizem alterações sensíveis.
