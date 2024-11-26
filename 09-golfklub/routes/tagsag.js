const express = require('express');
const router = express.Router();

// Tagsági szint módosítása
router.post('/:uazon/:tszint', (req, res) => {
  res.send(`Tagsági szint módosítva: ${req.params.uazon}, új szint: ${req.params.tszint}`);
});

// Tagság változásai
router.get('/:uazon', (req, res) => {
  res.send(`Tagság változásai: ${req.params.uazon}`);
});

module.exports = router;
