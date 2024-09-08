import pool from '../config/dbpostgresql.js';

  export const registrarPresenca = async (req, res) => {
    const presencas = req.body;
  
    const values = presencas.map(presenca => `(${presenca.membro_id}, ${presenca.reuniao_id}, '${presenca.data_reuniao}', ${presenca.presente})`).join(", ");
  
    try {
      await pool.query(`INSERT INTO presencas (membro_id, reuniao_id, data_reuniao, presente) VALUES ${values}`);
      res.status(201).json({ message: 'Presenças registradas com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  export const listarPresencas = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT p.membro_id, m.nome, m.cim, p.presente 
        FROM presencas p
        JOIN membro m ON p.membro_id = m.id
        `);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const listarMembros = async (req, res) => {
    try {
      const result = await pool.query('SELECT id, nome, cim FROM membro');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const listarReunioes = async (req, res) => {
    try {
      //const result = await pool.query('SELECT * FROM reunioes');
      const result = await pool.query('SELECT id, titulo, data, inicio, termino, descricao FROM reunioes');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Erro ao buscar reuniões:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  export const gerarRelatorio = async (req, res) => {
    const { periodo } = req.query;
    // lógica para gerar relatório baseado no período
    try {
      const result = await pool.query(''); 
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 




