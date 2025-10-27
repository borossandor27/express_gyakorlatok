import express from 'express';
const app = express();
const PORT = 3000;

// Middleware az URL-enkódolt adatok feldolgozására
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    console.log(req.body);
    res.send('Adatok fogadva!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});