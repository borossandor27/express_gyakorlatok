import express from "express"; // Express könyvtár importálása
const router = express.Router();

// Ügyfél létrehozása
router.post("/register", async (req, res) => {
  res.send("Új ügyfél létrehozva");
});

// Ügyfél belépése
router.post("/login", async (req, res) => {
  res.send("Ügyfél belépett");
});

// Ügyfelek listája
router.get("/", async (req, res) => {
  let result = await db.getUgyfelek();
  if (result.success) {
    res.status(201).json(result.data);
  } else {
    res.status(500).json(result.error);
  }
});

// Ügyfél módosítása
router.put("/:uazon", async (req, res) => {
  res.send(`Ügyfél módosítva: ${req.params.uazon}`);
});

// Ügyfél törlése
router.delete("/:uazon", async (req, res) => {
  res.send(`Ügyfél törölve: ${req.params.uazon}`);
});

export default router;
