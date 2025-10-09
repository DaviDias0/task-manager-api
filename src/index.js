require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const taskRoutes = require('./routes/task.routes');
const authRoutes = require('./routes/auth.routes');
const errorMiddleware = require('./middleware/error.middleware');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});