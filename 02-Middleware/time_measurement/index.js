import express from 'express';
const app = express();

app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const elapsed = Date.now() - start;
        console.log(`${req.method} ${req.url} – ${elapsed}ms`);
    });
    next();
});

app.get('/data', (req, res) => {
    setTimeout(() => res.send('Adat elküldve!'), 110); // Szimulál egy késleltetést
});

app.listen(3000, () => {
    console.log('Szerver fut http://localhost:3000 címen');
});// Middleware that logs the time taken for each request
