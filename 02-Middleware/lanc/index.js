import express from 'express';
const app = express();

function step1(req, res, next) {
  console.log('Első lépés');
  req.data = { step1: true };
  next();
}

function step2(req, res, next) {
  console.log('Második lépés');
  req.data.step2 = true;
  next();
}

app.get('/chain', step1, step2, (req, res) => {
  res.json(req.data);
});

app.listen(3000, () => {
  console.log('Szerver fut a http://localhost:3000 címen');
});
