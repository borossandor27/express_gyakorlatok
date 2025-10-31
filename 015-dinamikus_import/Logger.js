export function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[LOG - ${timestamp}]: ${message}`);
}

// Egy modul inicializálása is lehetne itt (pl. adatbázis kapcsolat).
console.log("--> Logger modul inicializálva és betöltve.");