// src/index.js
const express = require('express');
const maquinasRouter = require('./routes/maquinas');
const usuariosRouter = require('./routes/usuarios'); // 1. Importa rotas de usuários

const app = express();

app.use(express.json());

// Vincula os grupos de rotas
app.use('/maquinas', maquinasRouter);
app.use('/usuarios', usuariosRouter); // 2. Ativa o endpoint /usuarios/login

app.listen(3000, () => {
  console.log(' Servidor do Estoque rodando em http://localhost:3000');
});