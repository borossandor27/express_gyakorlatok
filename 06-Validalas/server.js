/*
    POST-ban érkező adatok ellenőrzése
    A POST-ban érkező adatok ellenőrzésekor a felhasználó által megadott adatokat ellenőrizni kell, hogy megfelelnek-e a várt formátumnak.
    A példában regisztrációs formból érkező adatokat ellenőrizzük, hogy megfelelőek-e.
    Ha megfelelőek, akkor a felhasználó adatait egy tömbben tároljuk.
    A tárolt felhasználónév és jelszó párossal be is jelentkezhet a felhasználó.
*/
const express = require("express");
const app = express();
const { createServer } = require("http"); //-- http modul importálása
const server = createServer(app); //-- express alkalmazás létrehozása
const path = require("path"); //-- path modul importálása
const cors = require("cors"); //-- cors modul importálása
app.use(cors()); //-- cors middleware beállítása
const fs = require("fs"); //-- fs modul importálása
const port = 3000; //-- port szám beállítása
const bodyParser = require("body-parser"); //-- body-parser modul importálása
app.use(bodyParser.urlencoded({ extended: true })); //-- body-parser middleware beállítása
app.use(bodyParser.json()); //-- body-parser middleware beállítása
app.use(express.static('public')); //-- statikus fájlok elérési útvonalának beállítása

let users = []; //-- felhasználók tömbjének deklarálása
let user = {}; //-- felhasználó objektum deklarálása
let userContent = ""; //-- felhasználó objektum tartalom deklarálása
let errors = []; //-- hibák tömbjének deklarálása

app.get("/", (req, res) => {
  let indexFile = path.join(__dirname, "public", "Validalas.html");
  console.log(indexFile);
  if (fs.existsSync(indexFile)) {
    res.header("Content-Type", "text/html");
    res.sendFile(indexFile);
  } else {
    res.send("Nincs ilyen fájl!");
  }
});
app.get("/users", (req, res) => {
    userContent = JSON.stringify(users);
    res.send(userContent);
    });
app.post("/reg", (req, res) => {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    console.log(req.body);
    let name = req.body.name;
    let birthdate = req.body.birthdate;
    let email = req.body.email;
    let accountNumber = req.body.accountNumber;
    let postalCode = req.body.postalCode;
    let profilePic = req.body.profilePic;
    let postalCodeRegex = /^\d{4}$/;
    if (!postalCodeRegex.test(postalCode)) {
        errors.push(
        "Az irányítószámnak pontosan négy számjegyűnek kell lennie."
        );
    }
    if (errors.length > 0) {
        res.status(400).json({ error: errors });
    } else {
        user = {
        name: name,
        birthdate: birthdate,
        email: email,
        accountNumber: accountNumber,
        postalCode: postalCode,
        profilePic: profilePic,
        };
        users.push(user);
        res.status(200).json({ message: "Sikeres regisztráció!" });
    }
});
app.post("/login", (req, res) => {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let user = users.find((user) => user.email === email && user.password === password);
    if (user) {
        res.status(200).json({ message: "Sikeres bejelentkezés!" });
    } else {
        res.status(400).json({ error: "Hibás felhasználónév vagy jelszó!" });
    }
});
app.listen(port, () => {
  console.log(`Az alkalmazás elindult a http://localhost:${port} címen.`);
});
