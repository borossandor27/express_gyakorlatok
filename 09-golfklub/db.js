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
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Környezeti változók betöltése

let response = {
  success: false,
  data: {},
  error: {
    hibaszoveg: "",
  },
  message: [],
};

let connection;
export async function dbInit() {
  // környezeti változók ellenőrzése
  if (
    !process.env.DB_HOST ||
    !process.env.DB_USER ||
    !process.env.DB_NAME
  ) {
    response.message.push(
      "Környezeti változók beállítása szükséges! Próbálkozom az alapértelmezett beállításokkal."
    );
  }
  try {
    // Adatbázis kapcsolat létrehozása
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "golfklub",
      port: process.env.DB_PORT || 3306,
    });
    response.message.push("Kapcsolódás az adatbázishoz sikeres!");
    // az adatbázis elérhető de teszteljük, hogy jogosultak vagyunk-e az adatbázisban lekérdezésre
    try {
      console.log("Kapcsolódás az adatbázishoz sikeres!");
      const [rows] = await connection.query("SELECT 1");
      response.message.push("Adatbázis lekérdezés sikeres!");
    } catch (err) {
      response.message.push("Hiba történt: " + err.message);
    }
    response.success = true;
    response.message.push("Adatbázis kapcsolat megfelelő!");
  } catch (error) {
    response.message.push("Adatbázis kapcsolati hiba: " + error.message);
    response.message.push(
      "Adatbázis kapcsolat nem elérhető. Kérjük, próbálja meg később."
    );
  } finally {
    return response; // A kapcsolódási kísérlet eredménye
  }
}
// Ügyfél entitás kezelése
export async function getUgyfelek() {
  let sql = "SELECT * FROM ugyfelek";
  try {
    const [rows] = await connection.execute(sql);
    response.success = true;
    response.data = rows;
  } catch (err) {
    response.success = false;
    response.error.hibaszoveg = err.message;
  } finally {
    return response;
  }
}
