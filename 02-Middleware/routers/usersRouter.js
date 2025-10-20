import express from 'express';
const router = express.Router();

// Felhasználók adatbázisa (példaként)
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];
// GET /users - Az összes felhasználó lekérése
router.get('/', (req, res) => {
    res.json(users);
});
// GET /users/:id - Egy adott felhasználó lekérése ID alapján
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10); // URL paraméterből jövő ID-t számmá alakítjuk
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('Felhasználó nem található');
    }
});
router.post('/', (req, res) => {
    // Itt lehetne kezelni az új felhasználó létrehozását
    res.status(201).send('Új felhasználó létrehozva');
});
router.put('/:id', (req, res) => {
    // Itt lehetne kezelni a felhasználó adatainak frissítését
    res.send(`Felhasználó ${req.params.id} frissítve`);
});
router.delete('/:id', (req, res) => {
    // Itt lehetne kezelni a felhasználó törlését
    res.send(`Felhasználó ${req.params.id} törölve`);
});
export default router;