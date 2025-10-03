const request = require('supertest');
const express = require('express');
const authRoutes = require('./src/routes/auth.routes');
const prisma = require('./src/database/prismaClient');

// Monta uma aplicação Express de teste apenas com as rotas de autenticação
const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

// Limpa o banco de dados de usuários antes de cada teste para garantir um ambiente limpo
beforeAll(async () => {
  // 1. Apaga primeiro as tarefas
  await prisma.task.deleteMany({});
  // 2. Depois apaga os usuários
  await prisma.user.deleteMany({});
});

// Agrupador para os testes de autenticação
describe('Testes das Rotas de Autenticação (/auth)', () => {
  
  // Dados do usuário que vamos usar para os testes
  const mockUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  };

  // Teste 1: Deve registrar um novo usuário com sucesso
  test('POST /auth/register - Deve registrar um novo usuário', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send(mockUser);

    // Esperamos que a resposta seja 201 (Created)
    expect(response.statusCode).toBe(201);
    // Esperamos que o email retornado seja o mesmo que enviamos
    expect(response.body.email).toBe(mockUser.email);
    // MUITO IMPORTANTE: Esperamos que a senha NÃO seja retornada
    expect(response.body.password).toBeUndefined();
  });

  // Teste 2: Deve impedir o registro de um usuário com e-mail duplicado
  test('POST /auth/register - Deve retornar erro ao tentar registrar com e-mail duplicado', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send(mockUser); // Tenta registrar o mesmo usuário de novo

    // Esperamos que a resposta seja 400 (Bad Request)
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('E-mail já cadastrado.');
  });

  // Teste 3: Deve falhar o login com senha incorreta
  test('POST /auth/login - Deve retornar erro com senha incorreta', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: mockUser.email,
        password: 'wrongpassword'
      });

    // Esperamos que a resposta seja 401 (Unauthorized)
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Senha inválida.');
  });

  // Teste 4: Deve autenticar o usuário com sucesso e retornar um token
  test('POST /auth/login - Deve autenticar com sucesso e retornar um token', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: mockUser.email,
        password: mockUser.password
      });

    // Esperamos que a resposta seja 200 (OK)
    expect(response.statusCode).toBe(200);
    // Esperamos que a resposta tenha uma propriedade 'token'
    expect(response.body).toHaveProperty('token');
  });
});