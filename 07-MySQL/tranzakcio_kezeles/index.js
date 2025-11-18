import express from 'express';
import pool, {atutalas} from './db.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.post('/atutalas', async (req, res) => {
    const { forrasId, celId, osszeg } = req.body;
    try {
        await atutalas(pool, forrasId, celId, osszeg);
        res.status(200).send('Átutalás sikeres.');
    } catch (error) {
        res.status(400).send(`Átutalás sikertelen: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});