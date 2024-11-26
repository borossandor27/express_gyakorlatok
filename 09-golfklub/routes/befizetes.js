const express = require('express');
const router = express.Router();

// Tagdíj befizetése
router.post('/', (req, res) => {
  res.send('Tagdíj befizetve');
});

// Befizetés módosítása
router.patch('/:uazon/:bido', (req, res) => {
  res.send(`Befizetés módosítva: ügyfél ${req.params.uazon}, befizetés azonosító: ${req.params.bido}`);
});

// Adott ügyfél befizetései
router.get('/:uazon', (req, res) => {
  res.send(`Adott ügyfél befizetései: ${req.params.uazon}`);
});

// Összes ügyfél befizetései
router.get('/ugyfelek', (req, res) => {
  res.send('Összes ügyfél befizetései');
});

module.exports = router;
