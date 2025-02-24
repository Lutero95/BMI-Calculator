const express = require('express');
const pool = require('./database.js');
const router = express.Router();

/**
 * Calcular a classificação do IMC.
 */
function calcularClassificacao(imc) {
    if (imc < 18.5) return 'abaixo do peso';
    if (imc < 24.9) return 'peso normal';
    if (imc < 29.9) return 'sobrepeso';
    return 'obesidade';
}

// Rota para calcular e salvar o IMC
router.post('/imc', async (req, res) => {
    const { nome, altura, peso } = req.body;

    // Validar os dados recebidos
    if (!nome || !altura || !peso || altura <= 0 || peso <= 0) {
        return res.status(400).json({ error: 'Dados inválidos. Verifique nome, altura e peso.' });
    }

    try {
        // Calcular IMC e classificação
        const imc = (peso / (altura * altura)).toFixed(2);
        const classificacao = calcularClassificacao(imc);

        // Salvar no banco de dados
        const [result] = await pool.query(
            'INSERT INTO imc_results (nome, altura, peso, imc, classificacao) VALUES (?, ?, ?, ?, ?)',
            [nome, altura, peso, imc, classificacao]
        );

        // Responder ao cliente
        res.status(201).json({
            id: result.insertId,
            nome,
            altura,
            peso,
            imc: parseFloat(imc),
            classificacao,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para listar todos os resultados de IMC
router.get('/imc', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM imc_results ORDER BY data_hora DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para buscar um resultado específico por ID
router.get('/imc/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM imc_results WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/imc/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, altura, peso } = req.body;

    // Validar os dados recebidos
    if (!nome || !altura || !peso || altura <= 0 || peso <= 0) {
        return res.status(400).json({ error: 'Dados inválidos. Verifique nome, altura e peso.' });
    }

    try {
        // Calcular IMC e classificação
        const imc = (peso / (altura * altura)).toFixed(2);
        const classificacao = calcularClassificacao(imc);

        // Alterar o IMC
        const [result] = await pool.query(
            'UPDATE imc_results SET nome = ?, altura = ?, peso = ?, imc = ?, classificacao = ? WHERE id = ?',
            [nome, altura, peso, imc, classificacao, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Registro não encontrado para o ID informado.' });
        }

        res.status(200).json({ message: 'Registro atualizado com sucesso.' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/imcDelete/:id', async (req, res) => {
    const { id } = req.params;

    try {

        // Deletar IMC
        const [result] = await pool.query(
            'DELETE FROM imc_results WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Registro não encontrado para o ID informado.' });
        }

        res.status(200).json({ message: 'Registro deletado com sucesso.' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;