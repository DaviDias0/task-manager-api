// src/index.js (ATUALIZADO com rotas de posts)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const postRoutes = require('./routes/post.routes'); // <-- 1. Importa as novas rotas

const app = express();
const port = process.env.PORT || 3000;

// --- Middlewares Essenciais ---
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// --- Rotas ---
app.use('/auth', authRoutes);  // Rotas Auth em /auth
app.use('/tasks', taskRoutes); // Rotas Tasks em /tasks
app.use('/posts', postRoutes); // <-- 2. Registra as rotas de Posts com prefixo /posts

// --- Servir Arquivos Estáticos (Uploads) ---
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// --- Tratamento de Erro (Deve vir POR ÚLTIMO) ---
// Rota 404 genérica
app.use((req, res, next) => {
  res.status(404).json({ message: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
});

// Error Handler Global
app.use((err, req, res, next) => {
  console.error("ERRO NÃO TRATADO:", err);

  if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Erro no upload: ${err.message}` });
  } else if (err.message.includes('Invalid file type')) {
       return res.status(400).json({ message: err.message });
  } else if (err.status) { // Usa o status definido no Service (400, 403, 404)
       return res.status(err.status).json({ message: err.message });
  }

  // Erro genérico 500
  res.status(500).json({ message: 'Erro interno no servidor.' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});