const express = require('express');
const connection = require('./db.js'); // Certifique-se de que este caminho está correto
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const e = require('express');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE firstName = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful!', id: results[0].id });
    } else {
      res.json({ success: false, message: 'Invalid credentials!' });
    }
  });
});

app.post('/adicionar-evento', (req, res) => {
  const { nomeDoEvento, dataDoEvento, cep, street, neighborhood, city, state, number, lat, lng, user } = req.body;

  const query = `
    INSERT INTO eventos (nomeDoEvento, dataDoEvento, cep, street, neighborhood, city, state, number,lat,lng,user)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)
  `;
  connection.query(query, [nomeDoEvento, dataDoEvento, cep, street, neighborhood, city, state, number, lat, lng, user], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar o evento:', err);
      return res.status(500).send('Erro ao adicionar o evento');
    }
    res.status(200).send('Evento adicionado com sucesso');
  });
});

app.get('/get-events', (req, res) => {
  const query = 'SELECT * FROM eventos';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar eventos:', err);
      res.status(500).json({ error: 'Erro ao buscar eventos' });
      return;
    }
    res.json(results);
  });

});

app.get('/get-events-user', (req, res) => {
  const { id } = req.query; // Recebe o nome do usuário via query string
  // Query SQL modificada para filtrar eventos por usuário
  const query = 'SELECT * FROM eventos WHERE user = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar eventos:', err);
      res.status(500).json({ error: 'Erro ao buscar eventos' });
      return;
    }
    res.json(results);
  });
});

app.post('/register', (req, res) => {
  const { firstName, lastName, dateOfBirth, email, gender, password, telephone } = req.body;
  if (dateOfBirth == null) { dateOfBirth = "" }
  const tipo = "admin"
  let uuid = uuidv4()
  const query = `
    INSERT INTO users (id,firstName, lastName, dateOfBirth, email, gender, password, telephone,tipo)
    VALUES (?,?,?,?,?,?,?,?,?)
  `;
  connection.query(query, [uuid, firstName, lastName, dateOfBirth, email, gender, password, telephone, tipo], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar o usuario:', err);
      return res.status(500).send('Erro ao adicionar o usuario');
    }
    res.status(200).send('200');
  });
});

app.get('/get-user', (req, res) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const { id } = req.query;
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuairo!!!');
      return;
    } else {
      res.json(results);
    }
  });

});

app.delete('/delete-event', (req, res) => {
  const { id } = req.query;
  const query = 'DELETE FROM eventos WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar evento!!!'+err);
      return;
    } else {
      res.json(results);
    }
  })
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
