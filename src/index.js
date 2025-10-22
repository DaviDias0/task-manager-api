// src/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Logger
const authRoutes = require('./routes/auth.routes'); // Auth and Admin routes
const taskRoutes = require('./routes/task.routes'); // Task routes

const app = express();
const port = process.env.PORT || 3000;

// --- Middlewares Essenciais (Ordem CRÍTICA!) ---
app.use(cors()); // 1. CORS deve vir primeiro ou logo no início
app.use(express.json()); // 2. ESSENCIAL para ler req.body (PRECISA vir ANTES das rotas que usam req.body)
app.use(morgan('dev')); // 3. Logger (ótimo para depuração)

// --- Rotas ---
// 4. Registra as rotas de autenticação e admin
app.use(authRoutes);
// 5. Registra as rotas de tarefas
app.use(taskRoutes);

// --- Tratamento de Erro (Deve vir POR ÚLTIMO) ---
app.use((req, res, next) => {
  res.status(404).json({ message: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
});
app.use((err, req, res, next) => {
  console.error("ERRO NÃO TRATADO:", err.stack);
  res.status(500).json({ message: 'Erro interno no servidor.' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});