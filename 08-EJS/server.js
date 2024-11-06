const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// JSON-adat betöltése fájlból
const loadData = () => {
    const data = fs.readFileSync('data.json');
    return JSON.parse(data);
};

// Adatok mentése fájlba
const saveData = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

// Főoldal - listázza az összes elemet
app.get('/', (req, res) => {
    const fruits = loadData();
    res.render('index', { fruits });
});

// Új elem hozzáadása
app.post('/add', (req, res) => {
    const fruits = loadData();
    const newFruit = {
        id: fruits.length ? fruits[fruits.length - 1].id + 1 : 1,
        megnevezes: req.body.megnevezes,
        mennyiseg: parseFloat(req.body.mennyiseg),
        egysegara: parseFloat(req.body.egysegara),
        mennyisegiEgyseg: req.body.mennyisegiEgyseg
    };
    fruits.push(newFruit);
    saveData(fruits);
    res.redirect('/');
});

// Elem törlése
app.post('/delete/:id', (req, res) => {
    let fruits = loadData();
    const id = parseInt(req.params.id);
    //-- Az id alapján kiválogatjuk azokat az elemeket, amelyeknek az id-je nem egyezik meg a törlendő id-vel
    fruits = fruits.filter(fruit => fruit.id !== id);
    saveData(fruits);
    res.redirect('/');
});

// Elem módosítása
app.post('/edit/:id', (req, res) => {
    let fruits = loadData();
    const id = parseInt(req.params.id);
    const index = fruits.findIndex(fruit => fruit.id === id);
    if (index !== -1) {
        fruits[index] = {
            ...fruits[index],
            megnevezes: req.body.megnevezes,
            mennyiseg: parseFloat(req.body.mennyiseg),
            egysegara: parseFloat(req.body.egysegara),
            mennyisegiEgyseg: req.body.mennyisegiEgyseg
        };
        saveData(fruits);
    }
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
