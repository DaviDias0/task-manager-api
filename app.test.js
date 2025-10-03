// app.test.js
const request = require('supertest');
const express = require('express');

// Precisamos montar uma versão "mock" do nosso app para testar
const app = express();
const taskRoutes = require('./src/routes/task.routes');
const authRoutes = require('./src/routes/auth.routes');

app.use(express.json());

// Adicionando as rotas ao nosso app de teste
app.get('/', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);


// --- Início dos Testes ---

describe('Testes da Rota Raiz (Health Check)', () => {

  test('Deve responder com status 200 na rota GET /', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('Deve responder com um JSON contendo { status: "API is running" }', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual({ status: 'API is running' });
  });

});