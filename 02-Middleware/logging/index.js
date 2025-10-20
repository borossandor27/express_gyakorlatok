/*
    Az alkalmazás csak regisztrált felhasználók számára elérhető.

    A felhasználók adatait egy JSON fájlban tároljuk.
    Az alkalmazásban a felhasználók adatait a következőképpen lehet lekérdezni:
    GET /users/:id
    Az alkalmazásban a felhasználók adatait a következőképpen lehet módosítani:
    PUT /users/:id
    Az alkalmazásban a felhasználók adatait a következőképpen lehet törölni:
    DELETE /users/:id

    Az alkalmazásban a felhasználók adatait a következőképpen lehet létrehozni:
    POST /users
    {
      "id": 18,
      "fullname": "Dorian Kaminski",
      "password": "718",
      "username": "user_945"
    }
    Az alkalmazásban a felhasználók adatait a következőképpen lehet lekérdezni:
    GET /users
*/
import users from "./users.json" with { type: "json" };//-- Felhasználók adatainak betöltése
import express from 'express';
import { validUser } from './tools.js'; //-- Felhasználó ellenőrző függvény importálása
const app = express();
const port = 3000;
app.use(express.json()); //-- A body tartalmának JSON formátumba alakítása

//-- saját készítésű middleware függvény, amely a kérés adatait logolja a konzolra
app.use(function(req, res, next) {
    console.log("Request URL:", req.originalUrl);
    console.log("Request Type:", req.method);
    console.log('ip:', req.ip);
    next();
});


// felhasználó belépésének ellenőrzése
app.use(function(req, res, next) {
    //-- felhasználó belépésének ellenőrzése
    if (validUser(req.query.username, req.query.password)) {
        next(); // a felhasználó létezik, továbblépés a következő middleware-re vagy útvonalkezelőre
    } else {
        res.status(401).send("Nem vagy bejelentkezve!"); // a send() metódus automatikusan lezárja a választ, megszakítja a feldolgozást!
    }
});


app.get("/users", function(req, res) {
    res.json(users);
});

app.get("/users/:id", function(req, res) {
    let user = users.find(u => u.id == req.params.id);
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(404).send(`Nem található felhasználó id: ${req.params.id} azonosítóval`);
    }
});

app.post("/users", function(req, res) {
    let user = req.body;
    users.push(user);
    res.status(201).json(user);
});

// 404-es hibakezelő middleware
app.use((req, res, next) => {
    res.status(404).send('Az oldal nem található!');
});

// 500-as hibakezelő middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Valami hiba történt!');
});

app.listen(port, function() {
    console.log(`A szerver elindult a http://localhost:${port} címen`);
});

// Tesztelés:
// http://localhost:3000/users -> Nem vagy bejelentkezve!
// http://localhost:3000/users/1 -> Nem vagy bejelentkezve!
// http://localhost:3000/users?username=admin&password=admin -> Az összes felhasználó adatai
// http://localhost:3000/users/1?username=admin&password=admin -> A 1-es azonosítójú felhasználó adatai