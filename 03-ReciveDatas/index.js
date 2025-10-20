import express from 'express'; // A http szerver létrehozásához
import multer from 'multer'; // Fájl feltöltés kezeléséhez
import cookieParser from 'cookie-parser'; // Cookie-k parszolásához
const app = express();
const port = 3000;

// 1. Middleware-ek beállítása
// Engedélyezi a JSON törzs (body) parszolását
app.use(express.json());
// Engedélyezi a URL-kódolt törzs parszolását
app.use(express.urlencoded({ extended: true }));
// Engedélyezi a cookie-k parszolását
app.use(cookieParser());

// Multer beállítása: memória tárolót használunk a példa egyszerűsítése kedvéért
const upload = multer({ storage: multer.memoryStorage() });


// --- 2. ÚTVONAL PARAMÉTEREK (req.params), LEKÉRDEZÉSI PARAMÉTEREK (req.query), FEJLÉCEK (req.headers), COOKIE-K (req.cookies) PÉLDÁJA ---
// URL minta: http://localhost:3000/felhasznalo/123?rendezes=nev&aktiv=true
app.get('/felhasznalo/:id', (req, res) => {
    console.log("--- GET KÉRÉS FELDOLGOZÁSA ---");

    // Útvonal paraméterek (req.params)
    // Kinyeri az URL azon részeit, amelyeket a :id jelöl
    console.log("✅ Útvonal paraméterek (req.params):", req.params); 
    // Eredmény: { id: '123' }

    // Lekérdezési paraméterek (req.query)
    // Kinyeri a ? utáni kulcs=érték párokat
    console.log("✅ Lekérdezési paraméterek (req.query):", req.query); 
    // Eredmény: { rendezes: 'nev', aktiv: 'true' }
    
    // Cookie-k fogadása (req.cookies)
    // Csak a cookie-parser middleware futtatása után érhető el
    console.log("✅ Cookie-k (req.cookies):", req.cookies);
    // Ha a kérés tartalmazta: { nyelvi_kod: 'hu', session_id: 'xyz123' }

    // Fejléc adatok (req.headers)
    // Az összes HTTP fejléc kisbetűs kulcsokkal
    console.log("✅ Fejléc adatok (req.headers) - Részlet:");
    console.log("   - Content-Type:", req.headers['content-type']); // Általában nincs GET-nél
    console.log("   - User-Agent:", req.headers['user-agent']);
    console.log("   - Host:", req.headers.host);
    // Eredmény: Részletes objektum, amely tartalmazza a fenti elemeket

    res.json({
        uzenet: "Sikeresen feldolgozva!",
        id: req.params.id,
        rendezes: req.query.rendezes,
        fogadott_cookie_k: req.cookies
    });
});

// --- 3. TÖRZS (BODY) PARAMÉTEREK (req.body) PÉLDÁJA ---
// Ehhez POST kérés szükséges (pl. Postman vagy fetch használatával)
// A kliensnek el kell küldenie a 'Content-Type: application/json' fejlécet
app.post('/adatkuldes', (req, res) => {
    console.log("--- POST KÉRÉS FELDOLGOZÁSA ---");

    // Törzs (body) paraméterek (req.body)
    // Csak a 'express.json()' vagy 'express.urlencoded()' middleware futtatása után érhető el
    console.log("✅ Törzs (body) paraméterek (req.body):", req.body);
    // Eredmény: { nev: 'Példa János', email: 'janos@pelda.hu' }

    res.json({
        uzenet: "A törzs adatok feldolgozva!",
        fogadott_adat: req.body
    });
});

// --- 4. FÁJLOK FELTÖLTÉSE (req.file/req.files) PÉLDÁJA ---
// Ehhez POST kérés és 'multipart/form-data' Content-Type szükséges (pl. Postman)
// 'image' a bemeneti (input) mező neve
app.post('/feltoltes', upload.single('image'), (req, res) => {
    console.log("--- FÁJLFELTÖLTÉS FELDOLGOZÁSA ---");

    // Fájlok feltöltése (req.file) - egyetlen fájl esetén
    // A Multer middleware által kerül hozzáadásra
    console.log("✅ Feltöltött fájl (req.file):", req.file);
    // Eredmény (multer.memoryStorage esetén):
    // { fieldname: 'image', originalname: 'pelda.jpg', encoding: '7bit', ... buffer: <Buffer ...> }

    // Több fájl (pl. upload.array('files', 10)) esetén a 'req.files' tulajdonság használható
    // console.log("Fájlok (req.files):", req.files); 

    if (req.file) {
        res.json({
            uzenet: "Fájl sikeresen feltöltve!",
            fajl_nev: req.file.originalname,
            meret: req.file.size
        });
    } else {
        res.status(400).json({ uzenet: "Nincs feltöltött fájl." });
    }
});


// 5. Szerver indítása
app.listen(port, () => {
    console.log(`Express példa fut: http://localhost:${port}`);
    console.log("-----------------------------------------");
    console.log("TESZT ELKÉSZÍTÉSE POSTMAN VAGY CURL HASZNÁLATÁVAL:");
    console.log("GET teszt: curl -X GET 'http://localhost:3000/felhasznalo/999?tipus=admin' -H 'Cookie: nyelvi_kod=en'");
    console.log("POST teszt: curl -X POST http://localhost:3000/adatkuldes -H 'Content-Type: application/json' -d '{\"felhasznalo\":\"Béla\", \"kor\":30}'");
    console.log("-----------------------------------------");
});