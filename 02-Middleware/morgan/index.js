import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/varakozik', (req, res) => {
  setTimeout(() => {
    res.send('Várakozás után érkezett válasz!');
  }, 2000);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
