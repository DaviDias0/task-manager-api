// src/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Usando as rotas
app.use(authRoutes);
app.use(taskRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});