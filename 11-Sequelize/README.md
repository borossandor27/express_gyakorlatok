# [Sequelize](https://sequelize.org/docs/v6/getting-started/) ORM
A `Sequelize` egy teljes értékű, Promise-alapú ORM, amely támogatja a PostgreSQL, MySQL, MariaDB, SQLite és SQL Server adatbázisok kezelését `Node.js`-ben. Nagyon népszerű az Express közösségben. A modellek, kapcsolatok, tranzakciók és migrációk használatával teljes körűen kezelheted az adatbázisodat. Ajánlott a hivatalos dokumentáció és a közösségi források tanulmányozása.

- Hivatalos dokumentáció: [Sequelize Docs](https://sequelize.org/)
- GitHub repository: [Sequelize GitHub](https://github.com/sequelize/sequelize)

## Előnyei
- **Teljes funkcionalitású ORM**, támogatja a modelleket, kapcsolatokat, tranzakciókat és migrációkat.
- Egyszerű és jól dokumentált API.
- Támogatja az `async/await` szintaxist.
- Aktív közösség és sok plugin elérhető.

## Hátrányai
- Nagyobb projektek esetén a teljesítménye lehet lassabb, mint a natív SQL lekérdezéseknek.
- A komplex lekérdezéseknél nehézkes lehet a használata.

## Mikor érdemes használni?
- Ha SQL-alapú adatbázist használsz *(pl. MySQL, PostgreSQL)*.
- Ha teljes értékű ORM-re van szükséged, amely támogatja a modelleket és a kapcsolatokat.
- Ha szeretnéd elkerülni a natív SQL írását.

# seed - az adatbázis tesztadatokkal való feltöltés
## kiegészítő csomag telepítése
```bash
npm install --save-dev sequelize-cli
```
Örülök, hogy érdekel a **Sequelize**! A Sequelize egy nagyon népszerű és hatékony ORM (Object-Relational Mapping) könyvtár Node.js-hez, amely támogatja az SQL-alapú adatbázisokat, mint például a PostgreSQL, MySQL, SQLite és SQL Server. Az alábbiakban részletesen bemutatom, hogyan kezdhetsz neki a Sequelize használatának, és milyen alapvető fogalmakkal és funkciókkal érdemes megismerkedned.

---

# 1. **Sequelize telepítése**
Először is, telepítsd a Sequelize-et és az adatbázisodhoz szükséges dialektust (pl. MySQL, PostgreSQL).

```bash
npm install sequelize
npm install mysql2  # MySQL-hez
# vagy
npm install pg pg-hstore  # PostgreSQL-hez
# vagy
npm install sqlite3  # SQLite-hoz
```

---

# 2. **Kapcsolódás az adatbázishoz**
A Sequelize használatához létre kell hoznod egy kapcsolatot az adatbázishoz.

```javascript
const { Sequelize } = require('sequelize');

// Kapcsolódás az adatbázishoz
const sequelize = new Sequelize('adatbazis_nev', 'felhasznalo', 'jelszo', {
  host: 'localhost',
  dialect: 'mysql', // vagy 'postgres', 'sqlite', 'mssql'
});
```

---

# 3. **Modellek létrehozása**
A modellek az adatbázis tábláit reprezentálják. A Sequelize-ben a modelleket JavaScript osztályokként definiálod.

## User modell létrehozása
```javascript
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  // Mezők definiálása
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Modell szinkronizálása az adatbázissal
(async () => {
  await sequelize.sync(); // Létrehozza a táblát, ha még nem létezik
  console.log('User modell szinkronizálva!');
})();
```

## 4. **Alapvető műveletek**
A Sequelize számos módszert kínál az adatbázis-műveletek végrehajtásához.

### Új rekord létrehozása
```javascript
(async () => {
  const user = await User.create({
    username: 'john',
    email: 'john@example.com',
  });
  console.log('Felhasználó létrehozva:', user.toJSON());
})();
```

### Rekordok lekérdezése
```javascript
(async () => {
  const users = await User.findAll();
  console.log('Összes felhasználó:', users.map(user => user.toJSON()));
})();
```

### Rekord frissítése
```javascript
(async () => {
  await User.update({ username: 'john_doe' }, {
    where: { email: 'john@example.com' },
  });
  console.log('Felhasználó frissítve!');
})();
```

### Rekord törlése
```javascript
(async () => {
  await User.destroy({
    where: { email: 'john@example.com' },
  });
  console.log('Felhasználó törölve!');
})();
```

## 5. **Kapcsolatok (Associations)**
A Sequelize támogatja a táblák közötti kapcsolatokat, mint például:
- **Egy-a-többhöz (One-to-Many)** kapcsolat
- **Több-a-többhöz (Many-to-Many)** kapcsolat
- **Egy-a-egyhez (One-to-One)** kapcsolat

### Példa: Egy-a-többhöz kapcsolat
```javascript
const Post = sequelize.define('Post', {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
});

// Egy felhasználónak több posztja lehet
User.hasMany(Post);
Post.belongsTo(User);

// Kapcsolatok létrehozása
(async () => {
  const user = await User.create({ username: 'john', email: 'john@example.com' });
  const post = await Post.create({ title: 'Első poszt', content: 'Ez egy teszt poszt.' });

  await user.addPost(post); // Kapcsolat létrehozása
  console.log('Poszt hozzáadva a felhasználóhoz!');
})();
```
**Kapcsolatok használata**
```javascript
const user = await User.create({ username: 'john', email: 'john@example.com' });
const post = await Post.create({ title: 'Első bejegyzés', content: 'Ez egy teszt bejegyzés.' });

// Bejegyzés hozzárendelése a felhasználóhoz
await user.addPost(post);

// Bejegyzések lekérdezése a felhasználóhoz
const userPosts = await user.getPosts();
console.log('Felhasználó bejegyzései:', userPosts.map(post => post.toJSON()));
```

## 6. **Tranzakciók**
A tranzakciók segítenek több művelet atomi végrehajtásában.

```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

(async () => {
  const t = await sequelize.transaction();

  try {
    const user = await User.create({ username: 'john', email: 'john@example.com' }, { transaction: t });
    await Post.create({ title: 'Első bejegyzés', content: 'Ez egy teszt bejegyzés.', UserId: user.id }, { transaction: t });

    await t.commit();
    console.log('Tranzakció sikeresen végrehajtva!');
  } catch (error) {
    await t.rollback();
    console.error('Tranzakció sikertelen:', error);
  }
})();
```
### 8. **Migrációk**
A migrációk segítenek az adatbázis séma változtatásainak kezelésében. A Sequelize CLI segítségével könnyedén létrehozhatsz és futtathatsz migrációkat.

1. Telepítsd a Sequelize CLI-t:
```bash
npm install --save-dev sequelize-cli
```

2. Inicializáld a Sequelize-t a projektben:
```bash
npx sequelize-cli init
```
Ez létrehozza a következő mappákat:
- **config**: Az adatbázis konfigurációja.
- **models**: Az adatbázis modellek.
- **migrations**: Az adatbázis migrációk.
- **seeders**: A tesztadatok feltöltéséhez szükséges seed fájlok.

A `config/config.json` fájlban állítsd be az adatbázis kapcsolatot.
```json
{
  "development": {
    "username": "root",
    "password": "",
    "database": "pizza",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
### Modellek létrehozása
#### Futár modell
```bash
npx sequelize-cli model:generate --name Futar --attributes fazon:integer,fnev:string,ftel:string
```
#### Pizza modell
```bash
npx sequelize-cli model:generate --name Pizza --attributes pazon:integer,pnev:string,par:integer
```
#### Vevő modell
```bash
npx sequelize-cli model:generate --name Vevo --attributes vazon:integer,vnev:string,vcim:string
```
#### Rendelés modell
```bash
npx sequelize-cli model:generate --name Rendeles --attributes razon:integer,vazon:integer,fazon:integer,idopont:date
```
#### Tétel modell
```bash
npx sequelize-cli model:generate --name Tetel --attributes razon:integer,pazon:integer,db:integer
```

### Migrációk futtatása

A modellek létrehozása után futtasd a migrációkat, hogy létrejöjjenek a táblák az adatbázisban.
```bash
npx sequelize-cli db:migrate
```

### Seed adatok feltöltése
Hozz létre seed fájlokat a tesztadatok feltöltéséhez.

#### Futár seed
```bash
npx sequelize-cli seed:generate --name futar-seeder
```

A létrehozott seed fájlban (seeders/[timestamp]-futar-seeder.js) töltsd fel az adatokat:
```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Futars', [
      { fazon: 1, fnev: 'Hurrikán', ftel: '+36 408-3654' },
      { fazon: 2, fnev: 'Gyalogkakukk', ftel: '+36 471-6098' },
      { fazon: 3, fnev: 'Gömbvillám', ftel: '+36 613-2845' },
      { fazon: 4, fnev: 'Szélvész', ftel: '+36 855-5334' },
      { fazon: 5, fnev: 'Imperial', ftel: '+36 358-3198' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Futars', null, {});
  }
};

Futtasd a seedelést:
bash
Copy

npx sequelize-cli db:seed:all



3. Hozz létre egy migrációt:
```bash
npx sequelize-cli migration:generate --name create-users
```

4. Futtasd a migrációt:
```bash
npx sequelize-cli db:migrate
```

## Feladat


