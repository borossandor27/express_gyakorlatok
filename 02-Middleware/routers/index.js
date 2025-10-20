import express from 'express';
import usersRouter from './usersRouter.js';
import productsRouter from './productsRouter.js';

const app = express();

app.use('/users', usersRouter);
app.use('/products', productsRouter);

// 404-es hibakezelő middleware
app.use((req, res, next) => {
    res.status(404).send('Az oldal nem található!');
});

// Hiba-kezelő middleware:
app.use((err, req, res, next) => {
    console.error('Hiba történt:', err.stack);
    res.status(500).send('Valami elromlott!');
});
const port = 3000;
app.listen(port, () => {
    console.log(`Szerver fut a http://localhost:${port} címen`);
});

// tesztelés:
// http://localhost:3000/ - Az oldal nem található!
// http://localhost:3000/users - Felhasználók listája
// http://localhost:3000/products - Termékek listája
// http://localhost:3000/unknown - Az oldal nem található!
