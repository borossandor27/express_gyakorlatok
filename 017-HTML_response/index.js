import express from "express";
import fs from "fs/promises";

const app = express();
const PORT = 3000;

async function getAdatok() {
  const fileContent = await fs.readFile("emberek.json", "utf-8");
  return JSON.parse(fileContent);
}

// Segédfüggvény, ami HTML táblázatot készít a kapott tömbből
function htmlTablazatKeszites(emberek, cim) {
  // A map segítségével minden elembol egy <tr> sort csinálunk, majd összefűzzük őket egyetlen szöveggé (.join(""))
  const sorok = emberek.map(ember => `
    <tr>
      <td>${ember.id}</td>
      <td>${ember.nev}</td>
      <td>${ember.kor} év</td>
    </tr>
  `).join("");

  // Visszaadjuk a teljes HTML oldalt
  return `
    <!DOCTYPE html>
    <html lang="hu">
    <head>
      <meta charset="UTF-8">
      <title>${cim}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        table { border-collapse: collapse; width: 60%; margin: 0 auto; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #007BFF; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        h2 { text-align: center; color: #333; }
      </style>
    </head>
    <body>
      <h2>${cim}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Kor</th>
          </tr>
        </thead>
        <tbody>
          ${sorok}
        </tbody>
      </table>
    </body>
    </html>
  `;
}

// 1. Végpont: Férfiak HTML táblázatban
app.get("/ferfiak", async (req, res) => {
  try {
    const emberek = await getAdatok();
    const ferfiak = emberek.filter(e => e.nem === "ferfi");
    
    const htmlValasz = htmlTablazatKeszites(ferfiak, "Férfiak listája");
    res.send(htmlValasz);
  } catch (error) {
    res.status(500).send("Hiba történt az adatok betöltésekor.");
  }
});

// 2. Végpont: Nők HTML táblázatban
app.get("/nok", async (req, res) => {
  try {
    const emberek = await getAdatok();
    const nok = emberek.filter(e => e.nem === "no");
    
    const htmlValasz = htmlTablazatKeszites(nok, "Nők listája");
    res.send(htmlValasz);
  } catch (error) {
    res.status(500).send("Hiba történt az adatok betöltésekor.");
  }
});

app.listen(PORT, () => {
  console.log(`A szerver fut: http://localhost:${PORT}`);
});