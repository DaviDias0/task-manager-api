// src/config/upload.js
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs'); // Módulo File System do Node

// Define o caminho absoluto para a pasta 'uploads' na raiz do projeto
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

// Garante que o diretório 'uploads' exista antes de tentar salvar algo
// Se não existir, ele será criado recursivamente
if (!fs.existsSync(uploadFolder)) {
  try {
    fs.mkdirSync(uploadFolder, { recursive: true });
    console.log(`Diretório ${uploadFolder} criado.`);
  } catch (err) {
    console.error(`Erro ao criar o diretório ${uploadFolder}:`, err);
    // Considerar lançar um erro ou parar a aplicação se o diretório for essencial
  }
}

module.exports = {
  // Diretório onde os arquivos serão salvos
  directory: uploadFolder,

  // Configuração de armazenamento (DiskStorage salva no disco)
  storage: multer.diskStorage({
    destination: uploadFolder, // Onde salvar
    filename(request, file, callback) {
      // Gera um hash aleatório para garantir nome único
      const fileHash = crypto.randomBytes(10).toString('hex');
      // Limpa espaços e caracteres especiais do nome original (boa prática)
      const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.]+/g, '-');
      const fileName = `${fileHash}-${sanitizedOriginalName}`;

      callback(null, fileName); // Retorna o nome final do arquivo
    },
  }),

  // Limites para o upload
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB (em bytes)
  },

  // Filtro para aceitar apenas certos tipos de arquivo (MIME types)
  fileFilter: (request, file, callback) => {
    const allowedMimes = [
      'image/jpeg', // jpg/jpeg
      'image/png',  // png
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true); // Aceita o arquivo
    } else {
      // Rejeita o arquivo com um erro específico
      callback(new Error('Tipo de arquivo inválido. Apenas JPG e PNG são permitidos.'));
    }
  },
};