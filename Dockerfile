FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000

CMD npx prisma migrate deploy && npm start