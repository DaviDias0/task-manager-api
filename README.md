# <span style="color:#00FF00">🎯 Task Manager - API Backend</span>

<p align="center">
  A API RESTful robusta para o projeto Task Manager, construída com Node.js, Express, Prisma e PostgreSQL. Fornece endpoints seguros para autenticação de usuários (JWT), gerenciamento de tarefas (CRUD), e funcionalidades administrativas (gerenciamento de usuários e cargos). O ambiente é totalmente containerizado com Docker.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Concluído-000?style=for-the-badge&labelColor=000&color=00FF00" />
  <img src="https://img.shields.io/github/license/DaviDias0/task-manager-api?style=for-the-badge&color=00FF00&labelColor=000" />
  <img src="https://github.com/DaviDias0/task-manager-api/actions/workflows/ci.yml/badge.svg?branch=main" />
</p>

---

## <span style="color:#00FF00">🔗 Links Relacionados</span>

- **Frontend (Aplicação ao Vivo - Vercel):** [**Acesse aqui**](https://task-manager-frontend-git-main-sdavi01724-9026s-projects.vercel.app/)
- **Repositório do Frontend:** [**DaviDias0/task-manager-frontend**](https://github.com/DaviDias0/task-manager-frontend)
- **API (Produção - Render):** `https://task-manager-api-jihw.onrender.com`

---

## <span style="color:#00FF00">✨ Principais Funcionalidades da API</span>

- **Autenticação:**
  - `POST /auth/register`: Registro de novos usuários (senha com hash `bcrypt`).
  - `POST /auth/login`: Login de usuários e geração de token <strong style="color:#00FF00">JWT</strong> (expira em 1 dia, inclui ID, email e <strong style="color:#00FF00">role</strong>).
  - `GET /auth/profile`: Retorna os dados do usuário autenticado (protegido por JWT).
- **Gerenciamento de Tarefas (Rotas Protegidas por JWT):**
  - `POST /tasks`: Criação de novas tarefas (com título, descrição, prioridade, data de vencimento).
  - `GET /tasks`: Listagem das tarefas do usuário autenticado, com suporte a <strong style="color:#00FF00">ordenação</strong> (`sortBy`, `order`).
  - `PUT /tasks/:id`: Atualização completa ou parcial de uma tarefa.
  - `DELETE /tasks/:id`: Exclusão lógica (soft delete) de uma tarefa.
- **Gerenciamento de Usuários (Rotas de Administrador - Protegidas por JWT + Role `ADMIN`):**
  - `GET /admin/users`: Lista todos os usuários cadastrados (sem senhas).
  - `DELETE /admin/users/:id`: Exclui um usuário (com proteção contra exclusão de admins e verificação de tarefas associadas).
  - `PUT /admin/users/:id/role`: Altera o cargo (`USER` ou `ADMIN`) de um usuário.
- **Segurança:**
  - Middlewares para validação de token JWT (`authMiddleware`).
  - Middleware para verificação de cargo de administrador (`adminMiddleware`).
  - Hash de senhas com `bcrypt`.

---

## <span style="color:#00FF00">🛠️ Tecnologias Utilizadas</span>

<p align="center">
  <strong style="color:#00FF00">Linguagem & Runtime:</strong><br>
  <img src="https://img.shields.io/badge/Node.js-000?style=for-the-badge&logo=nodedotjs&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/JavaScript-000?style=for-the-badge&logo=javascript&logoColor=00FF00" />
</p>
<p align="center">
  <strong style="color:#00FF00">Framework & Roteamento:</strong><br>
  <img src="https://img.shields.io/badge/Express.js-000?style=for-the-badge&logo=express&logoColor=00FF00" />
</p>
<p align="center">
  <strong style="color:#00FF00">Banco de Dados & ORM:</strong><br>
  <img src="https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Prisma-000?style=for-the-badge&logo=prisma&logoColor=00FF00" />
</p>
<p align="center">
  <strong style="color:#00FF00">Autenticação & Segurança:</strong><br>
  <img src="https://img.shields.io/badge/JWT-000?style=for-the-badge&logo=jsonwebtokens&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Bcrypt-000?style=for-the-badge&logo=bcrypt&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/CORS-000?style=for-the-badge&logo=cors&logoColor=00FF00" />
</p>
<p align="center">
  <strong style="color:#00FF00">DevOps & Ferramentas:</strong><br>
  <img src="https://img.shields.io/badge/Docker-000?style=for-the-badge&logo=docker&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Docker_Compose-000?style=for-the-badge&logo=docker&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Git-000?style=for-the-badge&logo=git&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/GitHub_Actions_(CI)-000?style=for-the-badge&logo=githubactions&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Render_(Deploy)-000?style=for-the-badge&logo=render&logoColor=00FF00" />
</p>

---

## <span style="color:#00FF00">🚀 Rodando o Projeto Localmente</span>

Para rodar a API localmente para desenvolvimento ou teste, siga estes passos. Você precisará ter o [Docker](https://www.docker.com/products/docker-desktop/) instalado.

```bash
# 1. Clone este repositório
git clone [https://github.com/DaviDias0/task-manager-api.git](https://github.com/DaviDias0/task-manager-api.git)

# 2. Navegue até a pasta do projeto
cd task-manager-api

# 3. Crie o arquivo .env
#    Copie o conteúdo de .env.example (se existir) ou crie um novo com:
#    DATABASE_URL="postgresql://user:password@db:5432/taskdb?schema=public"
#    JWT_SECRET="SUA_CHAVE_SECRETA_LONGA_E_ALEATORIA_AQUI"
#    PORT=3000 (Opcional)

# 4. Construa as imagens e inicie os containers (API + Banco de Dados)
docker-compose up --build -d

# 5. Execute as migrações do Prisma para criar as tabelas no banco
docker-compose exec api npx prisma migrate dev

# (Opcional) Para popular o banco com dados iniciais (se você criar um script seed.js)
# docker-compose exec api npx prisma db seed
```

A API estará rodando em `http://localhost:3000`. Você pode usar ferramentas como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para testar os endpoints.

Para parar os containers:
```bash
docker-compose down
```

---

## <span style="color:#00FF00">🔧 Estrutura do Projeto</span>

O backend segue uma arquitetura em camadas para organização e manutenibilidade:

- **`src/controllers`**: Responsáveis por receber as requisições HTTP, validar dados básicos e chamar os serviços.
- **`src/services`**: Contêm a lógica de negócio principal da aplicação.
- **`src/repositories`**: Camada de acesso aos dados, responsável pelas interações diretas com o banco através do Prisma.
- **`src/routes`**: Define os endpoints da API e associa-os aos controllers e middlewares.
- **`src/middleware`**: Funções intermediárias para tarefas como autenticação e autorização.
- **`src/lib`**: Utilitários e configurações (ex: instância do PrismaClient).
- **`prisma`**: Contém o schema do banco de dados e as migrações.

---

## <span style="color:#00FF00">📄 Licença</span>

Este projeto está licenciado sob a Licença MIT.
