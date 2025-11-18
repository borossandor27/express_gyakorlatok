import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tranzakcio_kezeles',
});

export async function atutalas(pool, forrasId, celId, osszeg) {
    let connection;
    
    try {
        // 1. Kapcsolat lekérése a poolból
        connection = await pool.getConnection();

        // 2. Tranzakció kezdete
        await connection.beginTransaction();

        // Ellenőrzés és levonás
        const [levonasEredmeny] = await connection.execute(
            'UPDATE szamlak SET egyenleg = egyenleg - ? WHERE szamla_id = ? AND egyenleg >= ?',
            [osszeg, forrasId, osszeg]
        );

        // Ha a levonás nem történt meg (pl. nincs fedezet), hiba dobása
        if (levonasEredmeny.affectedRows === 0) {
            throw new Error('Nincs elegendő fedezet, vagy a forrás számla nem létezik.');
        }

        // Hozzáadás
        await connection.execute(
            'UPDATE szamlak SET egyenleg = egyenleg + ? WHERE szamla_id = ?',
            [osszeg, celId]
        );

        // Naplózás
        await connection.execute(
            'INSERT INTO tranzakciok (forras_szamla_id, cel_szamla_id, osszeg) VALUES (?, ?, ?)',
            [forrasId, celId, osszeg]
        );

        // 4. Sikeres befejezés (COMMIT)
        await connection.commit();
        console.log(`Sikeres átutalás: ${osszeg} egység a ${forrasId} számláról a ${celId} számlára.`);

    } catch (e) {
        // Hiba esetén visszagörgetés (ROLLBACK)
        if (connection) {
            await connection.rollback();
        }
        console.error('Tranzakciós hiba:', e.message);
        throw e; // A hiba továbbdobása

    } finally {
        // FONTOS: 5. Kapcsolat visszaadása a poolnak
        if (connection) {
            connection.release();
        }
    }
}

export default pool;