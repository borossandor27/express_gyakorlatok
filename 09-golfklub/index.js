import express from "express"; // Express könyvtár importálása
export const app = express();
// Middlewarek az adatfeldolgozáshoz
app.use(express.json()); // JSON adatok feldolgozásához
app.use(express.urlencoded({ extended: true })); // Űrlapadatok feldolgozásához

import cors from "cors"; // CORS middleware importálása
app.use(cors()); // CORS engedélyezése

import {dbInit} from "./db.js"; // Az adatbázis kapcsolat kódjának betöltése
let result = await dbInit(); // kapcsolódás az adatbázishoz
if (!result.success) {
  console.log(result.message.join("\n"));
  console.log("\nA program leáll!");
  process.exit(1);
}
// input adatok elleőrzéséhez szükséges csomag importálása
import { validateRequest } from './validators/validator.js'; // input adatok ellenőrzéséhez szükséges függvény importálása


// Egyed alapú route-ok importálása
import ugyfelRoutes from "./routes/ugyfel.js";
import befizetesRoutes from "./routes/befizetes.js";
import tagsagRoutes from "./routes/tagsag.js";
import jelenletRoutes from "./routes/jelenlet.js";



// Route-ok beállítása
app.use("/golf/ugyfel", ugyfelRoutes); // Ügyfél route-ok
app.use("/golf/befizetes", befizetesRoutes); // Befizetés route-ok
app.use("/golf/tagsag", tagsagRoutes); // Tagság route-ok
app.use("/golf/jelenlet", jelenletRoutes); // Jelenlét route-ok

// 404-es hibaoldal
app.use((req, res) => {
  res.header("Content-Type","text/html; charset=utf-8");
  res.header("Content-Language","hu");
  res.status(404).send("404 - A keresett oldal nem található!");
});
app.listen(3000, () => {
  console.log("A szerver elindult a http://localhost:3000 címen");
});