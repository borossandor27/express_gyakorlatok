const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL kapcsolat létrehozása
const db = mysql.createConnection({
    host: 'localhost',   // Az adatbázis szerver címe
    user: 'root',        // MySQL felhasználó
    password: '',        // MySQL jelszó
    database: 'pizza'    // Az adatbázis neve
});

// Kapcsolat indítása
db.connect((err) => {
    if (err) {
        console.error('Hiba történt a MySQL kapcsolódás során: ', err);
        return;
    }
    console.log('Csatlakozás a MySQL adatbázishoz sikeres.');
});

// GET kérés, amely JSON formátumban küldi vissza a vevő adatokat
app.get('/vevok', (req, res) => {
    const sql = 'SELECT * FROM vevo'; // SQL lekérdezés
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Hiba a lekérdezés során: ', err);
            res.status(500).json({ error: 'Adatbázis hiba' });
            return;
        }
        res.json(results); // Az eredményt JSON formátumban küldjük vissza
    });
});

// Az alkalmazás elindítása
app.listen(port, () => {
    console.log(`Az alkalmazás fut a http://localhost:${port} címen.`);
});
