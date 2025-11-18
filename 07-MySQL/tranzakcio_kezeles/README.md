# Tranzakciókezelés express-pool Használatával

A tranzakciók biztosítják, hogy egy sor adatbázis-művelet *(SQL utasítások)* **vagy mind** sikeresen végrehajtódjon, **vagy** ha bármelyik hiba történik, ****egyik** se hajtódjon végre *(visszagörgetés, vagy ROLLBACK)*. Ezt hívják **ACID** *(Atomicitás, Konziszencia, Izoláció, Tartósság)* tulajdonságoknak, melyek közül itt a legfontosabb most az Atomicitás.

Az express-pool *(vagy bármely node-postgres alapú pool)* használatakor tranzakció indításához lekérünk egy klienst a poolból, majd a tranzakció befejezése után visszaadjuk azt.

## Lépések

1. **Kliens Lekérése *(Bérelt vagy dedikált Kapcsolat)***:

Mivel a pool önmagában nem tudja, mikor kezdődik és végződik egy tranzakció, először ki kell venni a poolból egy dedikált adatbázis-kapcsolatot *(egy kliens példányt)*.
Ezt a `pool.connect()` metódussal tesszük meg. A kapott klienst fogjuk használni a tranzakció teljes idejére.

1. **Tranzakció Kezdete *(BEGIN)***:

A lefoglalt klienst használva kiadjuk a `BEGIN` vagy `START TRANSACTION` SQL parancsot. Ezzel elkezdődik az atomi műveletek sorozata.

1. **Tranzakciós Műveletek**:

Végrehajtjuk a szükséges SQL utasításokat *(pl. `INSERT`, `UPDATE`, `DELETE`)* **ugyanazon a kliensen** keresztül.

1. **Sikeres Befejezés *(COMMIT)***:

Ha minden SQL utasítás sikeres volt, kiadjuk a `COMMIT` parancsot. Ez **véglegesíti a változásokat az adatbázisban**.

> __FONTOS__: Végrehajtás után vissza kell adni a klienst a poolnak a `client.release()` metódussal, akár sikeres, akár sikertelen volt a tranzakció.

1. **Hiba Kezelése *(ROLLBACK)***:

Ha bármelyik tranzakciós művelet során hiba lép fel, vagy az üzleti logika szerint a művelet nem engedélyezett, azonnal kiadjuk a `ROLLBACK` parancsot. Ez az összes `BEGIN` óta végrehajtott műveletet **visszavonja**, és az adatbázis visszatér a tranzakció előtti állapotba.

## Példa (Pénzátutalás)

A klasszikus példa a pénzátutalás egyik számláról a másikra. Ennek két kritikus lépése van:

    1. Pénz levonása a forrás számláról.

    2. Pénz hozzáadása a cél számlához.

Ha az **1.** sikeres, de a **2.** sikertelen, a pénz elveszne. Ezért kell tranzakciót használni!
