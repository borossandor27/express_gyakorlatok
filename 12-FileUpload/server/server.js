import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Konfiguráció betöltése
dotenv.config();

// __dirname meghatározása ES-modulokhoz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// MySQL adatbáziskapcsolat létrehozása
const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'image_upload',
});

// Képek tárolása az 'uploads' mappába
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Egyedi fájlnév
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Publikus képek

// Végpont a fájlfeltöltéshez és adatbázisba íráshoz
app.post('/upload', upload.single('image'), async (req, res) => {
  const { username, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!username || !description || !imageUrl) {
    return res.status(400).json({ error: 'Minden mezőt ki kell tölteni!' });
  }

  try {
    // Adatok beszúrása az adatbázisba
    const [result] = await db.execute(
      'INSERT INTO uploads (username, description, imageUrl) VALUES (?, ?, ?)',
      [username, description, imageUrl]
    );

    res.json({
      message: 'Feltöltés sikeres!',
      data: { id: result.insertId, username, description, imageUrl }
    });

  } catch (error) {
    console.error('Adatbázis hiba:', error);
    res.status(500).json({ error: 'Szerverhiba az adatbázis írás során' });
  }
});

app.get('/uploads', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM uploads ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Hiba az adatlekérdezés során:', error);
    res.status(500).json({ error: 'Nem sikerült lekérdezni az adatokat' });
  }
});
// Szerver indítása
app.listen(port, () => {
  console.log(`Szerver fut a http://localhost:${port} címen`);
});
