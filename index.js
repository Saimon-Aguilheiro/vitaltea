const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// SERVIR FRONT-END
app.use(express.static(path.join(__dirname)));

// ROTA PRODUTOS (CORRIGIDA PARA POSTGRES)
app.get('/produtos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM produtos');
    res.json(result.rows);
  } catch (error) {
    console.error("ERRO REAL:", error);
    res.status(500).json({ erro: 'Erro no banco' });
  }
});

// ROTA PRINCIPAL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// PORTA DO RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});