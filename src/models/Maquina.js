// src/models/Maquina.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Maquina = sequelize.define('Maquina', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codigoUnico: { type: DataTypes.STRING, allowNull: false, unique: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  estoqueMinimo: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'maquinas',
  timestamps: false
});

module.exports = Maquina;