const express = require('express');
const connection = require('./db.js'); // Certifique-se de que este caminho está correto
const bodyParser = require('body-parser');

const app = express();
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
