const express = require('express');
const connection = require('./db.js'); // Certifique-se de que este caminho está correto
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful!' });
    } else {
      res.json({ success: false, message: 'Invalid credentials!' });
    }
  });
});

app.post('/adicionar-evento', (req, res) => {
  const { nomeDoEvento, dataDoEvento, cep, street, neighborhood, city, state, number } = req.body;

  const query = `
    INSERT INTO events (nome_do_evento, data_do_evento, cep, street, neighborhood, city, state, number)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [nomeDoEvento, dataDoEvento, cep, street, neighborhood, city, state, number], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar o evento:', err);
      return res.status(500).send('Erro ao adicionar o evento');
    }
    res.status(200).send('Evento adicionado com sucesso');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
