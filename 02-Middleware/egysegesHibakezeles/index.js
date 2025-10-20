import express from 'express';
const app = express();

app.get('/error', (req, res, next) => {
  const err = new Error('Valami baj történt a lekérdezésnél!');
  next(err);
});

app.post('/data', (req, res, next) => {
  const err = new Error('Hibás adatküldés!');
  next(err);
});

app.put('/update', (req, res, next) => {
  const err = new Error('Frissítési hiba!');
  next(err);
});

// Globális hiba-kezelő
app.use((err, req, res, next) => {
  console.error('Hiba:', err.message);
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log('Szerver fut a http://localhost:3000 címen');
});