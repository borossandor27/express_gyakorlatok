const express = require('express');
const router = express.Router();

// Ügyfél létrehozása
router.post('/register', (req, res) => {
  res.send('Új ügyfél létrehozva');
});

// Ügyfél belépése
router.post('/login', (req, res) => {
  res.send('Ügyfél belépett');
});

// Ügyfelek listája
router.get('/', (req, res) => {
  res.send('Ügyfelek listája');
});

// Ügyfél módosítása
router.put('/:uazon', (req, res) => {
  res.send(`Ügyfél módosítva: ${req.params.uazon}`);
});

// Ügyfél törlése
router.delete('/:uazon', (req, res) => {
  res.send(`Ügyfél törölve: ${req.params.uazon}`);
});

module.exports = router;
