# User API – JWT autentikációval és middleware lánccal

## Telepítendő csomagok

```bash
npm init -y
npm pkg set type=module
npm install express morgan helmet cors jsonwebtoken bcryptjs
```

## Amit be szeretne mutatni

- Middleware-ek **egymás után futnak**, és dönthetnek a folyamat sorsáról.
- A **JWT autentikáció** is csak egy middleware, ami tovább engedi vagy elutasítja a kérést.
- A **role alapú hozzáférés** middleware-láncban valósítható meg tisztán.
- Az **adatvalidálás, naplózás** és **hiba-kezelés** szintén middleware-ként épül be.
- A `next(err)` mechanizmus révén bármelyik réteg hibát dobhat, amit a globális hiba-kezelő elkap.
