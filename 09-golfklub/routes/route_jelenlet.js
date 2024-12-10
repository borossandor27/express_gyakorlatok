import express from 'express'; // Express könyvtár importálása
const router = express.Router();
import * as db from "../db.js"; // Az adatbázis kapcsolat kódjának betöltése

// Minden látogatás
router.get('/', async(req, res) => {
  res.send('Minden látogatás');
});

// Adott ügyfél látogatásai
router.get('/:uazon', async(req, res) => {
  res.send(`Adott ügyfél látogatásai: ${req.params.uazon}`);
});

// Ügyfél belépése
router.post('/:uazon', async(req, res) => {
  res.send(`Ügyfél belépett: ${req.params.uazon}`);
});

// Ügyfél kilépése
router.patch('/:uazon', async(req, res) => {
  res.send(`Ügyfél kilépett: ${req.params.uazon}`);
});

export default router;
