import express from 'express'; // Express könyvtár importálása
const router = express.Router();
import  connection  from '../db.js'; // Az adatbázis kapcsolat kódjának betöltése

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

export default router;
