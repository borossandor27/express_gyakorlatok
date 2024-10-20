/*
Útvonal paraméterek kezelése
A gyökér visszaad egy olyan statikus html oldalt, amelyben választási lehetőséget ad a felhasználónak, 
hogy melyik évszakhoz tartozó oldalt szeretné megnyitni.
*/
const express = require('express');
const app = express();
const path = require('path'); //-- Ha platformfüggetlen útvonalak kezelésére van szükség

const fs = require('fs'); //-- Fájlok kezelése a fájlrendszerben, például olvasás, írás, törlés, fájlok létezésének ellenőrzése.
const { createServer } = require('http'); //-- http modul importálása
const server = createServer(app); //-- express alkalmazás létrehozása
const port = 3000; //-- port szám beállítása

let season = ''; //-- évszak változó deklarálása
let seasonPage = ''; //-- évszakhoz tartozó oldal változó deklarálása
let seasonPath = 'public'; //-- évszakhoz tartozó elérési útvonal változó deklarálása
let seasonContent = ''; //-- évszakhoz tartozó oldal tartalom változó deklarálása
app.use(express.static('public')); //-- statikus fájlok elérési útvonalának beállítása

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.get('/:evszak', (req, res) => {
    season = req.params.evszak;
    seasonPage = season + '.html';
    seasonPath = path.join(__dirname, 'public', seasonPage);
    if (fs.existsSync(seasonPath)) {
        seasonContent = fs.readFileSync(seasonPath, 'utf8');
        res.send(seasonContent);
    } else {
        res.send('Nincs ilyen évszak!');
    }
});
app.listen(port, () => {
    console.log(`Az alkalmazás elindult a http://localhost:${port} címen.`);
});
