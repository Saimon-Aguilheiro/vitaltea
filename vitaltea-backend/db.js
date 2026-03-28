const mysql = require('mysql2');

// cria a conexão
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'SaImOn.agu1lheiro', // coloca sua senha aqui
  database: 'vitaltea'
});

// conecta ao banco
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL 🚀');
});

module.exports = connection;