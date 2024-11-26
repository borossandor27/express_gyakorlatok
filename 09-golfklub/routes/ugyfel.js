const express = require('express');
const { connection} = require('../index');
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
    sql="SELECT * FROM `ugyfelek`";
    rows = [];
    async function fetchData() {
        
        const [rows] = await connection.query(sql);
        console.log(rows);
      }
      fetchData();
res.status(201).json(rows);
  
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
