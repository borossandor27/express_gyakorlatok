/* 
* Szinkron kapcsolat esetén a program várakozik az adatbázis válaszára.
* Ez különösen akkor probléma, ha sok felhasználó csatlakozik egyszerre.
* Aszinkron kapcsolat esetén a program nem várakozik az adatbázis válaszára.
* Ezáltal a program folyamatosan tud dolgozni, és nem blokkolódik.
* 
* A MySQL2/promise egy Promise alapú működésű MySQL csomag.
* Lehetővé teszi az await és async használatát, amely nem blokkolja az eseményciklust.
*/
// privát adatok beolvasása adatkapcsolathoz
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Környezeti változók betöltése

// Kapcsolat létrehozása
export const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'golfklub',
  port: process.env.DB_PORT || 3306,
});

// Teszteljük a kapcsolatot
try {
  console.log('Kapcsolódás az adatbázishoz sikeres!');
  const [rows] = await connection.query('SELECT 1');
  console.log('Teszt lekérdezés eredménye:', rows);
} catch (err) {
  console.error('Hiba történt:', err.message);
} finally {
  //await connection.end();
}
export default connection; // Az adatbázis kapcsolat exportálása