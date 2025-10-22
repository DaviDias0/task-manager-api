# <span style="color:#00FF00">🎯 Task Manager - Full-Stack</span>

<p align="center">
  Um gerenciador de tarefas completo e robusto construído com React, Node.js, e PostgreSQL. Demonstra funcionalidades avançadas como CRUD completo, autenticação JWT com sistema de cargos (Roles), painel de administração, testes automatizados, UI Otimista, e um ambiente totalmente containerizado com Docker.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Concluído-000?style=for-the-badge&labelColor=000&color=00FF00" />
  <img src="https://img.shields.io/github/license/DaviDias0/task-manager-frontend?style=for-the-badge&color=00FF00&labelColor=000" />
</p>

---

## <span style="color:#00FF00">📸 Demo da Aplicação</span>

<div align="center">

![Demo da Aplicação](https://raw.githubusercontent.com/DaviDias0/task-manager-frontend/main/assets/demo.gif)
*Demonstração do fluxo principal: Login, criação, edição, ordenação e exclusão de tarefas.*

</div>

---

## <span style="color:#00FF00">🔗 Links</span>

<p align="center">
  <a href="https://task-manager-frontend-git-main-sdavi01724-9026s-projects.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Ver_Frontend_(Vercel)-000?style=for-the-badge&logo=vercel&logoColor=00FF00" />
  </a>
  <a href="https://github.com/DaviDias0/task-manager-api" target="_blank">
    <img src="https://img.shields.io/badge/Ver_Backend_(GitHub)-000?style=for-the-badge&logo=github&logoColor=00FF00" />
  </a>
  </p>

- **URL Base da API (Render):** `https://task-manager-api-jihw.onrender.com`

---

## <span style="color:#00FF00">✨ Principais Funcionalidades</span>

O Task Manager oferece uma experiência completa de gerenciamento de tarefas com foco em performance e usabilidade:

- **Autenticação Segura:** Sistema completo de <strong style="color:#00FF00">registro</strong> e <strong style="color:#00FF00">login</strong> com tokens <strong style="color:#00FF00">JWT</strong> e rotas protegidas.
- **Gerenciamento de Tarefas (CRUD):**
  - **Criar:** Adicionar tarefas com título, descrição, <strong style="color:#00FF00">prioridade</strong> (`BAIXA`, `MEDIA`, `ALTA`) e <strong style="color:#00FF00">data de vencimento</strong>.
  - **Ler:** Visualizar a lista com <strong style="color:#00FF00">loading states</strong> (skeletons) e <strong style="color:#00FF00">animações</strong> de entrada/saída (`Framer Motion`).
  - **Atualizar:** Editar todos os campos via <strong style="color:#00FF00">modal</strong>.
  - **Deletar:** Excluir tarefas com confirmação.
- **Recursos Avançados da Lista:**
  - <strong style="color:#00FF00">Busca</strong> em Tempo Real por título.
  - <strong style="color:#00FF00">Ordenação</strong> Dinâmica (criação, vencimento, prioridade).
  - <strong style="color:#00FF00">UI Otimista:</strong> Edição e exclusão instantâneas com reversão em caso de erro.
- **Gerenciamento de Usuário:**
  - **Página de Perfil:** Visualização dos dados do usuário logado.
  - Sistema de <strong style="color:#00FF00">Cargos (Roles):</strong> `USER` vs `ADMIN`.
- **Painel de Administração:**
  - Rota `/admin` protegida (<strong style="color:#00FF00">apenas `ADMIN`</strong>).
  - Visualização de todos os usuários.
  - Exclusão de usuários (`USER`).
  - Edição de cargos (`USER` <-> `ADMIN`).
- **Interface e UX:**
  - Design responsivo com <strong style="color:#00FF00">tema escuro</strong>.
  - Animações suaves (`Framer Motion`).
  - Mensagens de feedback (<strong style="color:#00FF00">Toasts</strong>).
  - Navegação fluida com <strong style="color:#00FF00">barra lateral</strong> (`React Router`).
- **Qualidade e Testes:**
  - Cobertura de <strong style="color:#00FF00">testes automatizados</strong> (`Jest` + `React Testing Library`) para autenticação e CRUD de tarefas.
  - <strong style="color:#00FF00">Integração Contínua (CI):</strong> Workflows do GitHub Actions para rodar verificações em Pull Requests (frontend e backend).

---

## <span style="color:#00FF00">🛠️ Tecnologias Utilizadas</span>

<p align="center">
  <strong style="color:#00FF00">Frontend:</strong><br>
  <img src="https://img.shields.io/badge/React-000?style=for-the-badge&logo=react&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/TypeScript-000?style=for-the-badge&logo=typescript&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Vite-000?style=for-the-badge&logo=vite&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/React_Router-000?style=for-the-badge&logo=reactrouter&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Axios-000?style=for-the-badge&logo=axios&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Framer_Motion-000?style=for-the-badge&logo=framer&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/React_Toastify-000?style=for-the-badge&logo=reacttoastify&logoColor=00FF00" />
</p>
<p align="center">
  <strong style="color:#00FF00">Backend:</strong><br>
  <img src="https://img.shields.io/badge/Node.js-000?style=for-the-badge&logo=nodedotjs&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Express.js-000?style=for-the-badge&logo=express&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/JWT-000?style=for-the-badge&logo=jsonwebtokens&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Bcrypt-000?style=for-the-badge&logo=bcrypt&logoColor=00FF00" />
</p>
<p align="center">
  <strong style="color:#00FF00">Banco de Dados:</strong><br>
  <img src="https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Prisma-000?style=for-the-badge&logo=prisma&logoColor=00FF00" />
</p>
<p align="center">
  <strong style="color:#00FF00">Testes:</strong><br>
  <img src="https://img.shields.io/badge/Jest-000?style=for-the-badge&logo=jest&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Testing_Library-000?style=for-the-badge&logo=testinglibrary&logoColor=00FF00" />
</p>
<p align="center">
  <strong style="color:#00FF00">DevOps & Ferramentas:</strong><br>
  <img src="https://img.shields.io/badge/Docker-000?style=for-the-badge&logo=docker&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Git-000?style=for-the-badge&logo=git&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/GitHub_Actions-000?style=for-the-badge&logo=githubactions&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Vercel-000?style=for-the-badge&logo=vercel&logoColor=00FF00" />
  <img src="https://img.shields.io/badge/Render-000?style=for-the-badge&logo=render&logoColor=00FF00" />
</p>

---

## <span style="color:#00FF00">🚀 Rodando o Projeto Localmente</span>

Para rodar este projeto na sua máquina, siga os passos abaixo. Você precisará ter o [Node.js](https://nodejs.org/en/) (v18+) e o [Docker](https://www.docker.com/products/docker-desktop/) instalados.

### <span style="color:#00FF00">Backend (API)</span>
```bash
# 1. Clone o repositório do backend
git clone [https://github.com/DaviDias0/task-manager-api.git](https://github.com/DaviDias0/task-manager-api.git)

# 2. Navegue até a pasta do projeto
cd task-manager-api

# 3. Crie um arquivo .env (copiando do .env.example se existir)
#    Configure sua DATABASE_URL (ex: postgresql://user:password@db:5432/taskdb)
#    Configure um JWT_SECRET seguro (ex: uma string longa e aleatória)

# 4. Inicie os containers do Docker (inclui o banco de dados)
docker-compose up --build -d

# 5. Aplique as migrações do Prisma (necessário na primeira vez e após mudanças no schema)
docker-compose exec api npx prisma migrate dev
```
O backend estará rodando em `http://localhost:3000`.

### <span style="color:#00FF00">Frontend</span>
```bash
# 1. Clone o repositório do frontend (em outra pasta)
git clone [https://github.com/DaviDias0/task-manager-frontend.git](https://github.com/DaviDias0/task-manager-frontend.git)

# 2. Navegue até a pasta do projeto
cd task-manager-frontend

# 3. Instale as dependências
npm install

# 4. Crie um arquivo .env.local na raiz e defina a variável de ambiente da API
#    Conteúdo do .env.local:
#    VITE_API_URL=http://localhost:3000

# 5. Inicie a aplicação de desenvolvimento
npm run dev
```
A aplicação estará acessível em `http://localhost:5173` (ou a porta indicada pelo Vite).

---

## <span style="color:#00FF00">📄 Licença</span>

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes (se existir).
