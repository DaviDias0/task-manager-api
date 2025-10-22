// src/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Registra as rotas
app.use(authRoutes);
app.use(taskRoutes);

// Tratamento de Rota Não Encontrada (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});

// Tratamento Genérico de Erros (500)
app.use((err, req, res, next) => {
  console.error("ERRO NÃO TRATADO:", err.stack);
  res.status(500).json({ message: 'Erro interno no servidor.' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});