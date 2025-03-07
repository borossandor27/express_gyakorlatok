import express from 'express';
import cors from 'cors';
import gyumolcsRouter from './routes/gyumolcs.js'; // Új router importálása
import keszletRouter from './routes/keszlet.js';
//import felhasznaloRouter from './routes/felhasznalo.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Fontos: JSON feldolgozás engedélyezése

// Routerek bekötése
app.use('/gyumolcsok', gyumolcsRouter);
app.use('/keszlet', keszletRouter);
//app.use('/felhasznalok', felhasznaloRouter);

// Szerver indítása
app.listen(port, () => {
    console.log(`Szerver fut: http://localhost:${port}`);
});
