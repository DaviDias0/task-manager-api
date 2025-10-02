FROM node:18-alpine

WORKDIR /usr/src/app

# Passo 1: Copia TODOS os arquivos primeiro (package.json, prisma/, src/, etc.)
COPY . .

# Passo 2: Roda o npm install DEPOIS que todos os arquivos já estão lá
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]