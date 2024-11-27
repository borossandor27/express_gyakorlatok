import express from 'express'; // Express könyvtár importálása
const router = express.Router();
import  connection  from '../db.js'; // Az adatbázis kapcsolat kódjának betöltése

// Tagsági szint módosítása
router.post('/:uazon/:tszint', async(req, res) => {
  res.send(`Tagsági szint módosítva: ${req.params.uazon}, új szint: ${req.params.tszint}`);
});

// Tagság változásai
router.get('/:uazon', async(req, res) => {
  res.send(`Tagság változásai: ${req.params.uazon}`);
});

export default router;
