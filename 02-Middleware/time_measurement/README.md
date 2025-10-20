# Időmérés

A `res.on('finish', () => {})` parancs az Express alkalmazásban a Node.js alacsonyabb szintű `http.ServerResponse` objektumának eseménykezelőjét használja.

A lényege az, hogy az eseménykezelőben lévő kód akkor fut le, amikor a válasz *(response)* elküldése befejeződött az ügyfél *(kliens)* felé.

## Mikor használjuk?

- **Naplózás (Logging)**: Gyakran használják arra, hogy rögzítsék a válasz befejezését, például az összesített válaszidő vagy a válasz állapotkódjának utólagos naplózására.

- **Erőforrások Felszabadítása**: Olyan utólagos tisztító műveletek végrehajtására, amelyeknek csak azután szabad futniuk, miután a válasz már elment (pl. adatbázis kapcsolat bezárása, ha az utolsó művelethez kapcsolódott, vagy egy ideiglenes fájl törlése).

- **Statisztika/Monitorozás**: A kérés-válasz ciklus utolsó, sikeres szakaszának jelzésére.

> **NOTE** A hálózati kapcsolat megszakadásának *(pl. kliens lezárja a kapcsolatot, mielőtt a válasz elküldésre került volna)* kezelésére inkább a `res.on('close', ...)` eseményt érdemes figyelni.
