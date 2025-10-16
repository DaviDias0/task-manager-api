# 🎯 Task Manager - Full-Stack

<p align="center">
  Um gerenciador de tarefas completo construído com React, Node.js, e PostgreSQL, demonstrando funcionalidades de CRUD, autenticação JWT, e um ambiente de desenvolvimento e produção containerizado com Docker.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/github/license/DaviDias0/task-manager-frontend?style=for-the-badge&color=blue" />
</p>

---

## 📸 Demo da Aplicação

<div align="center">

![Demo da Aplicação](https://raw.githubusercontent.com/DaviDias0/task-manager-frontend/main/assets/demo.gif)

</div>

---

## 🔗 Links

- **Frontend (Vercel):** [**Acesse a aplicação aqui**](https://task-manager-frontend-git-main-sdavi01724-9026s-projects.vercel.app/)
- **Backend (Render):** `https://task-manager-api-jihw.onrender.com`
- **Repositório do Backend:** [**DaviDias0/task-manager-api**](https://github.com/DaviDias0/task-manager-api)

---

## ✨ Principais Funcionalidades

- **Autenticação de Usuários:** Sistema completo de registro e login com tokens JWT e rotas protegidas.
- **Gerenciamento de Tarefas (CRUD):**
  - **Criar:** Adicionar novas tarefas com título, descrição, prioridade e data de vencimento.
  - **Ler:** Visualizar a lista de tarefas com animações de entrada e loading states (skeletons).
  - **Atualizar:** Editar todos os campos de uma tarefa através de um modal.
  - **Deletar:** Excluir tarefas com uma janela de confirmação e animação de saída.
- **Busca em Tempo Real:** Filtrar tarefas por título instantaneamente.
- **Interface Responsiva:** Design moderno com tema escuro, construído para funcionar em diferentes tamanhos de tela.
- **Testes Automatizados:** Cobertura de testes para todo o fluxo de autenticação e funcionalidades CRUD da página de tarefas, garantindo a qualidade e estabilidade do código.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias modernas e padrões da indústria para desenvolvimento full-stack.

| Categoria | Tecnologia |
| --- | --- |
| **Frontend** | ![React](https://img.shields.io/badge/React-000?style=for-the-badge&logo=react&logoColor=00FF00) ![TypeScript](https://img.shields.io/badge/TypeScript-000?style=for-the-badge&logo=typescript&logoColor=00FF00) ![Vite](https://img.shields.io/badge/Vite-000?style=for-the-badge&logo=vite&logoColor=00FF00) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-000?style=for-the-badge&logo=nodedotjs&logoColor=00FF00) ![Express.js](https://img.shields.io/badge/Express.js-000?style=for-the-badge&logo=express&logoColor=00FF00) |
| **Banco de Dados** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql&logoColor=00FF00) ![Prisma](https://img.shields.io/badge/Prisma-000?style=for-the-badge&logo=prisma&logoColor=00FF00) |
| **Testes** | ![Jest](https://img.shields.io/badge/Jest-000?style=for-the-badge&logo=jest&logoColor=00FF00) ![React Testing Library](https://img.shields.io/badge/Testing_Library-000?style=for-the-badge&logo=testinglibrary&logoColor=00FF00) |
| **DevOps & Ferramentas** | ![Docker](https://img.shields.io/badge/Docker-000?style=for-the-badge&logo=docker&logoColor=00FF00) ![Git](https://img.shields.io/badge/Git-000?style=for-the-badge&logo=git&logoColor=00FF00) ![GitHub](https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=00FF00) ![Vercel](https://img.shields.io/badge/Vercel-000?style=for-the-badge&logo=vercel&logoColor=00FF00) ![Render](https://img.shields.io/badge/Render-000?style=for-the-badge&logo=render&logoColor=00FF00) |

---

## 🚀 Rodando o Projeto Localmente

Para rodar este projeto na sua máquina, siga os passos abaixo. Você precisará ter o [Node.js](https://nodejs.org/en/) e o [Docker](https://www.docker.com/products/docker-desktop/) instalados.

### Backend (API)
```bash
# 1. Clone o repositório do backend
git clone [https://github.com/DaviDias0/task-manager-api.git](https://github.com/DaviDias0/task-manager-api.git)

# 2. Navegue até a pasta do projeto
cd task-manager-api

# 3. Crie um arquivo .env com base no .env.example
# e configure a sua DATABASE_URL e JWT_SECRET

# 4. Inicie os containers do Docker
docker-compose up --build -d
```
O backend estará rodando em `http://localhost:3000`.

### Frontend
```bash
# 1. Clone o repositório do frontend
git clone [https://github.com/DaviDias0/task-manager-frontend.git](https://github.com/DaviDias0/task-manager-frontend.git)

# 2. Navegue até a pasta do projeto
cd task-manager-frontend

# 3. Instale as dependências
npm install

# 4. Crie um arquivo .env.local e defina a variável de ambiente
# VITE_API_URL=http://localhost:3000

# 5. Inicie a aplicação
npm run dev
```
A aplicação estará acessível em `http://localhost:5173` (ou a porta que o Vite indicar).
