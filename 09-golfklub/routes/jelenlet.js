const express = require('express');
const router = express.Router();

// Minden látogatás
router.get('/', (req, res) => {
  res.send('Minden látogatás');
});

// Adott ügyfél látogatásai
router.get('/:uazon', (req, res) => {
  res.send(`Adott ügyfél látogatásai: ${req.params.uazon}`);
});

// Ügyfél belépése
router.post('/:uazon', (req, res) => {
  res.send(`Ügyfél belépett: ${req.params.uazon}`);
});

// Ügyfél kilépése
router.patch('/:uazon', (req, res) => {
  res.send(`Ügyfél kilépett: ${req.params.uazon}`);
});

module.exports = router;
