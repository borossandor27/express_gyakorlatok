import express from 'express';
import pool from '../db/database.js';

const keszletRouter = express.Router();

// Készlet lekérése
keszletRouter.get('/', async (req, res) => {
    console.log(`Készlet lekérése a ${req.originalUrl} útvonalon`);
    try {
        const [rows] = await pool.query('SELECT * FROM keszlet');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Új készlet elem hozzáadása
keszletRouter.post('/', async (req, res) => {
    const { nev, mennyiseg } = req.body;
    try {
        const [result] = await pool.execute('INSERT INTO keszlet (nev, mennyiseg) VALUES (?, ?)', [nev, mennyiseg]);
        res.status(201).json({ message: 'Új készlet hozzáadva!', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default keszletRouter;
