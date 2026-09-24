import express from "express";
import fs from "fs/promises";

const app = express();
const PORT = 3000;

// FONTOS: Ez kell ahhoz, hogy a szerver megértse a küldött JSON adatokat a kérés törzsében (body)
app.use(express.json());

// Segédfüggvény az adatok olvasásához
async function getAdatok() {
    const fileContent = await fs.readFile("emberek.json", "utf-8");
    return JSON.parse(fileContent);
}

// Segédfüggvény az adatok mentéséhez
async function mentesAdatok(adatok) {
    await fs.writeFile("emberek.json", JSON.stringify(adatok, null, 2), "utf-8");
}

// ----------------------------------------------------
// KOR MÓDOSÍTÁSA VÉGPONT (PUT /emberek/:id/kor)
// ----------------------------------------------------
app.put("/emberek/:id/kor", async (req, res) => {
    try {
        const id = parseInt(req.params.id); // Az URL-ben megadott azonosító (pl. 2)
        const { ujKor } = req.body;        // A kérés törzséből kiolvassuk az új kort

        // Ellenőrzés, hogy az új kor érvényes szám-e
        if (typeof ujKor !== "number") {
            return res.status(400).json({ hiba: "Az új kor megadása kötelező és számnak kell lennie!" });
        }

        const emberek = await getAdatok();

        // Megkeressük a személyt az id alapján
        const ember = emberek.find(e => e.id === id);

        if (!ember) {
            return res.status(404).json({ hiba: "A megadott azonosítójú személy nem található." });
        }

        // Kor frissítése
        ember.kor = ujKor;

        // Visszaírjuk a módosított adatokat a JSON fájlba
        await mentesAdatok(emberek);

        res.json({
            uzenet: "A kor sikeresen frissítve!",
            frissitettEmber: ember
        });

    } catch (error) {
        res.status(500).json({ hiba: "Hiba történt a fájl írása/olvasása közben." });
    }
});

app.listen(PORT, () => {
    console.log(`A szerver fut: http://localhost:${PORT}`);
});