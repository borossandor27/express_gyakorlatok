import express from 'express';
const app = express();

app.get('/', (req, res) => {

    console.log('Kérés érkezett a főoldalra');
    console.log('Fejlécek:', req.headers);
  // Lekéri a 'user-agent' fejlécet
  const userAgent = req.headers['user-agent']; 

  // Lekéri a 'host' fejlécet
  const host = req.headers.host; 

  console.log(`Böngésző típusa: ${userAgent}`);

  res.send('Válasz elküldve');
});

app.listen(3000, () => {
  console.log('Szerver fut http://localhost:3000 címen');
});// Middleware that reads and logs specific headers from the request