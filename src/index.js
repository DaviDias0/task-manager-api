const express = require('express');
const cors = require('cors');
const app = express();
const taskRoutes = require('./routes/task.routes');

// Middlewares
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Rotas
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});