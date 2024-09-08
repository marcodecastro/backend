/* import pool from '../config/dbpostgresql.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerMembro = async (req, res) => {
  const { nome, cim, data_nascimento, email, celular, senha } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newMembro = await pool.query(
      'INSERT INTO membro (nome, cim, data_nascimento, email, celular, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nome, cim, data_nascimento, email, celular, hashedPassword]
    );
    const token = jwt.sign({ id: newMembro.rows[0].id, cim: newMembro.rows[0].cim }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'Membro cadastrado com sucesso.', token });
  } catch (error) {
    console.error('Erro ao registrar membro:', error);
    res.status(500).json({ errors: [{ msg: 'Erro interno no servidor.', error: error.message }] });
  }
}; */




import pool from '../config/dbpostgresql.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerMembro = async (req, res) => {
  const { nome, cim, data_nascimento, email, celular, senha } = req.body;

  try {
    // Verificar se o email ou CIM já existem
    const existingUser = await pool.query('SELECT * FROM membro WHERE email = $1 OR cim = $2', [email, cim]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ errors: [{ msg: 'Email ou CIM já estão em uso.' }] });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const newMembro = await pool.query(
      'INSERT INTO membro (nome, cim, data_nascimento, email, celular, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nome, cim, data_nascimento, email, celular, hashedPassword]
    );

    const token = jwt.sign(
      { id: newMembro.rows[0].id, cim: newMembro.rows[0].cim },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Membro cadastrado com sucesso.', token });
  } catch (error) {
    console.error('Erro ao registrar membro:', error);
    res.status(500).json({ errors: [{ msg: 'Erro interno no servidor.', error: error.message }] });
  }
};

