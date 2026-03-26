const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json()) // para receber JSON no corpo das requisições

// Configuração da conexão com o banco MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'SaImOn.agu1lheiro',
  database: 'vitaltea'
})

// Teste de rota simples
app.get('/', (req, res) => {
  res.send('Servidor rodando!')
})

// Rota para buscar produtos no banco
app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if(err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})

// Rota para listar produtos
app.get("/produtos", (req, res) => {
    const sql = "SELECT * FROM produtos";

    db.query(sql, (err, results) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar produtos" });
        }
        res.json(results); // envia os produtos como JSON
    });
});
