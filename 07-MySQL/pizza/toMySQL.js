/*
    új vevő hozzáadása:
    INSERT INTO `vevo`(`vazon`, `vnev`, `vcim`) VALUES (NULL,'[value-2]','[value-3]');
    vevő adatainak módosítása:
    UPDATE `vevo` SET `vnev`='[value-2]',`vcim`='[value-3]' WHERE `vazon`='[value-1]';
    vevő törlése:
    DELETE FROM `vevo` WHERE `vazon`='[value-1]';
*/
const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());
const port = 3000;

// MySQL kapcsolat létrehozása
const db = mysql.createConnection({
    host: 'localhost',   // Az adatbázis szerver címe
    user: 'root',
    password: '',
    database: 'pizza'
});
db.connect((err) => {
    if (err) {
        console.error('Hiba történt a MySQL kapcsolódás során: ', err);
        return;
    }
    console.log('Csatlakozás a MySQL adatbázishoz sikeres.');
});

//-- módosítások
app.post('/vevok', (req, res) => {
    console.log(req.body);
    const { vazon, vnev, vcim } = req.body; // A kérés törzséből kiolvassuk a vevő adatait
    const sql = `INSERT INTO vevo (vazon, vnev, vcim) VALUES (NULL, '${vnev}', '${vcim}')`; //-- csak akkor működik, ha a vazon mező AUTO_INCREMENT
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Hiba a lekérdezés során: ', err);
            res.status(500).json({ error: 'Adatbázis hiba' });
            return;
        }
        res.status(201).json({ message: 'A vevő hozzáadva.', vazon: result.insertId, vnev: result.vnev, vcim: result.vcim });
    });
});

app.put('/vevok/:vazon', (req, res) => {
    const { vnev, vcim } = req.body;
    const sql = `UPDATE vevo SET vnev = '${vnev}', vcim = '${vcim}' WHERE vazon = ${req.params.vazon}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Hiba a lekérdezés során: ', err);
            res.status(500).json({ error: 'Adatbázis hiba' });
            return;
        }
        res.status(201).json({ message: 'A vevő adatai módosítva.', vazon: result.vazon, vnev: result.vnev, vcim: result.vcim });
    });
});

app.delete('/vevok/:vazon', (req, res) => {
    const sql = `DELETE FROM vevo WHERE vazon = ${req.params.vazon}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Hiba a lekérdezés során: ', err);
            res.status(500).json({ error: 'Adatbázis hiba' });
            return;
        }
        res.status(201).json({ message: 'A vevő törölve.', vazon: req.params.vazon });
    });
});

app.listen(port, () => {
    console.log(`Az alkalmazás fut a http://localhost:${port} címen.`);
});