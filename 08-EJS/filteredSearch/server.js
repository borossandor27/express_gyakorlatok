// Szükséges modulok
const express = require('express');
const app = express();
const products = require('./products'); // Feltételezzük, hogy itt vannak a termékadatok

// Beállítjuk az EJS-t sablonmotorként
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { products });
});
// Szűrő / kereső végpont
app.get('/search', (req, res) => {
    const category = req.query.category || '';
    const priceRange = req.query.priceRange || '';

    // Szűrjük a termékeket kategória és ár szerint
    const filteredProducts = products.filter(product => {
        let isMatch = true;
        if (category) isMatch = isMatch && product.category === category;
        if (priceRange === 'low') isMatch = isMatch && product.price < 50;
        if (priceRange === 'high') isMatch = isMatch && product.price >= 50;
        return isMatch;
    });

    // Az eredmények megjelenítése az 'searchResults.ejs' sablonnal
    res.render('searchResults', { products: filteredProducts });
});

// Szerver indítása
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
//-- használat -- http://localhost:3000/search?category=electronics&priceRange=low