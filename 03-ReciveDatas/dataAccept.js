let express = require("express");
let app = express();
let port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/dataAccept", (req, res) => {
  res.send("GET metódus");
  //-- Útvonal paraméterek (req.params)
  console.log("Útvonal paraméterek:", req.params);
  //-- Lekérdezési paraméterek (req.query)
  console.log("Lekérdezési paraméterek:", req.query);
  //-- Törzs (body) paraméterek (req.body)
  console.log("Törzs (body) paraméterek:", req.body);
  //-- Fájlok feltöltése (multer middleware-rel)
  console.log("Fájlok:", req.files);
  //-- Fejléc adatok (req.headers)
  console.log("Fejléc adatok:", req.headers);
  //-- Cookie-k fogadása (cookie-parser middleware-rel)
  console.log("Cookie-k:", req.cookies);
});

app.post("/dataAccept", (req, res) => {
  res.send("POST metódus");
  //-- Útvonal paraméterek (req.params)
  console.log("Útvonal paraméterek:", req.params);
  //-- Lekérdezési paraméterek (req.query)
  console.log("Lekérdezési paraméterek:", req.query);
  //-- Törzs (body) paraméterek (req.body)
  console.log("Törzs (body) paraméterek:", req.body);
  //-- Fájlok feltöltése (multer middleware-rel)
  console.log("Fájlok:", req.files);
  //-- Fejléc adatok (req.headers)
  console.log("Fejléc adatok:", req.headers);
  //-- Cookie-k fogadása (cookie-parser middleware-rel)
  console.log("Cookie-k:", req.cookies);
});

app.put("/dataAccept", (req, res) => {
  res.send("PUT metódus");
  //-- Útvonal paraméterek (req.params)
  console.log("Útvonal paraméterek:", req.params);
  //-- Lekérdezési paraméterek (req.query)
  console.log("Lekérdezési paraméterek:", req.query);
  //-- Törzs (body) paraméterek (req.body)
  console.log("Törzs (body) paraméterek:", req.body);
  //-- Fájlok feltöltése (multer middleware-rel)
  console.log("Fájlok:", req.files);
  //-- Fejléc adatok (req.headers)
  console.log("Fejléc adatok:", req.headers);
  //-- Cookie-k fogadása (cookie-parser middleware-rel)
  console.log("Cookie-k:", req.cookies);
});

app.delete("/dataAccept", (req, res) => {
  res.send("DELETE metódus");
  //-- Útvonal paraméterek (req.params)
  console.log("Útvonal paraméterek:", req.params);
  //-- Lekérdezési paraméterek (req.query)
  console.log("Lekérdezési paraméterek:", req.query);
  //-- Törzs (body) paraméterek (req.body)
  console.log("Törzs (body) paraméterek:", req.body);
  //-- Fájlok feltöltése (multer middleware-rel)
  console.log("Fájlok:", req.files);
  //-- Fejléc adatok (req.headers)
  console.log("Fejléc adatok:", req.headers);
  //-- Cookie-k fogadása (cookie-parser middleware-rel)
  console.log("Cookie-k:", req.cookies);
});

//-- indítom a szervert
app.listen(port, () => {
  console.log(`Express szerver inditva. ${port}`);
});
