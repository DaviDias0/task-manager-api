// src/controllers/post.controller.js
const PostService = require('../services/post.service');

class PostController {
  async create(req, res, next) {
    try {
      // Pega o ID do usuário do token (adicionado pelo authMiddleware)
      const authorId = req.user?.id;
      if (!authorId) {
         return res.status(401).json({ message: 'Usuário não autenticado.' });
      }
      const postData = { ...req.body, authorId }; // Adiciona authorId aos dados do body
      console.log("PostController: create - Recebido:", postData);
      const post = await PostService.createPost(postData);
      res.status(201).json(post);
    } catch (error) {
      console.error("PostController: create - Erro:", error);
      next(error); // Passa o erro para o error handler global
    }
  }

  async findAll(req, res, next) {
    try {
      console.log("PostController: findAll - Buscando posts.");
      const posts = await PostService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
       console.error("PostController: findAll - Erro:", error);
       next(error);
    }
  }

  async findOne(req, res, next) {
    try {
      const postId = req.params.id;
       console.log(`PostController: findOne - Buscando post ID: ${postId}`);
      const post = await PostService.getPostById(postId);
      res.status(200).json(post);
    } catch (error) {
       console.error(`PostController: findOne - Erro ID: ${req.params.id}:`, error);
       next(error);
    }
  }

  async update(req, res, next) {
    try {
      const postId = req.params.id;
      const userId = req.user?.id; // ID do usuário logado
      if (!userId) { return res.status(401).json({ message: 'Usuário não autenticado.' }); }

      console.log(`PostController: update - Recebido para ID: ${postId} por UserID: ${userId}`);
      const updatedPost = await PostService.updatePost(postId, req.body, userId);
      res.status(200).json(updatedPost);
    } catch (error) {
       console.error(`PostController: update - Erro ID: ${req.params.id}:`, error);
       next(error);
    }
  }

  async delete(req, res, next) {
    try {
       const postId = req.params.id;
       const userId = req.user?.id; // ID do usuário logado
       if (!userId) { return res.status(401).json({ message: 'Usuário não autenticado.' }); }

       console.log(`PostController: delete - Recebido para ID: ${postId} por UserID: ${userId}`);
       await PostService.deletePost(postId, userId);
       res.status(204).send(); // No Content
    } catch (error) {
        console.error(`PostController: delete - Erro ID: ${req.params.id}:`, error);
       next(error);
    }
  }
}

module.exports = new PostController();