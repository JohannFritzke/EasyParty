const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Campo de senha vazio se você não tiver configurado uma senha
  database: 'easyparty'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL server as id ' + connection.threadId);
});

module.exports = connection;
