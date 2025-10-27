// src/repositories/post.repository.js
const prisma = require('../lib/prisma'); // <--- GARANTA QUE ESTA LINHA ESTÁ CORRETA

class PostRepository {
  async create(data) {
    const { title, content, authorId } = data;
    // Agora 'prisma' deve estar definido
    return prisma.post.create({
      data: {
        title,
        content,
        authorId: Number(authorId),
      },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  }

  async findAll(options = {}) {
    const orderBy = options.orderBy || { createdAt: 'desc' };
    // Agora 'prisma' deve estar definido
    return prisma.post.findMany({
      orderBy: orderBy,
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  }

  async findById(postId) {
    // Agora 'prisma' deve estar definido
    return prisma.post.findUnique({
      where: { id: Number(postId) },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  }

  async update(postId, data) {
    const { title, content } = data;
    // Agora 'prisma' deve estar definido
    return prisma.post.update({
      where: { id: Number(postId) },
      data: {
        title,
        content,
      },
       include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  }

  async delete(postId) {
    // Agora 'prisma' deve estar definido
    return prisma.post.delete({
      where: { id: Number(postId) },
    });
  }
}

module.exports = new PostRepository();