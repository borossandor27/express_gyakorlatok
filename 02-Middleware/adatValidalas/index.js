import express from 'express';
const app = express();
app.use(express.json());

function adatValidalas(req, res, next) {
    const { name, age } = req.body;
    if (typeof name !== 'string' || typeof age !== 'number') {
        return res.status(400).json({ error: 'Invalid data format' });
    }
    next();
}


app.post('/data', adatValidalas, (req, res) => {
    res.status(200).json({ message: 'Data received successfully' });
});

app.listen(3000, () => {
    console.log('Szerver fut http://localhost:3000 címen');
});
