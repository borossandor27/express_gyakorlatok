/*
Útvonal paraméterek kezelése
A gyökér visszaad egy olyan statikus html oldalt, amelyben választási lehetőséget ad a felhasználónak, 
hogy melyik évszakhoz tartozó oldalt szeretné megnyitni.
*/
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Statikus fájlok kiszolgálása
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/:evszak', (req, res) => {
    const { evszak } = req.params;
    const seasonPage = `${evszak}.html`;
    const seasonPath = path.join(__dirname, 'public', seasonPage);
    
    try {
        if (fs.existsSync(seasonPath)) {
            const seasonContent = fs.readFileSync(seasonPath, 'utf8');
            res.send(seasonContent);
        } else {
            res.status(404).send('Nincs ilyen évszak!');
        }
    } catch (error) {
        console.error('Hiba a fájl olvasása során:', error);
        res.status(500).send('Szerver hiba!');
    }
});

app.listen(port, () => {
    console.log(`Az alkalmazás elindult a http://localhost:${port} címen.`);
});

export default app;