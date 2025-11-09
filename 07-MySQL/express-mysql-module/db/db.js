import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Környezeti változók betöltése .env fájlból
dotenv.config();

// Connection pool létrehozása
const pool = mysql.createPool({
    host: process.env.HOST ?? 'localhost',
    user: process.env.USER ?? 'root',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    password: process.env.PASSWORD ?? '',
    database: process.env.DATABASE ?? 'userdb',
    waitForConnections: true, // Várakozás, ha nincs elérhető kapcsolat
    connectionLimit: 10, // Maximális kapcsolatok száma
    queueLimit: 0 // Végtelen várakozási sor
});

/**
 * Általános lekérdezés futtatása
 * @param {string} sql - SQL lekérdezés
 * @param {Array} params - Paraméterek a lekérdezéshez
 * @returns {Promise<Array>} Eredmény sorok
 */
export async function query(sql, params = []) {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (err) {
        console.error('SQL hiba:', err.message);
        throw err;
    }
}

/**
 * Adat beszúrása
 * @param {string} table - Tábla neve
 * @param {object} data - Objektum (kulcs: érték)
 */
export async function insert(table, data) {
    const keys = Object.keys(data); // Adatbázis mezők neveit tartalmazza
    const values = Object.values(data); // Adatbázis mezők értékeit tartalmazza
    const placeholders = keys.map(() => '?').join(', '); // Helyőrzők létrehozása a paraméteres utasításhoz az sqlinjection megelőzése miatt

    const sql = `INSERT INTO \`${table}\` (${keys.join(', ')}) VALUES (${placeholders})`;
    return query(sql, values);
}

/**
 * Adat frissítése
 * @param {string} table - Tábla neve
 * @param {object} data - Frissítendő adatok
 * @param {string} where - WHERE feltétel (pl. "id = ?")
 * @param {Array} params - WHERE paraméterek
 */
export async function update(table, data, where, params = []) {
    const setClause = Object.keys(data).map(k => `${k} = ?`).join(', ');
    const sql = `UPDATE \`${table}\` SET ${setClause} WHERE ${where}`;
    return query(sql, [...Object.values(data), ...params]);
}

/**
 * Adat törlése
 * @param {string} table - Tábla neve
 * @param {string} where - WHERE feltétel
 * @param {Array} params - WHERE paraméterek
 */
export async function remove(table, where, params = []) {
    const sql = `DELETE FROM \`${table}\` WHERE ${where}`;
    return query(sql, params);
}

/**
 * Új felhasználó létrehozása és azonnali aktiválása (logins bejegyzés)
 * @param {object} userData - A users táblába szánt adatok
 * @returns {Promise<object>} - Tranzakció eredménye
 */
export async function createUserWithLogin(userData) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Felhasználó beszúrása
        const keys = Object.keys(userData);
        const values = Object.values(userData);
        const placeholders = keys.map(() => '?').join(', ');
        const insertUserSQL = `INSERT INTO users (${keys.join(', ')}) VALUES (${placeholders})`;
        const [userResult] = await connection.query(insertUserSQL, values);

        const newUserId = userResult.insertId;

        // 2. Belépési napló létrehozása
        const insertLoginSQL = `INSERT INTO logins (user_id, success) VALUES (?, ?)`;
        await connection.query(insertLoginSQL, [newUserId, true]);

        await connection.commit();
        return { success: true, userId: newUserId };
    } catch (error) {
        await connection.rollback();
        console.error('Tranzakciós hiba (felhasználó létrehozás):', error.message);
        return { success: false, error: error.message };
    } finally {
        connection.release();
    }
}