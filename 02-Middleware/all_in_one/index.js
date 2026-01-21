import express from 'express'; // a http szerver keretrendszer
import morgan from 'morgan'; // HTTP kérés naplózó middleware
import helmet from 'helmet'; // biztonsági fejlécek beállítása
import cors from 'cors'; // CORS engedélyezése
import jwt from 'jsonwebtoken'; // JWT token kezelése
import bcrypt from 'bcryptjs'; // jelszó hashelés
import fs from 'fs'; // fájl műveletek
import { type } from 'os';

const app = express();
const PORT = 3000;
const SECRET_KEY = 'nagyonTitkosKulcs123';

// --- Beépített és külső middleware-ek --- //
app.use(helmet());          // biztonsági HTTP fejlécek
app.use(cors());            // CORS engedélyezése
app.use(express.json());    // JSON parse
app.use(morgan('dev'));     // HTTP naplózás

// --- Egyszerű "adatbázis" fájl --- //
const DB_FILE = './users.json';
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');

// --- Segédfüggvények --- //
const readUsers = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
const writeUsers = (users) => fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));

// --- Saját middleware-ek --- //

// 1️⃣ Hitelesítési middleware (JWT token ellenőrzése)
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Hiányzó token' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Érvénytelen token' });
        req.user = user;
        next();
    });
}

// 2️⃣ Jogosultsági szint ellenőrzése
function requireRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ error: 'Nincs jogosultság ehhez a művelethez' });
        }
        next();
    };
}

// 3️⃣ Validációs middleware új felhasználóhoz
function validateUserData(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || typeof name !== 'string' || !email || typeof email !== 'string' || !password || typeof password !== 'string')
        return res.status(400).json({ error: 'Név, email és jelszó kötelező' });
    next();
}

// 4️⃣ Naplózás fájlba (minden kéréshez)
app.use((req, res, next) => {
    const log = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
    fs.appendFileSync('requests.log', log);
    next();
});

// --- Route-ok --- //

// 1️⃣ Regisztráció
// Példa kérés törzse:
/*
{
  "name": "Béla",
  "email": "bela@example.com",
  "password": "titok123"
}
*/
app.post('/register', validateUserData, async (req, res) => {
    const users = readUsers();
    const { name, email, password } = req.body;

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Ezzel az email címmel már van felhasználó.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), name, email, password: hashed, role: 'user' };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'Sikeres regisztráció ✅', user: { name, email } });
});

// 2️⃣ Bejelentkezés
// Példa kérés törzse:
/*
{
  "email": "bela@example.com",
  "password": "titok123"
}
*/
// Válasz: { message: 'Sikeres bejelentkezés', token: '...' }
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ error: 'Felhasználó nem található' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Hibás jelszó' });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Sikeres bejelentkezés 🔓', token });
});

// 3️⃣ Saját profil megtekintése – hitelesítéssel
// Authorization: Bearer <ide jön a belépésnél kapott token>
app.get('/profile', authenticateToken, (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id === req.user.id);
    res.json({ profile: { name: user.name, email: user.email, role: user.role } });
});

// 4️⃣ Admin funkció: összes felhasználó listázása (csak admin tokennel működik!)
// Authorization: Bearer <ide jön a belépésnél kapott token>
app.get('/admin/users', authenticateToken, requireRole('admin'), (req, res) => {
    const users = readUsers().map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role }));
    res.json(users);
});

// 5️⃣ Hiba-kezelő middleware
app.use((err, req, res, next) => {
    console.error('Hiba:', err.stack);
    res.status(500).json({ error: 'Szerverhiba történt.' });
});

// --- Szerver indítása --- //
app.listen(PORT, () => console.log(`🚀 Szerver fut a http://localhost:${PORT} címen`));
