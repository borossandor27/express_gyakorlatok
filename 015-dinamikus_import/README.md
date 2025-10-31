# Modul hivatkozások

Alapvetően sem a `require`, sem az `import` nem aszinkron a Node.js-ben a modulok betöltésének tekintetében. A valódi aszinkronitás a dinamikus import() használatakor jelenik meg.

## require *(CommonJS)*

A Node.js-ben a hagyományos `require()` függvény, ami a CommonJS modulrendszer része, alapvetően szinkron módon működik:

- **Szinkron Betöltés**: Amikor a Node.js találkozik egy require('./modulnev') hívással, a végrehajtás megáll, amíg a modul tartalmát betölti a fájlrendszerből, lefordítja és végrehajtja.

- **Blokkoló**: Ez azt jelenti, hogy a require utasítást követő kód csak azután fut le, hogy a modul teljesen betöltődött és inicializálódott.

- **Cache**: A modulok betöltése csak egyszer történik meg. A későbbi require hívások ugyanarra a modulra a gyorsítótárból (cache) kapják meg az exportált értéket, ami rendkívül gyors.

## import *(ES Modules - ESM)*

Az ECMAScript Modules (ESM) szabványt használó import utasítás a Node.js-ben a legfelső szinten (top-level) szintén szinkron módon viselkedik a betöltés és végrehajtás szempontjából, de egy aszinkron fázis előzi meg.

1. A Betöltési Folyamat
Az ESM modulok betöltésének folyamata két fő részből áll:

- **Betöltés és Felépítés *(Aszinkron Fázis)***: A modulok feloldása, letöltése (ha böngészőben lennénk) és a függőségi fa felépítése a végrehajtás előtt aszinkron módon történik. Ez a fázis felelős a körkörös függőségek (circular dependencies) és a "halott" kód (dead code) eltávolításáért. Node.js környezetben ez a fázis történhet a fő végrehajtás előtt.

- **Végrehajtás *(Szinkron Fázis)***: Amikor a motor megkezdi a kód végrehajtását, a tényleges import utasítások a fájl elején lényegében szinkron módon biztosítják a hivatkozott modul exportjait. A kód végrehajtása megáll, amíg az összes szükséges függőség betöltődik.

## Dinamikus import()
Az egyetlen valóban aszinkron importálás a Node.js-ben és a böngészőkben is a dinamikus `import()` függvény (vagy operátor):

**Aszinkron**: A import('./modulnev') függvény Promise-t ad vissza, ami azt jelenti, hogy a hívó kód nem áll le, hanem tovább fut, és a modul betöltése akkor történik meg, amikor a program futása közben eléri ezt a sort.

**Használat**: Ezt akkor használják, ha feltételesen akarnak betölteni egy modult, vagy ha csökkenteni akarják a kezdeti betöltési időt (code splitting).

```javascript
// Ez a kód ASZINKRON! A Promise-ra kell várni.
import('./nagy_modul').then((modul) => {
  modul.futtat();
});
```

| **Mechanizmus** | Szinkron | Szinkron végrehajtás (aszinkron betöltési fázis után) | **Aszinkron** (Promise-t ad vissza) |
| **Blokkolás** | Blokkólja a végrehajtást | Blokkólja a végrehajtást | **Nem** blokkolja a végrehajtást |
| **Hely** | Bárhol a kódban használható | Csak a fájl legfelső szintjén | Bárhol a kódban használható |

> __NOTE__ A kulcsfontosságú különbség a statikus `import` és a dinamikus `import()` között, hogy a dinamikus import nem állítja meg a kód futását, és csak akkor tölti be a modult, amikor a program futás közben eléri azt a sort.
