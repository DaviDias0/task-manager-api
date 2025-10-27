// src/services/auth.service.js (VERSÃO CORRIGIDA)

const prisma = require('../lib/prisma'); // Confirme se o caminho para o prismaClient está correto
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Role } = require('@prisma/client');
const path = require('path'); // Necessário para caminhos de arquivo
const fs = require('fs').promises; // Necessário para deletar arquivo

class AuthService {
  async register(userData) {
    const { name, email, password } = userData;
    console.log(`AuthService: register - Verificando se email ${email} já existe.`);
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log(`AuthService: register - Email ${email} já existe.`);
      throw new Error('Este e-mail já está em uso.');
    }
    console.log(`AuthService: register - Email ${email} disponível. Gerando hash da senha.`);
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(`AuthService: register - Hash gerado. Criando usuário no banco.`);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }, // Role padrão USER é definido no schema.prisma
    });
    console.log(`AuthService: register - Usuário ${user.id} criado. Removendo senha do retorno.`);
    delete user.password;
    return user;
  }

  async login(credentials) {
    const { email, password } = credentials;
    console.log(`AuthService: Buscando usuário com email: ${email}`);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('AuthService: Usuário não encontrado.');
      throw new Error('Credenciais inválidas.');
    }
    console.log(`AuthService: Usuário ${user.id} encontrado. Comparando senha...`);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`AuthService: Senha inválida para usuário ${user.id}.`);
      throw new Error('Credenciais inválidas.');
    }
    console.log(`AuthService: Senha válida para usuário ${user.id}. Gerando token...`);
    const tokenPayload = { id: user.id, email: user.email, role: user.role }; // Inclui a role no payload
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('AuthService: ERRO FATAL - JWT_SECRET não definido no .env!');
      throw new Error('Erro interno do servidor na configuração de autenticação.');
    }
    console.log(`AuthService: Assinando token para usuário ${user.id} com role ${user.role}`);
    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '1d' }); // Expira em 1 dia
    console.log('AuthService: Token gerado com sucesso.');
    return { token };
  }

  async getProfile(userId) {
    console.log(`Service: getProfile - Buscando usuário com ID: ${userId}`);
    try {
      // Garante que userId seja um número
      const id = Number(userId);
      if (isNaN(id)) {
        throw new Error('ID de usuário inválido.');
      }
      const user = await prisma.user.findUnique({ where: { id: id } });
      console.log(`Service: getProfile - Prisma retornou:`, user ? `Usuário ID ${user.id}` : 'null');
      if (!user) {
        console.log(`Service: getProfile - Usuário ID ${id} não encontrado.`);
        throw new Error('Usuário não encontrado.');
      }
      delete user.password; // Remove a senha
      console.log(`Service: getProfile - Retornando perfil para usuário ID ${id}.`);
      return user;
    } catch (error) {
       console.error(`Service: getProfile - Erro:`, error);
       // Re-throw o erro para o controller tratar (ex: mandar 404 se não encontrado)
       throw error;
    }
  }

  // --- MÉTODO updateProfilePicture (ADICIONADO AQUI DENTRO DA CLASSE) ---
  async updateProfilePicture(userId, filename) {
    console.log(`Service: updateProfilePicture - Iniciando para UserID: ${userId}, Filename: ${filename}`);
    const id = Number(userId);
    if (isNaN(id)) { throw new Error('ID de usuário inválido.'); }

    try {
       // 1. Encontre o usuário atual para pegar a URL da imagem antiga
       const currentUser = await prisma.user.findUnique({
         where: { id: id },
         select: { profileImageUrl: true }
       });

       if (!currentUser) {
         console.log(`Service: updateProfilePicture - Usuário ${id} não encontrado.`);
         throw new Error('Usuário não encontrado para atualizar foto.');
       }
       console.log(`Service: updateProfilePicture - Usuário ${id} encontrado. Imagem antiga: ${currentUser.profileImageUrl}`);

       // 2. Construa o caminho relativo da nova imagem (como será salvo no BD e acessado via URL)
       const newImageUrl = `/uploads/${filename}`;

       // 3. Atualize o usuário no BD
       console.log(`Service: updateProfilePicture - Atualizando usuário ${id} com nova URL: ${newImageUrl}`);
       const updatedUser = await prisma.user.update({
         where: { id: id },
         data: {
           profileImageUrl: newImageUrl,
         },
       });
       console.log(`Service: updateProfilePicture - Usuário ${id} atualizado no BD.`);

       // 4. Se havia uma imagem antiga, tente deletá-la do disco
       if (currentUser.profileImageUrl && currentUser.profileImageUrl !== newImageUrl) {
         try {
           const oldImageFilename = path.basename(currentUser.profileImageUrl); // Ex: hash-nome.png
           // __dirname aponta para src/services, precisamos voltar dois níveis para a raiz
           const oldImagePath = path.resolve(__dirname, '..', '..', 'uploads', oldImageFilename);
           console.log(`Service: updateProfilePicture - Tentando deletar imagem antiga em: ${oldImagePath}`);
           await fs.unlink(oldImagePath);
           console.log(`Service: updateProfilePicture - Imagem antiga ${oldImageFilename} deletada.`);
         } catch (unlinkError) {
           // Ignora erros comuns como "arquivo não encontrado" mas loga outros
           if (unlinkError.code !== 'ENOENT') {
              console.warn(`Service: updateProfilePicture - Aviso: Falha ao deletar imagem antiga ${currentUser.profileImageUrl}:`, unlinkError.message);
           } else {
              console.log(`Service: updateProfilePicture - Imagem antiga ${currentUser.profileImageUrl} não encontrada no disco para deletar.`);
           }
         }
       }

       console.log(`Service: updateProfilePicture - Retornando usuário atualizado para UserID: ${id}`);
       delete updatedUser.password; // Garante que a senha não retorne
       return updatedUser;

    } catch (error) {
       console.error(`Service: updateProfilePicture - Erro ao atualizar foto para UserID: ${id}:`, error);
       // Propaga erros específicos ou lança um genérico
       if (error.message.includes('Usuário não encontrado')) {
           const serviceError = new Error('Usuário não encontrado.');
           serviceError.status = 404;
           throw serviceError;
       }
       throw new Error('Erro no banco de dados ao atualizar foto de perfil.');
    }
  }
  // --- FIM DO MÉTODO ADICIONADO ---


  async getAllUsers() {
    console.log('Service: getAllUsers - Buscando todos os usuários.');
    try {
      const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
      console.log(`Service: getAllUsers - Prisma retornou ${users.length} usuários.`);
      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      console.log('Service: getAllUsers - Retornando lista sem senhas.');
      return usersWithoutPasswords;
    } catch (error) {
       console.error(`Service: getAllUsers - Erro:`, error);
       throw error;
    }
  }

  async deleteUser(userIdToDelete) {
    console.log(`Service: deleteUser - Iniciando para ID: ${userIdToDelete}`);
    const id = Number(userIdToDelete);
    if (isNaN(id)) { console.error(`Service: deleteUser - ID inválido: ${userIdToDelete}`); throw new Error('ID de usuário inválido.'); }

    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) { console.log(`Service: deleteUser - Usuário ID ${id} não encontrado.`); throw new Error('Usuário não encontrado.'); }

    if (user.role === 'ADMIN') {
      console.warn(`Service: deleteUser - Tentativa de deletar ADMIN ID ${id} bloqueada.`);
      throw new Error('Não é possível deletar um administrador.');
    }

    // Verificar se o usuário tem tarefas associadas ANTES de tentar deletar
    const taskCount = await prisma.task.count({ where: { userId: id } });
    if (taskCount > 0) {
      console.warn(`Service: deleteUser - Tentativa de deletar usuário ID ${id} com ${taskCount} tarefas bloqueada.`);
      throw new Error('Não é possível deletar o usuário pois ele possui tarefas associadas.');
    }

    try {
      console.log(`Service: deleteUser - Tentando deletar usuário (não-admin, sem tarefas) ID ${id}`);
      await prisma.user.delete({ where: { id: id } });
      console.log(`Service: deleteUser - Usuário ID ${id} deletado com sucesso.`);
      return { message: 'Usuário deletado com sucesso.' };
    } catch (error) {
      // Captura outros erros inesperados do Prisma
      console.error(`Service: deleteUser - Erro inesperado ao deletar usuário ID ${id}:`, error);
      throw error;
    }
  }

  async updateUserRole(userIdToUpdate, newRole) {
    console.log(`Service: updateUserRole - Iniciando para ID: ${userIdToUpdate}, Novo Role: ${newRole}`);
    const id = Number(userIdToUpdate);
    if (isNaN(id)) { console.error(`Service: updateUserRole - ID inválido: ${userIdToUpdate}`); throw new Error('ID de usuário inválido.'); }
    if (!Object.values(Role).includes(newRole)) { console.error(`Service: updateUserRole - Role inválido: ${newRole}`); throw new Error('Cargo inválido especificado.'); }

    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) { console.log(`Service: updateUserRole - Usuário ID ${id} não encontrado.`); throw new Error('Usuário não encontrado.'); }

    // Opcional: Impedir rebaixar o último admin? (requereria mais lógica)

    try {
      console.log(`Service: updateUserRole - Atualizando role do usuário ID ${id} para ${newRole}`);
      const updatedUser = await prisma.user.update({ where: { id: id }, data: { role: newRole } });
      delete updatedUser.password;
      console.log(`Service: updateUserRole - Role atualizado com sucesso para ID ${id}`);
      return updatedUser;
    } catch(error) {
      console.error(`Service: updateUserRole - Erro ao atualizar role para ID ${id}:`, error);
      throw error;
    }
  }
} // Fim da classe AuthService

// Exporta uma instância da classe
module.exports = new AuthService();