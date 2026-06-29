// src/index.js
const express = require('express');
const maquinasRouter = require('./routes/maquinas'); // Importa o arquivo novo

const app = express();

app.use(express.json());

// Vincula as rotas sob o prefixo /maquinas
app.use('/maquinas', maquinasRouter);

app.listen(3000, () => {
  console.log(' Servidor de Gerenciamento de Estoque (Máquinas) rodando em http://localhost:3000');
});