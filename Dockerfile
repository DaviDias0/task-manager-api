FROM node:18-alpine

WORKDIR /usr/src/app

# Copia os arquivos de definição de pacotes
COPY package*.json .

# Instala as dependências (como o Prisma)
RUN npm install

# Copia o schema do Prisma para dentro da imagem
# Este passo é CRUCIAL para que o próximo funcione
COPY prisma/ ./prisma/

# Gera o cliente Prisma DENTRO da imagem Docker
# ESTA É A CORREÇÃO PRINCIPAL
RUN npx prisma generate

# Copia o resto do código fonte
COPY src/ ./src/

EXPOSE 3000

# O comando para iniciar a aplicação será dado pelo docker-compose.yml
CMD [ "node", "src/index.js" ]