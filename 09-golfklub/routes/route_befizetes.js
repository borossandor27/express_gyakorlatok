import express from 'express'; // Express könyvtár importálása
const router = express.Router();
import * as db from "../db.js"; // Az adatbázis kapcsolat kódjának betöltése

// Tagdíj befizetése
router.post('/', async(req, res) => {
  res.send('Tagdíj befizetve');
});

// Befizetés módosítása
router.patch('/:uazon/:bido', async(req, res) => {
  res.send(`Befizetés módosítva: ügyfél ${req.params.uazon}, befizetés azonosító: ${req.params.bido}`);
});

// Adott ügyfél befizetései
router.get('/:uazon', async(req, res) => {
  res.send(`Adott ügyfél befizetései: ${req.params.uazon}`);
});

// Összes ügyfél befizetései
router.get('/ugyfelek', async(req, res) => {
  res.send('Összes ügyfél befizetései');
});

export default router;
