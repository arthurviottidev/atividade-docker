const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
});

async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

app.get('/', (req, res) => {
  res.send('Hello from Docker!');
});

app.get('/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar as mensagens' });
  }
});

app.post('/messages', async (req, res) => {
  const { content } = req.body || {};

  if (!content) {
    return res.status(400).json({ error: 'O campo content é obrigatório' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO messages (content) VALUES ($1) RETURNING *',
      [content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar a mensagem' });
  }
});

createTable()
  .then(() => {
    app.listen(3000, () => console.log('API rodando na porta 3000'));
  })
  .catch((err) => {
    console.error('Não foi possível conectar no banco', err);
    process.exit(1);
  });
