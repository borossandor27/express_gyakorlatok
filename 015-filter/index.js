import express from "express";
import fs from "fs/promises"; // Aszinkron fájlkezeléshez

const app = express();
const PORT = 3000;

// Segédfüggvény a JSON adatok betöltéséhez
async function getAdatok() {
  const fileContent = await fs.readFile("emberek.json", "utf-8");
  return JSON.parse(fileContent);
}

// 1. Végpont: Csak a férfiak lekérése
app.get("/ferfiak", async (req, res) => {
  try {
    const emberek = await getAdatok();
    const ferfiak = emberek.filter(ember => ember.nem === "ferfi");
    res.json(ferfiak); // JSON formátumban küldjük vissza
  } catch (error) {
    res.status(500).json({ hiba: "Nem sikerült beolvasni az adatokat" });
  }
});

// 2. Végpont: Csak a nők lekérése
app.get("/nok", async (req, res) => {
  try {
    const emberek = await getAdatok();
    const nok = emberek.filter(ember => ember.nem === "no");
    res.json(nok);
  } catch (error) {
    res.status(500).json({ hiba: "Nem sikerült beolvasni az adatokat" });
  }
});

// A szerver indítása a végén
app.listen(PORT, () => {
  console.log(`A szerver fut: http://localhost:${PORT}`);
});