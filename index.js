const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 SERVIR FRONT-END (corrigido)
app.use(express.static(path.join(__dirname)));

// rota produtos
app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro no banco' });
    }

    res.json(results);
  });
});

// 🔥 ROTA PRINCIPAL MOSTRANDO O HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 🔥 PORTA CORRETA PARA O RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});