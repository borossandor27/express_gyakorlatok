# fájl fogadása
Feladat egy olyan végpont létrehozása, amely fogad egy `username` mezőt és egy képfájlt. A képfájlt a szerveren tárolja egy mappában, majd az elérési útját az adatbázisban menti el.


## 1. Adatbázis létrehozása
```sql
CREATE DATABASE image_upload;
USE image_upload;

CREATE TABLE uploads (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    imageUrl VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
## Install
A legelterjedtebb megoldás jelenleg a `multer` kiegészítő használata
```bash
    npm install express multer cors path mysql2 dotenv
```

