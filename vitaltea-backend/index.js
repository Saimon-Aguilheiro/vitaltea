const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// SERVIR FRONT-END
app.use(express.static(path.join(__dirname, '../')));

// rota teste
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// rota produtos (melhor que usuarios)
app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro no banco' });
    }

    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});