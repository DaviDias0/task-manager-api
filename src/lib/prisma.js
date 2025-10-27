// src/lib/prisma.js (Exemplo)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma; // Exporta a instância