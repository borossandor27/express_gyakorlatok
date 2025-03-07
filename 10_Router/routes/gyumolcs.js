import express from 'express';
import pool from '../db/database.js';

const gyumolcsRouter = express.Router();

// Minden gyümölcs lekérése
gyumolcsRouter.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM gyumolcs');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Új gyümölcs hozzáadása
gyumolcsRouter.post('/', async (req, res) => {
    const { nev, megjegyzes } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO gyumolcs (nev, megjegyzes) VALUES (?, ?)', [nev, megjegyzes]);
        res.status(201).json({ message: 'Gyümölcs hozzáadva!', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Gyümölcs törlése ID alapján
gyumolcsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM gyumolcs WHERE id = ?', [id]);
        res.json({ message: 'Gyümölcs törölve!', affectedRows: result.affectedRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default gyumolcsRouter;
