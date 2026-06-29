// src/index.js
const express = require('express');
const sequelize = require('./config/database'); // Conexão com o banco
const maquinasRouter = require('./routes/maquinas');
const usuariosRouter = require('./routes/usuarios');

const app = express();
app.use(express.json());

app.use('/maquinas', maquinasRouter);
app.use('/usuarios', usuariosRouter);

// Sincroniza os modelos com o banco PostgreSQL antes de ligar o servidor
sequelize.sync({ force: false }) // 'force: false' evita apagar os dados existentes
  .then(() => {
    console.log('✅ Tabelas sincronizadas com o banco PostgreSQL com sucesso!');
    app.listen(3000, () => {
      console.log('📦 Servidor rodando com persistência real em http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao PostgreSQL:', err);
  });