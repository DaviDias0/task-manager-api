const express = require('express');
const cors = require('cors');
const app = express();
const taskRoutes = require('./routes/task.routes');
const authRoutes = require('./routes/auth.routes');

app.use(cors());
app.use(express.json());

// Rotas PÚBLICAS de autenticação
app.use('/auth', authRoutes);

// Rotas PRIVADAS de tarefas
app.use('/tasks', taskRoutes);

app.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000`);
});