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
var express = require("express");
var app = express();
var port = 3000;
app.use(express.json()); //-- JSON törzs (body) feldolgozása
let users = require("./users.json"); //-- Felhasználók adatainak betöltése

//
app.use(function(req, res, next) {
    //-- saját készítésű middleware függvény, amely a kérés adatait logolja a konzolra
    console.log("Request URL:", req.originalUrl);
    console.log("Request Type:", req.method);
    console.log('ip:', req.ip);
    next();
});
app.use(function(req, res, next) {
    //-- felhasználó belépésének ellenőrzése
    if (req.query.api_key) {
        next();
    } else {
        res.status(401).send("Nem vagy bejelentkezve!");
    }
});

app.get("*", function(req, res, next) {
    res.send("GET metódus");
    next();
});
app.get("/users", function(req, res) {
    res.json(users);
});
app.get("/users/:id", function(req, res) {
    let user = users.find(u => u.id == req.params.id);
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(404).send(`Nem található felhasználó az id: ${req.params.id} azonosítóval`);
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
