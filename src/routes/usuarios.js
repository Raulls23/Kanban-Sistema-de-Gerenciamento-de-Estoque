// src/routes/usuarios.js
const express = require('express');
const router = express.Router();

// Usuário padrão em memória para teste do sistema
const usuariosCadastrados = [
  { email: 'gerente@estoque.com', senha: '123' }
];

// POST /usuarios/login -> RF01: Login de Usuários
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
  }

  // Busca o usuário correspondente
  const usuario = usuariosCadastrados.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ erro: 'Credenciais inválidas. Verifique email e senha.' });
  }

  // Resposta de sucesso
  res.json({ 
    mensagem: 'Login efetuado com sucesso!', 
    usuario: { email: usuario.email, perfil: 'Gerente' } 
  });
});

module.exports = router;