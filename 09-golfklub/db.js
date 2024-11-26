/* 
* Szinkron kapcsolat esetén a program várakozik az adatbázis válaszára.
* Ez különösen akkor probléma, ha sok felhasználó csatlakozik egyszerre.
* Aszinkron kapcsolat esetén a program nem várakozik az adatbázis válaszára.
* Ezáltal a program folyamatosan tud dolgozni, és nem blokkolódik.
* 
* A MySQL2/promise egy Promise alapú működésű MySQL csomag.
* Lehetővé teszi az await és async használatát, amely nem blokkolja az eseményciklust.
*/

const mysql = require('mysql2/promise');

const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD ||'',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'golfklub'
    });
    console.log('Sikeresen kapcsolódtál az adatbázishoz!');
    return connection;
  } catch (error) {
    console.error('Nem sikerült kapcsolódni az adatbázishoz:', error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
