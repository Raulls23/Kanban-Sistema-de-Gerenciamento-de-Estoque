// src/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // O banco de dados real será salvo neste arquivo
  logging: false
});

module.exports = sequelize;