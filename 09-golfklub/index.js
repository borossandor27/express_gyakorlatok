import express from "express"; // Express könyvtár importálása
export const app = express();
// Middleware az adatfeldolgozáshoz
app.use(express.json());
import * as db from "./db.js"; // Az adatbázis kapcsolat kódjának betöltése
let result = await db.dbInit();
if (!result.success) {
  console.log(result.message.join("\n"));
  console.log("\nA program leáll!");
  process.exit(1);
}


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
  res.status(404).send("404 - Az oldal nem található");
});

// Szerver indítása
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Szerver fut http://localhost:${PORT} url-en`);
});
