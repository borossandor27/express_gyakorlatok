import express from 'express';
import { query, insert, update, remove, transactional } from './db/db.js';

const app = express();
app.use(express.json({ extended: true }));

// --- SELECT példa ---
app.get('/users', async (req, res) => {
    try {
        const users = await query('SELECT * FROM users');
        res.json({success: true, data: users});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- INSERT példa ---
/*
a body-ban küldött JSON például:
{
    "name": "Kiss János",
    "email": "kiss.janos@example.com",
    "password": "jelszo123",
    "role_id": 3,
    "active": true
}
*/
app.post('/users', async (req, res) => {
    // itt ellenőrizheted a req.body tartalmát, pl. kötelező mezők megléte
    const { name, email, password, role_id, active } = req.body;
    if (!name || !email || !password || role_id === undefined || active === undefined) {
        return res.status(400).json({ error: 'Kötelező mezők hiányoznak' });
    }

    try {
        const result = await insert('users', req.body);
        res.json({success: true, message: 'Sikeres beszúrás', result });
    } catch (err) {
        console.error(err);
        throw new Error({message: "Új felhasználó létrehozása sikertelen!"});
    }
});

// --- Tranzakciós példa: Felhasználó és hozzá tartozó bejelentkezési adatok létrehozása ---
app.post('/register', async (req, res) => {
    const result = await createUserWithLogin(req.body);
    if (result.success) {
        res.status(201).json({ success: true, userId: result.userId });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});
// --- UPDATE példa ---
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await update('users', req.body, 'id = ?', [id]);
        res.json({success: true, message: 'Sikeres módosítás', result });
    } catch (err) {
        console.error(err);
        throw new Error({message: "Felhasználó módosítása sikertelen!"});
    }
});

// --- DELETE példa ---
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await remove('users', 'id = ?', [id]);
        res.json({success: true, message: 'Sikeres törlés', result });
    } catch (err) {
        console.error(err);
        throw new Error({message: "Felhasználó törlése sikertelen!"});
    }
});

// Egységes hiba kezelés és validáció hozzáadását javaslom a gyakorlatban!
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.message);
    res.status(500).json({ success: false, error: err.message });
});
// Szerver indítása
app.listen(3000, () => console.log('Server fut: http://localhost:3000'));
