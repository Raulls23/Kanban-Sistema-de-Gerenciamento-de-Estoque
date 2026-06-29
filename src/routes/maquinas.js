// src/routes/maquinas.js
const express = require('express');
const router = express.Router();
const Maquina = require('../models/Maquina'); // Importa o modelo real

// GET /maquinas -> Lista todas do banco PostgreSQL e valida estoque crítico
router.get('/', async (req, res) => {
  try {
    const maquinas = await Maquina.findAll();
    const maquinasComStatus = maquinas.map(m => {
      const data = m.toJSON();
      return {
        ...data,
        status: data.quantidade <= data.estoqueMinimo ? "ALERTA: Estoque Crítico!" : "Estoque Disponível"
      };
    });
    res.json(maquinasComStatus);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar dados no banco PostgreSQL' });
  }
});

// GET /maquinas/:id -> Busca detalhada por ID real
router.get('/:id', async (req, res) => {
  try {
    const maquina = await Maquina.findByPk(req.params.id);
    if (!maquina) return res.status(404).json({ erro: 'Máquina não encontrada' });
    res.json(maquina);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar máquina' });
  }
});

// POST /maquinas -> Salva uma nova máquina e valida a RN03
router.post('/', async (req, res) => {
  try {
    const { codigoUnico, nome, quantidade, estoqueMinimo } = req.body;

    if (!codigoUnico || !nome || quantidade === undefined || !estoqueMinimo) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    // RN03 — Bloqueia código único duplicado direto no banco
    const codigoJaExiste = await Maquina.findOne({ where: { codigoUnico } });
    if (codigoJaExiste) {
      return res.status(400).json({ erro: `RN03 violada: O código ${codigoUnico} já existe.` });
    }

    const novaMaquina = await Maquina.create({ codigoUnico, nome, quantidade, estoqueMinimo });
    res.status(201).json(novaMaquina);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao salvar máquina no PostgreSQL' });
  }
});

module.exports = router;