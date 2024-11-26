const express = require('express');
const app = express();

// Middleware az adatfeldolgozáshoz
app.use(express.json());

// Egyed alapú route-ok importálása
const ugyfelRoutes = require('./routes/ugyfel');
const befizetesRoutes = require('./routes/befizetes');
const tagsagRoutes = require('./routes/tagsag');
const jelenletRoutes = require('./routes/jelenlet');

// Route-ok beállítása
app.use('/golf/ugyfel', ugyfelRoutes);       // Ügyfél route-ok
app.use('/golf/befizetes', befizetesRoutes); // Befizetés route-ok
app.use('/golf/tagsag', tagsagRoutes);       // Tagság route-ok
app.use('/golf/jelenlet', jelenletRoutes);   // Jelenlét route-ok

// 404-es hibaoldal
app.use((req, res) => {
  res.status(404).send('404 - Az oldal nem található');
});

// Szerver indítása
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Szerver fut http://localhost:${PORT} url-en`);
});
