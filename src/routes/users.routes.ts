import { Router } from 'express';

import { pool } from '../db';

const router = Router();

router.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.post('/users', async (req, res) => {
  try {
    const { id, name, email } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO users(id, name, email) VALUES($1, $2, $3) RETURNING *',
      [id, name, email]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query(
    'DELETE FROM users WHERE id=$1 RETURNING *',
    [id]
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: 'User not found' });
  }

  // res.send('User deleted');
  res.sendStatus(204);
});

router.put('/users/:id', async (req, res) => {
  const { id, name, email } = req.body;

  await pool.query('UPDATE users SET id=$1, name=$2, email=$3 WHERE id=$4', [
    id,
    name,
    email,
    req.params.id,
  ]);

  res.send(`Actualizando usuario ${req.params.id}`);
});

export default router;
