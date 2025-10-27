// src/routes/post.routes.js
const { Router } = require('express');
const PostController = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

// --- ROTAS DE POSTAGENS ---

// Aplica o middleware de autenticação a TODAS as rotas de postagens abaixo
// Isso garante que apenas usuários logados possam interagir com posts
router.use(authMiddleware);

// Criar uma nova postagem
// Rota final: POST /posts
router.post('/', PostController.create);

// Listar todas as postagens
// Rota final: GET /posts
router.get('/', PostController.findAll);

// Buscar uma postagem específica pelo ID
// Rota final: GET /posts/:id
router.get('/:id', PostController.findOne);

// Atualizar uma postagem (apenas o autor pode)
// Rota final: PUT /posts/:id
router.put('/:id', PostController.update);

// Deletar uma postagem (apenas o autor pode)
// Rota final: DELETE /posts/:id
router.delete('/:id', PostController.delete);

module.exports = router;