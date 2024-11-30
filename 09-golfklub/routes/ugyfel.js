import express from "express"; // Express könyvtár importálása
const router = express.Router();
import * as db from "../db.js"; // Az adatbázis kapcsolat kódjának betöltése

// Ügyfél létrehozása
router.post("/register", async (req, res) => {
  let result= await db.createUgyfel(req.body);
  if (result.success) {
    res.status(201).json(result.data);
    console.log(result.message);
  } else {
    res.status(500).json(result.error);
    console.log(result.message);
  }
});

// Ügyfél belépése (felhasználónév és jelszó ellenőrzése)
router.post("/login", async (req, res) => {
  let result = await db.loginUgyfel(req.body);
  if (result.success) {
    res.status(201).json(result.data);
    console.log(result.message);
  } else {
    res.status(500).json(result.error);
    console.log(result.message);
  }
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

// Egy ügyfél adatai
router.get("/:uazon", async (req, res) => {
  let result = await db.getUgyfel(req.params.uazon);
  if (result.success) {
    res.status(201).json(result.data);
  } else {
    res.status(500).json(result.error);
  }
});

// Ügyfél módosítása
router.put("/:uazon", async (req, res) => {
  let result = await db.updateUgyfel(req.params.uazon, req.body);
  console.log(result.message);
  if (result.success) {
    res.status(201).json(result.data);
  } else {
    res.status(500).json(result.error);
  }
});

// Ügyfél törlése
router.delete("/:uazon", async (req, res) => {
  let result = await db.deleteUgyfel(req.params.uazon);
  console.log(result.message);
  if (result.success) {
    res.status(201).json(result.data);
  } else {
    res.status(500).json(result.error);
  }
});

export default router;
