const express = require('express');
const i18n = require('i18n');
const app = express();

// i18n beállítás
i18n.configure({
  locales: ['en', 'hu', 'zh'], // Elérhető nyelvek
  directory: __dirname + '/locales', // Nyelvi fájlok helye
  defaultLocale: 'hu', // Alapértelmezett nyelv
  queryParameter: 'lang', // Nyelv váltása URL paraméterrel
});

// i18n integrálása az Express-be
app.use(i18n.init);

// EJS sablonmotor beállítása
app.set('view engine', 'ejs');

// Példa útvonal
app.get('/', (req, res) => {
  console.log("Accept-Language:", req.get('Accept-Language')); // Ez megmutatja a böngésző mely nyelveket képes megérteni
  console.log("Aktuális nyelv:", req.getLocale()); // Ez megmutatja a beállított nyelvet
  res.render('index', { title: res.__('title'), message: res.__('welcomeMessage') });
});


// Szerver indítása
app.listen(3000, () => {
  console.log('A szerver fut a http://localhost:3000 címen');
});
//-- használat pl. http://localhost:3000/?lang=zh-Hant
