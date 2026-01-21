import express from "express";
import mysql from "mysql2/promise"; // `promise` verzió kell!
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

let db; // Globális változóként tároljuk a kapcsolatot

const connectDB = async () => {
    try {
        db = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "auth_db"
        });
        console.log("✅ MySQL kapcsolat létrejött!");
    } catch (error) {
        console.error("❌ MySQL kapcsolat hiba:", error);
        process.exit(1); // Kilépés a hibakód 1-el
    }
};

// **MySQL kapcsolat létrehozása az alkalmazás indulásakor**
connectDB();

// **Regisztráció**
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

        res.json({ message: "✅ Sikeres regisztráció!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "❌ Hiba a regisztráció során" });
    }
});

// **Bejelentkezés**
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
console.log(username, password);
        const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length === 0) return res.status(401).json({ error: "❌ Hibás felhasználónév vagy jelszó" });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "❌ Hibás jelszó" });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "❌ Bejelentkezési hiba" });
    }
});

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).json({ error: "Nincs token megadva" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>" -> "<token>"
    if (!token) {
        return res.status(403).json({ error: "Token formátum hibás" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error("JWT hiba:", err);
            return res.status(401).json({ error: "Érvénytelen token" });
        }
        req.user = decoded;
        next();
    });
};

// **Védett végpont (middleware-rel)**
app.get("/protected", verifyToken, (req, res) => {
    res.json({ message: `Üdvözöllek, ${req.user.username}!` });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
