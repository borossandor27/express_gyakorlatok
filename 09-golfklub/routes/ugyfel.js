import express from "express"; // Express könyvtár importálása
const router = express.Router();
import connection from "../db.js"; // Az adatbázis kapcsolat kódjának betöltése

// Ügyfél létrehozása
router.post("/register", async(req, res) => {
  res.send("Új ügyfél létrehozva");
});

// Ügyfél belépése
router.post("/login", async(req, res) => {
  res.send("Ügyfél belépett");
});

// Ügyfelek listája
router.get("/", async (req, res) => {
  let sql = "SELECT * FROM `ugyfelek`";
  
  try {
    const [rows] = await connection.query(sql);
    console.log(rows);
    res.status(201).json(rows); // Válasz küldése az adatbázis válaszával
  } catch (err) {
    console.error(err); // Hibakezelés
    res.status(500).send("Hiba az adatbázis lekérdezés közben");
  }
});

// Ügyfél módosítása
router.put("/:uazon", async(req, res) => {
  res.send(`Ügyfél módosítva: ${req.params.uazon}`);
});

// Ügyfél törlése
router.delete("/:uazon", async(req, res) => {
  res.send(`Ügyfél törölve: ${req.params.uazon}`);
});

export default router;
