# Sztatikus fájlok kezelése

Elég nagy eltérés van CommonJs és a moduláris sztatikus fájlok kezelésében. A hagyományos esetében automatikus létrejönnek a `__filename` és `__dirname` globális változókat, amelyek az éppen futó fájl adatait tartalmazzák. A moduláris esetén ezeket nekünk kell ezeket manuálisan létrehoznunk.

```js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```
