FROM node:18-alpine

WORKDIR /usr/src/app

# Copia os arquivos de definição de pacotes
COPY package.json .
COPY package-lock.json .

# Instala as dependências (como o Express)
RUN npm install

# Copia o resto do código fonte
COPY src/ .

EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "node", "index.js" ]