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

<p align="center">
  <a href="https://task-manager-frontend-git-main-sdavi01724-9026s-projects.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Ver_Frontend_(Vercel)-000?style=for-the-badge&logo=vercel&logoColor=00FF00" />
  </a>
  <a href="https://github.com/DaviDias0/task-manager-frontend" target="_blank">
    <img src="https://img.shields.io/badge/Ver_Frontend_(GitHub)-000?style=for-the-badge&logo=github&logoColor=00FF00" />
  </a>
</p>

- **URL Base da API (Produção - Render):** `https://task-manager-api-jihw.onrender.com`

---

## <span style="color:#00FF00">✨ Principais Funcionalidades da API</span>

- **Autenticação:**
  - `POST /auth/register`: Registro de novos usuários (senha com hash <strong style="color:#00FF00">bcrypt</strong>).
  - `POST /auth/login`: Login e geração de token <strong style="color:#00FF00">JWT</strong> (payload inclui ID, email, <strong style="color:#00FF00">role</strong>; expira em 1 dia).
  - `GET /auth/profile`: Retorna dados do usuário autenticado (protegido por JWT).
- **Gerenciamento de Tarefas (Rotas Protegidas por JWT):**
  - `POST /tasks`: Criação de tarefas (título, descrição, prioridade, data de vencimento).
  - `GET /tasks`: Listagem das tarefas do usuário, com <strong style="color:#00FF00">ordenação</strong> dinâmica (`?sortBy=field&order=asc|desc`).
  - `PUT /tasks/:id`: Atualização de tarefas.
  - `DELETE /tasks/:id`: Exclusão lógica (<strong style="color:#00FF00">soft delete</strong>) de tarefas.
- **Gerenciamento de Usuários (Rotas de Admin - Protegidas por JWT + Role `ADMIN`):**
  - `GET /admin/users`: Lista todos os usuários (sem senhas).
  - `DELETE /admin/users/:id`: Exclui um usuário (proteção contra exclusão de admins e verificação de tarefas associadas).
  - `PUT /admin/users/:id/role`: Altera o cargo (`USER` ou `ADMIN`) de um usuário.
- **Segurança:**
  - Middlewares para validação de token <strong style="color:#00FF00">JWT</strong> (`authMiddleware`).
  - Middleware para verificação de cargo <strong style="color:#00FF00">ADMIN</strong> (`adminMiddleware`).
  - Hash de senhas com `bcrypt`.
  - Configuração de <strong style="color:#00FF00">CORS</strong>.

---

## <span style="color:#00FF00">🛠️ Tecnologias Utilizadas</span>

<p align="center">
  <strong style="color:#00FF00">Linguagem & Runtime:</strong><br>
  <img src="https://img.shields.io/badge/Node.js-000?style=for-the-badge&logo=nodedotjs&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/JavaScript_(ES6+)-000?style=for-the-badge&logo=javascript&logoColor=00FF00" />
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
#    PORT=3000 (Opcional, padrão 3000)

# 4. Construa as imagens e inicie os containers (API + Banco de Dados)
docker-compose up --build -d

# 5. Execute as migrações do Prisma para criar/atualizar o schema do banco
docker-compose exec api npx prisma migrate dev

# (Opcional) Para visualizar/editar o banco de dados diretamente
# docker-compose exec api npx prisma studio
# (Acesse http://localhost:5555 no navegador)
```

A API estará rodando em `http://localhost:3000`. Você pode usar ferramentas como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para interagir com os endpoints.

Para parar os containers:
```bash
docker-compose down
```

---

## <span style="color:#00FF00">🔧 Estrutura do Projeto</span>

O backend segue uma arquitetura em camadas para organização e manutenibilidade:

- **`src/controllers`**: Recebem requisições HTTP, validam dados básicos, chamam serviços.
- **`src/services`**: Contêm a lógica de negócio principal.
- **`src/repositories`**: Camada de acesso aos dados (interação com Prisma).
- **`src/routes`**: Definição dos endpoints e associação com controllers/middlewares.
- **`src/middleware`**: Funções para autenticação, autorização (admin), etc.
- **`src/lib`**: Utilitários (instância do PrismaClient).
- **`prisma`**: Schema do banco de dados e arquivos de migração.

---

## <span style="color:#00FF00">📄 Licença</span>

Este projeto está licenciado sob a Licença MIT.