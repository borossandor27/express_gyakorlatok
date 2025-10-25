# Bearer Tokens

A Bearer Token *(vivő jelzők)* hitelesítési eljárás egy széles körben használt mechanizmus, különösen OAuth 2.0 és OpenID Connect (OIDC) környezetekben, ahol egy titkos kódot (*a tokent*) használnak a felhasználó azonosítására és az erőforrásokhoz való hozzáférés engedélyezésére.

## Működése

1. **Hitelesítés (*Authentication*)**
A felhasználó először bejelentkezik (*pl. felhasználónévvel és jelszóval*) egy engedélyező szerverre (*Authorization Server*).

1. **Token kiadása (*Token Issuance*)**
Sikeres bejelentkezés után az engedélyező szerver kiad egy hozzáférési tokent (*Access Token*). Ez a token a "vivő" (bearer) maga, amely tartalmazza (*vagy hivatkozik*) a felhasználó jogosultságaira és identitására vonatkozó információkat.

1. **Erőforrás kérés (*Resource Request*)**
A kliens (*pl. mobilalkalmazás vagy webes frontend*) ezután az erőforrás-szervernek (*Resource Server, ahol a védett adatok vannak*) küldött kéréseihez minden alkalommal csatolja ezt a tokent.

1. **Token átadása**
A tokent a kérés Authorization HTTP fejlécének Bearer sémájával adja át:

    ```html
        Authorization: Bearer <Token_kódolt_string>
    ```

1. **Engedélyezés (*Authorization*)**
Az erőforrás-szerver ellenőrzi a token érvényességét, lejárati idejét és a benne foglalt jogosultságokat. Ha a token érvényes, a szerver hozzáférést biztosít a védett erőforráshoz.

> **Jobb biztonság**, mint a Basic Auth esetén. A tokenek ideiglenesek, és gyakran rövidebb élettartamúak, mint egy felhasználónév-jelszó páros. Ha egy tokent ellopnak, az csak a token érvényességi idejéig használható.
