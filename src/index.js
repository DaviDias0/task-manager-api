const express = require('express');
const app = express();
const taskRoutes = require('./routes/task.routes');

const PORT = 3000;

// Para usar o Express, precisamos adicioná-lo ao projeto
// Vamos fazer isso no próximo passo.

app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});