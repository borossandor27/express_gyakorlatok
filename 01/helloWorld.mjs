// server.mjs - az mjs kiterjesztésű fájlok ECMAScript (ESM) modulokat tartalmaznak
// az import kulcsszó lehetővé teszi az ESM modulból csak adott függvények asynchronous importálását
import { createServer } from 'node:http'; // importáljuk a createServer függvényt az http modulból

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node helloWorld.mjs`
