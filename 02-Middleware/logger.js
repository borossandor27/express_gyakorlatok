// logger.js 
function  log ( message ) {
    const timestamp = new  Date().toISOString();
    console.log ( ` ${timestamp} : ${message} ` );
}
//-- CommonJS modulrendszerben a modulokat a modul.exports objektumon keresztül exportáljuk 
//-- Az exportált modulokat a require függvény segítségével importáljuk.
module.exports = log;
