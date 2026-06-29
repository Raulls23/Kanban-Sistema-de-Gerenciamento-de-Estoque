// src/models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;