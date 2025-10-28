import express from 'express';
const app = express();

// Beépített middleware a JSON feldolgozáshoz
app.use(express.json());

/* --------------------------------------------------
 1️⃣ KÉZZEL DOBOTT HIBA
-------------------------------------------------- */
app.get('/throw', (req, res) => {
    throw new Error('Kézzel dobott hiba történt!');
});

/* --------------------------------------------------
 2️⃣ next(err) HÍVÁSSAL ÁTADOTT HIBA
-------------------------------------------------- */
app.get('/next', (req, res, next) => {
    const authorized = false;
    if (!authorized) {
        return next(new Error('Hozzáférés megtagadva!'));
    }
    res.send('Sikeres hozzáférés');
});

/* --------------------------------------------------
 3️⃣ ASZINKRON HIBA (async/await)
-------------------------------------------------- */
app.get('/async', async (req, res, next) => {
    try {
        // Példa egy elromló aszinkron műveletre
        await new Promise((resolve, reject) => setTimeout(() => reject(new Error('Aszinkron hiba!')), 100));
        res.send('OK');
    } catch (err) {
        next(err); // továbbítjuk a hibát
    }
});

/* --------------------------------------------------
 4️⃣ EXPRESS ÁLTAL DOBOTT HIBA (rossz JSON)
-------------------------------------------------- */
app.post('/json', (req, res) => {
    res.send('JSON rendben!');
});

/* --------------------------------------------------
 HIBAKEZELŐ MIDDLEWARE (4 paraméter!)
-------------------------------------------------- */
app.use((err, req, res, next) => {
    console.error('💥 Hiba történt:', err.message);
    console.error(err.stack);

    // Ha a hiba SyntaxError (pl. JSON parsing hiba)
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Hibás JSON formátum!' });
    }

    // Általános hibaüzenet
    res.status(500).json({
        message: 'Szerverhiba!',
        hiba: err.message,
    });
});

/* --------------------------------------------------
 404-es útvonal (ha semmi sem egyezik)
-------------------------------------------------- */
app.use((req, res) => {
    res.status(404).json({ error: 'Az oldal nem található.' });
});

/* --------------------------------------------------
 Indítás
-------------------------------------------------- */
app.listen(3000, () => {
    console.log('🚀 Szerver fut a http://localhost:3000 címen');
});
