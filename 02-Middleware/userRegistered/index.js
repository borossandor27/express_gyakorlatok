import express from 'express';
const app = express();

function requireApiKey(req, res, next) {
  const apiKey = req.header('x-api-key');
  if (apiKey === 'titkos123') {
    next();
  } else {
    res.status(401).json({ error: 'Érvénytelen API kulcs' });
  }
}

app.post('/register', requireApiKey, (req, res) => {
  const { username, password } = req.body;
  // Regisztrációs logika itt
  res.status(201).json({ message: 'Felhasználó sikeresen regisztrálva' });
});

app.listen(3000, () => {
  console.log('Szerver fut http://localhost:3000 címen');
});
