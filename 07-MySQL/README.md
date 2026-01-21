# Kommunikáció az adatbázissal

## Jelszavak tárolása

A jelszavakat soha nem szabad eredeti formájukban tárolni az adatbázisban. Ehelyett hash-elt formában kell őket menteni. A hash algoritmusok fix vagy változó hosszúságú karakterláncokat generálnak:

- **MD5**: 32 karakter (de NE használd, elavult!)
- **SHA-256**: 64 karakter (önmagában NE használd jelszóhoz)
- **bcrypt**: 60 karakter ✓ ajánlott
- **Argon2**: változó, de általában ~90 karakter ✓ ajánlott
- **PBKDF2**: változó hossz

## Adattípus választás

A MariaDB-ben a jelszavak tárolására a VARCHAR(255) vagy CHAR(60) adattípus a legmegfelelőbb,

    ```sql
    CREATE TABLE users (
        userid INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

## Bcrypt példák

Amikor C#-ban vagy Node.js-ben bcrypt/Argon2 hash-t készítesz, a kimenet egy szabványos formátumú string, amely tartalmazza:

- Az algoritmust
- A költségfaktort (salt rounds)
- A salt-ot
- A hash-t

Ezt a stringet bárhol ellenőrizheted, bármilyen nyelven.

### C# *(bcrypt hash készítése és ellenőrzése)*
```csharp
using BCrypt.Net;

// Hash készítése (ezt tárold az adatbázisban)
string hash = BCrypt.Net.BCrypt.HashPassword("myPassword123");
// Eredmény pl: "$2a$11$N9qo8uLOickgx2ZMRZoMye..."

// Ellenőrzés (ugyanaz a hash bármely nyelvből)
bool isValid = BCrypt.Net.BCrypt.Verify("myPassword123", hash);
```
NuGet csomag: `BCrypt.Net-Next`

### Node.js (bcrypt):
```javascript
const bcrypt = require('bcrypt');

// Hash készítése
const hash = await bcrypt.hash('myPassword123', 11);
// Eredmény pl: "$2a$11$N9qo8uLOickgx2ZMRZoMye..."

// Ellenőrzés (működik C#-ban készített hash-sel is!)
const isValid = await bcrypt.compare('myPassword123', hash);
```
NPM csomag: `bcrypt`

### Argon2 példák

C# (Argon2)
```csharp
using Isopoh.Cryptography.Argon2;

// Hash készítése
string hash = Argon2.Hash("myPassword123");
// Eredmény pl: "$argon2id$v=19$m=65536,t=3,p=1$..."

// Ellenőrzés
bool isValid = Argon2.Verify(hash, "myPassword123");
```

NuGet csomag: `Isopoh.Cryptography.Argon2`

### Node.js (Argon2)
```javascript
const argon2 = require('argon2');

// Hash készítése
const hash = await argon2.hash('myPassword123');
// Eredmény pl: "$argon2id$v=19$m=65536,t=3,p=1$..."

// Ellenőrzés (működik C#-ban készített hash-sel is!)
const isValid = await argon2.verify(hash, 'myPassword123');
```

NPM csomag: `argon2`
