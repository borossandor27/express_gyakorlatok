# JWT token

A Bearer és a JWT *(JSON Web Token)* tokenek közötti különbség a funkciójukban és a formájukban rejlik:

- A Bearer Token a használati módot (sémát) írja le, vagyis azt, hogy a tokent birtokló fél (a "vivő") hozzáférhet az erőforrásokhoz.

- A JWT a token formátumát (szerkezetét) írja le.

Egyszerűen fogalmazva: A JWT az a forma, amit a Bearer tokenek leggyakrabban felvesznek, de nem az egyetlen lehetséges forma.

# JWT Token (Adatformátum)

A JWT egy konkrét, szabványosított formátum, amely leírja, hogyan kell felépíteni egy tokent.

- **Definíció**
Egy JSON-alapú, aláírt adatstruktúra ([RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)), amely biztonságosan továbbít információkat (ún. claim-eket) a felek között.
- **Forma**
Három, ponttal (.) elválasztott részből áll: `Header.Payload.Signature`. Ezek mind Base64URL-kódoltak.
- **Tartalom**
A Payload *(tartalom)* tartalmazza a felhasználói adatokat, a szerepköröket és a lejárati időt *(állapotmentes)*.

> **Előnye**: Az erőforrás-szervernek nem kell minden kérésnél adatbázisban ellenőriznie a tokent, mert a token maga tartalmazza az összes szükséges információt, és az aláírás igazolja a hitelességét.
