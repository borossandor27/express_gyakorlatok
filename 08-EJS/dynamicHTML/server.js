//-- változó tartalommal küldi vissza a HTML-t
const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index', { title: 'EJS', message: 'Hello World!' });
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
