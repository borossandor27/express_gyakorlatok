# Basic Authentication

A `Basic Authentication` egy rendkívül egyszerű és széles körben támogatott hitelesítési séma, amelyet a `HTTP protokoll` tartalmaz az erőforrásokhoz való hozzáférés ellenőrzésére.

## Lépései

1. **Kihívás (*Challenge*)**

Amikor egy kliens *(pl. webböngésző, API kliens)* egy védett erőforrást próbál elérni, a szerver `401`-es (Unauthorized) HTTP státusz kóddal válaszol, és egy `WWW-Authenticate` fejlécet küld, amely jelzi, hogy Basic Authentication szükséges.

1. **Hitelesítő adatok küldése (*Client-side*)**

- A kliens (*felhasználói felületen vagy programozottan*) elkéri a felhasználónevet és a jelszót.

- Ezt a két adatot egy kettősponttal választja el (pl. `felhasznalonev:jelszo`).

- Az így kapott karakterláncot ezután `Base64` kódolással alakítja át.

1. **Fejléc elküldése (*Sending the Header*)**

A kliens a következő kéréseiben elküldi az Authorization HTTP fejlécet, ami a Basic szóval és a Base64-el kódolt karakterlánccal kezdődik:

```html
    Authorization: Basic <Base64-kódolt-string>
```

1. **Ellenőrzés (*Verification*)**
A szerver dekódolja a Base64 stringet, kinyeri a felhasználónevet és jelszót, majd ellenőrzi ezeket a saját felhasználói adatbázisában. Ha érvényes, engedélyezi a hozzáférést.

> **NOTE**  **Base64 Kódolás**, NEM Titkosítás, emiatt a Basic Authentication-t **MINDEN ESETBEN** kizárólag HTTPS/SSL-en keresztül szabad használni.
