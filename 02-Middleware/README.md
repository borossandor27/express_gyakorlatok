# Egyszerű példák middleware használatára

Az Express alkalmazás minden kérés esetén automatikusan létrehoz négy objektumot

- **req** - a kérés jellemzői és adatai
- **res** - a válasz jellemzői és adatai
- **err** - felmerülő hibák jellemzői és adatai
- **next** - a fenti objektumok továbbítása a következő feldolgozó láncszemnek
