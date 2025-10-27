// src/services/post.service.js
const PostRepository = require('../repositories/post.repository');

class PostService {
  async createPost(data) {
    // Validações básicas (podem ser movidas para um validator depois)
    if (!data.title || !data.content || !data.authorId) {
      const error = new Error('Título, conteúdo e ID do autor são obrigatórios.');
      error.status = 400; // Bad Request
      throw error;
    }
    console.log(`PostService: Criando post para authorId: ${data.authorId}`);
    return PostRepository.create(data);
  }

  async getAllPosts() {
    console.log("PostService: Buscando todas as postagens.");
    return PostRepository.findAll();
  }

  async getPostById(postId) {
    console.log(`PostService: Buscando post com ID: ${postId}`);
    const post = await PostRepository.findById(postId);
    if (!post) {
      const error = new Error('Postagem não encontrada.');
      error.status = 404; // Not Found
      throw error;
    }
    return post;
  }

  async updatePost(postId, data, userId) {
    console.log(`PostService: Atualizando post ID: ${postId} por UserID: ${userId}`);
    const post = await this.getPostById(postId); // Reutiliza para buscar e checar se existe

    // Verifica se o usuário logado é o autor do post
    if (post.authorId !== Number(userId)) {
      const error = new Error('Permissão negada. Você só pode editar suas próprias postagens.');
      error.status = 403; // Forbidden
      throw error;
    }

    // Validações básicas
     if (!data.title || !data.content) {
      const error = new Error('Título e conteúdo são obrigatórios para atualização.');
      error.status = 400; // Bad Request
      throw error;
    }

    return PostRepository.update(postId, { title: data.title, content: data.content });
  }

  async deletePost(postId, userId) {
     console.log(`PostService: Deletando post ID: ${postId} por UserID: ${userId}`);
     const post = await this.getPostById(postId); // Reutiliza para buscar e checar se existe

     // Verifica se o usuário logado é o autor do post
     if (post.authorId !== Number(userId)) {
       const error = new Error('Permissão negada. Você só pode deletar suas próprias postagens.');
       error.status = 403; // Forbidden
       throw error;
     }

     return PostRepository.delete(postId);
  }
}

module.exports = new PostService();