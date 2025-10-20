import express from 'express';
const router = express.Router();

// Termékek adatbázisa (példaként)
const products = [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Okostelefon', price: 499.99 },
    { id: 3, name: 'Tablet', price: 299.99 }
];
// GET /products - Az összes termék lekérése
router.get('/', (req, res) => {
    res.json(products);
});
// GET /products/:id - Egy adott termék lekérése ID alapján
router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10); // URL paraméterből jövő ID-t számmá alakítjuk
    const product = products.find(p => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Termék nem található');
    }
});
router.post('/', (req, res) => {
    // Itt lehetne kezelni az új termék létrehozását
    res.status(201).send('Új termék létrehozva');
});
router.put('/:id', (req, res) => {
    // Itt lehetne kezelni a termék adatainak frissítését
    res.send(`Termék ${req.params.id} frissítve`);
});
router.delete('/:id', (req, res) => {
    // Itt lehetne kezelni a termék törlését
    res.send(`Termék ${req.params.id} törölve`);
});
export default router;