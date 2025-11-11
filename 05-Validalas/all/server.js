/*
    POST-ban érkező adatok ellenőrzése
    A POST-ban érkező adatok ellenőrzésekor a felhasználó által megadott adatokat ellenőrizni kell, hogy megfelelnek-e a várt formátumnak.
    A példában regisztrációs formból érkező adatokat ellenőrizzük, hogy megfelelőek-e.
    Ha megfelelőek, akkor a felhasználó adatait egy tömbben tároljuk.
    A tárolt felhasználónév és jelszó párossal be is jelentkezhet a felhasználó.
*/
import express from "express";
import path from "path"; //-- mappák kezeléséhez szükséges modul importálása
import fs from "fs";
import multer from 'multer'; //-- Multer dokumentációja: https://expressjs.com/en/resources/middleware/multer.html
import { fileURLToPath } from 'url';
import cors from "cors"; //-- böngésző CORS blokkolás feloldása

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//-- Multer konfigurálása: fájlok mentése egy 'uploads' mappába
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); //-- fájlok mentése az 'uploads' mappába  
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Új fájlnév hozzáadása időbélyeggel
  }
});

const upload = multer({ storage: storage });
app.use(cors());
app.use(express.urlencoded({ extended: true })); //-- a kapott enctype="multipart/form-data" űrlap adatainak a feldolgozása
app.use(express.json()); //-- a kapott json törzs (body) feldolgozása
app.use(express.static("public")); //-- statikus fájlok elérési útvonalának beállítása

let users = []; //-- felhasználók tömbjének deklarálása
let user = {}; //-- felhasználói adatok tárolására objektum deklarálása
let userContent = ""; //-- felhasználó szöveges objektum tartalom deklarálása
let errors = []; //-- hibák tömbjének deklarálása
let success = true; //-- ellenőrzés sikerességének változója

app.get("/", (req, res) => {
  let indexFile = path.join(__dirname, "public", "regisztracio.html"); //-- operációs rendszer függő elérési útvonal összeállítása
  console.log(indexFile);
  if (fs.existsSync(indexFile)) {
    res.header("Content-Type", "text/html");
    res.sendFile(indexFile);
  } else {
    res.send("Nincs ilyen fájl!");
  }
});

app.get("/users", (req, res) => {
  userContent = JSON.stringify(users);
  res.status(201).send(userContent);
});

app.get("/reg", (req, res) => {
  res.status(201).sendFile(path.join(__dirname, "public", "regisztracio.html"));
});

app.get("/login", (req, res) => {
  res
    .status(201)
    .sendFile(path.join(__dirname, "public", "bejelentkezes.html"));
});

app.post("/reg", upload.single('profilePic'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  let name = req.body.name;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;
  let birthdate = req.body.birthdate;
  let email = req.body.email;
  let accountNumber = req.body.accountNumber;
  let postalCode = req.body.postalCode;
  let profilePic = req.file;
  console.log(profilePic);
  //--------------- ellenőrzések ---------------------------------
  let postalCodeRegex = /^\d{4}$/;
  if (!postalCodeRegex.test(postalCode)) {
    errors.push("Az irányítószámnak pontosan négy számjegyűnek kell lennie.");
  }
  // Jelszó validálása - A jelszónak tartalmaznia kell kis- és nagybetűt, számjegyet és "!@#$%^&*()_+ =" karakterek valamelyikét. Nem lehet 8 karakternél kevesebb
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_+ =]).{8,}$/;
  if (!passwordRegex.test(password)) {
    errors.push(
      "A jelszónak tartalmaznia kell legalább egy kisbetűt, egy nagybetűt, egy számot és egy speciális karaktert."
    );
  }
  if (password !== confirmPassword) {
    errors.push("A megadott jelszavak nem egyeznek.");
  }
  // E-mail cím validálása
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    errors.push("Az e-mail cím formátuma nem megfelelő.");
  }
  // Születési dátum validálása
  let birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!birthdateRegex.test(birthdate)) {
    errors.push("A születési dátum formátuma nem megfelelő.");
  }

  // Kép fájl méret és típus ellenőrzése
  if (profilePic) {
    let fileSize = profilePic.size / 1024; // Kilobytes
    if (fileSize < 20 || fileSize > 2048) {
      errors.push("A kép mérete 20KB és 2MB között kell legyen.");
    }
    let fileType = profilePic.mimetype;
    if (!fileType.startsWith("image/")) {
      errors.push("Csak képfájlok megengedettek.");
    }
  } else {
    errors.push("Kép feltöltése kötelező.");
  }
  //--------------- ellenőrzések vége ---------------------------------
  user = {
    name: name,
    password: password,
    birthdate: birthdate,
    email: email,
    accountNumber: accountNumber,
    postalCode: postalCode,
    profilePic: profilePic.filename
  };
  console.log(errors);
  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "Hibás adatok!",
      errors: errors,
      data: user,
    });
  } else {
    users.push(user);
    res.status(200).json({
      success: true,
      message: "Sikeres regisztráció!",
    });
  }
});

app.post("/login", (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;
  console.log(email, password);
  console.log(users);
  let user = users.find(
    (user) => user.email === email && user.password === password
  );
  console.log(user);
  if (user) {
    res.status(200).json({ message: "Sikeres bejelentkezés!" });
  } else {
    res.status(400).json({ error: "Hibás felhasználónév vagy jelszó!" });
  }
});

app.listen(3000, () => {
  console.log(`Az alkalmazás elindult a http://localhost:3000 címen.`);
});
