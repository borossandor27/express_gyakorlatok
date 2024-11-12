const express = require("express");
const app = express();

//-- almappában lévő fájlok eléréséhez kell (pl. styles.css)
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

//-- dinamikus oldalakhoz a view engine beállítása
const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



const users = [
  { name: "Anna", age: 22, city: "Budapest" },
  { name: "Béla", age: 33, city: "Debrecen" },
  { name: "Cecil", age: 44, city: "Szeged" },
  { name: "Dénes", age: 55, city: "Pécs" },
  { name: "Elemér", age: 66, city: "Miskolc" }
];
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/for", (req, res) => {
  res.render("for", { users });
});
app.get("/forEach", (req, res) => {
  res.render("forEach", { users });
});
app.get("/forIn", (req, res) => {
  res.render("forIn", { users });
});
app.get("/forOf", (req, res) => {
  res.render("forOf", { users });
});
app.get("/while", (req, res) => {
  res.render("while", { users });
});
app.get("/doWhile", (req, res) => {
  res.render("doWhile", { users });
});
app.listen(3000, () => {
  console.log("A szerver fut a http://localhost:3000 címen");
});
// A views mappában létrehozott for.ejs, forEach.ejs, forIn.ejs, forOf.ejs, while.ejs és doWhile.ejs fájlok:
