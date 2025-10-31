// 1. Definiálunk egy aszinkron függvényt, ami a dinamikus importot végzi
async function loadAndUseLogger(shouldLoad) {
    if (shouldLoad) {
        console.log("Feltétel teljesül: Dinamikus Logger modul betöltése...");

        try {
            // A dinamikus import visszatér egy Promise-szal, ami a modul objektummal (namespace) resolvál
            const LoggerModule = await import('./logger.js');
            
            // A Logger modulban exportált függvényt hívjuk meg
            LoggerModule.log("Sikeresen betöltöttük és használtuk a dinamikus loggert!");

        } catch (error) {
            console.error("Hiba történt a modul betöltésekor:", error);
        }

    } else {
        console.log("Feltétel nem teljesül: Logger modul kihagyva.");
    }
}

// 2. A fő kód végrehajtása

console.log("--- A program elkezdődik ---");

// Példa 1: Dinamikus import indítása (betöltődik)
loadAndUseLogger(true);

// Mivel az import ASZINKRON, ez a sor valószínűleg a "Logger modul inicializálva..." üzenet előtt fut le!
console.log("A fő kód tovább fut a modul betöltésére várva...");

// Példa 2: Dinamikus import kihagyása (nem töltődik be)
// loadAndUseLogger(false);