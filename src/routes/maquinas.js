// src/routes/maquinas.js
const express = require('express');
const router = express.Router();

// Dados temporários em memória simulando o estoque/cadastro de máquinas (RF02)
const inventarioMaquinas = [
  { id: 1, codigoUnico: 'MAQ-001', nome: 'Furadeira de Bancada', quantidade: 3, estoqueMinimo: 2 },
  { id: 2, codigoUnico: 'MAQ-002', nome: 'Torno Mecânico', quantidade: 1, estoqueMinimo: 2 },
];

// GET /maquinas -> Lista todas as máquinas cadastradas e valida estoque mínimo
router.get('/', (req, res) => {
  const maquinasComStatus = inventarioMaquinas.map(m => ({
    ...m,
    status: m.quantidade <= m.estoqueMinimo ? "ALERTA: Estoque Crítico!" : "Estoque Disponível"
  }));
  res.json(maquinasComStatus);
});

// GET /maquinas/:id -> Busca uma máquina específica pelo ID/Código Único
router.get('/:id', (req, res) => {
  const maquina = inventarioMaquinas.find(m => m.id === Number(req.params.id));
  if (!maquina) {
    return res.status(404).json({ erro: 'Máquina não encontrada no sistema' });
  }
  res.json(maquina);
});

// POST /maquinas -> RF02: Cadastro de Máquinas / RN03: Validação do Código Único
router.post('/', (req, res) => {
  const { codigoUnico, nome, quantidade, estoqueMinimo } = req.body;

  // Validação básica de campos obrigatórios
  if (!codigoUnico || !nome || quantidade === undefined || !estoqueMinimo) {
    return res.status(400).json({ erro: 'codigoUnico, nome, quantidade e estoqueMinimo são obrigatórios.' });
  }

  // RN03 — Garante que o código de identificação da máquina é único
  const codigoJaExiste = inventarioMaquinas.some(m => m.codigoUnico === codigoUnico);
  if (codigoJaExiste) {
    return res.status(400).json({ erro: `RN03 violada: Já existe uma máquina cadastrada com o código ${codigoUnico}.` });
  }

  const novaMaquina = {
    id: inventarioMaquinas.length + 1,
    codigoUnico,
    nome,
    quantidade: Number(quantidade),
    estoqueMinimo: Number(estoqueMinimo)
  };

  inventarioMaquinas.push(novaMaquina);
  res.status(201).json(novaMaquina);
});

module.exports = router;