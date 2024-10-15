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
})
app.get("/", function(req, res) {
    res.send("GET metódus");
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
app.listen(port, function() {
    console.log(`A szerver elindult a http://localhost:${port} címen`);
});
